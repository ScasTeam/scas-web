"use client";

import { useAuthStore } from "@/store/useAuthStore";
import AuthGuard from "@/components/guards/AuthGuard";
import LecturerDashboard from "@/components/dashboard/LecturerDashboard";
import StudentDashboard from "@/components/dashboard/StudentDashboard";

export default function Page() {
  const user = useAuthStore((state) => state.user);

  return (
    <AuthGuard>
      <main className="flex min-h-screen flex-col items-center justify-center bg-background text-foreground px-6 py-24 selection:bg-white selection:text-black overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 blur-[120px] pointer-events-none">
          <div className="h-[500px] w-[500px] rounded-full bg-white/40"></div>
        </div>

        {user?.role === "lecturer" && <LecturerDashboard />}
        {user?.role === "student" && <StudentDashboard />}
      </main>
    </AuthGuard>
  );
}
