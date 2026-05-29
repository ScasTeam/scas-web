"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useSyncExternalStore } from "react";

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const user = useAuthStore((state) => state.user);
  const router = useRouter();
  const pathname = usePathname();

  const isClient = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  useEffect(() => {
    if (isClient) {
      if (!user) {
        router.replace("/login");
      } else if (!user.role && pathname !== "/choose-role") {
        router.replace("/choose-role");
      } else if (user.role && pathname === "/choose-role") {
        router.replace("/dashboard");
      }
    }
  }, [isClient, user, router, pathname]);

  if (!isClient || !user) return null;
  if (!user.role && pathname !== "/choose-role") return null;
  if (user.role && pathname === "/choose-role") return null;

  return <>{children}</>;
}
