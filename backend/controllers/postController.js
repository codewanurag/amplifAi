import Post from "../models/Post.js";
import { ApiError } from "../middleware/errorMiddleware.js";
import { getAllowedWorkspace } from "../middleware/workspaceAccess.js";
import asyncHandler from "../utils/asyncHandler.js";
import { ok } from "../utils/apiResponse.js";
import { recordActivity } from "../utils/activity.js";

function readWorkspaceId(req) {
  return req.body.workspaceId || req.query.workspaceId || req.user.currentWorkspace;
}

function postInput(body, workspace, user) {
  if (!body.title?.trim() || !body.caption?.trim() || !body.platform) throw new ApiError(422, "Title, caption, and platform are required.");
  const status = body.status || "Draft";
  if (status === "Scheduled" && !body.scheduledAt) throw new ApiError(422, "Scheduled posts require a publish time.");
  return {
    title: body.title.trim(),
    caption: body.caption.trim(),
    platform: body.platform,
    contentType: body.contentType || "Post",
    mediaUrl: body.mediaUrl,
    mediaType: body.mediaType,
    status,
    scheduledAt: body.scheduledAt || undefined,
    aiScore: body.aiScore || 0,
    engagementPrediction: body.engagementPrediction || 0,
    workspace: workspace._id,
    user: user._id,
  };
}

export const listPosts = asyncHandler(async (req, res) => {
  const workspace = await getAllowedWorkspace(req.user, readWorkspaceId(req));
  const query = { workspace: workspace._id };
  if (req.query.status) query.status = req.query.status;
  if (req.query.platform) query.platform = req.query.platform;
  const posts = await Post.find(query).sort({ scheduledAt: 1, updatedAt: -1 });
  ok(res, posts);
});

export const createPost = asyncHandler(async (req, res) => {
  const workspace = await getAllowedWorkspace(req.user, readWorkspaceId(req));
  const post = await Post.create(postInput(req.body, workspace, req.user));
  await recordActivity({ user: req.user._id, workspace: workspace._id, action: "create", entityType: "post", entityId: post._id, description: `${post.status === "Scheduled" ? "Scheduled" : "Created"} ${post.platform} post` });
  ok(res, post, "Post saved.", 201);
});

export const getPost = asyncHandler(async (req, res) => {
  const workspace = await getAllowedWorkspace(req.user, readWorkspaceId(req));
  const post = await Post.findOne({ _id: req.params.id, workspace: workspace._id });
  if (!post) throw new ApiError(404, "Post not found.");
  ok(res, post);
});

export const updatePost = asyncHandler(async (req, res) => {
  const workspace = await getAllowedWorkspace(req.user, readWorkspaceId(req));
  const post = await Post.findOne({ _id: req.params.id, workspace: workspace._id });
  if (!post) throw new ApiError(404, "Post not found.");
  const allowed = ["title", "caption", "platform", "contentType", "mediaUrl", "mediaType", "status", "scheduledAt", "aiScore", "engagementPrediction"];
  allowed.forEach((key) => {
    if (req.body[key] !== undefined) post[key] = req.body[key];
  });
  if (post.status === "Scheduled" && !post.scheduledAt) throw new ApiError(422, "Scheduled posts require a publish time.");
  await post.save();
  await recordActivity({ user: req.user._id, workspace: workspace._id, action: "update", entityType: "post", entityId: post._id, description: `Updated ${post.platform} post` });
  ok(res, post, "Post updated.");
});

export const deletePost = asyncHandler(async (req, res) => {
  const workspace = await getAllowedWorkspace(req.user, readWorkspaceId(req));
  const post = await Post.findOneAndDelete({ _id: req.params.id, workspace: workspace._id });
  if (!post) throw new ApiError(404, "Post not found.");
  await recordActivity({ user: req.user._id, workspace: workspace._id, action: "delete", entityType: "post", description: `Deleted ${post.platform} post` });
  ok(res, null, "Post deleted.");
});

export const schedulePost = asyncHandler(async (req, res) => {
  const workspace = await getAllowedWorkspace(req.user, readWorkspaceId(req));
  if (!req.body.scheduledAt) throw new ApiError(422, "Choose a publishing time.");
  const post = await Post.findOneAndUpdate(
    { _id: req.params.id, workspace: workspace._id },
    { status: "Scheduled", scheduledAt: req.body.scheduledAt },
    { new: true, runValidators: true },
  );
  if (!post) throw new ApiError(404, "Post not found.");
  await recordActivity({ user: req.user._id, workspace: workspace._id, action: "schedule", entityType: "post", entityId: post._id, description: `Scheduled ${post.platform} post` });
  ok(res, post, "Post scheduled.");
});

export const calendar = asyncHandler(async (req, res) => {
  const workspace = await getAllowedWorkspace(req.user, req.query.workspaceId || req.user.currentWorkspace);
  const posts = await Post.find({ workspace: workspace._id, scheduledAt: { $exists: true } }).sort("scheduledAt");
  ok(res, posts);
});
