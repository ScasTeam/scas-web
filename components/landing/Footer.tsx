import Link from "next/link";

export default function Footer() {
  return (
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
  );
}
