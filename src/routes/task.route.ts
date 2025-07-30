import { Router } from "express"
import { TaskController } from "../controllers/task.controller"

const router = Router()

router.post("/tasks", TaskController.createTask)
router.get("/tasks", TaskController.getTasks)

export default router
