import { NextFunction, Response, Request } from "express";
import Session from "../api/sessions/sessions.model";
import { USER_ACCOUNT_STATUS } from "../api/users/user.constants";
import { redisStorage } from "../utils/redis.utils";

class SessionMiddleware {
  async checkUserSession(req: Request, res: Response, next: NextFunction) {
    try {
      // const redisSession = JSON.parse(
      //   await redisStorage.getKeyFromRedis(req.body.userId)
      // );
      // if (redisSession && redisSession.status == USER_ACCOUNT_STATUS.Active) {
      //   next();
      // 
      console.log(req.body);
      
      const sessionSql = await Session.findByPk(req.body.sessionId);
      console.log(sessionSql);
      
      if (!sessionSql || sessionSql.status == USER_ACCOUNT_STATUS.Inactive) {
        return res.status(401).json({ message: "Session Expired" });
      }
      next();
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Something went wrong!" });
    }
  }
}

export const sessionMiddleware = new SessionMiddleware();
