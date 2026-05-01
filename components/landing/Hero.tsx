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
      const splitTitle = SplitText.create(".title", { type: "words, chars" });

      gsap.from(splitTitle.chars, {
        duration: 1,
        yPercent: (i) => (i % 2 === 0 ? 100 : -100),
        stagger: 0.2,
        ease: "expo.out",
      });
    },
    { scope: container, dependencies: [] },
  );

  return (
    <section
      ref={container}
      className="relative flex min-h-screen w-full flex-col items-center justify-center px-6 pt-20 text-center"
    >
      <div className="overflow-hidden border-y-8 mb-6">
        <h1 className="z-10 font-days text-6xl md:text-[24rem] leading-72 tracking-tighter uppercase px-4 title w-fit">
          SCAS
        </h1>
      </div>
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10 blur-3xl">
        <div className="h-96 w-96 rounded-full bg-white/20"></div>
      </div>
      <p className="z-10 max-w-2xl font-abel text-lg md:text-2xl tracking-wide opacity-80 uppercase px-6">
        Smart Campus Attendance System <br />
        <span className="text-sm opacity-50">Efficiency in every scan.</span>
      </p>

      <div className="z-10 mt-12 flex flex-col items-center gap-8 w-full px-6">
        <Link
          href="/login"
          className="group relative overflow-hidden rounded-full border border-white/20 px-10 md:px-12 py-4 font-abel text-lg uppercase transition-all hover:bg-white hover:text-black w-full max-w-[300px] md:w-auto"
        >
          <span className="relative z-10">Get Started</span>
        </Link>

        <div className="flex items-center gap-4 text-[10px] md:text-xs font-abel uppercase tracking-[0.2em] opacity-40">
          <span>Scan</span>
          <div className="h-px w-6 md:w-8 bg-white/20"></div>
          <span>Verify</span>
          <div className="h-px w-6 md:w-8 bg-white/20"></div>
          <span>Done</span>
        </div>
      </div>
      <div className="absolute bottom-10 left-6 md:left-10 text-[10px] font-abel uppercase tracking-widest opacity-30 [writing-mode:vertical-lr]">
        Scroll to explore
      </div>
    </section>
  );
}
