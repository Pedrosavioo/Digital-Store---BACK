import express from "express";
import userRoutes from "./userRoute";
import authRoute from "./authRoute";

const router = express();

router.use('/', authRoute);
router.use('/user', userRoutes);

export default router;
