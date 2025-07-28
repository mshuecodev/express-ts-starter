import { Request, Response } from "express"
import { getChatResponse } from "../services/chat.service"

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
