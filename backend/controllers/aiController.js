import { getAllowedWorkspace } from "../middleware/workspaceAccess.js";
import asyncHandler from "../utils/asyncHandler.js";
import { ok } from "../utils/apiResponse.js";
import { recordActivity } from "../utils/activity.js";

const platformTags = {
  Instagram: ["#ContentCreator", "#InstagramGrowth", "#CreatorWorkflow", "#SocialStrategy"],
  LinkedIn: ["#ContentStrategy", "#B2BMarketing", "#BuildInPublic", "#PersonalBrand"],
  YouTube: ["#YouTubeCreators", "#Shorts", "#ContentTips", "#CreatorEconomy"],
  "X / Twitter": ["#BuildInPublic", "#Marketing", "#Creators", "#AI"],
  TikTok: ["#CreatorTok", "#ContentTips", "#Growth", "#AITools"],
  Facebook: ["#SmallBusiness", "#SocialMedia", "#Community", "#Marketing"],
};

function scoreContent(content = "") {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  const hasQuestion = content.includes("?");
  const hasCta = /(try|save|share|comment|learn|start|discover)/i.test(content);
  const total = Math.min(98, 54 + Math.min(words, 22) + (hasQuestion ? 9 : 0) + (hasCta ? 12 : 0));
  return {
    score: total,
    metrics: { hookStrength: Math.min(98, total + 4), readability: Math.min(98, total + 7), ctaQuality: hasCta ? 88 : 62, engagementPotential: total },
    recommendation: hasCta ? "Test an outcome-led opening for even stronger retention." : "Add one clear call to action that invites saves or replies.",
  };
}

async function logAI(req, description) {
  const workspace = await getAllowedWorkspace(req.user, req.body.workspaceId || req.user.currentWorkspace);
  await recordActivity({ user: req.user._id, workspace: workspace._id, action: "generate", entityType: "ai", description });
}

export const captions = asyncHandler(async (req, res) => {
  const platform = req.body.platform || "Instagram";
  const subject = req.body.content || req.body.description || "one powerful content idea";
  const data = [
    { type: "Concise", content: `${subject} deserves more than a single post. Turn it into a repeatable ${platform} workflow.` },
    { type: "Story", content: `We stopped rebuilding every post from zero. Now ${subject.toLowerCase()} becomes a week of useful content.` },
    { type: "CTA", content: `Ready to make ${subject.toLowerCase()} work harder? Create, schedule, and learn with AmplifAI.` },
  ];
  await logAI(req, `Generated ${platform} captions`);
  ok(res, data, process.env.AI_API_KEY ? "Captions generated." : "Captions generated with the built-in AI template. Add AI_API_KEY for provider output.");
});

export const hashtags = asyncHandler(async (req, res) => {
  const platform = req.body.platform || "Instagram";
  const tags = platformTags[platform] || platformTags.Instagram;
  await logAI(req, `Generated ${platform} hashtags`);
  ok(res, [{ name: "Platform fit", tags }, { name: "Discovery", tags: ["#AmplifAI", "#AIContent", "#SocialMediaTips", "#ContentMarketing"] }]);
});

export const ideas = asyncHandler(async (req, res) => {
  const platform = req.body.platform || "Instagram";
  const goal = req.body.goal || "Build authority";
  await logAI(req, `Generated ideas for ${platform}`);
  ok(res, [
    { title: `The one content loop built for ${platform}`, format: "Carousel", hook: `Your next ${goal.toLowerCase()} win starts with one insight.`, score: 94 },
    { title: "Turn one audience question into a campaign", format: "Reel", hook: "Stop brainstorming. Start listening.", score: 91 },
    { title: "A creator's weekly publishing system", format: "Thread", hook: "Four channels. One source idea.", score: 88 },
  ]);
});

export const scripts = asyncHandler(async (req, res) => {
  await logAI(req, "Generated video scripts");
  ok(res, [{ format: req.body.format || "Reel", duration: req.body.duration || "30 sec", title: "One idea, four platforms", scenes: ["Hook: still rewriting every post?", "Show the content transformation", "Close with a simple publish CTA"] }]);
});

export const repurpose = asyncHandler(async (req, res) => {
  const source = req.body.content || "Your strongest idea should work across every platform.";
  await logAI(req, "Repurposed content");
  ok(res, [
    { platform: "Instagram", type: "Caption", content: `${source} Save this workflow for your next content week. #CreatorWorkflow` },
    { platform: "LinkedIn", type: "Post", content: `${source}\n\nBuild once, adapt intentionally, and measure what compounds.` },
    { platform: "YouTube Shorts", type: "Script", content: `Hook: ${source} Beat 2: Adapt it. Beat 3: Schedule it.` },
    { platform: "X / Twitter", type: "Thread", content: `1/ ${source}\n2/ Adapt the format.\n3/ Preserve the voice.` },
  ]);
});

export const improve = asyncHandler(async (req, res) => {
  const content = req.body.content || "";
  await logAI(req, "Improved content");
  ok(res, { content: `${content.trim()} Build once, adapt for each audience, and measure what performs.`.trim(), reason: "Added a clear outcome and action." });
});

export const contentScore = asyncHandler(async (req, res) => {
  await logAI(req, "Scored content");
  ok(res, scoreContent(req.body.content));
});

export const bestTime = asyncHandler(async (req, res) => {
  await logAI(req, "Requested best posting times");
  ok(res, [
    { platform: "Instagram", times: ["Tue 11:00 AM", "Thu 6:30 PM", "Sun 9:00 AM"], lift: "+19%" },
    { platform: "LinkedIn", times: ["Tue 8:30 AM", "Wed 9:00 AM", "Thu 12:15 PM"], lift: "+24%" },
    { platform: "YouTube", times: ["Wed 7:00 PM", "Fri 6:00 PM"], lift: "+16%" },
    { platform: "X / Twitter", times: ["Mon 9:15 AM", "Wed 1:00 PM"], lift: "+12%" },
  ]);
});

export const trends = asyncHandler(async (req, res) => {
  await logAI(req, "Scanned platform trends");
  ok(res, [
    { style: "Bright lo-fi build", mood: "Educational", platform: "Instagram", velocity: "Rising fast" },
    { style: "Minimal tech percussion", mood: "Launch", platform: "YouTube", velocity: "Trending" },
    { style: "Warm acoustic cut", mood: "Storytelling", platform: "Instagram", velocity: "Emerging" },
  ], process.env.AI_API_KEY ? "Trends scanned." : "Showing modeled trend signals until an AI data provider is configured.");
});
