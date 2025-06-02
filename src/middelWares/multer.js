import multer from 'multer';



    const storage = multer.diskStorage({})
    const fileFilter = function (req, file, cb) {
        
        const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg' , 'image/svg+xml'];
        if (allowedMimeTypes.includes(file.mimetype)) {
            return cb(null, true)
        }
        cb(new Error("file not supported"), 500)
    }

    const upload = multer({ storage, fileFilter })


export default upload;

