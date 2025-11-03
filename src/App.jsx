import React from 'react';
import Navbar from './components/Navbar.jsx';
import HeroSection from './components/HeroSection.jsx';
import MiniGame from './components/MiniGame.jsx';
import FeaturesGrid from './components/FeaturesGrid.jsx';

function App() {
  return (
    <div className="min-h-screen w-full bg-black text-white">
      <Navbar />
      <HeroSection />
      <MiniGame />
      <FeaturesGrid />
      <section id="apply" className="w-full py-14 bg-gradient-to-b from-[#0a0a14] to-black">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl md:text-3xl font-bold">Ready to level up your AI journey?</h3>
          <p className="mt-2 text-white/70 max-w-2xl mx-auto">Join the next cohort and learn by doing—guided by an adorable robot mentor and a library of interactive challenges.</p>
          <a href="#game" className="inline-flex items-center justify-center mt-6 rounded-xl bg-white text-black px-6 py-3 font-semibold shadow hover:shadow-lg transition">Try the Demo</a>
        </div>
      </section>
    </div>
  );
}

export default App;
