import { configureCloudinary, hasCloudinaryCredentials } from "../config/cloudinary.js";
import { ApiError } from "../middleware/errorMiddleware.js";
import { getAllowedWorkspace } from "../middleware/workspaceAccess.js";
import asyncHandler from "../utils/asyncHandler.js";
import { ok } from "../utils/apiResponse.js";
import { recordActivity } from "../utils/activity.js";

export const uploadMedia = asyncHandler(async (req, res) => {
  if (!req.file) throw new ApiError(422, "Select an image or video to upload.");
  if (!hasCloudinaryCredentials()) throw new ApiError(503, "Media upload requires Cloudinary credentials in backend/.env.");
  const workspace = await getAllowedWorkspace(req.user, req.body.workspaceId || req.user.currentWorkspace);
  const cloudinary = configureCloudinary();
  const result = await new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: `amplifai/${workspace._id}`, resource_type: "auto" },
      (error, uploadResult) => (error ? reject(error) : resolve(uploadResult)),
    );
    stream.end(req.file.buffer);
  });
  await recordActivity({ user: req.user._id, workspace: workspace._id, action: "upload", entityType: "media", description: "Uploaded content media" });
  ok(res, { url: result.secure_url, publicId: result.public_id, resourceType: result.resource_type }, "Media uploaded.", 201);
});
