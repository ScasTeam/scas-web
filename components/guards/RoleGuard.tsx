"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { useEffect, useSyncExternalStore } from "react";

interface RoleGuardProps {
  children: React.ReactNode;
  role: string;
}

export default function RoleGuard({ children, role }: RoleGuardProps) {
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
      return;
    }

    if (isClient && user && user.role !== role) {
      router.replace("/dashboard");
    }
  }, [isClient, user, role, router]);

  if (!isClient || !user || user.role !== role) return null;

  return <>{children}</>;
}
