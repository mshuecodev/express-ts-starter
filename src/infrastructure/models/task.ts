import mongoose from "mongoose"
import { title } from "process"

const TaskSchema = new mongoose.Schema({
	title: String,
	description: String,
	status: {
		type: String,
		enum: ["todo", "in-progress", "done"],
		default: "todo"
	},
	createdBy: String,
	tags: [String],
	dueDate: Date,
	createdAt: {
		type: Date,
		default: Date.now
	}
})

export const TaskModel = mongoose.model("Task", TaskSchema)
