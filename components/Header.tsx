"use client";

import { useGoogleAuth } from "@/hooks/useGoogleAuth";
import { useAuthStore } from "@/store/useAuthStore";
import Link from "next/link";
import { useRef, useSyncExternalStore } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Router from "next/router";

interface href {
  name: string;
  url: string;
  action?: () => void;
}

gsap.registerPlugin(useGSAP);

export default function Header() {
  const STUDENT_LINKS: href[] = [
    {
      name: "Dashboard",
      url: "/dashboard",
    },
    {
      name: "Generate QR",
      url: "/dashboard/generate-qr",
    },
  ];

  const LECTURER_LINKS: href[] = [
    {
      name: "Dashboard",
      url: "/dashboard",
    },
    {
      name: "Verify QR",
      url: "/dashboard/verify-qr",
    },
  ];

  const { handleLogin, handleLogout } = useGoogleAuth();

  const user = useAuthStore((state) => state.user);
  const isClient = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const headerContainer = useRef(null);

  useGSAP(
    () => {
      gsap.from(".link", {
        y: 30,
        duration: 1,
        ease: "power1.out",
      });
    },
    { scope: headerContainer, dependencies: [user, isClient] },
  );

  if (!isClient) {
    return (
      <div className="absolute top-0 left-0 w-full flex flex-row justify-between py-2 gap-2">
        Loading data
      </div>
    );
  }

  return (
    <header
      className="fixed top-0 left-0 z-50 w-full flex flex-row justify-between items-center px-6 md:px-10 py-6 mix-blend-difference"
      ref={headerContainer}
    >
      {isClient && user ? (
        <>
          <div className="flex flex-row gap-8 items-center">
            <nav className="font-days text-xl tracking-tighter link">
              <Link href={"/"}>SCAS.</Link>
            </nav>
            <div className="flex gap-6 font-abel uppercase text-xs tracking-widest opacity-70">
              {user.role === "student" &&
                STUDENT_LINKS.map((s, i) => (
                  <Link
                    key={i}
                    href={s.url}
                    className="hover:opacity-100 transition-opacity link"
                  >
                    {s.name}
                  </Link>
                ))}
              {user.role === "lecturer" &&
                LECTURER_LINKS.map((l, i) => (
                  <Link
                    key={i}
                    href={l.url}
                    className="hover:opacity-100 transition-opacity link"
                  >
                    {l.name}
                  </Link>
                ))}
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex flex-col items-end font-abel uppercase text-[10px] tracking-widest opacity-50 link">
              <p>{user.name}</p>
              <p className="text-[8px]">{user.email}</p>
            </div>
            <button
              onClick={() => handleLogout()}
              className="font-abel uppercase text-xs tracking-widest border border-white/20 px-4 py-2 rounded-full hover:bg-white hover:text-black transition-all hover:cursor-pointer"
            >
              logout
            </button>
          </div>
        </>
      ) : (
        <>
          <nav className="font-days text-xl tracking-tighter">
            <Link href={"/"}>SCAS.</Link>
          </nav>
          <Link
            href="/login"
            className="font-abel uppercase link text-xs tracking-widest border border-white/20 px-6 py-2 rounded-full hover:bg-white hover:text-black transition-all link hover:cursor-pointer"
          >
            Login
          </Link>
        </>
      )}
    </header>
  );
}
