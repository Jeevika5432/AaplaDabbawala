import express from "express";
import { orderPayment, verifyPayment, verifyPremiumPayment } from "../controllers/payment.js";

const router = express.Router();

router.post("/orders", orderPayment);

router.post("/verify", verifyPayment);

router.post("/verifyPremium", verifyPremiumPayment);

export default router;