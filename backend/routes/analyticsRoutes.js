import { Router } from "express";
import { activities, analytics, dashboard } from "../controllers/analyticsController.js";
import { protect } from "../middleware/authMiddleware.js";
import { allowRoles } from "../middleware/roleMiddleware.js";

const router = Router();
router.use(protect);
router.get("/dashboard", dashboard);
router.get("/", analytics);
router.get("/activity", activities);
router.get("/admin/activity", allowRoles("admin"), activities);

export default router;
