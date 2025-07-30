export interface GetTasksQuery {
	title?: string
	status?: "todo" | "in-progress" | "done"
	createdBy?: string
	tags?: string[]
	dueDate?: Date
	search: string
	limit?: number
	offset?: number
	page?: number
}
