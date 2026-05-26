import { Router } from "express";
import { calendar, createPost, deletePost, getPost, listPosts, schedulePost, updatePost } from "../controllers/postController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = Router();
router.use(protect);
router.get("/calendar", calendar);
router.route("/").get(listPosts).post(createPost);
router.patch("/:id/schedule", schedulePost);
router.route("/:id").get(getPost).patch(updatePost).delete(deletePost);

export default router;
