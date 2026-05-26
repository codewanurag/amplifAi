import { api, unwrap } from "./api";

export const workspaceService = {
  list: () => unwrap(api.get("/workspaces")),
  create: (values) => unwrap(api.post("/workspaces", values)),
  get: (id) => unwrap(api.get(`/workspaces/${id}`)),
  update: (id, values) => unwrap(api.patch(`/workspaces/${id}`, values)),
  switchTo: (id) => unwrap(api.post(`/workspaces/${id}/switch`)),
};
