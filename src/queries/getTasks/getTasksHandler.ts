import { TaskModel } from "../../infrastructure/models/task"
import { GetTasksQuery } from "./getTasksQuery"

export class GetTasksHandler {
	async execute(query: GetTasksQuery) {
		const { status, createdBy, tags, dueDate, search = "", limit = 10, offset = 0, page = 1 } = query

		const filters: any = {}

		if (status) {
			filters.status = status
		}

		if (createdBy) {
			filters.createdBy = createdBy
		}

		if (tags && tags.length > 0) {
			filters.tags = { $all: tags }
		}

		if (search) {
			filters.$or = [{ title: new RegExp(search, "i") }, { description: new RegExp(search, "i") }]
		}

		const tasks = await TaskModel.find(filters)
			.sort({ dueDate: 1 })
			.skip((page - 1) * limit)
			.limit(limit)
			.lean()

		const total = await TaskModel.countDocuments(filters)

		return {
			data: tasks,
			pagination: {
				total,
				page,
				pages: Math.ceil(total / limit)
			}
		}
	}
}
