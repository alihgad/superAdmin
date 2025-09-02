import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db/connection";
import mongoose from "mongoose";

import permissionModel from "./db/models/permission";
import bootstrap from "./core/bootstrap";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

mongoose.connection.on("connected", () => {
  console.log("Mongoose connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.error("Mongoose connection error:", err);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose disconnected");
});

process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.log("Mongoose connection closed due to app termination");
  process.exit(0);
});

async function startApp() {
  try {
    await connectDB();
    console.log("Database connected");

    bootstrap(app);

    // await permissionModel.deleteMany({});
    // await permissionModel.insertMany(permissions);
    // console.log("Permissions inserted");
  } catch (error) {
    console.log("Database connection failed:", (error as Error).message);
    process.exit(1);
  }
}

startApp();
