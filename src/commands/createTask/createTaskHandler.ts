import { CreateTaskCommand } from "./createTaskCommand"
import { TaskModel } from "../../infrastructure/models/task"

export class CreateTaskHandler {
	async execute(command: CreateTaskCommand) {
		const task = new TaskModel({
			title: command.title,
			description: command.description,
			createdBy: command.createdBy,
			tags: command.tags,
			dueDate: command.dueDate
		})

		return await task.save()
	}
}
