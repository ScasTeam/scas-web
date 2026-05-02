import axios from "axios";
import { useAuthStore } from "@/store/useAuthStore";
import { useCourseStore } from "@/store/useCourseStore";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_FRONTEND_API_URL,
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

let isLoggingOut = false;

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401 && !isLoggingOut) {
      isLoggingOut = true;

      useAuthStore.getState().logout();
      useCourseStore.getState().clear();

      try {
        await fetch("/api/auth/logout", { method: "POST" });
      } catch {}

      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }

      isLoggingOut = false;
    }

    return Promise.reject(error);
  },
);

export default api;
