import app from "./app"
import { connectToDatabase } from "./infrastructure/db"

const PORT = process.env.PORT || 3000

connectToDatabase().then(() => {
	app.listen(3000, () => console.log(`🚀 Server is running at http://localhost:${PORT}`))
})
