import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

console.log(process.env.MONGO_URL);


const connectDB = async () => {
    await mongoose.connect(process.env.MONGO_URL || "mongodb://localhost:27017/superadmin");
}

export default connectDB;