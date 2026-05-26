import { api, setAuthToken, unwrap } from "./api";

export const authService = {
  async signup(values) {
    const data = await unwrap(api.post("/auth/signup", values));
    setAuthToken(data.token);
    return data;
  },
  async login(values) {
    const data = await unwrap(api.post("/auth/login", values));
    setAuthToken(data.token);
    return data;
  },
  me: () => unwrap(api.get("/auth/me")),
  async logout() {
    try {
      await api.post("/auth/logout");
    } finally {
      setAuthToken(null);
    }
  },
  updateProfile: (values) => unwrap(api.patch("/auth/profile", values)),
  changePassword: (values) => unwrap(api.patch("/auth/password", values)),
  requestPasswordReset: (email) => api.post("/auth/forgot-password", { email }).then((response) => response.data.message),
};
