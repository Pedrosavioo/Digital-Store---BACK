import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import {
   PasswordMismatchException,
   UnauthorizedException,
} from "../utils/exception";
import UserServices from "../services/user.service";
import { schema } from "../database/config/database";
import JwtTokenService from "../services/jwt.service";
import { IUser } from "../interfaces/interface";

interface IUserBody extends IUser {
   confirmPassword: string;
}

class UserController {
   private service;

   constructor() {
      this.service = new UserServices();
   }

   public async create(req: Request, res: Response, next: NextFunction) {
      try {
         const data_user: IUserBody = req.body;

         this.validateUserInfo(data_user);

         if (data_user.password !== data_user.confirmPassword) {
            throw new PasswordMismatchException(
               "The password and confirmation do not match. Please check and try again."
            );
         }

         const user: IUser = {
            firstname: data_user.firstname,
            surname: data_user.surname,
            email: data_user.email,
            password: data_user.password,
         };

         const response = await this.service.postUser(user);

         res.status(201).json(response);
      } catch (error) {
         console.log(error);
         next(error);
      }
   }

   public async getMyUser(req: Request, res: Response, next: NextFunction) {
      try {
         const userID = Number(req.params.id);

         if (userID !== req.authUser.id) {
            throw new UnauthorizedException("No access permission");
         }

         const response = await this.service.getMyUser(userID);

         res.status(200).json(response);
      } catch (error) {
         next(error);
      }
   }

   public async update(req: Request, res: Response, next: NextFunction) {
      try {
         const authUser = req.authUser;

         const bodyInfo = req.body;

         const userID = Number(req.params.id);

         if (userID !== req.authUser.id) {
            throw new UnauthorizedException("No access permission");
         }

         this.validateUserInfo(bodyInfo, true);

         const userInfo: IUser = {
            id: authUser.id,
            firstname: bodyInfo.firstname || authUser.firstname,
            surname: bodyInfo.surname || authUser.surname,
            email: bodyInfo.email || authUser.email,
            password: bodyInfo.password || authUser.password,
         };

         const response = await this.service.update(userInfo);

         // atualizar cookie do usuário em caso de atualização do email
         if (bodyInfo.email) {
            res.cookie("token", await JwtTokenService.create(userInfo.email));
         }

         res.status(200).json(response);
      } catch (error) {
         next(error);
      }
   }

   public async delete(req: Request, res: Response, next: NextFunction) {
      try {
         const authUser = req.authUser;
         const id = Number(req.params.id);

         await this.service.deleteUser(authUser, id);

         res.status(204).send("");
      } catch (error) {
         console.log(error);
         next(error);
      }
   }

   private validateUserInfo(user: IUserBody, partial?: true) {
      const UserSchema = z.object({
         firstname: z
            .string()
            .min(3, { message: "minimum 3 characters in firstname" }),
         surname: z
            .string()
            .min(3, { message: "minimum 3 characters in surname" }),
         email: z.string().email({ message: "Invalid email address" }),
         password: z
            .string()
            .min(8, { message: "minimum 8 characters in password" }),
         confirmPassword: z.string(),
      });

      if (!partial) {
         UserSchema.parse(user);
      }

      if (partial) {
         const partialUserSchema = UserSchema.partial();
         partialUserSchema.parse(user);
      }
   }
}

export default UserController;
