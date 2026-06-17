"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

interface Step {
  num: string;
  title: string;
  desc: string;
}

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);

  const steps: Step[] = [
    {
      num: "01",
      title: "Google SSO & Device Binding",
      desc: "Authenticate seamlessly using Google SSO. SCAS automatically locks the session to your physical device ID to prevent buddy-marking and account sharing.",
    },
    {
      num: "02",
      title: "Rotating QR Generation",
      desc: "For students, SCAS generates a secure batch of 5 staggered, HMAC-signed QR codes locally. Every code rotates every 10 seconds to prevent screenshots and remote attendance fraud.",
    },
    {
      num: "03",
      title: "Camera & Scanner Scanning",
      desc: "Lecturers instantly scan student QR codes via the web camera or the app scanner. Immediate verification cross-checks the current active session coordinates and time offsets.",
    },
    {
      num: "04",
      title: "Generate Reports",
      desc: "At the end of the semester, lecturers can export attendance reports in CSV, XLSX, or PDF formats with a single click, directly from the dashboard.",
    },
  ];

  useGSAP(
    () => {
      // Animate progress line growth based on scroll
      gsap.fromTo(
        progressLineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 60%",
            end: "bottom 80%",
            scrub: true,
          },
        }
      );

      // Animate each step item fading in and scaling up when it hits the center
      const items = gsap.utils.toArray<HTMLElement>(".timeline-item");
      items.forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0.1, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            scrollTrigger: {
              trigger: item,
              start: "top 80%",
              end: "top 45%",
              scrub: true,
            },
          }
        );
      });
    },
    { scope: containerRef, dependencies: [] }
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full max-w-5xl px-6 py-32 mx-auto flex flex-col items-center select-none"
      aria-label="SCAS Workflow Timeline"
    >
      <div className="text-center mb-20">
        <span className="font-days text-sm uppercase text-white/40 tracking-widest block mb-4">
          How it works
        </span>
        <h2 className="font-days text-4xl md:text-6xl uppercase tracking-tighter">
          The SCAS Flow
        </h2>
      </div>

      <div className="relative w-full flex flex-col items-center">
        {/* Background track line */}
        <div 
          className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-white/10 -translate-x-1/2" 
          aria-hidden="true"
        />

        {/* Progress line */}
        <div
          ref={progressLineRef}
          className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-white origin-top -translate-x-1/2"
          aria-hidden="true"
        />

        {steps.map((step, index) => {
          const isEven = index % 2 === 0;
          return (
            <div
              key={index}
              className={`timeline-item w-full flex flex-col md:flex-row items-start md:items-center mb-24 last:mb-0 relative ${
                isEven ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Central connector dot */}
              <div 
                className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-black border-2 border-white -translate-x-1/2 z-10 transition-transform duration-300" 
                aria-hidden="true"
              />

              {/* Spacing holder for horizontal centering */}
              <div className="hidden md:block w-1/2" />

              {/* Timeline Card */}
              <div className="w-full md:w-1/2 pl-12 md:pl-0 md:px-12 flex flex-col">
                <span className="font-days text-5xl md:text-6xl text-white/20 mb-2">
                  {step.num}
                </span>
                <h3 className="font-days text-xl md:text-2xl uppercase mb-3 text-white">
                  {step.title}
                </h3>
                <p className="font-abel text-base opacity-70 leading-relaxed text-pretty">
                  {step.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
