import jwt from "jsonwebtoken";
import dotenv from "dotenv";

class JwtTokenService {
   public static async verify(token: string) {
      if (process.env.JWT_SECRET) {
         return await jwt.verify(token, process.env.JWT_SECRET);
      } else {
         console.log("dotenv problem");
      }
   }

   public static async create(email: string) {
      if (process.env.JWT_SECRET) {
         return await jwt.sign(email, process.env.JWT_SECRET);
      }
   }
}

export default JwtTokenService;
