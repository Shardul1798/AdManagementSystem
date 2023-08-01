import { NextFunction, Response, Request } from "express";
import { AUTH_TYPE } from "../constants/constants";
import * as jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { redisStorage } from "../utils/redis.utils";
import Session from "../api/sessions/sessions.model";
import { USER_ACCOUNT_STATUS } from "../api/users/user.constants";

dotenv.config();
class APIAuthMiddleware {
  async generateAuthToken(userId: any, sessionId?: any) {
    if (!userId) {
      return Promise.reject("Tokenization Error");
    } else {
      try {
        let data:any = {id: userId};
        if(sessionId) {
          data.sessionId = sessionId;
        }
        const token = await jwt.sign(
          data,
          process.env.SECRET_KEY,
          {
            expiresIn: "24h",
          }
        );
        return { accessToken: token };
      } catch (error) {
        console.log("Tokenization Error", error);
        return Promise.reject("Authentication failed!");
      }
    }
  }

  checkAuthTypeAndValidate = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const authorization = req.headers.authorization;
      if (!authorization) {
        return res.status(401).send("Authentication required");
      }
      const [authType, token] = authorization.split(/\s+/);
      if (!token) {
        return res.status(401).send("Authentication required");
      }
      const result: any =
        authType === AUTH_TYPE.BASIC_AUTH
          ? await this.validateBasicAuth(token)
          : await this.validateBearerAuth(token);
      if (!result) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      if (authType == AUTH_TYPE.BEARER_AUTH) {
        req.body.userId = result.userId;
        req.body.sessionId = result.sessionId;
      }
      next();
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Something went wrong!" });
    }
  };

  validateBasicAuth(token) {
    const credentials = Buffer.from(token, "base64").toString("ascii");
    const [username, password] = credentials.split(":");
    if (
      username == process.env.APP_USERNAME &&
      password == process.env.APP_PASSWORD
    ) {
      return true;
    }
    return false;
  }

  async validateBearerAuth(token) {
    try {
      const authToken = await jwt.verify(token, process.env.SECRET_KEY);
      if (!authToken) {
        return Promise.reject("Invalid Token");
      }
      const findRedisSession = await redisStorage.getKeyFromRedis(
        `${authToken.id}_${authToken.sessionId}}`
      );
      if (!findRedisSession) {
        const sqlSession = await Session.findByPk(authToken.sessionId);
        if (!sqlSession || sqlSession.status == USER_ACCOUNT_STATUS.Inactive) {
          return Promise.reject(false);
        }
        return { userId: authToken.id, sessionId: authToken.sessionId };
      }
      else {
        return { userId: authToken.id, sessionId: authToken.sessionId };
      }
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  }
}

export const apiAuthMiddleware = new APIAuthMiddleware();
