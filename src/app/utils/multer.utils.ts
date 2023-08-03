import multer from "multer";

const storageBuffer = multer.memoryStorage()
export const getBuffer= multer({ storage: storageBuffer })