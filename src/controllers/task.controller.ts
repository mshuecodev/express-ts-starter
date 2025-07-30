import { Request, Response } from "express"
import { CreateTaskCommand } from "../commands/createTask/createTaskCommand"
import { CreateTaskHandler } from "../commands/createTask/createTaskHandler"
import { GetTasksHandler } from "../queries/getTasks/getTasksHandler"
import { create } from "domain"

export class TaskController {
	static async createTask(req: Request, res: Response) {
		try {
			const { title, description, tags, dueDate, createdBy } = req.body

			const command = new CreateTaskCommand(title, description, createdBy, tags, dueDate)
			const handler = new CreateTaskHandler()

			const result = await handler.execute(command)
			res.status(201).json(result)
		} catch (error) {
			res.status(500).json({ message: "Failed to create task", error: error })
		}
	}

	static async getTasks(req: Request, res: Response) {
		try {
			const query = {
				createdBy: req.query.createdBy as string,
				status: req.query.status as "todo" | "in-progress" | "done",
				tags: req.query.tags ? (req.query.tags as string).split(",") : [],
				search: req.query.search as string,
				page: parseInt(req.query.page as string) || 1,
				limit: parseInt(req.query.limit as string) || 10
			}

			const handler = new GetTasksHandler()
			const result = await handler.execute(query)
			res.status(200).json(result)
		} catch (error) {
			res.status(500).json({ message: "Failed to retrieve tasks", error: error })
		}
	}
}
