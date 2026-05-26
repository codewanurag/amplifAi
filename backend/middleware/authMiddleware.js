import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { ApiError } from "./errorMiddleware.js";

export async function protect(req, res, next) {
  try {
    const token = req.headers.authorization?.startsWith("Bearer ")
      ? req.headers.authorization.slice(7)
      : null;
    if (!token) throw new ApiError(401, "Authentication required.");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) throw new ApiError(401, "Account no longer exists.");
    req.user = user;
    next();
  } catch (error) {
    next(error.status ? error : new ApiError(401, "Session expired or invalid."));
  }
}
