import React, { useState } from 'react';
import { COURSE_PHASES } from '../data/academyData';
import { getWhatsAppLink } from '../data/constants';
import {
  Layers,
  ChevronDown,
  CheckCircle2,
  Calendar,
  Sparkles,
  Award,
  ArrowRight,
} from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';

interface CourseRoadmapProps {
  onEnrollClick: () => void;
}

export const CourseRoadmap: React.FC<CourseRoadmapProps> = ({ onEnrollClick }) => {
  const [activePhaseIndex, setActivePhaseIndex] = useState<number>(0);
  const activePhase = COURSE_PHASES[activePhaseIndex];

  return (
    <section id="roadmap" className="py-16 sm:py-20 border-b border-zinc-900 bg-[#070709] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-xl mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
            <Layers className="w-3.5 h-3.5 text-zinc-300" />
            <span>20-Class Roadmap</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Course Roadmap
          </h2>
          <p className="mt-1.5 text-xs sm:text-sm text-zinc-400">
            A comprehensive, progressive curriculum taking you from foundational agent thinking to launching monetizable AI services.
          </p>
        </div>

        {/* Phase Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 no-scrollbar">
          {COURSE_PHASES.map((phase, idx) => {
            const isActive = idx === activePhaseIndex;
            return (
              <button
                key={phase.phaseNumber}
                type="button"
                onClick={() => setActivePhaseIndex(idx)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono whitespace-nowrap transition-all duration-150 ${
                  isActive
                    ? 'bg-white text-black font-semibold shadow-sm'
                    : 'bg-zinc-900/80 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800'
                }`}
              >
                <span>{phase.phaseNumber}</span>
              </button>
            );
          })}
        </div>

        {/* Active Phase Container */}
        {activePhase && (
          <div className="p-5 sm:p-7 rounded-2xl border border-zinc-800 bg-[#0a0a0e] shadow-xl">
            {/* Phase Heading */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-zinc-800/80 gap-3">
              <div>
                <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">
                  {activePhase.phaseNumber} of 06
                </span>
                <h3 className="font-display text-lg sm:text-xl font-bold text-white tracking-tight mt-0.5">
                  {activePhase.title}
                </h3>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                <span>{activePhase.classes.length} Classes</span>
              </div>
            </div>

            {/* Classes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              {activePhase.classes.map((cls) => (
                <div
                  key={cls.classNumber}
                  className="p-4 rounded-xl border border-zinc-800/90 bg-zinc-900/40 hover:border-zinc-700 transition-colors flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-mono font-semibold text-zinc-300">
                        {cls.classNumber}
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
                    </div>

                    <h4 className="text-xs sm:text-sm font-bold text-white mb-3 tracking-tight">
                      {cls.title}
                    </h4>

                    {/* Topics */}
                    <ul className="space-y-1.5 text-xs text-zinc-400">
                      {cls.topics.map((topic) => (
                        <li key={topic} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-zinc-500 shrink-0 mt-0.5" />
                          <span className="leading-snug">{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            {/* Phase Capstone Action */}
            <div className="mt-8 pt-5 border-t border-zinc-900 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-zinc-400">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>Hands-on live capstone projects included in every phase</span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={onEnrollClick}
                  className="px-3.5 py-1.5 text-xs font-semibold text-black bg-white rounded-lg hover:bg-zinc-200 transition-colors inline-flex items-center gap-1.5"
                >
                  <span>Enroll for This Phase</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <a
                  href={getWhatsAppLink(`Hello GHUFRAN KING DIGITAL, I want to learn more about ${activePhase.phaseNumber} (${activePhase.title}).`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-zinc-400 hover:text-emerald-400 transition-colors"
                  title="Inquire on WhatsApp"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5 fill-current" />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
