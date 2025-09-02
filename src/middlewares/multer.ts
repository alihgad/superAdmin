import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from "dotenv"
dotenv.config()

cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret,
});


export const cloudinaryUpload = cloudinary;


const storage = multer.diskStorage({})


export const upload = multer({ storage })


export default upload;

