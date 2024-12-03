import { NextFunction, Request, Response } from "express";
import JwtTokenService from "../services/jwt.service";
import User from "../database/models/User";
import { NotFoundException, UnauthorizedException } from "../utils/exception";
import { IUser } from "../interfaces/interface";

declare global {
   namespace Express {
      interface Request {
         authUser: IUser
      }
   }
}

export default async function authMiddleware(
   req: Request,
   res: Response,
   next: NextFunction
) {
   try {
      const token = req.cookies["token"];

      if (token) {
         const tokenVerify = await JwtTokenService.verify(token);
         const user = await User.findOne({
            where: {
               email: tokenVerify,
            },
         });

         if (!user) {
            throw new NotFoundException("User not found!");
         }

         if (user) {
            req.authUser = user;
         }

         next();
      }

      if (!token) {
         throw new UnauthorizedException('No access permission')
      }
   } catch (error) {
      next(error);
   }
}
