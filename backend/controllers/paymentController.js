import crypto from "node:crypto";
import Payment from "../models/Payment.js";
import Subscription from "../models/Subscription.js";
import { getRazorpayClient } from "../config/razorpay.js";
import { ApiError } from "../middleware/errorMiddleware.js";
import { getAllowedWorkspace } from "../middleware/workspaceAccess.js";
import asyncHandler from "../utils/asyncHandler.js";
import { ok } from "../utils/apiResponse.js";
import { recordActivity } from "../utils/activity.js";

const planPrices = { Creator: 99900, Pro: 249900, Agency: 599900 };

export const getSubscription = asyncHandler(async (req, res) => {
  const workspace = await getAllowedWorkspace(req.user, req.query.workspaceId || req.user.currentWorkspace);
  let subscription = await Subscription.findOne({ workspace: workspace._id });
  if (!subscription) subscription = await Subscription.create({ workspace: workspace._id, user: req.user._id, plan: "Free" });
  ok(res, { subscription, plans: planPrices });
});

export const createOrder = asyncHandler(async (req, res) => {
  const workspace = await getAllowedWorkspace(req.user, req.body.workspaceId || req.user.currentWorkspace);
  const amount = planPrices[req.body.plan];
  if (!amount) throw new ApiError(422, "Select a paid plan.");
  const razorpay = getRazorpayClient();
  if (!razorpay) throw new ApiError(503, "Upgrade checkout requires Razorpay credentials in backend/.env.");
  const order = await razorpay.orders.create({ amount, currency: "INR", receipt: `ws_${workspace._id}_${Date.now()}` });
  await Payment.create({ workspace: workspace._id, user: req.user._id, plan: req.body.plan, amount, razorpayOrderId: order.id });
  ok(res, { order, keyId: process.env.RAZORPAY_KEY_ID, plan: req.body.plan }, "Order created.", 201);
});

export const verifyPayment = asyncHandler(async (req, res) => {
  const { razorpay_order_id: orderId, razorpay_payment_id: paymentId, razorpay_signature: signature } = req.body;
  if (!orderId || !paymentId || !signature) throw new ApiError(422, "Payment verification fields are required.");
  if (!process.env.RAZORPAY_KEY_SECRET) throw new ApiError(503, "Razorpay is not configured.");
  const expected = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET).update(`${orderId}|${paymentId}`).digest("hex");
  if (expected !== signature) throw new ApiError(400, "Payment verification failed.");
  const payment = await Payment.findOneAndUpdate({ razorpayOrderId: orderId, user: req.user._id }, { razorpayPaymentId: paymentId, signature, status: "paid" }, { new: true });
  if (!payment) throw new ApiError(404, "Payment order not found.");
  const subscription = await Subscription.findOneAndUpdate(
    { workspace: payment.workspace },
    { user: req.user._id, plan: payment.plan, status: "active", razorpayOrderId: orderId, razorpayPaymentId: paymentId, startedAt: new Date() },
    { new: true, upsert: true },
  );
  await recordActivity({ user: req.user._id, workspace: payment.workspace, action: "upgrade", entityType: "subscription", entityId: subscription._id, description: `Upgraded to ${payment.plan}` });
  ok(res, subscription, "Payment verified and plan activated.");
});
