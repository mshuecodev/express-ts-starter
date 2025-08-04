import { Request, Response } from "express"
import { supabase } from "../config/db"
import { User } from "../types/user"

export class UserController {
	// async createUser(req: Request, res: Response): Promise<void> {
	// 	const { email, password }: User = req.body
	// 	const { data, error } = await supabase.auth.signUp({
	// 		email,
	// 		password
	// 	})

	// 	if (error) {
	// 		res.status(400).json({ error: error.message })
	// 	} else {
	// 		res.status(201).json({ data })
	// 	}
	// }

	async createUser(req: Request, res: Response): Promise<void> {
		const { email, password }: User = req.body
		const { data, error } = await supabase.from("users").insert({
			email,
			password
		})

		if (error) {
			res.status(400).json({ error: error.message })
		} else {
			res.status(201).json({ data })
		}
	}

	async getUser(req: Request, res: Response): Promise<void> {
		const userId = req.params.id

		const { data, error } = await supabase.from("users").select("*").eq("id", userId).single()

		if (error) {
			res.status(404).json({ error: error.message })
		} else {
			res.status(200).json({ user: data })
		}
	}

	async updateUser(req: Request, res: Response): Promise<void> {
		const userId = req.params.id
		const { email, password }: User = req.body

		const { data, error } = await supabase.from("users").update({ email, password }).eq("id", userId).single()

		if (error) {
			res.status(400).json({ error: error.message })
		} else {
			res.status(200).json({ user: data })
		}
	}

	async getAllUsers(req: Request, res: Response): Promise<void> {
		const { data, error } = await supabase.from("users").select("*")

		if (error) {
			res.status(400).json({ error: error.message })
		} else {
			res.status(200).json({ users: data })
		}
	}
}
