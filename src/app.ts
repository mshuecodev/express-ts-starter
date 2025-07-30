import express from "express"
import cors from "cors"
import helmet from "helmet"
import indexRoute from "./routes/index.route"
import taskoute from "./routes/task.route"
import errorHandler from "./middlewares/errorHandler"

const app = express()

app.use(helmet()) // Security headers
app.use(cors()) // Enable CORS

app.use(express.json())
app.use("/api", indexRoute)
app.use("/api", taskoute)
app.use(errorHandler)

export default app
