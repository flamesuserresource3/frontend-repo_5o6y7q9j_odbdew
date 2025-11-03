import React from 'react';
import Spline from '@splinetool/react-spline';
import { Sparkles } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative min-h-[70vh] md:min-h-[80vh] w-full overflow-hidden bg-gradient-to-b from-black to-[#0a0a14]">
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/vZX5NNlylxke-6DM/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="pt-24 md:pt-28 lg:pt-32 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="text-white">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/90 ring-1 ring-white/15 backdrop-blur">
              <Sparkles className="h-3.5 w-3.5 text-yellow-300" />
              AI Academy • Play while you learn
            </div>
            <h1 className="mt-5 text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              Build AI skills through play
              <span className="block bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-400 bg-clip-text text-transparent">with an interactive robot guide</span>
            </h1>
            <p className="mt-4 text-white/80 max-w-xl">
              Explore machine learning, agents, and data science through immersive mini-games and hands-on challenges.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a href="#game" className="rounded-lg bg-white text-black px-5 py-3 font-semibold shadow hover:shadow-lg transition">Play the Demo</a>
              <a href="#features" className="rounded-lg px-5 py-3 font-semibold border border-white/20 text-white/90 hover:bg-white/10 transition">Browse Tracks</a>
            </div>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0a14]" />
    </section>
  );
}
