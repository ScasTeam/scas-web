"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import Link from "next/link";
import { useRef } from "react";

gsap.registerPlugin(SplitText);

export default function Hero() {
  const container = useRef(null);

  useGSAP(
    () => {
      const splitTitle = new SplitText(".hero-title", { type: "chars" });

      gsap.from(splitTitle.chars, {
        duration: 1.2,
        yPercent: 120,
        opacity: 0,
        stagger: 0.05,
        ease: "power4.out",
        delay: 0.2,
      });

      gsap.from(".hero-element", {
        duration: 1,
        y: 30,
        opacity: 0,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.8,
      });

      gsap.to(".scanner-line", {
        y: "100vh",
        duration: 4,
        ease: "none",
        repeat: -1,
      });

      gsap.to(container.current, {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: container, dependencies: [] },
  );

  return (
    <section
      ref={container}
      className="relative flex min-h-[90vh] w-full flex-col justify-end px-6 md:px-10 pb-20 pt-32 overflow-hidden bg-background"
    >
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_100%_100%_at_50%_0%,black,transparent)]"></div>

      <div className="scanner-line absolute top-[-200px] left-1/3 w-[1px] h-[200px] bg-gradient-to-b from-transparent via-white to-transparent opacity-30 z-0"></div>

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-12">
        <div className="flex flex-col">
          <div className="overflow-y-hidden mb-4 pb-2 px-2">
            <h1 className="hero-title font-days text-6xl md:text-7xl lg:text-9xl xl:text-[12rem] leading-[0.8] tracking-tighter uppercase -ml-2 text-white">
              SCAS.
            </h1>
          </div>
          <div className="flex items-center gap-4 hero-element">
            <div className="h-px w-12 bg-white/30"></div>
            <p className="font-abel text-xs md:text-sm tracking-[0.2em] opacity-60 uppercase max-w-xs">
              Smart Campus Attendance System
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-8 md:items-end md:text-right hero-element max-w-sm mb-4">
          <p className="font-abel text-lg opacity-80 leading-relaxed text-pretty">
            Redefining classroom verification through secure, rotating
            cryptographic codes. No buddy-marking. No compromises.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 md:justify-end w-full">
            <Link
              href="/login"
              className="group relative flex items-center justify-center overflow-hidden rounded-full border border-white/20 bg-white/5 px-8 py-4 font-abel text-sm uppercase tracking-widest transition-all hover:bg-white hover:text-black hover:scale-105"
            >
              <span>Initialize</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
