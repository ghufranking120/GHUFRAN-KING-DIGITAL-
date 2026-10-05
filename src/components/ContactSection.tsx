import React, { useState } from 'react';
import { BRAND, getWhatsAppLink } from '../data/constants';
import { WhatsAppIcon } from './WhatsAppIcon';
import { Mail, Clock, Send, CheckCircle2, AlertCircle } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [senderMessage, setSenderMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!senderEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(senderEmail)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (!senderMessage.trim()) {
      setErrorMessage('Please enter a message.');
      return;
    }

    setIsSending(true);
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: senderName.trim() || 'Website Visitor',
          whatsappNumber: BRAND.whatsappNumber,
          email: senderEmail.trim(),
          course: 'General Contact Inquiry',
          message: senderMessage.trim(),
        }),
      });

      if (!res.ok) throw new Error('Could not submit message');

      setSentSuccess(true);
      setSenderName('');
      setSenderEmail('');
      setSenderMessage('');
    } catch (err: any) {
      setErrorMessage('Message submission failed. Please connect directly via WhatsApp.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-20 border-b border-zinc-900 bg-[#070709] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Official WhatsApp & Details */}
          <div className="lg:col-span-5 space-y-5">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                <span>Connect</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
                {BRAND.name}
              </h2>
              <p className="mt-1.5 text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Connect directly with our team for business inquiries, AI automation consultations, or course admissions.
              </p>
            </div>

            {/* WhatsApp Card */}
            <div className="p-5 rounded-xl border border-zinc-800 bg-[#0a0a0e] space-y-3">
              <div className="text-[11px] font-mono text-zinc-500 uppercase">
                Official WhatsApp Helpline
              </div>
              <div className="text-base font-bold text-white font-mono flex items-center gap-2">
                <WhatsAppIcon className="w-4 h-4 fill-current text-emerald-400" />
                <span>{BRAND.whatsappNumber}</span>
              </div>

              <a
                href={getWhatsAppLink('Hello GHUFRAN KING DIGITAL, I would like to get in touch.')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-2 px-4 text-xs font-semibold text-black bg-white rounded-lg hover:bg-zinc-200 transition-colors shadow-sm"
              >
                <WhatsAppIcon className="w-3.5 h-3.5 fill-current" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>

            <div className="space-y-2.5 text-xs text-zinc-400">
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-zinc-400 shrink-0" />
                <span>{BRAND.email}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-zinc-400 shrink-0" />
                <span>Operational Hours: Mon – Sat (9:00 AM – 10:00 PM PKT)</span>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Message Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-7 rounded-xl border border-zinc-800 bg-[#0a0a0e] shadow-xl">
              <h3 className="text-sm font-bold text-white mb-1">
                Send an Direct Message
              </h3>
              <p className="text-xs text-zinc-400 mb-4">
                Leave your email and question below. Our team reviews incoming messages daily.
              </p>

              {sentSuccess ? (
                <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs space-y-2 text-center">
                  <CheckCircle2 className="w-5 h-5 mx-auto" />
                  <p className="font-semibold">Thank you! Your message has been received.</p>
                  <p className="text-[11px] text-zinc-400">We will get back to you shortly.</p>
                  <button
                    type="button"
                    onClick={() => setSentSuccess(false)}
                    className="text-[11px] text-white underline pt-1"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSendMessage} className="space-y-3.5 text-xs">
                  {errorMessage && (
                    <div className="p-2.5 rounded bg-rose-500/10 border border-rose-500/20 text-rose-300 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div>
                    <label className="block text-zinc-300 font-medium mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      placeholder="e.g. Ali Khan"
                      className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-300 font-medium mb-1">
                      Email Address <span className="text-zinc-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={senderEmail}
                      onChange={(e) => setSenderEmail(e.target.value)}
                      placeholder="you@email.com"
                      className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-300 font-medium mb-1">
                      Message <span className="text-zinc-500">*</span>
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={senderMessage}
                      onChange={(e) => setSenderMessage(e.target.value)}
                      placeholder="Your question or project inquiry..."
                      className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500 resize-none"
                    />
                  </div>

                  <div className="pt-1 flex items-center justify-between">
                    <button
                      type="submit"
                      disabled={isSending}
                      className="px-4 py-2 text-xs font-semibold text-black bg-white rounded-lg hover:bg-zinc-200 transition-colors disabled:opacity-50 inline-flex items-center gap-1.5"
                    >
                      {isSending ? 'Sending...' : 'Send Message'}
                      <Send className="w-3 h-3" />
                    </button>

                    <a
                      href={getWhatsAppLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-zinc-400 hover:text-emerald-400 flex items-center gap-1"
                    >
                      <WhatsAppIcon className="w-3.5 h-3.5 fill-current text-emerald-400" />
                      <span>WhatsApp Direct</span>
                    </a>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
