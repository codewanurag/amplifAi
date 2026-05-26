import mongoose from "mongoose";

const workspaceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 80 },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    members: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        role: { type: String, enum: ["owner", "editor", "viewer"], default: "editor" },
      },
    ],
    settings: {
      niche: { type: String, default: "Startup & SaaS" },
      audience: { type: String, default: "Founders and marketers" },
      tone: [{ type: String }],
      platforms: [{ type: String }],
      goals: [{ type: String }],
      timezone: { type: String, default: "Asia/Kolkata (IST)" },
    },
  },
  { timestamps: true },
);

export default mongoose.model("Workspace", workspaceSchema);
