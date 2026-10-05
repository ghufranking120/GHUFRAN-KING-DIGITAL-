import React from 'react';
import { WHY_CHOOSE_US } from '../data/academyData';
import {
  CheckCircle,
  Cpu,
  Sparkles,
  Headphones,
  Briefcase,
  BookOpen,
} from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const iconMap: Record<string, React.ElementType> = {
    CheckCircle,
    Cpu,
    Sparkles,
    Headphones,
    Briefcase,
    BookOpen,
  };

  return (
    <section className="py-16 sm:py-20 border-b border-zinc-900 bg-[#08080a] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
            <span>Our Advantage</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Why GHUFRAN KING DIGITAL?
          </h2>
          <p className="mt-1.5 text-xs sm:text-sm text-zinc-400">
            A disciplined, results-driven technical partnership designed for long-term digital growth.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {WHY_CHOOSE_US.map((item) => {
            const Icon = iconMap[item.icon] || CheckCircle;
            return (
              <div
                key={item.id}
                className="p-5 rounded-xl border border-zinc-800 bg-[#0a0a0e] hover:border-zinc-700 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300 mb-3">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-bold text-white mb-2 tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
