import { api, unwrap } from "./api";

export const uploadService = {
  upload(file) {
    const formData = new FormData();
    formData.append("media", file);
    return unwrap(api.post("/uploads", formData, { headers: { "Content-Type": "multipart/form-data" } }));
  },
};
