import React from 'react';
import { BRAND, getWhatsAppLink } from '../data/constants';
import { WhatsAppIcon } from './WhatsAppIcon';
import { ArrowRight, Bot, Cpu, Sparkles, Workflow } from 'lucide-react';

interface HeroProps {
  onExploreServices: () => void;
  onEnrollClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreServices, onEnrollClick }) => {
  return (
    <section className="relative pt-12 pb-16 sm:pt-16 sm:pb-20 border-b border-zinc-900 overflow-hidden">
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none opacity-40" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Compact Content */}
          <div className="lg:col-span-7 space-y-4">
            {/* Small badge */}
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full border border-zinc-800 bg-zinc-900/60 text-[11px] font-mono text-zinc-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>{BRAND.heroBadge}</span>
            </div>

            {/* Main Heading: Compact, balanced */}
            <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white leading-tight">
              {BRAND.heroHeading}
            </h1>

            {/* Secondary Heading */}
            <p className="text-sm sm:text-base font-medium text-zinc-300 tracking-tight">
              {BRAND.heroSecondaryHeading}
            </p>

            {/* Short Paragraph */}
            <p className="text-xs sm:text-sm text-zinc-400 max-w-xl leading-relaxed">
              {BRAND.heroDescription}
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              {/* Explore Services */}
              <button
                type="button"
                onClick={onExploreServices}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-black bg-white rounded-lg hover:bg-zinc-200 transition-all duration-150 active:scale-95 shadow-sm"
              >
                <span>Explore Services</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              {/* Enroll Now */}
              <button
                type="button"
                onClick={onEnrollClick}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-zinc-200 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 rounded-lg transition-all duration-150 active:scale-95"
              >
                <span>Enroll Now</span>
              </button>

              {/* WhatsApp Contact Action with WhatsApp Icon */}
              <a
                href={getWhatsAppLink('Hello GHUFRAN KING DIGITAL, I would like to inquire about your services and courses.')}
                target="_blank"
                rel="noopener noreferrer"
                title="Chat on WhatsApp: 03113106280"
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-zinc-300 hover:text-white bg-zinc-900/60 hover:bg-zinc-900 border border-zinc-800/80 rounded-lg transition-colors group"
              >
                <WhatsAppIcon className="w-3.5 h-3.5 fill-current text-emerald-400 group-hover:scale-105 transition-transform" />
                <span className="font-mono text-[11px]">{BRAND.whatsappNumber}</span>
              </a>
            </div>
          </div>

          {/* Right Column: Subtle Futuristic AI Visual */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl border border-zinc-800 bg-[#0a0a0e] p-4 sm:p-5 shadow-2xl overflow-hidden group">
              <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-zinc-900 border border-zinc-800 flex items-center justify-center text-white">
                    <Cpu className="w-3 h-3" />
                  </div>
                  <span className="text-[11px] font-mono text-zinc-300">GKD Autonomous Core</span>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                  System Active
                </span>
              </div>

              {/* Live Architecture Nodes */}
              <div className="space-y-2.5 text-xs">
                <div className="p-3 rounded-lg bg-zinc-900/70 border border-zinc-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bot className="w-3.5 h-3.5 text-zinc-300" />
                    <span className="text-zinc-200 font-medium">Conversational AI &amp; Chatbots</span>
                  </div>
                  <span className="text-[10px] font-mono text-zinc-400">24/7 Live</span>
                </div>

                <div className="p-3 rounded-lg bg-zinc-900/70 border border-zinc-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Workflow className="w-3.5 h-3.5 text-zinc-300" />
                    <span className="text-zinc-200 font-medium">CRM &amp; Messaging Automation</span>
                  </div>
                  <span className="text-[10px] font-mono text-zinc-400">Multi-Channel</span>
                </div>

                <div className="p-3 rounded-lg bg-zinc-900/70 border border-zinc-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-zinc-300" />
                    <span className="text-zinc-200 font-medium">Voice AI Calling Telephony</span>
                  </div>
                  <span className="text-[10px] font-mono text-zinc-400">&lt;500ms Latency</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-zinc-900 flex items-center justify-between text-[11px] text-zinc-500 font-mono">
                <span>Verified Partner</span>
                <span>GHUFRAN KING DIGITAL</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
