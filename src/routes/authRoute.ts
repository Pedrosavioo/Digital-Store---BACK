import { Router } from "express";
import AuthController from "../controller/auth.controller";
import authMiddleware from "../middlewares/authMiddleware";

const auth = new AuthController();

const authRoute = Router();

authRoute.post("/login", auth.login.bind(auth));
authRoute.delete("/logout", authMiddleware, auth.logout.bind(auth));

export default authRoute;
