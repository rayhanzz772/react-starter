import axios from "axios";

// Falls back to /api so the app still boots with no .env configured.
const baseURL = import.meta.env.VITE_API_URL || "/api";

export const client = axios.create({
  baseURL,
  timeout: 15_000,
});

client.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// shortcut: token is read per request with no 401 refresh/retry queue. When you
// need silent refresh, add a response interceptor here sharing one in-flight
// refresh promise (otherwise N parallel 401s trigger N refreshes).
