import * as bcrypt from "bcryptjs";


export default class BcryptService {
   public static async hash(password: string): Promise<string> {
      try {
         const saltRounds = Number(process.env.BCRYPT_SALTS) || 10;
         return await bcrypt.hash(password, saltRounds);
      } catch (error) {
         console.error("Error hashing password:", error);
         throw new Error("Could not hash password");
      }
   }

   public static async compare(
      password: string,
      hash: string
   ): Promise<boolean> {
      try {
         return await bcrypt.compare(password, hash);
      } catch (error) {
         console.error("Error comparing password:", error);
         throw new Error("Could not compare passwords");
      }
   }
}