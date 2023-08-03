import { Request, Response } from "express";
import User from "./users.model";
import bcrypt from "bcrypt";
import Session from "../sessions/sessions.model";
import { apiAuthMiddleware } from "../../middlewares/api.middleware";
import { USER_ACCOUNT_STATUS } from "./user.constants";
import { Op } from "sequelize";
import { redisStorage } from "../../utils/redis.utils";
import Product from "../products/products.model";
import { mailerConf, transporter } from "../../utils/nodemailer.utils";
import { userService } from "./users.service";

class UserController {
  async forgotPassword(req: Request, res: Response) {
    try {
      const { email } = req.body;
      const result: any = await User.findOne({ where: { email: email } });
      const rawData = result.get();
      console.log(rawData);
      if (!result) {
        return res.status(404).json({ message: "User Not Found!" });
      }

      const resp: any = await apiAuthMiddleware.generateAuthToken(rawData.id);
      console.log(resp);

      const link = `https://localhost:3000/reset-password/${resp.accessToken}`;
      const configureMail = mailerConf.setMailOptions(email, link);
      transporter.sendMail(configureMail, (error, info) => {
        if (error) {
          console.error("Error sending email:", error);
          return res.status(200).json({ message: "Error sending email!" });
        } else {
          console.log("Email sent:", info.response);
          return res
            .status(200)
            .json({ message: "Email to reset password sent successfully." });
        }
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error!" });
    }
  }

  async resetPassword(req: Request, res: Response) {
    try {
      const token = req.body.token;
      const response: any = await userService.verifyToken(token);
      if (!response) {
        return res.status(401).json({ message: "Expired token!" });
      }
      console.log(Number(response.id));
      
      const result: any = await User.findOne({ where: { id: Number(response.id) } });
      if (!result) {
        return res.status(404).json({ message: "User Not Found!" });
      }
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const payload = { password: hashedPassword };
      const changePassword: any = await User.update(payload, {
        where: { id: Number(response.id) },
      });
      if(!changePassword) {
        return res.status(203).json({ message: "Something went wrong!" });
      }
      return res.status(200).json({mesage: "Password Changed Successfully!"});
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error!" });
    }
  }

  async loginHandler(req: Request, res: Response) {
    try {
      const { username, password } = req.body;
      const result = await User.findOne({
        where: { username: username },
        raw: true,
      });
      if (!result) {
        return res
          .status(200)
          .json({ message: "Invalid username or password" });
      }
      const matchPassword = bcrypt.compare(password, result.password);
      if (matchPassword) {
        const expiryTime = Date.now() + 60 * 60 * 24;
        const sessionCreate: any = await Session.create({
          userId: result.id,
          expiresIn: expiryTime.toString(),
          deviceType: req.body.deviceType,
          status: USER_ACCOUNT_STATUS.Active,
        });
        console.log(sessionCreate);

        const resp: any = await apiAuthMiddleware.generateAuthToken(
          result.id,
          sessionCreate.id
        );
        const key = `${result.id}_${sessionCreate.id}}`;
        const value = {
          userId: result.id,
          expiryTime: expiryTime,
          status: USER_ACCOUNT_STATUS.Active,
          sessionId: sessionCreate._id,
        };
        const createRedisSession = await redisStorage.insertKeyInRedis(
          key,
          value
        );
        if (!createRedisSession) {
          return res.status(203).json({ message: "Something went wrong!" });
        }
        return res.json({
          statusCode: 200,
          message: "Login successful",
          data: { token: resp.accessToken },
        });
      }
    } catch (error) {
      console.log(error);

      res.status(500).json({ message: "Internal Server Error!" });
    }
  }

  async SignupNewUser(req: Request, res: Response) {
    try {
      const payload: any = {
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone,
        status: USER_ACCOUNT_STATUS.Active,
        gender: req.body.gender,
        dob: req.body.dob,
      };
      const findUser = await User.findOne({
        where: {
          [Op.or]: [
            { username: payload.username },
            { email: payload.email },
            { phone: payload.phone },
          ],
        },
      });

      if (findUser) {
        return res.status(200).json({ message: "User already exist" });
      }
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      if (!hashedPassword) {
        return res.status(500).json({ message: "Something went wrong!" });
      }
      payload.password = hashedPassword;
      const result = await User.create(payload);
      if (result) {
        return res.status(200).json({ message: "Created Successfully" });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error!" });
    }
  }

  async logoutHandler(req: Request, res: Response) {
    try {
      const { id, sessionId } = req.body;
      const session = await Session.findByPk(sessionId);
      if (session && session.status) {
        const result = Session.update(
          { status: USER_ACCOUNT_STATUS.Inactive },
          { where: { id: sessionId } }
        );
        const redisSession = redisStorage.deleteKeyFromRedis(
          `${req.body.id}_${req.body.sessionId}}`
        );
        if (redisSession && result) {
          return res.status(200).json({ message: "Logged out successfully!" });
        }
      } else {
        return res.status(200).json({ message: "Session already Expired" });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error!" });
    }
  }

  async viewUserProfile(req: Request, res: Response) {
    try {
      const userId = req.params.id;
      const userDetails = await User.findOne({
        attributes: [
          "id",
          "firstName",
          "lastName",
          "email",
          "username",
          "dob",
          "gender",
          "status",
        ],
        where: { id: userId },
      });
      if (!userDetails) {
        return res.status(404).json({ message: "User not found!" });
      }
      return res
        .status(200)
        .json({ message: "User Details", data: userDetails });
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error!" });
    }
  }

  async deleteUserProfile(req: Request, res: Response) {
    try {
      if (req.body.userId != req.params.id) {
        return res.status(400).json({ message: "Invalid UserId" });
      }

      const deleteUser = await User.destroy({
        where: { id: Number(req.params.id) },
      });
      if (!deleteUser) {
        return res.status(500).json({ message: "Something went wrong!" });
      }
      const deleteUserProducts = await Product.destroy({
        where: { id: req.params.id },
      });
      return res
        .status(200)
        .json({ message: "Deleted User Account Successfully!" });
    } catch (error) {
      console.log(error);

      return res.status(500).json({ message: "Internal Server Error!" });
    }
  }

  async updateUserProfile(req: Request, res: Response) {
    try {
      if (req.body.userId != req.params.id) {
        return res.status(400).json({ message: "Invalid UserId" });
      }
      const updateUser = await User.update(req.body, {
        where: { id: req.body.id },
      });
      if (!updateUser) {
        return res.status(500).json({ message: "Something went wrong!" });
      }
      return res.status(200).json({
        message: "Account info Updated Successfully!",
        data: { ...updateUser },
      });
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error!" });
    }
  }

  async bidUserProduct(req: Request, res: Response) {
    try {
      const checkUser = await User.findByPk(req.params.userId);
      const checkProduct = await Product.findByPk(req.params.productId);
      if (!checkUser) {
        return res.status(404).json({ message: "User not found!" });
      }
      if (!checkProduct) {
        return res.status(404).json({ message: "Product not found!" });
      }
      if (req.params.userId == req.body.userId) {
        return res.status(401).json({ message: "You can bid your product!" });
      }
      if (req.body.bidPrice > checkProduct.basePrice) {
        if (
          checkProduct.bidding &&
          req.body.bidPrice > checkProduct.bidding + 50
        ) {
          return res.status(401).json({
            message: `You can't bid more than ${checkProduct.bidding + 50}`,
          });
        } else if (req.body.bidPrice > checkProduct.basePrice + 50) {
          return res.status(401).json({
            message: `You can't bid more than ${checkProduct.basePrice + 50}`,
          });
        }
      }
      const updatedPayload: any = {
        bidderId: req.params.userId,
        bidding: req.body.bidAmount,
      };
      const result = await Product.update(updatedPayload, {
        where: { id: req.params.productId },
      });
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error!" });
    }
  }
}

export const userController = new UserController();
