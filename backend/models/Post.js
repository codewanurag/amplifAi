import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 180 },
    caption: { type: String, required: true, maxlength: 5000 },
    platform: {
      type: String,
      enum: ["Instagram", "LinkedIn", "YouTube", "YouTube Shorts", "X / Twitter", "TikTok", "Facebook"],
      required: true,
    },
    contentType: { type: String, default: "Post", maxlength: 40 },
    mediaUrl: String,
    mediaType: { type: String, enum: ["image", "video"] },
    status: { type: String, enum: ["Draft", "Ready", "Scheduled", "Published"], default: "Draft" },
    scheduledAt: Date,
    publishedAt: Date,
    aiScore: { type: Number, min: 0, max: 100, default: 0 },
    engagementPrediction: { type: Number, min: 0, default: 0 },
    workspace: { type: mongoose.Schema.Types.ObjectId, ref: "Workspace", required: true, index: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
  },
  { timestamps: true },
);

postSchema.index({ workspace: 1, status: 1, scheduledAt: 1 });

export default mongoose.model("Post", postSchema);
