import axios from "axios";
import { useAuthStore } from "@/store/useAuthStore";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_FRONTEND_API_URL,
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default api;
