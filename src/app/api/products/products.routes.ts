import { Router } from "express";
import { apiAuthMiddleware } from "../../middlewares/api.middleware";
import { sessionMiddleware } from "../../middlewares/session.middleware";
import { bodyValidator } from "../../middlewares/validator.middleware";
import { productController } from "./products.controller";

class ProductRoutes {
  public router: Router;
  constructor() {
    this.router = Router();
  }

  loadProductRoutes() {
    this.router.get(
      "/list/:page/:limit",
      apiAuthMiddleware.checkAuthTypeAndValidate,
      productController.getProductListing
    );
    this.router.post(
      "/add",
      apiAuthMiddleware.checkAuthTypeAndValidate,
      productController.addNewProduct
    );
    this.router.patch(
      "/update/:id",
      bodyValidator.validateRegisterBody,
      apiAuthMiddleware.checkAuthTypeAndValidate,
      productController.updateProductDetail
    );
    this.router.delete(
      "/delete/:id",
      bodyValidator.validateViewandDeleteProfileParams,
      apiAuthMiddleware.checkAuthTypeAndValidate,
      productController.deleteProduct
    );
    this.router.get(
      "/view/:id",
      apiAuthMiddleware.checkAuthTypeAndValidate,
      productController.viewProductDetails
    );
    return this.router;
  }
}

export const productRoutes = new ProductRoutes();
