import User from "../database/models/User";
import {
   EmailOrPasswordIncorrectException,
   NotFoundException,
} from "../utils/exception";
import HttpResponse from "../utils/httpResponse";
import BcryptService from "./bcrypt.service";
import JwtTokenService from "./jwt.service";

class AuthService {
   private Bcrypt;
   private JWT;

   constructor() {
      this.Bcrypt = BcryptService;
      this.JWT = JwtTokenService;
   }

   public async login(email: string, password: string) {
      try {
         const user = await User.findOne({
            where: {
               email: email,
            },
         });

         if (!user) {
            throw new NotFoundException(
               "User with the provided email not found"
            );
         }

         if (!this.Bcrypt.compare(password, user.password)) {
            throw new EmailOrPasswordIncorrectException(
               "Incorrect email or password"
            );
         }

         return await this.JWT.create(user.email);
      } catch (error) {
         throw error;
      }
   }
}

export default AuthService;
