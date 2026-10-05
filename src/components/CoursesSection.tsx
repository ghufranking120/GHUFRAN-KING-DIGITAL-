import React from 'react';
import { getWhatsAppLink } from '../data/constants';
import { CheckCircle2, ArrowRight, BookOpen } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';

interface CoursesSectionProps {
  onEnrollClick: () => void;
  onExploreRoadmap: () => void;
}

export const CoursesSection: React.FC<CoursesSectionProps> = ({
  onEnrollClick,
  onExploreRoadmap,
}) => {
  const highlights = [
    '20 Classes',
    'Practical Projects',
    'AI Tools',
    'Chatbots',
    'Voice AI',
    'Automation',
    'Digital Marketing',
    'Ecommerce',
    'Final Project',
    'Certificate',
  ];

  return (
    <section id="courses" className="py-16 sm:py-20 border-b border-zinc-900 bg-[#08080a] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
            <BookOpen className="w-3.5 h-3.5 text-zinc-300" />
            <span>Curriculum</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
            AI &amp; Digital Skills Courses
          </h2>
          <p className="mt-1.5 text-xs sm:text-sm text-zinc-400">
            Professional skill programs designed for creators, developers, and agency owners.
          </p>
        </div>

        {/* Master AI Agents Course Showcase Card */}
        <div className="p-6 sm:p-8 rounded-2xl border border-zinc-800 bg-[#0a0a0e] shadow-xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[11px] font-mono text-zinc-300">
                <span>Cohort Program</span>
                <span>•</span>
                <span className="text-emerald-400">Live Hands-on Labs</span>
              </div>

              <div>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight">
                  MASTER AI AGENTS
                </h3>
                <p className="text-xs sm:text-sm font-medium text-zinc-300 mt-1">
                  Learn • Build • Automate
                </p>
              </div>

              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-xl">
                A structured, step-by-step masterclass taking you from foundational AI principles to constructing autonomous agents, low-latency voice bots, messaging integrations, and high-margin agency services.
              </p>

              {/* 10 Highlights Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2">
                {highlights.map((item) => (
                  <div key={item} className="flex items-center gap-2 text-xs text-zinc-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={onExploreRoadmap}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-black bg-white rounded-lg hover:bg-zinc-200 transition-all duration-150 active:scale-95 shadow-sm"
                >
                  <span>View Course</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={onEnrollClick}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-zinc-200 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-lg transition-all duration-150 active:scale-95"
                >
                  <span>Enroll Now</span>
                </button>

                <a
                  href={getWhatsAppLink('Hello GHUFRAN KING DIGITAL, I want to inquire about the MASTER AI AGENTS course.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-xs text-zinc-400 hover:text-white transition-colors"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5 fill-current text-emerald-400" />
                  <span>WhatsApp Inquiries</span>
                </a>
              </div>
            </div>

            {/* Right Summary Badge */}
            <div className="lg:col-span-5 bg-zinc-900/60 border border-zinc-800/90 rounded-xl p-5 space-y-3.5 text-xs">
              <div className="text-zinc-200 font-bold border-b border-zinc-800 pb-2">
                Course Specifications
              </div>

              <div className="flex justify-between py-1 border-b border-zinc-900">
                <span className="text-zinc-400">Total Duration:</span>
                <span className="font-mono text-white">20 Intensive Classes</span>
              </div>

              <div className="flex justify-between py-1 border-b border-zinc-900">
                <span className="text-zinc-400">Structure:</span>
                <span className="font-mono text-white">6 Structured Phases</span>
              </div>

              <div className="flex justify-between py-1 border-b border-zinc-900">
                <span className="text-zinc-400">Prerequisites:</span>
                <span className="font-mono text-emerald-400">None (No Coding Needed)</span>
              </div>

              <div className="flex justify-between py-1 border-b border-zinc-900">
                <span className="text-zinc-400">Outcome:</span>
                <span className="font-mono text-white">Live Project Portfolio &amp; Certificate</span>
              </div>

              <div className="flex justify-between py-1">
                <span className="text-zinc-400">Support Desk:</span>
                <span className="font-mono text-zinc-300">03113106280</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
