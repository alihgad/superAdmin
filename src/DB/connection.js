import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();


export const ConnectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            // Connection timeout settings
            serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
            socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
            bufferCommands: false, // Disable mongoose buffering
            maxPoolSize: 10, // Maintain up to 10 socket connections
            minPoolSize: 5, // Maintain a minimum of 5 socket connections
            maxIdleTimeMS: 30000, // Close connections after 30 seconds of inactivity
            // Retry settings
            retryWrites: true,
            retryReads: true,
        });
        
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Database connection failed:", error.message);
        throw error;
    }
};



export default ConnectDB

