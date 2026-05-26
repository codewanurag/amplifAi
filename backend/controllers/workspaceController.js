import User from "../models/User.js";
import Workspace from "../models/Workspace.js";
import Subscription from "../models/Subscription.js";
import { ApiError } from "../middleware/errorMiddleware.js";
import { getAllowedWorkspace } from "../middleware/workspaceAccess.js";
import { ok } from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { recordActivity } from "../utils/activity.js";

export const listWorkspaces = asyncHandler(async (req, res) => {
  const workspaces = await Workspace.find({ $or: [{ owner: req.user._id }, { "members.user": req.user._id }] }).sort("-createdAt");
  ok(res, workspaces);
});

export const createWorkspace = asyncHandler(async (req, res) => {
  if (!req.body.name?.trim()) throw new ApiError(422, "Workspace name is required.");
  const workspace = await Workspace.create({ name: req.body.name.trim(), owner: req.user._id, members: [{ user: req.user._id, role: "owner" }] });
  await Subscription.create({ workspace: workspace._id, user: req.user._id, plan: "Free" });
  await recordActivity({ user: req.user._id, workspace: workspace._id, action: "create", entityType: "workspace", entityId: workspace._id, description: "Created workspace" });
  ok(res, workspace, "Workspace created.", 201);
});

export const getWorkspace = asyncHandler(async (req, res) => {
  ok(res, await getAllowedWorkspace(req.user, req.params.id));
});

export const updateWorkspace = asyncHandler(async (req, res) => {
  const workspace = await getAllowedWorkspace(req.user, req.params.id);
  if (!workspace.owner.equals(req.user._id) && req.user.role !== "admin") throw new ApiError(403, "Only workspace owners can change settings.");
  if (req.body.name) workspace.name = req.body.name.trim();
  if (req.body.settings) workspace.settings = { ...workspace.settings.toObject(), ...req.body.settings };
  await workspace.save();
  await recordActivity({ user: req.user._id, workspace: workspace._id, action: "update", entityType: "workspace", entityId: workspace._id, description: "Updated workspace settings" });
  ok(res, workspace, "Workspace saved.");
});

export const switchWorkspace = asyncHandler(async (req, res) => {
  const workspace = await getAllowedWorkspace(req.user, req.params.id);
  await User.findByIdAndUpdate(req.user._id, { currentWorkspace: workspace._id });
  ok(res, workspace, "Workspace switched.");
});
