"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function Features() {
  const container = useRef(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray(".feature-card");
      
      cards.forEach((card: any, index) => {
        if (index < cards.length - 1) {
          gsap.to(card, {
            scale: 0.95,
            opacity: 0.4,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: () => `top ${window.innerWidth < 768 ? 24 : 96}px`,
              end: "bottom top", 
              scrub: true,
              invalidateOnRefresh: true,
            }
          });
        }
      });
    },
    { scope: container }
  );

  return (
    <section ref={container} className="w-full bg-background relative pt-32 pb-48 z-20">
      <div className="max-w-7xl mx-auto px-6 mb-24">
        <h2 className="font-days text-4xl md:text-6xl uppercase tracking-tighter">Core Systems.</h2>
      </div>

      <div className="max-w-7xl mx-auto px-6 flex flex-col gap-12">
        
        <div className="feature-card sticky top-6 md:top-24 w-full min-h-[auto] md:min-h-[60vh] bg-[#050505] rounded-[2rem] border border-white/5 p-6 md:p-16 flex flex-col md:flex-row justify-between gap-8 md:gap-12 overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none"></div>
          
          <div className="w-full md:w-1/2 flex flex-col justify-between z-10">
            <span className="font-days text-xs text-white/30 tracking-widest uppercase mb-6 md:mb-12">01 / Dynamic Security</span>
            <div>
              <h3 className="font-days text-2xl sm:text-3xl md:text-6xl uppercase leading-tight mb-4 md:mb-6">Cryptographic Rotation.</h3>
              <p className="font-abel text-base md:text-lg opacity-70 leading-relaxed max-w-md">
                Every 10 seconds, the SCAS engine generates a new HMAC-signed QR code. This entirely eliminates the possibility of screenshots, screen-sharing, or remote proxy attendance.
              </p>
            </div>
          </div>

          <div className="w-full md:w-1/2 flex items-center justify-center relative min-h-[250px] md:min-h-[300px]">
             <div className="absolute w-[80%] aspect-square border border-white/10 rounded-full flex items-center justify-center animate-[spin_20s_linear_infinite]">
               <div className="absolute top-0 left-1/2 w-2 h-2 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
             </div>
             <div className="absolute w-[60%] aspect-square border border-white/10 rounded-full flex items-center justify-center animate-[spin_15s_linear_infinite_reverse]">
                <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-white rounded-full -translate-x-1/2 translate-y-1/2"></div>
             </div>
          </div>
        </div>

        <div className="feature-card sticky top-6 md:top-24 w-full min-h-[auto] md:min-h-[60vh] bg-[#0a0a0a] rounded-[2rem] border border-white/5 p-6 md:p-16 flex flex-col md:flex-row justify-between gap-8 md:gap-12 overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-bl from-white/[0.02] to-transparent pointer-events-none"></div>

          <div className="w-full md:w-1/2 flex flex-col justify-between z-10 order-2 md:order-1">
            <span className="font-days text-xs text-white/30 tracking-widest uppercase mb-6 md:mb-12">02 / Instant Verification</span>
            <div>
              <h3 className="font-days text-2xl sm:text-3xl md:text-6xl uppercase leading-tight mb-4 md:mb-6">Real-Time Processing.</h3>
              <p className="font-abel text-base md:text-lg opacity-70 leading-relaxed max-w-md">
                Lecturers verify cryptographic signatures instantly through their dedicated dashboard. Integrated directly with the campus database for zero-latency recording.
              </p>
            </div>
          </div>

          <div className="w-full md:w-1/2 flex items-center justify-center relative min-h-[200px] md:min-h-[300px] order-1 md:order-2">
             <div className="grid grid-cols-4 gap-4">
                {[...Array(16)].map((_, i) => (
                  <div key={i} className={`w-8 h-8 rounded-sm ${i % 5 === 0 ? 'bg-white' : 'border border-white/20'}`}></div>
                ))}
             </div>
          </div>
        </div>
        
        <div className="feature-card sticky top-6 md:top-24 w-full min-h-[auto] md:min-h-[60vh] bg-[#0f0f0f] rounded-[2rem] border border-white/5 p-6 md:p-16 flex flex-col md:flex-row justify-between gap-8 md:gap-12 overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-t from-white/[0.03] to-transparent pointer-events-none"></div>

          <div className="w-full md:w-1/2 flex flex-col justify-between z-10">
            <span className="font-days text-xs text-white/30 tracking-widest uppercase mb-6 md:mb-12">03 / Device Locking</span>
            <div>
              <h3 className="font-days text-2xl sm:text-3xl md:text-6xl uppercase leading-tight mb-4 md:mb-6">Hardware Binding.</h3>
              <p className="font-abel text-base md:text-lg opacity-70 leading-relaxed max-w-md">
                Sessions are hard-locked to the student's physical device signature on first login. Multi-device fraud triggers immediate OTP lockdown, securing the attendance process.
              </p>
            </div>
          </div>

          <div className="w-full md:w-1/2 flex items-center justify-center relative min-h-[200px] md:min-h-[300px]">
             <div className="w-48 h-48 border border-white/20 rotate-45 flex items-center justify-center">
                <div className="w-32 h-32 border border-white/40 -rotate-90"></div>
             </div>
          </div>
        </div>

      </div>
    </section>
  );
}
