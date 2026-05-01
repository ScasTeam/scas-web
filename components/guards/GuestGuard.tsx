"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { useEffect, useSyncExternalStore } from "react";

interface GuestGuardProps {
  children: React.ReactNode;
}

export default function GuestGuard({ children }: GuestGuardProps) {
  const user = useAuthStore((state) => state.user);
  const router = useRouter();

  const isClient = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  useEffect(() => {
    if (isClient && user) {
      router.replace("/dashboard");
    }
  }, [isClient, user, router]);

  if (!isClient || user) return null;

  return <>{children}</>;
}
