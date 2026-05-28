"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import AuthGuard from "@/components/guards/AuthGuard";
import Header from "@/components/Header";
import api from "@/lib/axios";
import axios from "axios";

export default function ChooseRolePage() {
  const user = useAuthStore((state) => state.user);
  const loginStore = useAuthStore((state) => state.login);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSelectRole = async (selectedRole: "student" | "lecturer") => {
    setIsLoading(true);
    setError("");

    try {
      const res = await api.post("/auth/assign-role", {
        role: selectedRole,
      });

      loginStore(res.data.user);
      router.push("/dashboard");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Failed to assign role.");
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthGuard>
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-center bg-background text-foreground px-6 py-24 selection:bg-white selection:text-black overflow-hidden relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 blur-[120px] pointer-events-none">
          <div className="h-[600px] w-[600px] rounded-full bg-white"></div>
        </div>

        <div className="z-10 w-full max-w-2xl flex flex-col items-center">
          <header className="text-center mb-12">
            <h1 className="font-days text-4xl md:text-6xl uppercase tracking-tighter leading-none mb-6">
              Welcome, <br /> {user?.name || "User"}
            </h1>
            <p className="font-abel text-base md:text-lg opacity-60 uppercase tracking-[0.2em] max-w-md mx-auto">
              Select your role to configure your account.
            </p>
          </header>

          {error && (
            <div className="mb-6 p-4 rounded-xl border border-danger/20 bg-danger-dark/20 text-danger text-sm font-abel text-center">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
            {/* Student Option */}
            <button
              onClick={() => handleSelectRole("student")}
              disabled={isLoading}
              className="group relative flex flex-col items-center text-center p-8 bg-white/5 border border-white/10 rounded-[2rem] cursor-pointer transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none"
            >
              <div className="mb-6 p-5 bg-white/5 rounded-full group-hover:bg-white/10 transition-colors">
                <svg
                  className="w-12 h-12 text-white/80 group-hover:text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.62 48.62 0 0112 20.904a48.62 48.62 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A5.998 5.998 0 0112 3.48a5.998 5.998 0 017.907 5.854 50.57 50.57 0 00-2.658.813M4.26 10.147L12 14.653l7.74-4.506M12 14.653v3.91"
                  />
                </svg>
              </div>
              <h2 className="font-days text-xl uppercase tracking-wider mb-2">
                Student
              </h2>
              <p className="font-abel text-sm text-white/50 group-hover:text-white/70 transition-colors">
                Join courses and scan QR codes to record your attendance.
              </p>
            </button>

            {/* Lecturer Option */}
            <button
              onClick={() => handleSelectRole("lecturer")}
              disabled={isLoading}
              className="group relative flex flex-col items-center text-center p-8 bg-white/5 border border-white/10 rounded-[2rem] cursor-pointer transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none"
            >
              <div className="mb-6 p-5 bg-white/5 rounded-full group-hover:bg-white/10 transition-colors">
                <svg
                  className="w-12 h-12 text-white/80 group-hover:text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                  />
                </svg>
              </div>
              <h2 className="font-days text-xl uppercase tracking-wider mb-2">
                Lecturer
              </h2>
              <p className="font-abel text-sm text-white/50 group-hover:text-white/70 transition-colors">
                Manage courses, create sessions, and verify student attendance QR codes.
              </p>
            </button>
          </div>
        </div>
      </main>
    </AuthGuard>
  );
}
