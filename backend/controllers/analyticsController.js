import Post from "../models/Post.js";
import Activity from "../models/Activity.js";
import { getAllowedWorkspace } from "../middleware/workspaceAccess.js";
import asyncHandler from "../utils/asyncHandler.js";
import { ok } from "../utils/apiResponse.js";

const platformNames = ["Instagram", "YouTube", "LinkedIn", "X / Twitter", "TikTok", "Facebook"];

function compact(value) {
  return Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 }).format(value);
}

async function workspaceMetrics(workspaceId) {
  const [counts, platformRows, scores, latest, upcoming, activities] = await Promise.all([
    Post.aggregate([{ $match: { workspace: workspaceId } }, { $group: { _id: "$status", count: { $sum: 1 } } }]),
    Post.aggregate([{ $match: { workspace: workspaceId } }, { $group: { _id: "$platform", count: { $sum: 1 }, avgScore: { $avg: "$aiScore" } } }, { $sort: { count: -1 } }]),
    Post.aggregate([{ $match: { workspace: workspaceId } }, { $group: { _id: null, avg: { $avg: "$aiScore" }, total: { $sum: 1 } } }]),
    Post.find({ workspace: workspaceId }).sort("-updatedAt").limit(3),
    Post.find({ workspace: workspaceId, status: { $in: ["Scheduled", "Ready", "Draft"] } }).sort({ scheduledAt: 1, updatedAt: -1 }).limit(4),
    Activity.find({ workspace: workspaceId }).sort("-createdAt").limit(8),
  ]);
  const byStatus = Object.fromEntries(counts.map((item) => [item._id, item.count]));
  return { byStatus, platformRows, score: Math.round(scores[0]?.avg || 0), total: scores[0]?.total || 0, latest, upcoming, activities };
}

export const dashboard = asyncHandler(async (req, res) => {
  const workspace = await getAllowedWorkspace(req.user, req.query.workspaceId || req.user.currentWorkspace);
  const metrics = await workspaceMetrics(workspace._id);
  const postsScheduled = metrics.byStatus.Scheduled || 0;
  ok(res, {
    dashboardStats: [
      { label: "Total reach", value: compact(metrics.total * 1640), change: "+18.4%", tone: "cyan" },
      { label: "Engagement", value: compact(metrics.total * 137), change: "+12.9%", tone: "blue" },
      { label: "Content score", value: String(metrics.score || 0), change: "+4 pts", tone: "blue" },
      { label: "Posts scheduled", value: String(postsScheduled), change: `${metrics.total} total`, tone: "teal" },
    ],
    engagementSeries: [18, 26, 31, 39, 44, 51, 58, 66, 72, 77, 86, Math.max(88, metrics.score)],
    upcomingPosts: metrics.upcoming.map((post) => ({
      id: post._id,
      title: post.title,
      platform: post.platform,
      time: post.scheduledAt ? post.scheduledAt.toLocaleString() : "Needs schedule",
      status: post.status,
      score: post.aiScore,
    })),
    aiRecommendations: [
      { title: "Schedule your strongest draft at its recommended time", impact: "Likely +14% impressions", tag: "Timing" },
      { title: "Repurpose your best-performing idea into video", impact: "Estimated +22% saves", tag: "Repurpose" },
    ],
    platforms: platformNames.map((name) => {
      const result = metrics.platformRows.find((row) => row._id === name);
      return { name, followers: compact((result?.count || 0) * 420), engagement: `${Math.round(result?.avgScore || 0) / 10}%` };
    }).slice(0, 4),
  });
});

export const analytics = asyncHandler(async (req, res) => {
  const workspace = await getAllowedWorkspace(req.user, req.query.workspaceId || req.user.currentWorkspace);
  const metrics = await workspaceMetrics(workspace._id);
  ok(res, {
    summary: { totalPosts: metrics.total, drafts: metrics.byStatus.Draft || 0, scheduled: metrics.byStatus.Scheduled || 0, published: metrics.byStatus.Published || 0, averageScore: metrics.score },
    engagementSeries: [14, 21, 28, 36, 42, 49, 55, 63, 69, 75, 82, Math.max(metrics.score, 84)],
    growthSeries: [12, 19, 27, 35, 42, 51, 60],
    topContent: metrics.latest.map((post) => ({ title: post.title, platform: post.platform, views: compact(post.engagementPrediction * 120 || 1200), engagement: `${(post.aiScore / 10 || 4).toFixed(1)}%` })),
    platforms: platformNames.slice(0, 4).map((name) => {
      const result = metrics.platformRows.find((row) => row._id === name);
      return { name, engagement: `${Math.round(result?.avgScore || 0) / 10}%`, followers: compact((result?.count || 0) * 420) };
    }),
    insightCards: [
      { title: "Content inventory", result: `${metrics.total} posts are available in this workspace.`, action: "Create and schedule consistently to improve signals." },
      { title: "AI content health", result: `Average AI score is ${metrics.score || 0}.`, action: "Improve low-scoring drafts before publishing." },
    ],
  });
});

export const activities = asyncHandler(async (req, res) => {
  const workspace = await getAllowedWorkspace(req.user, req.query.workspaceId || req.user.currentWorkspace);
  const activity = await Activity.find({ workspace: workspace._id }).sort("-createdAt").limit(20);
  ok(res, activity);
});
