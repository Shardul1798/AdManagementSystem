import { Router } from "express";
import { apiAuthMiddleware } from "../../middlewares/api.middleware";
import { sessionMiddleware } from "../../middlewares/session.middleware";
import { bodyValidator } from "../../middlewares/validator.middleware";
import { addressController } from "./address.controller";

class AddressRoutes {
  public router: Router;
  constructor() {
    this.router = Router();
  }

  loadAddressRoutes() {
    this.router.post(
      "/add",
      bodyValidator.validateAddressBody,
      apiAuthMiddleware.checkAuthTypeAndValidate,
      addressController.addUserAddress
    );
    this.router.post(
      "/update",
      bodyValidator.validateAddressBody,
      apiAuthMiddleware.checkAuthTypeAndValidate,
      addressController.updateUserAddress
    );
    return this.router;
  }
}

export const addressRoutes = new AddressRoutes();
