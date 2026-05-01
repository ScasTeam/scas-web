"use client";

import { useRegisterLecturer } from "@/hooks/useRegisterLecturer";
import RegisterLecturerForm from "@/components/auth/RegisterLecturerForm";
import GuestGuard from "@/components/guards/GuestGuard";

export default function Page() {
  const { handleRegister, isLoading, error } = useRegisterLecturer();

  return (
    <GuestGuard>
      <main className="flex min-h-screen flex-col items-center justify-center bg-background text-foreground px-6 py-24 selection:bg-white selection:text-black overflow-hidden relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 blur-[120px] pointer-events-none">
          <div className="h-[600px] w-[600px] rounded-full bg-white"></div>
        </div>

        <RegisterLecturerForm
          onRegister={handleRegister}
          isLoading={isLoading}
          error={error}
        />
      </main>
    </GuestGuard>
  );
}
