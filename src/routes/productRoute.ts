import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware";
import ProductController from "../controller/product.controller";

const product = new ProductController();

const productRoute = Router();

productRoute.get("/search", product.getProducts.bind(product));
productRoute.get("/:id", authMiddleware, product.getproductID.bind(product));
productRoute.post("/", authMiddleware, product.create.bind(product));
productRoute.put("/:id", authMiddleware, product.update.bind(product));
productRoute.delete("/:id", authMiddleware, product.delete.bind(product));

export default productRoute;
