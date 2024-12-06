import express from "express";
import userRoutes from "./userRoute";
import authRoute from "./authRoute";
import categoryRoute from "./categoryRoute";
import productRoute from "./productRoute";

const router = express();

router.use("/", authRoute);
router.use("/user", userRoutes);
router.use("/category", categoryRoute);
router.use("/product", productRoute);

export default router;
