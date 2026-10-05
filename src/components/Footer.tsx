import React from 'react';
import { BRAND, getWhatsAppLink } from '../data/constants';
import { WhatsAppIcon } from './WhatsAppIcon';
import { ArrowUp } from 'lucide-react';

interface FooterProps {
  onEnrollClick: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onEnrollClick }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickLinks = [
    { label: 'Home', href: '#' },
    { label: 'Services', href: '#services' },
    { label: 'About', href: '#about' },
    { label: 'Courses', href: '#courses' },
    { label: 'Enroll', href: '#enroll' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="bg-[#050507] border-t border-zinc-900 text-zinc-400 text-xs pt-12 pb-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-zinc-900">
          {/* Brand & Tagline (5 cols) */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded bg-zinc-900 border border-zinc-800 flex items-center justify-center overflow-hidden">
                <img
                  src="/src/assets/images/brand_crown_logo_1791171755909.jpg"
                  alt="Logo"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="font-display text-sm font-bold text-white tracking-tight">
                {BRAND.name}
              </span>
            </div>

            <p className="text-xs text-zinc-400 max-w-sm leading-relaxed">
              {BRAND.tagline}
            </p>

            <div className="pt-1 flex items-center gap-2">
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                title="WhatsApp Admissions"
                className="w-8 h-8 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 flex items-center justify-center text-zinc-300 hover:text-emerald-400 transition-colors"
              >
                <WhatsAppIcon className="w-3.5 h-3.5 fill-current" />
              </a>
            </div>
          </div>

          {/* Quick Links (4 cols) */}
          <div className="md:col-span-4 space-y-2">
            <h4 className="text-xs font-mono uppercase tracking-wider text-white">
              Quick Links
            </h4>
            <ul className="space-y-1.5 text-xs">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Support (3 cols) */}
          <div className="md:col-span-3 space-y-2">
            <h4 className="text-xs font-mono uppercase tracking-wider text-white">
              WhatsApp Support
            </h4>
            <div className="space-y-1.5 text-xs text-zinc-400">
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-white font-semibold flex items-center gap-1.5 hover:text-emerald-400 transition-colors"
              >
                <WhatsAppIcon className="w-3.5 h-3.5 fill-current text-emerald-400" />
                <span>{BRAND.whatsappNumber}</span>
              </a>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={onEnrollClick}
                  className="px-3 py-1.5 text-xs font-semibold text-black bg-white rounded hover:bg-zinc-200 transition-colors"
                >
                  Enroll Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Footer Credit */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-500">
          <div>
            &copy; {new Date().getFullYear()} {BRAND.name}. All rights reserved.
          </div>

          {/* Exact required footer credit */}
          <div className="text-zinc-300 font-semibold tracking-wide">
            {BRAND.footerCredit}
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-1 text-zinc-400 hover:text-white transition-colors"
          >
            <span>Top</span>
            <ArrowUp className="w-3 h-3" />
          </button>
        </div>
      </div>
    </footer>
  );
};
