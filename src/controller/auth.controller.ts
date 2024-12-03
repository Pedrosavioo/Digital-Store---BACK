import { NextFunction, Request, Response } from "express";
import AuthService from "../services/auth.service";
import { z } from "zod";
import { password } from "../database/config/database";
import HttpResponse from "../utils/httpResponse";

class AuthController {
   private service;

   constructor() {
      this.service = new AuthService();
   }

   public async login(req: Request, res: Response, next: NextFunction) {
      try {
         const { email, password } = req.body;

         this.validate({ email, password });

         const token = await this.service.login(email, password);

         res.cookie("token", token);

         const response = new HttpResponse({
            status: 200,
            message: "login successful",
         });

         res.status(200).json(response);
      } catch (error) {
         next(error);
      }
   }

   public async logout(req: Request, res: Response, next: NextFunction) {
      try {
         const authuser = req.authUser;

         res.clearCookie("token");

         res.status(200).json({ statusCode: 200, message: "logout successful" });
      } catch (error) {
         next(error);
      }
   }

   private validate(data: any) {
      const schema = z.object({
         email: z
            .string({ message: "email required" })
            .email({ message: "Invalid email" }),
         password: z
            .string({ message: "password required" })
            .min(8, { message: "minimum 8 characters in password" }),
      });

      schema.parse(data);
   }
}

export default AuthController;
