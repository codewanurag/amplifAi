import "dotenv/config";
import cors from "cors";
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import { connectDatabase } from "./config/db.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import workspaceRoutes from "./routes/workspaceRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

const app = express();
const port = Number(process.env.PORT || 4175);

app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL || "http://127.0.0.1:4174", credentials: false }));
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: false }));
app.use("/api", rateLimit({ windowMs: 15 * 60 * 1000, limit: 180, standardHeaders: "draft-7", legacyHeaders: false }));

app.get("/api/health", (req, res) => {
  void req;
  res.json({ success: true, message: "AmplifAI API healthy." });
});
app.use("/api/auth", authRoutes);
app.use("/api/workspaces", workspaceRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/uploads", uploadRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use(notFound);
app.use(errorHandler);

connectDatabase()
  .then(() => {
    app.listen(port, () => console.log(`AmplifAI API listening at http://127.0.0.1:${port}/api`));
  })
  .catch((error) => {
    console.error(`API startup failed: ${error.message}`);
    process.exitCode = 1;
  });

export default app;
