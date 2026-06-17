import api from "@/lib/axios";
import { useAuthStore } from "@/store/useAuthStore";
import { useCourseStore } from "@/store/useCourseStore";
import { useRouter } from "next/navigation";
import { useState, SyntheticEvent } from "react";
import { useGoogleLogin, type TokenResponse } from "@react-oauth/google";
import axios from "axios";

interface AuthResponse {
  status: string;
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

export const useGoogleAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [isOtp, setIsOtp] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [otpError, setOtpError] = useState("");
  const [password, setPassword] = useState<string>("");
  const route = useRouter();
  const loginStore = useAuthStore((state) => state.login);

  const clearCourses = useCourseStore((state) => state.clear);

  const handleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse: TokenResponse) => {
      setIsLoading(true);

      try {
        const res = await api.post("/auth/google", {
          google_token: tokenResponse.access_token,
        });

        if (res.status == 202 || res.data.require_otp) {
          setIsOtp(true);
          setEmail(res.data.email);
          return;
        } else {
          loginStore(res.data.user);
          if (!res.data.user.role) {
            route.push("/choose-role");
          } else {
            route.push("/dashboard");
          }
        }
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          const status = error.response?.status;
          const serverData = error.response?.data;
          const serverMessage =
            serverData?.message ||
            serverData?.error ||
            "Terjadi kesalahan pada server.";

          alert(`[Error ${status || "Network"}] ${serverMessage}`);
          console.error("Detail Error from server:", serverData);
        } else if (error instanceof Error) {
          alert("Error internal aplikasi: " + error.message);
        } else {
          alert("something happen on the server");
        }
      } finally {
        setIsLoading(false);
      }
    },
    onError: () => alert("Google Login failed"),
  });

  const handleEmailLogin = async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      if (res.status === 202 || res.data.require_otp) {
        setIsOtp(true);
        setEmail(res.data.email);
        return;
      } else {
        loginStore(res.data.user);
        if (!res.data.user.role) {
          route.push("/choose-role");
        } else {
          route.push("/dashboard");
        }
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        const serverData = error.response?.data;
        const serverMessage =
          serverData?.message ||
          serverData?.error ||
          "Terjadi kesalahan pada server.";

        alert(`[Error ${status || "Network"}] ${serverMessage}`);
        console.error("Detail Error from server:", serverData);
      } else if (error instanceof Error) {
        alert("Error internal aplikasi: " + error.message);
      } else {
        alert("something happen on the server");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
    } finally {
      clearCourses();
      loginStore(null);
      route.push("/login");
    }
  };

  const handleVerifyDevice = async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await api.post("/auth/verify-otp", {
        email: email,
        code: otpCode,
        client_type: "web",
      });

      loginStore(res.data.user);
      if (!res.data.user.role) {
        route.push("/choose-role");
      } else {
        route.push("/dashboard");
      }
    } catch (error: any) {
      if (error.response?.status === 400 && error.response?.data?.otp_status) {
        setOtpError(error.response.data.message);
      } else {
        // Fallback for 500 Server Errors or network crashes
        console.error(`Something went wrong:`, error);
        setOtpError("An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };
  return {
    handleLogin,
    handleLogout,
    handleVerifyDevice,
    setOtpCode,
    isLoading,
    email,
    setEmail,
    password,
    setPassword,
    isOtp,
    otpCode,
    setIsOtp,
    otpError,
    handleEmailLogin,
  };
};
