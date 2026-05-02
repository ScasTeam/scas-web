import api from "@/lib/axios";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useGoogleLogin, type TokenResponse } from "@react-oauth/google";
import axios from "axios";

export const useRegisterLecturer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const route = useRouter();
  const loginStore = useAuthStore((state) => state.login);

  const handleRegister = useGoogleLogin({
    onSuccess: async (tokenResponse: TokenResponse) => {
      setIsLoading(true);
      setError("");

      try {
        const res = await api.post("/auth/register/lecturer", {
          google_token: tokenResponse.access_token,
        });

        loginStore(res.data.user);
        route.push("/dashboard");
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          const serverData = error.response?.data;
          setError(
            serverData?.message ||
              serverData?.error ||
              "Registration failed. Please try again.",
          );
        } else if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unexpected error occurred");
        }
      } finally {
        setIsLoading(false);
      }
    },
    onError: () => setError("Google authentication failed"),
  });

  return {
    handleRegister,
    isLoading,
    error,
  };
};
