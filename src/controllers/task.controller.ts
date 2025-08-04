import { Request, Response } from "express"
import { supabase } from "../config/db"
import { Task } from "../types/task"

export class TaskController {
	async createTask(req: Request, res: Response): Promise<void> {
		const { title, description } = req.body
		const { data, error } = await supabase.from("tasks").insert([{ title, description }]).single()

		if (error) res.status(400).json({ error: error.message })
		else res.status(201).json({ task: data })
	}

	async getAllTasks(req: Request, res: Response): Promise<void> {
		const { data, error } = await supabase.from("tasks").select("*")
		if (error) res.status(400).json({ error: error.message })
		else res.status(200).json({ tasks: data })
	}

	async getTask(req: Request, res: Response): Promise<void> {
		const { id } = req.params
		const { data, error } = await supabase.from("tasks").select("*").eq("id", id).single()
		if (error) res.status(404).json({ error: error.message })
		else res.status(200).json({ task: data })
	}

	async updateTask(req: Request, res: Response): Promise<void> {
		const { id } = req.params
		const { title, description, completed } = req.body
		const { data, error } = await supabase.from("tasks").update({ title, description, completed }).eq("id", id).single()
		if (error) res.status(400).json({ error: error.message })
		else res.status(200).json({ task: data })
	}

	async deleteTask(req: Request, res: Response): Promise<void> {
		const { id } = req.params
		const { error } = await supabase.from("tasks").delete().eq("id", id)
		if (error) res.status(400).json({ error: error.message })
		else res.status(204).send()
	}
}
