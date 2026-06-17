"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { Menu } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background text-foreground relative">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      <div className="flex-1 w-full md:ml-56 flex flex-col min-h-screen transition-all duration-300">
        <header className="md:hidden sticky top-0 z-30 flex items-center px-4 py-4 bg-[#050505]/80 backdrop-blur-md border-b border-white/5">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 -ml-2 text-white/70 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 rounded"
            aria-label="Open sidebar"
          >
            <Menu className="w-6 h-6" />
          </button>
          <span className="font-days text-xl tracking-tighter ml-4">SCAS.</span>
        </header>
        <div className="flex-1 overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
}
