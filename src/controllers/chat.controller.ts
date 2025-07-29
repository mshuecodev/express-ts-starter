import { Request, Response } from "express"
import { getChatResponse } from "../services/chat.service"

import readline from "readline"

export const chatbotController = async (req: Request, res: Response) => {
	const { prompt } = req.body

	if (!prompt) {
		return res.status(400).json({ error: "Prompt is required" })
	}

	try {
		const response = await getChatResponse(prompt)
		res.json({ response })
	} catch (error) {
		console.error("Error in chatbotController:", error)
		res.status(500).json({ error: "Internal server error" })
	}
}

export async function chatbotTerminal() {
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	})

	const ask = () => {
		rl.question("You: ", async (message) => {
			if (message.toLowerCase() === "exit") {
				rl.close()
				return
			}

			try {
				const axios = require("axios")

				const response = await axios.post(
					"http://localhost:11434/api/generate",
					{
						model: "llama3",
						prompt: message,
						stream: true
					},
					{
						responseType: "stream"
					}
				)

				process.stdout.write("Bot: ")
				response.data.on("data", (chunk: Buffer) => {
					const lines = chunk.toString().split("\n").filter(Boolean)

					for (const line of lines) {
						try {
							const parsed = JSON.parse(line)

							if (parsed && parsed.response) {
								process.stdout.write(parsed.response)
							}
						} catch (e) {}
					}
				})

				await new Promise<void>((resolve) => {
					response.data.on("end", () => {
						process.stdout.write("\n")
						resolve()
					})
				})
			} catch (error) {
				console.error("Error in chatbotTerminal:", error)
			}

			ask()
		})
	}

	ask()
}
