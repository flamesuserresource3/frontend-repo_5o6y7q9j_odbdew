import React from 'react';
import { Rocket, GraduationCap } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 backdrop-blur bg-black/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-indigo-500 via-blue-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <GraduationCap className="h-5 w-5 text-white" />
          </div>
          <span className="font-semibold tracking-tight text-white">NeuraPlay Academy</span>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm text-white/80">
          <a href="#game" className="hover:text-white transition">Play</a>
          <a href="#features" className="hover:text-white transition">Tracks</a>
          <a href="#apply" className="hover:text-white transition">Apply</a>
        </nav>
        <a
          href="#apply"
          className="inline-flex items-center gap-2 rounded-lg bg-white text-black px-4 py-2 text-sm font-medium shadow hover:shadow-lg transition"
        >
          <Rocket className="h-4 w-4" />
          Start Learning
        </a>
      </div>
    </header>
  );
}
