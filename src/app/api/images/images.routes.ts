import { Router } from "express";
import { apiAuthMiddleware } from "../../middlewares/api.middleware";
import { imageController } from "./images.controller";
import multer from "multer";
import { getBuffer } from "../../utils/multer.utils";

//This is the multer configuration to upload a file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `src/public/uploads/images`); // Specify the directory where you want to store uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Generate a unique filename for the uploaded file
  },
});
const upload = multer({ storage: storage });

class ImageRoutes {
  public router: Router;
  constructor() {
    this.router = Router();
  }

  loadImageRoutes() {
    this.router.post(
      "/upload",
      apiAuthMiddleware.checkAuthTypeAndValidate,
      // upload.single('media'),
      getBuffer.single('media'),
      imageController.uploadImage
    );
    
    return this.router;
  }
}

export const imageRoutes = new ImageRoutes();
