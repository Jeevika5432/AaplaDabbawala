import express from "express";
import { orderPayment, verifyPayment } from "../controllers/payment.js";

const router = express.Router();

router.post("/orders", orderPayment);

router.post("/verify", verifyPayment);

export default router;