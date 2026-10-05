import React, { useState } from 'react';
import { FAQS } from '../data/academyData';
import { getWhatsAppLink } from '../data/constants';
import { WhatsAppIcon } from './WhatsAppIcon';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-16 sm:py-20 border-b border-zinc-900 bg-[#08080a] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
            <HelpCircle className="w-3.5 h-3.5 text-zinc-300" />
            <span>Information</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-1.5 text-xs sm:text-sm text-zinc-400">
            Answers to common questions regarding our agency services, AI automation, and training programs.
          </p>
        </div>

        {/* Compact Accordion */}
        <div className="space-y-2">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.question}
                className="rounded-xl border border-zinc-800 bg-[#0a0a0e] overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full p-4 sm:p-4.5 text-left flex items-center justify-between gap-4 hover:bg-zinc-900/40 transition-colors"
                >
                  <span className="text-xs sm:text-sm font-semibold text-white tracking-tight">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-zinc-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-white' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 sm:px-4.5 text-xs text-zinc-400 leading-relaxed border-t border-zinc-900/80 pt-3">
                    <p>{faq.answer}</p>
                    {idx === 8 && (
                      <div className="mt-2.5">
                        <a
                          href={getWhatsAppLink()}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
                        >
                          <WhatsAppIcon className="w-3.5 h-3.5 fill-current" />
                          <span>Direct WhatsApp: 03113106280</span>
                        </a>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
