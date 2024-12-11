import { Router } from "express";
import UserController from "../controller/user.controller";
import authMiddleware from "../middlewares/authMiddleware";

const userRoutes = Router();

const user = new UserController();

userRoutes.get("/:id", authMiddleware,user.getMyUser.bind(user));
userRoutes.post("/", user.create.bind(user));
userRoutes.put("/:id", authMiddleware,user.update.bind(user));
userRoutes.delete("/:id", authMiddleware, user.delete.bind(user));

export default userRoutes;
