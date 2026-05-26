import { Router } from "express";
import { changePassword, login, logout, me, requestPasswordReset, signup, updateProfile } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/forgot-password", requestPasswordReset);
router.post("/logout", protect, logout);
router.get("/me", protect, me);
router.patch("/profile", protect, updateProfile);
router.patch("/password", protect, changePassword);

export default router;
