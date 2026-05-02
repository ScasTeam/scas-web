"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { useGoogleAuth } from "@/hooks/useGoogleAuth";

interface NavItem {
  label: string;
  href: string;
}

const LECTURER_NAV: NavItem[] = [
  { label: "Courses", href: "/dashboard" },
  { label: "Verify QR", href: "/dashboard/verify-qr" },
];

const STUDENT_NAV: NavItem[] = [
  { label: "Courses", href: "/dashboard" },
  { label: "Generate QR", href: "/dashboard/generate-qr" },
];

export default function Sidebar() {
  const user = useAuthStore((state) => state.user);
  const { handleLogout } = useGoogleAuth();
  const pathname = usePathname();

  const navItems = user?.role === "lecturer" ? LECTURER_NAV : STUDENT_NAV;

  return (
    <aside className="fixed top-0 left-0 h-screen w-56 bg-[#050505] border-r border-white/5 flex flex-col z-50">
      <div className="p-6 border-b border-white/5">
        <Link href="/" className="font-days text-2xl tracking-tighter">
          SCAS.
        </Link>
      </div>

      <nav className="flex-1 p-4 flex flex-col gap-1">
        {navItems.map((item) => {
          const isActive =
            item.href === "/dashboard"
              ? pathname === "/dashboard" ||
                pathname.startsWith("/dashboard/course")
              : pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`font-abel text-xs uppercase tracking-widest px-4 py-3 rounded-xl transition-all ${
                isActive
                  ? "bg-white/10 text-white"
                  : "text-white/30 hover:text-white/60 hover:bg-white/5"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/5">
        <div className="px-4 mb-4">
          <p className="font-abel text-xs text-white/50 truncate">
            {user?.name}
          </p>
          <p className="font-abel text-[10px] text-white/25 truncate">
            {user?.email}
          </p>
        </div>
        <button
          onClick={() => handleLogout()}
          className="w-full font-abel text-[10px] uppercase tracking-widest text-white/30 hover:text-white border border-white/10 hover:border-white/20 px-4 py-2.5 rounded-xl transition-all"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}
