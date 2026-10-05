import React from 'react';
import { ABOUT_FEATURES } from '../data/academyData';
import { BRAND } from '../data/constants';
import { Bot, TrendingUp, Layers } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const iconMap: Record<string, React.ElementType> = {
    Bot,
    TrendingUp,
    Layers,
  };

  return (
    <section id="about" className="py-16 sm:py-20 border-b border-zinc-900 bg-[#070709] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Heading and Narrative */}
          <div className="lg:col-span-6 space-y-4">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400 uppercase tracking-wider">
              <span>Overview</span>
            </div>

            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
              About GHUFRAN KING DIGITAL
            </h2>

            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              GHUFRAN KING DIGITAL is a modern digital and AI-focused brand helping individuals, creators and businesses learn, build and use modern technology.
            </p>

            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              Our focus includes AI agents, automation, chatbots, voice AI, digital marketing, websites, ecommerce and practical digital skills.
            </p>

            <div className="pt-2 text-xs font-mono text-zinc-500">
              Verified Agency &amp; Training Partner · WhatsApp: {BRAND.whatsappNumber}
            </div>
          </div>

          {/* Right Column: 3 Small Feature Cards */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            {ABOUT_FEATURES.map((feat) => {
              const Icon = iconMap[feat.icon] || Bot;
              return (
                <div
                  key={feat.id}
                  className="p-4 rounded-xl border border-zinc-800 bg-[#0a0a0e] hover:border-zinc-700 transition-colors flex flex-col justify-between"
                >
                  <div>
                    <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300 mb-3">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="text-xs sm:text-sm font-bold text-white mb-1.5 tracking-tight">
                      {feat.title}
                    </h3>
                    <p className="text-[11px] text-zinc-400 leading-relaxed">
                      {feat.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
