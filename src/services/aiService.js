import { api, unwrap } from "./api";

export const aiService = {
  ideas: (brief) => unwrap(api.post("/ai/ideas", brief)),
  scripts: (brief) => unwrap(api.post("/ai/scripts", brief)),
  captions: (brief) => unwrap(api.post("/ai/captions", brief)),
  hashtags: (brief) => unwrap(api.post("/ai/hashtags", brief)),
  repurpose: (brief) => unwrap(api.post("/ai/repurpose", brief)),
  improve: (content) => unwrap(api.post("/ai/improve", { content })),
  score: (content) => unwrap(api.post("/ai/score", { content })),
  bestTime: () => unwrap(api.post("/ai/best-time")),
  trends: () => unwrap(api.post("/ai/trends")),
};
