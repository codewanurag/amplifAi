import Workspace from "../models/Workspace.js";
import { ApiError } from "./errorMiddleware.js";

export async function getAllowedWorkspace(user, workspaceId) {
  const targetId = workspaceId || user.currentWorkspace;
  if (!targetId) throw new ApiError(400, "Select or create a workspace first.");
  const workspace = await Workspace.findOne({
    _id: targetId,
    $or: [{ owner: user._id }, { "members.user": user._id }],
  });
  if (!workspace) throw new ApiError(403, "This workspace is not available to your account.");
  return workspace;
}
