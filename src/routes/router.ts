import express from "express";
import userRoutes from "./userRoute";
import authRoute from "./authRoute";
import categoryRoute from "./categoryRoute";

const router = express();

router.use('/', authRoute);
router.use('/user', userRoutes);
router.use('/category', categoryRoute);

export default router;
