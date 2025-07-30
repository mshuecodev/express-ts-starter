import mongoose from 'mongoose'

export const connectToDatabase = async () => {
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/cqrs_task'

    try{
        await mongoose.connect(mongoUri, {
            autoIndex: true, // Auto-indexing for development
            maxPoolSize: 10, // Maximum number of connections in the pool
            serverSelectionTimeoutMS: 5000, // Timeout for server selection
        })
        console.log('Connected to MongoDB successfully')
    }catch(error){
        console.error('Error connecting to MongoDB:', error)
        process.exit(1)
    }

    mongoose.connection.on("disconnected", () => {
        console.log('MongoDB connection disconnected')
    })

    mongoose.connection.on("error", (error) => {
        console.error('MongoDB connection error:', error)
    })
}