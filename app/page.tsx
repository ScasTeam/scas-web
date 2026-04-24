import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-background text-foreground selection:bg-white selection:text-black">
      {/* Hero Section */}
      <section className="relative flex min-h-screen w-full flex-col items-center justify-center px-6 pt-20 text-center">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10 blur-3xl">
          <div className="h-96 w-96 rounded-full bg-white/20"></div>
        </div>

        <h1 className="z-10 font-days text-7xl md:text-[12rem] leading-none tracking-tighter uppercase mb-4">
          SCAS
        </h1>
        <p className="z-10 max-w-2xl font-abel text-xl md:text-2xl tracking-wide opacity-80 uppercase">
          Smart Campus Attendance System <br />
          <span className="text-sm opacity-50">Efficiency in every scan.</span>
        </p>

        <div className="z-10 mt-12 flex flex-col items-center gap-8">
          <Link
            href="/login"
            className="group relative overflow-hidden rounded-full border border-white/20 px-12 py-4 font-abel text-lg uppercase transition-all hover:bg-white hover:text-black"
          >
            <span className="relative z-10">Get Started</span>
          </Link>

          <div className="flex items-center gap-4 text-xs font-abel uppercase tracking-[0.2em] opacity-40">
            <span>Scan</span>
            <div className="h-px w-8 bg-white/20"></div>
            <span>Verify</span>
            <div className="h-px w-8 bg-white/20"></div>
            <span>Done</span>
          </div>
        </div>

        <div className="absolute bottom-10 left-10 text-[10px] font-abel uppercase tracking-widest opacity-30 [writing-mode:vertical-lr]">
          Scroll to explore
        </div>
      </section>

      {/* Feature Grid - Awwwards Style Layout */}
      <section className="w-full max-w-7xl px-6 py-32">
        <div className="grid grid-cols-1 gap-24 md:grid-cols-2">
          <div className="flex flex-col justify-center">
            <span className="font-days text-sm uppercase text-white/40 mb-4">01. Dynamic QR</span>
            <h2 className="font-days text-4xl md:text-6xl uppercase leading-tight mb-8">
              Secured by <br /> Rotation.
            </h2>
            <p className="font-abel text-lg opacity-70 leading-relaxed max-w-md">
              SCAS utilizes rotating QR codes to prevent attendance fraud. Every code is unique, time-sensitive, and encrypted for maximum security.
            </p>
          </div>
          
          <div className="relative aspect-square w-full bg-white/5 rounded-2xl flex items-center justify-center overflow-hidden border border-white/10 group">
             {/* Abstract QR visual */}
             <div className="grid grid-cols-4 gap-2 opacity-20 group-hover:opacity-40 transition-opacity">
                {[...Array(16)].map((_, i) => (
                  <div key={i} className={`w-8 h-8 ${i % 3 === 0 ? 'bg-white' : 'border border-white'}`}></div>
                ))}
             </div>
             <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
          </div>

          <div className="md:order-last flex flex-col justify-center">
            <span className="font-days text-sm uppercase text-white/40 mb-4">02. Instant Verification</span>
            <h2 className="font-days text-4xl md:text-6xl uppercase leading-tight mb-8">
              Verify in <br /> Real-time.
            </h2>
            <p className="font-abel text-lg opacity-70 leading-relaxed max-w-md">
              Lecturers can verify attendance instantly through their dashboard. Seamlessly integrated with campus databases for effortless reporting.
            </p>
          </div>

          <div className="relative aspect-[4/5] w-full bg-white/5 rounded-2xl flex items-center justify-center overflow-hidden border border-white/10 group">
             {/* Geometric abstract visual */}
             <div className="w-48 h-48 border border-white/20 rotate-45 group-hover:rotate-90 transition-transform duration-1000"></div>
             <div className="absolute w-32 h-32 border border-white/40 -rotate-45 group-hover:-rotate-90 transition-transform duration-1000"></div>
             <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background"></div>
          </div>
        </div>
      </section>

      {/* Footer / Final CTA */}
      <section className="flex w-full flex-col items-center justify-center py-48 text-center border-t border-white/5">
        <h2 className="font-days text-5xl md:text-8xl uppercase tracking-tighter mb-12">
          Ready for <br /> Future?
        </h2>
        <Link
            href="/login"
            className="group relative px-16 py-6 bg-white text-black font-days text-xl uppercase rounded-full hover:scale-105 transition-transform"
          >
            Launch SCAS
        </Link>
        
        <footer className="mt-32 w-full px-10 py-10 flex flex-col md:flex-row justify-between items-end border-t border-white/10 gap-8">
            <div className="text-left">
                <p className="font-days text-2xl">SCAS.</p>
                <p className="font-abel text-sm opacity-40 uppercase tracking-widest">© 2026 Smart Campus</p>
            </div>
            <div className="flex gap-8 font-abel text-sm uppercase tracking-widest opacity-60">
                <a href="#" className="hover:opacity-100">Github</a>
                <a href="#" className="hover:opacity-100">Contact</a>
                <a href="#" className="hover:opacity-100">Privacy</a>
            </div>
        </footer>
      </section>
    </main>
  );
}
