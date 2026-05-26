import { api, unwrap } from "./api";

export const postService = {
  list: (params = {}) => unwrap(api.get("/posts", { params })),
  create: (values) => unwrap(api.post("/posts", values)),
  update: (id, values) => unwrap(api.patch(`/posts/${id}`, values)),
  remove: (id) => unwrap(api.delete(`/posts/${id}`)),
  schedule: (id, scheduledAt) => unwrap(api.patch(`/posts/${id}/schedule`, { scheduledAt })),
  calendar: () => unwrap(api.get("/posts/calendar")),
};
