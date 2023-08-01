import { Request, Response } from "express";
import Image from "./images.model";
import { getBuffer } from "../../utils/multer.utils";
import User from "../users/users.model";
import Product from "../products/products.model";
import Category from "../categories/categories.model";

class ImageController {
  async uploadImage(req: any, res: Response) {
    try {
      let findId;
      switch (req.body.type) {
        case "USER":
          findId = await User.findByPk(req.body.foreignId);
          break;
        case "PRODUCT":
          findId = await Product.findByPk(req.body.foreignId);
          break;
        case "CATEGORY":
          findId = await Category.findByPk(req.body.foreignId);
          break;
      }
      if (!findId) {
        const type = req.body.type.toLowerCase();
        return res
          .status(404)
          .json({ message: `${type} does not exist!` });
      }
      if (!req.file) {
        return res.send(500).json({ message: "Please select a file!" });
      }
      const payload = {
        foreignId: req.body.foreignId,
        type: req.body.type,
        media: req.file.buffer,
      };
      const storeImage = await Image.create(payload);
      console.log(storeImage);
      return res.status(200).json({ message: "Image uploaded successfully!" });
    } catch (error) {
      console.log(error);

      return res.status(500).json({ message: "Internal Server Error!" });
    }
  }
}

export const imageController = new ImageController();
