import multer, { memoryStorage } from "multer";

const storage = memoryStorage()

const fileFilter = (req, file, cb) => {
    if((file.mimetype).includes('jpeg') || (file.mimetype).includes('png') || (file.mimetype).includes('jpg')){
        cb(null, true);
    } else{
        cb(null, false);

    }

};

const upload = multer({storage: storage, fileFilter: fileFilter})

export default upload

