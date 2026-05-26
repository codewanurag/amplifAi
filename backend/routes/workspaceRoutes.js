import { Router } from "express";
import { createWorkspace, getWorkspace, listWorkspaces, switchWorkspace, updateWorkspace } from "../controllers/workspaceController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = Router();
router.use(protect);
router.route("/").get(listWorkspaces).post(createWorkspace);
router.post("/:id/switch", switchWorkspace);
router.route("/:id").get(getWorkspace).patch(updateWorkspace);

export default router;
