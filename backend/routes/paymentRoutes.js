import { Router } from "express";
import { createOrder, getSubscription, verifyPayment } from "../controllers/paymentController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = Router();
router.use(protect);
router.get("/subscription", getSubscription);
router.post("/orders", createOrder);
router.post("/verify", verifyPayment);

export default router;
