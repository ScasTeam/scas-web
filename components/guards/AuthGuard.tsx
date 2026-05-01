"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { useEffect, useSyncExternalStore } from "react";

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const user = useAuthStore((state) => state.user);
  const router = useRouter();

  const isClient = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  useEffect(() => {
    if (isClient && !user) {
      router.replace("/login");
    }
  }, [isClient, user, router]);

  if (!isClient || !user) return null;

  return <>{children}</>;
}
