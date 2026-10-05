import React, { useState } from 'react';
import { SERVICES_LIST, ServiceItem } from '../data/academyData';
import { getWhatsAppLink } from '../data/constants';
import {
  TrendingUp,
  Share2,
  Bot,
  PhoneCall,
  Workflow,
  Globe,
  ShoppingBag,
  GraduationCap,
  ArrowRight,
  X,
  CheckCircle2,
} from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';

interface ServicesSectionProps {
  onEnrollClick: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onEnrollClick }) => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const iconMap: Record<string, React.ElementType> = {
    TrendingUp,
    Share2,
    Bot,
    PhoneCall,
    Workflow,
    Globe,
    ShoppingBag,
    GraduationCap,
  };

  return (
    <section id="services" className="py-16 sm:py-20 border-b border-zinc-900 bg-[#08080a] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header: Compact & Medium Size */}
        <div className="max-w-xl mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
            <span>Capabilities</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Our Services
          </h2>
          <p className="mt-1.5 text-xs sm:text-sm text-zinc-400">
            Practical Digital &amp; AI Solutions
          </p>
        </div>

        {/* 8 Clean Service Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SERVICES_LIST.map((service) => {
            const Icon = iconMap[service.icon] || Bot;
            return (
              <div
                key={service.id}
                className="p-5 rounded-xl border border-zinc-800 bg-[#0a0a0e] hover:border-zinc-700 transition-colors flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300 group-hover:text-white transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                      {service.number}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-white mb-2 tracking-tight">
                    {service.title}
                  </h3>

                  <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                    {service.description}
                  </p>

                  {/* Bullet features */}
                  <ul className="space-y-1.5 mb-5 text-[11px] text-zinc-400">
                    {service.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-1.5">
                        <span className="text-zinc-600 mt-0.5">•</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-3 border-t border-zinc-900 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setSelectedService(service)}
                    className="text-xs font-medium text-zinc-300 hover:text-white inline-flex items-center gap-1 transition-colors"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>

                  <a
                    href={getWhatsAppLink(`Hello GHUFRAN KING DIGITAL, I am interested in your ${service.title} service.`)}
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

      {/* Learn More Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-md bg-[#0c0c10] border border-zinc-800 rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-start justify-between border-b border-zinc-800 pb-3">
              <div>
                <span className="text-[10px] font-mono text-zinc-500 uppercase">
                  {selectedService.number}
                </span>
                <h4 className="text-base font-bold text-white mt-0.5">
                  {selectedService.title}
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setSelectedService(null)}
                className="p-1 text-zinc-400 hover:text-white rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-zinc-300 leading-relaxed">
              {selectedService.description}
            </p>

            <div className="p-3 rounded-lg bg-zinc-900/60 border border-zinc-800 text-xs text-zinc-400 space-y-2">
              <div className="font-semibold text-white">Included Capabilities:</div>
              <div className="grid grid-cols-1 gap-1.5">
                {selectedService.features.map((f) => (
                  <div key={f} className="flex items-center gap-2 text-[11px]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 flex items-center gap-2">
              <a
                href={getWhatsAppLink(`Hello GHUFRAN KING DIGITAL, let's discuss details for ${selectedService.title}.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2 text-xs font-semibold text-black bg-white rounded-lg hover:bg-zinc-200 transition-colors text-center inline-flex items-center justify-center gap-1.5"
              >
                <WhatsAppIcon className="w-3.5 h-3.5 fill-current" />
                <span>Chat on WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={() => {
                  setSelectedService(null);
                  onEnrollClick();
                }}
                className="px-3.5 py-2 text-xs font-medium text-zinc-300 hover:text-white bg-zinc-900 border border-zinc-800 rounded-lg hover:bg-zinc-800 transition-colors"
              >
                Enroll / Book
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
