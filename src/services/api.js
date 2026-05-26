import axios from "axios";

const TOKEN_KEY = "amplifai_token";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api",
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem(TOKEN_KEY);
      window.dispatchEvent(new Event("amplifai:unauthorized"));
    }
    const message = error.response?.data?.message || error.message || "Request failed.";
    return Promise.reject(new Error(message));
  },
);

export function setAuthToken(token) {
  if (token) localStorage.setItem(TOKEN_KEY, token);
  else localStorage.removeItem(TOKEN_KEY);
}

export function hasAuthToken() {
  return Boolean(localStorage.getItem(TOKEN_KEY));
}

export async function unwrap(request) {
  const response = await request;
  return response.data.data;
}
