import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    workspace: { type: mongoose.Schema.Types.ObjectId, ref: "Workspace", required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    plan: { type: String, enum: ["Creator", "Pro", "Agency"], required: true },
    amount: { type: Number, required: true },
    currency: { type: String, default: "INR" },
    razorpayOrderId: { type: String, required: true },
    razorpayPaymentId: String,
    signature: String,
    status: { type: String, enum: ["created", "paid", "failed"], default: "created" },
  },
  { timestamps: true },
);

export default mongoose.model("Payment", paymentSchema);
