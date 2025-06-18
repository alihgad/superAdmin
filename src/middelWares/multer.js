import multer from 'multer';



    const storage = multer.diskStorage({})
    const fileFilter = function (req, file, cb) {
        
        const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg' , 'image/svg+xml', "video/mp4", "video/webm", "video/ogg", "video/3gpp", "video/3gpp2", "video/3gpp-tt"];
        if (allowedMimeTypes.includes(file.mimetype)) {
            return cb(null, true)
        }
        cb(new Error("file not supported"), 500)
    }

    export const upload = multer({ storage, fileFilter })


export default upload;

