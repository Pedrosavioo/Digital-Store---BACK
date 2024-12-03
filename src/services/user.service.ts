import { CreationAttributes } from "sequelize";
import User from "../database/models/User";
import HttpResponse from "../utils/httpResponse";
import BcryptService from "./bcrypt.service";
import { NotFoundException } from "../utils/exception";
import { response } from "express";
import { IUser } from "../interfaces/interface";

class UserServices {
   private Bcrypt;

   constructor() {
      this.Bcrypt = BcryptService;
   }

   public async getMyUser(userID: number) {
      try {
         const user = await User.findOne({
            where: {
               id: userID,
            },
         });

         if (!user) {
            throw new NotFoundException("User not found");
         }

         const response = new HttpResponse({
            status: 200,
            data: {
               id: user.id,
               firstname: user.firstname,
               surname: user.surname,
               email: user.email,
            },
         });

         return response;
      } catch (error) {
         throw error;
      }
   }

   public async postUser(new_user: IUser) {
      try {
         const pass_hash = await this.Bcrypt.hash(new_user.password);

         new_user.password = pass_hash;

         const user = await User.create({
            firstname: new_user.firstname,
            surname: new_user.surname,
            email: new_user.email,
            password: new_user.password,
         });

         const httpResponse = new HttpResponse({
            status: 201,
            data: {
               firstname: user.firstname,
               surname: user.surname,
               email: user.email,
               password: user.password,
            },
            message: "User created seccess!",
         });

         return httpResponse;
      } catch (error) {
         console.log(error);

         throw error;
      }
   }

   public async update(userData: IUser) {
      try {
         const user = await User.findOne({
            where: {
               id: userData.id,
            },
         });

         if (!user) {
            throw new NotFoundException("User not found");
         }

         const comparePassword = await this.Bcrypt.compare(
            userData.password,
            user.password
         );

         if (!comparePassword) {
            user.password = await this.Bcrypt.hash(userData.password);
         }

         const [affectedRows] = await User.update(
            { ...userData },
            {
               where: { id: userData.id },
               returning: true,
            }
         );

         console.log(`rows affected: ${affectedRows}`);

         // Recupera o usuário atualizado
         const updatedUser = await User.findOne({
            where: { id: userData.id },
         });

         const response = new HttpResponse({
            status: 200,
            data: updatedUser as IUser,
            message: "user updated successfully!",
         });

         return response;
      } catch (error) {
         throw error;
      }
   }

   public async deleteUser(email: string) {
      try {
         const NumberUsersDeleted = await User.destroy({
            where: {
               email: email,
            },
         });

         if (NumberUsersDeleted === 0) {
            throw new NotFoundException("Error deleting user, User not found");
         }
      } catch (error) {
         throw error;
      }
   }
}

export default UserServices;
