import express from "express"
import cors from "cors"
import helmet from "helmet"
import errorHandler from "./middlewares/errorHandler"
import indexRoute from "./routes/index.route"
import userRoute from "./routes/user.route"
import taskRoute from "./routes/task.route"

const app = express()

app.use(helmet()) // Security headers
app.use(cors()) // Enable CORS

app.use(express.json())

app.use("/api", indexRoute)
app.use("/api", userRoute)
app.use("/api", taskRoute)

app.use(errorHandler)

export default app
