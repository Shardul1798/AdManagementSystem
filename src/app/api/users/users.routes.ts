import { Router } from "express";
import { apiAuthMiddleware } from "../../middlewares/api.middleware";
import { sessionMiddleware } from "../../middlewares/session.middleware";
import { bodyValidator } from "../../middlewares/validator.middleware";
import { userController } from "./users.controller";

class UserRoutes {
  public router: Router;
  constructor() {
    this.router = Router();
  }

  loadUserRoutes() {
    this.router.post(
      "/login",
      bodyValidator.validateLoginBody,
      apiAuthMiddleware.checkAuthTypeAndValidate,
      userController.loginHandler
    );
    this.router.post(
      "/signup",
      bodyValidator.validateRegisterBody,
      apiAuthMiddleware.checkAuthTypeAndValidate,
      userController.SignupNewUser
    );
    this.router.get(
      "/view-profile/:id",
      bodyValidator.validateViewandDeleteProfileParams,
      apiAuthMiddleware.checkAuthTypeAndValidate,
      userController.viewUserProfile
    );
    this.router.get(
      "/logout",
      apiAuthMiddleware.checkAuthTypeAndValidate,
      sessionMiddleware.checkUserSession,
      userController.logoutHandler
    );
    this.router.delete(
      "/remove/:id",
      bodyValidator.validateViewandDeleteProfileParams,
      apiAuthMiddleware.checkAuthTypeAndValidate,
      userController.deleteUserProfile
    );
    this.router.patch(
      "/update",
      bodyValidator.validateRegisterBody,
      apiAuthMiddleware.checkAuthTypeAndValidate,
      userController.updateUserProfile
    );
    this.router.patch(
      "/bid/:userId/:productId",
      bodyValidator.validateBidParamAndBody,
      apiAuthMiddleware.checkAuthTypeAndValidate,
      userController.bidUserProduct
    );
    this.router.post(
      "/forgot-password",
      bodyValidator.validateForgotBody,
      apiAuthMiddleware.checkAuthTypeAndValidate,
      userController.forgotPassword
    );
    this.router.post(
      "/reset-password",
      bodyValidator.validateResetBody,
      apiAuthMiddleware.checkAuthTypeAndValidate,
      userController.resetPassword
    )
    return this.router;
  }
}

export const userRoutes = new UserRoutes();
