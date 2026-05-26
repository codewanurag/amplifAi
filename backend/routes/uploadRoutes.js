import { Router } from "express";
import multer from "multer";
import { uploadMedia } from "../controllers/uploadController.js";
import { protect } from "../middleware/authMiddleware.js";
import { ApiError } from "../middleware/errorMiddleware.js";

const router = Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 25 * 1024 * 1024 },
  fileFilter(req, file, callback) {
    void req;
    if (!file.mimetype.startsWith("image/") && !file.mimetype.startsWith("video/")) {
      callback(new ApiError(422, "Only image and video files are accepted."));
      return;
    }
    callback(null, true);
  },
});

router.post("/", protect, upload.single("media"), uploadMedia);

export default router;
