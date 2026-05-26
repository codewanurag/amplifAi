import mongoose from "mongoose";

const activitySchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    workspace: { type: mongoose.Schema.Types.ObjectId, ref: "Workspace", required: true, index: true },
    action: { type: String, required: true },
    entityType: { type: String, required: true },
    entityId: mongoose.Schema.Types.ObjectId,
    description: { type: String, required: true },
    metadata: mongoose.Schema.Types.Mixed,
  },
  { timestamps: true },
);

activitySchema.index({ workspace: 1, createdAt: -1 });

export default mongoose.model("Activity", activitySchema);
