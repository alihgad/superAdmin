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




let fileName = (req, file, cb) => {
    // Generate unique filename with timestamp
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 8);
    
    // Extract file extension
    const fileExtension = file.originalname.split('.').pop();
    
    // If no extension found, add a default one based on mimetype
    let finalName = file.originalname;
    if (!fileExtension || file.originalname.lastIndexOf('.') === 0) {
        const mimeToExt = {
            'image/jpeg': 'jpg',
            'image/jpg': 'jpg',
            'image/png': 'png',
            'image/gif': 'gif',
            'image/webp': 'webp',
            'image/svg+xml': 'svg',
            'video/mp4': 'mp4',
            'video/avi': 'avi',
            'video/mov': 'mov',
            'video/wmv': 'wmv',
            'video/flv': 'flv',
            'video/webm': 'webm'
        };
        
        const extension = mimeToExt[file.mimetype] || 'bin';
        finalName = `${file.originalname}.${extension}`;
    }
    
    // Add timestamp and random string to make filename unique
    const nameWithoutExt = finalName.replace(/\.[^/.]+$/, "");
    const ext = finalName.split('.').pop();
    const uniqueName = `${nameWithoutExt}_${timestamp}_${randomString}.${ext}`;
    
    cb(null, uniqueName)
}

const storage = multer.diskStorage({
    filename: fileName
})


export const upload = multer({ storage })


export default upload;

