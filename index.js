import express from "express";
import morgan from "morgan";
import bootstrab from "./bootstrab.js";
import dotenv from "dotenv";

import connectDB from "./src/DB/connection.js";

dotenv.config();


const app = express();
app.use(express.json());
app.use(morgan('dev'));


bootstrab(app);
connectDB().then(() => {
    console.log("Database connected");
}).catch((error) => {
    console.log(error.message);
})




