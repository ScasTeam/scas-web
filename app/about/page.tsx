"use client";

import Header from "@/components/Header";
import Footer from "@/components/landing/Footer";
import LenisProvider from "@/components/LenisProvider";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function About() {
  const container = useRef(null);

  useGSAP(
    () => {
      gsap.from(".title", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
        stagger: 0.1,
      });
      
      gsap.from(".fade-in", {
        y: 20,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.5,
        stagger: 0.2,
      });
    },
    { scope: container }
  );

  return (
    <LenisProvider>
      <Header />
      <main 
        ref={container}
        className="flex min-h-screen flex-col items-center bg-background text-foreground selection:bg-white selection:text-black"
      >
        {/* Hero Section */}
        <section className="relative flex min-h-[70vh] w-full flex-col items-center justify-center px-6 pt-32 text-center">
          <div className="overflow-hidden border-y-2 mb-6 border-white/20">
            <h1 className="z-10 font-days text-4xl md:text-8xl leading-tight tracking-tighter uppercase px-4 title w-fit">
              About SCAS
            </h1>
          </div>
          <p className="z-10 max-w-3xl font-abel text-lg md:text-2xl tracking-wide opacity-80 uppercase px-6 fade-in">
            Revolutionizing campus attendance through <br />
            <span className="text-sm opacity-50">Innovation, Security, and Seamless Integration.</span>
          </p>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 blur-3xl -z-0">
            <div className="h-96 w-96 rounded-full bg-white/40"></div>
          </div>
        </section>

        {/* Vision & Mission Section */}
        <section className="w-full max-w-7xl px-6 py-32 border-t border-white/5">
          <div className="grid grid-cols-1 gap-24 md:grid-cols-2">
            <div className="flex flex-col justify-center fade-in">
              <span className="font-days text-sm uppercase text-white/40 mb-4">Our Vision</span>
              <h2 className="font-days text-4xl md:text-6xl uppercase leading-tight mb-8">
                The Future of <br /> Attendance.
              </h2>
              <p className="font-abel text-lg opacity-70 leading-relaxed max-w-md">
                We envision a campus where administrative tasks are invisible, allowing students and educators to focus entirely on what matters most: learning and growth.
              </p>
            </div>
            
            <div className="relative aspect-square w-full bg-white/5 rounded-2xl flex items-center justify-center overflow-hidden border border-white/10 group fade-in">
               <div className="w-64 h-64 border-t-2 border-r-2 border-white/20 rounded-tr-full group-hover:rotate-180 transition-transform duration-1000"></div>
               <div className="absolute w-48 h-48 border-b-2 border-l-2 border-white/10 rounded-bl-full group-hover:-rotate-180 transition-transform duration-1000"></div>
               <div className="absolute inset-0 bg-gradient-to-br from-background via-transparent to-background"></div>
            </div>

            <div className="md:order-last flex flex-col justify-center fade-in">
              <span className="font-days text-sm uppercase text-white/40 mb-4">Our Mission</span>
              <h2 className="font-days text-4xl md:text-6xl uppercase leading-tight mb-8">
                Empowering <br /> Institutions.
              </h2>
              <p className="font-abel text-lg opacity-70 leading-relaxed max-w-md">
                Our mission is to provide secure, reliable, and user-friendly tools that streamline attendance tracking, reduce fraud, and provide actionable insights for academic institutions.
              </p>
            </div>

            <div className="relative aspect-square w-full bg-white/5 rounded-2xl flex items-center justify-center overflow-hidden border border-white/10 group fade-in">
               <div className="grid grid-cols-3 gap-4">
                  {[...Array(9)].map((_, i) => (
                    <div key={i} className={`w-12 h-12 rounded-full border border-white/20 ${i === 4 ? 'bg-white/40' : ''} group-hover:scale-110 transition-transform`}></div>
                  ))}
               </div>
               <div className="absolute inset-0 bg-gradient-to-tr from-background via-transparent to-background"></div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="w-full max-w-7xl px-6 py-32 bg-white/2">
            <div className="text-center mb-24 fade-in">
                <h2 className="font-days text-5xl md:text-7xl uppercase tracking-tighter">Core Values</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {[
                    { title: "Security", desc: "Advanced encryption and rotating codes to ensure data integrity." },
                    { title: "Efficiency", desc: "Minimizing the time spent on attendance for both students and lecturers." },
                    { title: "Transparency", desc: "Clear reporting and real-time tracking for all academic stakeholders." }
                ].map((value, i) => (
                    <div key={i} className="flex flex-col p-10 border border-white/10 rounded-2xl hover:bg-white/5 transition-colors fade-in">
                        <span className="font-days text-2xl mb-4 text-white/40">0{i+1}.</span>
                        <h3 className="font-days text-3xl uppercase mb-6">{value.title}</h3>
                        <p className="font-abel text-base opacity-60 leading-relaxed">{value.desc}</p>
                    </div>
                ))}
            </div>
        </section>

        <Footer />
      </main>
    </LenisProvider>
  );
}
