import { Router } from "express";
import { bestTime, captions, contentScore, hashtags, ideas, improve, repurpose, scripts, trends } from "../controllers/aiController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = Router();
router.use(protect);
router.post("/captions", captions);
router.post("/hashtags", hashtags);
router.post("/ideas", ideas);
router.post("/scripts", scripts);
router.post("/repurpose", repurpose);
router.post("/improve", improve);
router.post("/score", contentScore);
router.post("/best-time", bestTime);
router.post("/trends", trends);

export default router;
