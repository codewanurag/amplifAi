import { ApiError } from "./errorMiddleware.js";

export function allowRoles(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) return next(new ApiError(403, "You do not have permission for this action."));
    next();
  };
}
