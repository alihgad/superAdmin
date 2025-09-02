import express from "express";
import morgan from "morgan";
import bootstrab from "./bootstrab.js";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./src/DB/connection.js";
import mongoose from "mongoose";
import permissionModel from "./src/DB/models/permission.js";
import permissions from "./permissions.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// MongoDB connection event handlers
mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
    console.error('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
});

// Graceful shutdown
process.on('SIGINT', async () => {
    await mongoose.connection.close();
    console.log('Mongoose connection closed due to app termination');
    process.exit(0);
});

// Async function to start the application
async function startApp() {
    try {
        // First, establish database connection
        await connectDB();
        console.log("Database connected");
        
        // Only after DB is connected, start the server
        bootstrab(app);

        // await permissionModel.deleteMany({});
        // await permissionModel.insertMany(permissions);
        // console.log("Permissions inserted");
        
    } catch (error) {
        console.log("Database connection failed:", error.message);
        process.exit(1);
    }
}

// Start the application
await startApp();




