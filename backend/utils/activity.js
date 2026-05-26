import Activity from "../models/Activity.js";

export async function recordActivity({ user, workspace, action, entityType, entityId, description, metadata = {} }) {
  return Activity.create({ user, workspace, action, entityType, entityId, description, metadata });
}
