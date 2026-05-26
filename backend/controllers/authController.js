import User from "../models/User.js";
import Workspace from "../models/Workspace.js";
import Subscription from "../models/Subscription.js";
import asyncHandler from "../utils/asyncHandler.js";
import generateToken from "../utils/generateToken.js";
import { ok } from "../utils/apiResponse.js";
import { ApiError } from "../middleware/errorMiddleware.js";
import { recordActivity } from "../utils/activity.js";

function publicUser(user) {
  return { id: user._id, name: user.name, email: user.email, role: user.role, avatarUrl: user.avatarUrl, currentWorkspace: user.currentWorkspace };
}

function requireCredentials({ name, email, password }) {
  if (!name?.trim() || !email?.trim() || !password) throw new ApiError(422, "Name, email, and password are required.");
  if (password.length < 8) throw new ApiError(422, "Password must contain at least 8 characters.");
}

export const signup = asyncHandler(async (req, res) => {
  requireCredentials(req.body);
  const email = req.body.email.trim().toLowerCase();
  if (await User.exists({ email })) throw new ApiError(409, "An account with this email already exists.");

  const user = await User.create({ name: req.body.name.trim(), email, password: req.body.password, role: "creator" });
  const workspace = await Workspace.create({
    name: req.body.workspaceName?.trim() || `${user.name.split(" ")[0]}'s Studio`,
    owner: user._id,
    members: [{ user: user._id, role: "owner" }],
  });
  user.currentWorkspace = workspace._id;
  await user.save();
  await Subscription.create({ workspace: workspace._id, user: user._id, plan: "Free" });
  await recordActivity({ user: user._id, workspace: workspace._id, action: "signup", entityType: "workspace", entityId: workspace._id, description: "Workspace created" });
  ok(res, { token: generateToken(user), user: publicUser(user), workspace }, "Account created.", 201);
});

export const login = asyncHandler(async (req, res) => {
  const email = req.body.email?.trim().toLowerCase();
  if (!email || !req.body.password) throw new ApiError(422, "Email and password are required.");
  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.comparePassword(req.body.password))) throw new ApiError(401, "Invalid email or password.");
  const workspace = user.currentWorkspace ? await Workspace.findById(user.currentWorkspace) : null;
  ok(res, { token: generateToken(user), user: publicUser(user), workspace }, "Logged in.");
});

export const logout = asyncHandler(async (req, res) => {
  ok(res, null, "Logged out.");
});

export const me = asyncHandler(async (req, res) => {
  const workspace = req.user.currentWorkspace ? await Workspace.findById(req.user.currentWorkspace) : null;
  ok(res, { user: publicUser(req.user), workspace });
});

export const updateProfile = asyncHandler(async (req, res) => {
  if (req.body.name) req.user.name = req.body.name.trim();
  if (req.body.avatarUrl !== undefined) req.user.avatarUrl = req.body.avatarUrl;
  await req.user.save();
  ok(res, publicUser(req.user), "Profile updated.");
});

export const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  if (!newPassword || newPassword.length < 8) throw new ApiError(422, "New password must contain at least 8 characters.");
  const user = await User.findById(req.user._id).select("+password");
  if (!(await user.comparePassword(currentPassword || ""))) throw new ApiError(401, "Current password is incorrect.");
  user.password = newPassword;
  await user.save();
  ok(res, null, "Password changed.");
});

export const requestPasswordReset = asyncHandler(async (req, res) => {
  if (!req.body.email?.trim()) throw new ApiError(422, "Email is required.");
  ok(res, null, "If an account matches that address, a reset email will be sent once email delivery is configured.");
});
