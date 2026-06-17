"use client";

import { useGoogleAuth } from "@/hooks/useGoogleAuth";
import { useAuthStore } from "@/store/useAuthStore";
import Link from "next/link";
import { useRef, useSyncExternalStore, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Menu, X } from "lucide-react";

interface Href {
  name: string;
  url: string;
  action?: () => void;
}

gsap.registerPlugin(useGSAP);

export default function Header() {
  const STUDENT_LINKS: Href[] = [{ name: "Dashboard", url: "/dashboard" }];

  const LECTURER_LINKS: Href[] = [
    { name: "Dashboard", url: "/dashboard" },
    { name: "Verify QR", url: "/dashboard/verify-qr" },
  ];

  const { handleLogout } = useGoogleAuth();
  const user = useAuthStore((state) => state.user);
  const isClient = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const headerContainer = useRef<HTMLElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const hasOpened = useRef(false);

  // Scroll to Hide/Show Header
  useEffect(() => {
    const handleScroll = () => {
      if (typeof window === "undefined" || isDrawerOpen) return;
      const currentScrollY = window.scrollY;

      // If close to the top, always show header
      if (currentScrollY < 10) {
        setIsVisible(true);
      }
      // Scrolling down and past threshold -> hide
      else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      }
      // Scrolling up -> show
      else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, isDrawerOpen]);

  // Toggle body overflow
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isDrawerOpen]);

  // GSAP Drawer Animation
  useGSAP(
    () => {
      if (!drawerRef.current) return;

      if (isDrawerOpen) {
        hasOpened.current = true;
        gsap.fromTo(
          drawerRef.current,
          { xPercent: 100 },
          { xPercent: 0, duration: 0.5, ease: "power3.out" },
        );
        gsap.fromTo(
          ".drawer-link",
          { x: 30, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.3,
            stagger: 0.08,
            delay: 0.15,
            ease: "power2.out",
          },
        );
      } else {
        if (hasOpened.current) {
          gsap.fromTo(
            drawerRef.current,
            { xPercent: 0 },
            { xPercent: 100, duration: 0.4, ease: "power3.inOut" },
          );
        } else {
          // This will now successfully run on mount
          gsap.set(drawerRef.current, { xPercent: 100 });
        }
      }
    },
    // ADD isClient to dependencies and scope to the ref
    { dependencies: [isDrawerOpen, isClient], scope: drawerRef },
  );

  if (!isClient) {
    return (
      <div className="absolute top-0 left-0 w-full flex flex-row justify-between py-2 gap-2">
        Loading data
      </div>
    );
  }

  const navLinks =
    user?.role === "student"
      ? STUDENT_LINKS
      : user?.role === "lecturer"
        ? LECTURER_LINKS
        : [];

  return (
    <>
      <header
        ref={headerContainer}
        className={`fixed top-0 left-0 z-40 w-full flex flex-row justify-between items-center px-6 md:px-10 py-6 mix-blend-difference transition-transform duration-300 ease-out ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <nav className="font-days text-xl tracking-tighter link">
          <Link
            href={"/"}
            className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 rounded"
          >
            SCAS.
          </Link>
        </nav>

        {/* Desktop Navigation */}
        <div className="hidden md:flex flex-row gap-8 items-center">
          {user ? (
            <>
              <div className="flex gap-6 font-abel uppercase text-xs tracking-widest text-accent">
                {navLinks.map((link, i) => (
                  <Link
                    key={i}
                    href={link.url}
                    className="hover:opacity-100 hover:text-white transition-all duration-300 link focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 rounded px-1.5 py-0.5"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
              <div className="flex items-center gap-6">
                <div className="flex flex-col items-end font-abel uppercase text-[10px] tracking-widest opacity-50 link">
                  <p>{user.name}</p>
                  <p className="text-[8px]">{user.email}</p>
                </div>
                <button
                  onClick={() => handleLogout()}
                  className="font-abel uppercase text-xs tracking-widest border border-white/20 px-4 py-2 rounded-full hover:bg-white hover:text-black transition-all duration-300 hover:cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 link"
                >
                  logout
                </button>
              </div>
            </>
          ) : (
            <Link
              href="/login"
              className="font-abel uppercase link text-xs tracking-widest border border-white/20 px-6 py-2 rounded-full hover:bg-white hover:text-black transition-all duration-300 hover:cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Toggle */}
        <div className="flex md:hidden items-center link">
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 rounded"
            aria-label="Open navigation menu"
          >
            <Menu className="w-6 h-6 text-white" />
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div
        ref={drawerRef}
        className={`fixed inset-0 z-50 bg-[#050505] flex flex-col justify-center items-center border-l border-white/5 ${
          isDrawerOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <button
          onClick={() => setIsDrawerOpen(false)}
          className="absolute top-6 right-6 md:top-8 md:right-10 p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 rounded"
          aria-label="Close navigation menu"
        >
          <X className="w-8 h-8 text-white opacity-70 hover:opacity-100 transition-opacity" />
        </button>

        <div className="flex flex-col items-center gap-10">
          {user ? (
            <>
              <div className="flex flex-col items-center gap-8 font-days text-3xl uppercase tracking-tighter">
                {navLinks.map((link, i) => (
                  <Link
                    key={i}
                    href={link.url}
                    onClick={() => setIsDrawerOpen(false)}
                    className="drawer-link hover:text-white/70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 rounded px-4 py-2"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              <div className="h-px w-24 bg-white/20 drawer-link my-4"></div>

              <div className="flex flex-col items-center gap-6">
                <div className="flex flex-col items-center font-abel uppercase text-xs tracking-widest opacity-50 drawer-link">
                  <p>{user.name}</p>
                  <p className="text-[10px] mt-1">{user.email}</p>
                </div>
                <button
                  onClick={() => {
                    setIsDrawerOpen(false);
                    handleLogout();
                  }}
                  className="drawer-link font-abel uppercase text-sm tracking-widest border border-white/20 px-8 py-3 rounded-full hover:bg-white hover:text-black transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                >
                  logout
                </button>
              </div>
            </>
          ) : (
            <Link
              href="/login"
              onClick={() => setIsDrawerOpen(false)}
              className="drawer-link font-days text-3xl uppercase tracking-tighter hover:text-white/70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 rounded px-4 py-2"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
