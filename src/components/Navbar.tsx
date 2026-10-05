import React, { useState, useEffect } from 'react';
import { BRAND, getWhatsAppLink } from '../data/constants';
import { WhatsAppIcon } from './WhatsAppIcon';
import { ThemeToggle } from './ThemeToggle';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onEnrollClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onEnrollClick }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#' },
    { label: 'Services', href: '#services' },
    { label: 'About', href: '#about' },
    { label: 'Courses', href: '#courses' },
    { label: 'AI Agents', href: '#ai-agents' },
    { label: 'Enroll', href: '#enroll' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-200 ${
          scrolled
            ? 'bg-[#070709]/95 backdrop-blur-md border-b border-zinc-800/80 shadow-md py-2.5'
            : 'bg-[#070709] border-b border-zinc-900 py-3'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* LEFT: Complete Brand Name Visible */}
            <a
              href="#"
              className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-1 focus-visible:ring-white rounded p-1 shrink-0"
            >
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded bg-zinc-900 border border-zinc-800 flex items-center justify-center overflow-hidden shrink-0">
                <img
                  src="/src/assets/images/brand_crown_logo_1791171755909.jpg"
                  alt="GHUFRAN KING DIGITAL"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="font-display text-xs sm:text-sm font-bold tracking-tight text-white group-hover:text-zinc-200 transition-colors whitespace-nowrap">
                {BRAND.name}
              </span>
            </a>

            {/* CENTER / RIGHT: Navigation Links */}
            <nav className="hidden lg:flex items-center gap-5 xl:gap-6 text-xs font-medium text-zinc-400">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="hover:text-white transition-colors duration-150 py-1"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* RIGHT SIDE: Small WhatsApp Icon + Theme Toggle + Compact Enroll Button */}
            <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
              {/* WhatsApp Icon Button */}
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                title="Chat on WhatsApp (03113106280)"
                aria-label="WhatsApp (03113106280)"
                className="w-8 h-8 flex items-center justify-center rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-200 hover:text-emerald-400 border border-zinc-800 hover:border-emerald-500/40 transition-all duration-150 active:scale-95 shrink-0"
              >
                <WhatsAppIcon className="w-4 h-4 fill-current" />
              </a>

              {/* Theme Toggle */}
              <ThemeToggle />

              {/* Compact Enroll Button */}
              <button
                type="button"
                onClick={onEnrollClick}
                className="px-3 sm:px-3.5 py-1.5 text-xs font-semibold text-black bg-white rounded-lg hover:bg-zinc-200 transition-all duration-150 active:scale-95 whitespace-nowrap shadow-sm"
              >
                Enroll
              </button>

              {/* Mobile Menu Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-1.5 text-zinc-400 hover:text-white rounded-lg border border-zinc-800"
                aria-label="Toggle mobile menu"
              >
                {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex flex-col bg-black/85 backdrop-blur-md">
          <div className="p-4 bg-[#09090c] border-b border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-zinc-900 border border-zinc-800 overflow-hidden">
                <img
                  src="/src/assets/images/brand_crown_logo_1791171755909.jpg"
                  alt="Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="font-display text-xs font-bold text-white tracking-tight">
                {BRAND.name}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="p-1.5 text-zinc-400 hover:text-white rounded"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#070709]">
            <nav className="flex flex-col space-y-2.5 text-sm font-medium">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-lg text-zinc-300 hover:text-white hover:bg-zinc-900 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="pt-4 border-t border-zinc-800 space-y-2.5">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onEnrollClick();
                }}
                className="w-full py-2.5 text-xs font-semibold text-black bg-white rounded-lg hover:bg-zinc-200 transition-colors text-center"
              >
                Enroll Now
              </button>

              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-2 text-xs font-medium text-zinc-200 bg-zinc-900 border border-zinc-800 rounded-lg hover:bg-zinc-800 transition-colors"
              >
                <WhatsAppIcon className="w-4 h-4 fill-current text-emerald-400" />
                <span>03113106280</span>
              </a>

              <div className="flex items-center justify-between px-2 pt-2">
                <span className="text-xs text-zinc-400">Theme</span>
                <ThemeToggle showLabel={true} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
