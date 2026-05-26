import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    workspace: { type: mongoose.Schema.Types.ObjectId, ref: "Workspace", required: true, unique: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    plan: { type: String, enum: ["Free", "Creator", "Pro", "Agency"], default: "Free" },
    status: { type: String, enum: ["active", "pending", "cancelled", "expired"], default: "active" },
    razorpayOrderId: String,
    razorpayPaymentId: String,
    startedAt: { type: Date, default: Date.now },
    renewsAt: Date,
  },
  { timestamps: true },
);

export default mongoose.model("Subscription", subscriptionSchema);
