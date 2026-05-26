export class ApiError extends Error {
  constructor(status, message, details) {
    super(message);
    this.status = status;
    this.details = details;
  }
}

export function notFound(req, res) {
  res.status(404).json({ success: false, message: `Route not found: ${req.method} ${req.originalUrl}` });
}

export function errorHandler(error, req, res, next) {
  void next;
  const status = error.status || (error.name === "ValidationError" ? 422 : 500);
  const message = status === 500 && process.env.NODE_ENV === "production" ? "Server error." : error.message;
  res.status(status).json({
    success: false,
    message,
    details: error.details || (error.name === "ValidationError" ? error.errors : undefined),
  });
}
