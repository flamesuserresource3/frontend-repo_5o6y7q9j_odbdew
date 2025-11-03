import React from 'react';
import { Brain, Bot, LineChart, Layers } from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'Machine Learning Basics',
    desc: 'Understand models, loss, optimization, and evaluation through interactive scenarios.',
  },
  {
    icon: Bot,
    title: 'Agents & LLMs',
    desc: 'Build prompts, tools, and policies while experimenting with agentic workflows.',
  },
  {
    icon: LineChart,
    title: 'Data Science',
    desc: 'Wrangle datasets, visualize insights, and ship reproducible notebooks.',
  },
  {
    icon: Layers,
    title: 'Deep Learning',
    desc: 'Explore CNNs, transformers, and training tricks via guided challenges.',
  },
];

export default function FeaturesGrid() {
  return (
    <section id="features" className="relative w-full py-16 md:py-24 bg-[#0a0a14]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">Choose your track</h2>
          <p className="mt-2 text-white/70">Short, gamified modules that turn complex AI topics into playful, practical lessons.</p>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <article
              key={i}
              className="group relative rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-white/[0.03] p-5 text-white shadow-xl shadow-black/20 hover:shadow-2xl hover:shadow-black/30 transition"
            >
              <div className="h-10 w-10 rounded-xl bg-white/10 ring-1 ring-white/10 grid place-items-center mb-4">
                <f.icon className="h-5 w-5 text-cyan-300" />
              </div>
              <h3 className="font-semibold text-lg leading-tight">{f.title}</h3>
              <p className="mt-2 text-sm text-white/70">{f.desc}</p>
              <div className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition bg-gradient-to-br from-cyan-400/10 via-indigo-400/10 to-transparent" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
