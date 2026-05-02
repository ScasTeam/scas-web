import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import Footer from "@/components/landing/Footer";
import Header from "@/components/Header";
import LenisProvider from "@/components/LenisProvider";

export default function Home() {
  return (
    <LenisProvider>
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-between bg-background text-foreground selection:bg-white selection:text-black">
        <Hero />
        <Features />
        <Footer />
      </main>
    </LenisProvider>
  );
}
