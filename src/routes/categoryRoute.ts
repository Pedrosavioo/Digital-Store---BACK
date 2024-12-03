import { Router } from "express";
import CategoryController from "../controller/category.controller";
import authMiddleware from "../middlewares/authMiddleware";

const category = new CategoryController();

const categoryRoute = Router();

categoryRoute.get("/search",authMiddleware, category.getCategories.bind(category));
categoryRoute.get("/:id", authMiddleware, category.getCategoryID.bind(category));
categoryRoute.post("/", authMiddleware, category.create.bind(category));
categoryRoute.put("/:id", authMiddleware, category.update.bind(category));
categoryRoute.delete("/:id", authMiddleware, category.delete.bind(category));

export default categoryRoute;
