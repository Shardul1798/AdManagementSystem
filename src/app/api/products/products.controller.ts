import { Request, Response } from "express";
import Category from "../categories/categories.model";
import Product from "./products.model";

class ProductController {
  async addNewProduct(req: Request, res: Response) {
    try {
      if (!req.body.userId) {
        return res.status(400).json({ message: "Cannot perform operation!" });
      }
      const findCategory = await Category.findByPk(Number(req.body.categoryId));
      console.log(findCategory);
      if (!findCategory) {
        return res.status(400).json({ message: "Invalid Product category!" });
      }
      const addProduct = await Product.create(req.body, {raw:true});
      if (!addProduct) {
        return res.status(400).json({ message: "Something Went Wrong!" });
      }
      return res.status(200).json({
        message: "Added Product Successfully",
        data: addProduct,
      });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error!" });
    }
  }

  async updateProductDetail(req: Request, res: Response) {
    try {
      if (!req.params.id) {
        return res.status(400).json({ message: "Cannot find Product!" });
      }
      const addProduct = await Product.update(req.body, {
        where: { id: req.params.id },
      });
      if (!addProduct) {
        return res.status(400).json({ message: "Something Went Wrong!" });
      }
      return res.status(200).json({
        message: "Added Product Successfully",
        data: { ...addProduct },
      });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error!" });
    }
  }

  async viewProductDetails(req: Request, res: Response) {
    try {
      if (!req.params.id) {
        return res.status(400).json({ message: "Cannot find Product!" });
      }
      const productDetails = await Product.findByPk(req.params.id);
      if (!productDetails) {
        return res.status(500).json({ message: "Something went wrong!" });
      }
      return res
        .status(200)
        .json({ message: "Product Details!", data: productDetails });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error!" });
    }
  }

  async deleteProduct(req: Request, res: Response) {
    try {
      if (!req.params.id) {
        return res.status(400).json({ message: "Cannot find Product!" });
      }
      const findP = await Product.findByPk(req.params.id);
      if(!findP) {
        return res.status(400).json({ message: "Cannot find Product!" });
      }
      const deleteProduct = await Product.destroy({
        where: { id: Number(req.params.id) },
      });
      if (!deleteProduct) {
        return res.status(500).json({ message: "Something went wrong!" });
      }
      return res.status(200).json({ message: "Deleted Product Successfully!" });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error!" });
    }
  }

  async getProductListing(req: Request, res: Response) {
    try {
      const page:number = Number(req.params.page);
      const limit:number = Number(req.params.limit);
      const offset:any = (page - 1) * limit;
      const productList = await Product.findAndCountAll({
        limit,
        offset
      });
      if (!productList) {
        return res.status(500).json({ message: "No products found!" });
      }
      return res.status(200).json({ message: "Product Listing", data: productList });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error!" });
    }
  }
}

export const productController = new ProductController();
