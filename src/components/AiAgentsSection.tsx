import React, { useState } from 'react';
import { AI_AGENTS_SHOWCASE, AgentCard } from '../data/academyData';
import { getWhatsAppLink } from '../data/constants';
import {
  MessageSquare,
  Mic,
  PhoneCall,
  Smartphone,
  Filter,
  Headphones,
  Calendar,
  Workflow,
  Sparkles,
  Bot,
  ArrowRight,
  X,
} from 'lucide-react';

interface AiAgentsSectionProps {
  onOpenAiAssistant: () => void;
  onEnrollClick: () => void;
}

export const AiAgentsSection: React.FC<AiAgentsSectionProps> = ({
  onOpenAiAssistant,
  onEnrollClick,
}) => {
  const [selectedAgent, setSelectedAgent] = useState<AgentCard | null>(null);

  const iconMap: Record<string, React.ElementType> = {
    MessageSquare,
    Mic,
    PhoneCall,
    Smartphone,
    Filter,
    Headphones,
    Calendar,
    Workflow,
  };

  return (
    <section id="ai-agents" className="py-16 sm:py-20 border-b border-zinc-900 bg-[#070709] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
              <Bot className="w-3.5 h-3.5 text-zinc-300" />
              <span>Intelligent Automation</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
              AI AGENTS &amp; AUTOMATION
            </h2>
            <p className="mt-1.5 text-xs sm:text-sm text-zinc-400">
              Autonomous agents and voice pipelines designed to streamline repetitive operations.
            </p>
          </div>

          <div>
            <button
              type="button"
              onClick={onOpenAiAssistant}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-black bg-white rounded-lg hover:bg-zinc-200 transition-colors shadow-sm active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Talk to AI Assistant</span>
            </button>
          </div>
        </div>

        {/* 8 AI Agent Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {AI_AGENTS_SHOWCASE.map((agent) => {
            const Icon = iconMap[agent.icon] || Bot;
            return (
              <div
                key={agent.id}
                className="p-5 rounded-xl border border-zinc-800 bg-[#0a0a0e] hover:border-zinc-700 transition-colors flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300 group-hover:text-white transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-mono text-zinc-500 uppercase">
                      {agent.category}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-white mb-2 tracking-tight">
                    {agent.title}
                  </h3>

                  <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                    {agent.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-zinc-900 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setSelectedAgent(agent)}
                    className="text-xs font-medium text-zinc-300 hover:text-white inline-flex items-center gap-1 transition-colors"
                  >
                    <span>Capabilities</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>

                  <a
                    href={getWhatsAppLink(`Hello GHUFRAN KING DIGITAL, I want to learn more about ${agent.title}.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-zinc-500 hover:text-emerald-400 transition-colors"
                  >
                    Inquire
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Agent Detail Modal */}
      {selectedAgent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-md bg-[#0c0c10] border border-zinc-800 rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-start justify-between border-b border-zinc-800 pb-3">
              <div>
                <span className="text-[10px] font-mono text-zinc-500 uppercase">
                  {selectedAgent.category}
                </span>
                <h4 className="text-base font-bold text-white mt-0.5">
                  {selectedAgent.title}
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setSelectedAgent(null)}
                className="p-1 text-zinc-400 hover:text-white rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-zinc-300 leading-relaxed">
              {selectedAgent.description}
            </p>

            <div className="p-3 rounded-lg bg-zinc-900/60 border border-zinc-800 space-y-1.5 text-xs text-zinc-400">
              <div className="font-semibold text-white">Core Capabilities:</div>
              {selectedAgent.capabilities.map((cap) => (
                <div key={cap} className="text-[11px]">
                  • {cap}
                </div>
              ))}
            </div>

            <div className="pt-2 flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setSelectedAgent(null);
                  onEnrollClick();
                }}
                className="flex-1 py-2 text-xs font-semibold text-black bg-white rounded-lg hover:bg-zinc-200 transition-colors"
              >
                Enroll to Learn / Build
              </button>

              <a
                href={getWhatsAppLink(`Hello GHUFRAN KING DIGITAL, I want to build a ${selectedAgent.title}.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 text-xs text-zinc-300 hover:text-white bg-zinc-900 border border-zinc-800 rounded-lg hover:bg-zinc-800 transition-colors"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
