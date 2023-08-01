import * as jwt from "jsonwebtoken"
import dotenv from "dotenv";

dotenv.config();
class UserService {
    async verifyToken(token) {
        if(!token) {
            return Promise.reject("Please provide token");
        }
        const decodeToken = jwt.verify(token, process.env.SECRET_KEY);
        console.log(decodeToken);
        
        if(!decodeToken) {
            return Promise.reject("Expired Token");
        }
        return Promise.resolve(decodeToken);
    }
}

export const userService = new UserService();