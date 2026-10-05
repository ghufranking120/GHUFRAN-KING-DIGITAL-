import React from 'react';
import { getWhatsAppLink } from '../data/constants';
import { WhatsAppIcon } from './WhatsAppIcon';
import { Sparkles, Bot } from 'lucide-react';

interface FloatingActionsProps {
  onOpenAiAssistant: () => void;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({ onOpenAiAssistant }) => {
  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-2.5 pointer-events-none">
      {/* Floating AI Assistant button per prompt: Icon + Label: AI Assistant */}
      <button
        type="button"
        onClick={onOpenAiAssistant}
        aria-label="Open AI Assistant"
        className="pointer-events-auto flex items-center gap-2 px-3 py-2 rounded-full bg-zinc-900/90 text-white border border-zinc-800 shadow-xl backdrop-blur-md hover:bg-zinc-800 hover:border-zinc-700 active:scale-95 transition-all group"
      >
        <Bot className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
        <span className="text-xs font-semibold">AI Assistant</span>
      </button>

      {/* Floating WhatsApp button */}
      <a
        href={getWhatsAppLink()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp (03113106280)"
        className="pointer-events-auto flex items-center justify-center w-11 h-11 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-xl hover:scale-105 active:scale-95 transition-all ring-1 ring-emerald-400/30"
      >
        <WhatsAppIcon className="w-5 h-5 fill-current" />
      </a>
    </div>
  );
};
