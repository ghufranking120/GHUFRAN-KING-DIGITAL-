import React, { useState } from 'react';
import { BRAND, getWhatsAppLink } from '../data/constants';
import { WhatsAppIcon } from './WhatsAppIcon';
import { Send, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';

export const EnrollSection: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [email, setEmail] = useState('');
  const [courseOrService, setCourseOrService] = useState('MASTER AI AGENTS');
  const [message, setMessage] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submittedId, setSubmittedId] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!fullName.trim() || fullName.trim().length < 2) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!whatsappNumber.trim() || whatsappNumber.trim().length < 7) {
      setErrorMessage('Please enter a valid WhatsApp contact number.');
      return;
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: fullName.trim(),
          whatsappNumber: whatsappNumber.trim(),
          email: email.trim(),
          course: courseOrService.trim(),
          message: message.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit request');
      }

      setSubmittedId(data.inquiryId);
      setFullName('');
      setWhatsappNumber('');
      setEmail('');
      setMessage('');
    } catch (err: any) {
      setErrorMessage(err.message || 'Submission failed. Please message us on WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="enroll" className="py-16 sm:py-20 border-b border-zinc-900 bg-[#08080a] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-10 rounded-2xl border border-zinc-800 bg-[#0a0a0e] shadow-2xl relative">
          {/* Header */}
          <div className="text-center max-w-lg mx-auto mb-8 space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400 uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5 text-zinc-300" />
              <span>Admissions &amp; Registration</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Ready to Learn &amp; Build With AI?
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400">
              Start your journey with practical AI, automation and digital skills.
            </p>

            <div className="pt-2 flex flex-wrap justify-center gap-3">
              <a
                href={getWhatsAppLink('Hello GHUFRAN KING DIGITAL, I want to enroll in the next cohort.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium text-zinc-200 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-lg transition-colors"
              >
                <WhatsAppIcon className="w-3.5 h-3.5 fill-current text-emerald-400" />
                <span>WhatsApp Us: {BRAND.whatsappNumber}</span>
              </a>
            </div>
          </div>

          {/* Verification Form */}
          {submittedId ? (
            <div className="text-center py-6 space-y-3">
              <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mx-auto">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Enrollment Request Received!</h3>
              <p className="text-xs text-zinc-400 max-w-sm mx-auto">
                Your application has been logged with Reference ID:
              </p>
              <div className="font-mono text-xs text-white bg-zinc-900 border border-zinc-800 py-1 px-3 rounded inline-block">
                {submittedId}
              </div>
              <div className="pt-3 flex justify-center gap-2">
                <a
                  href={`https://wa.me/${BRAND.whatsappIntl}?text=${encodeURIComponent(
                    `Hello GHUFRAN KING DIGITAL! I just submitted an enrollment request (Ref: ${submittedId}).`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-black bg-white rounded-lg hover:bg-zinc-200 transition-colors"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5 fill-current" />
                  <span>Connect on WhatsApp</span>
                </a>
                <button
                  type="button"
                  onClick={() => setSubmittedId(null)}
                  className="px-3 py-2 text-xs text-zinc-400 hover:text-white bg-zinc-900 border border-zinc-800 rounded-lg"
                >
                  Submit Another
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto text-xs">
              {errorMessage && (
                <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-300 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-zinc-300 font-medium mb-1">
                    Full Name <span className="text-zinc-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Your Full Name"
                    className="w-full px-3.5 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500"
                  />
                </div>

                <div>
                  <label className="block text-zinc-300 font-medium mb-1">
                    WhatsApp Number <span className="text-zinc-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={whatsappNumber}
                    onChange={(e) => setWhatsappNumber(e.target.value)}
                    placeholder="03113106280"
                    className="w-full px-3.5 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-zinc-300 font-medium mb-1">
                    Email Address <span className="text-zinc-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@email.com"
                    className="w-full px-3.5 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500"
                  />
                </div>

                <div>
                  <label className="block text-zinc-300 font-medium mb-1">
                    Course / Service <span className="text-zinc-500">*</span>
                  </label>
                  <select
                    value={courseOrService}
                    onChange={(e) => setCourseOrService(e.target.value)}
                    className="w-full px-3.5 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-white focus:outline-none focus:border-zinc-500"
                  >
                    <option value="MASTER AI AGENTS">MASTER AI AGENTS (20 Classes)</option>
                    <option value="AI Voice & Calling Systems">AI Voice &amp; Calling Systems</option>
                    <option value="AI Chatbots & Automation">AI Chatbots &amp; Automation</option>
                    <option value="Digital Marketing & Meta Ads">Digital Marketing &amp; Meta Ads</option>
                    <option value="Website Development">Website Development</option>
                    <option value="Ecommerce Setup">Ecommerce Setup</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-zinc-300 font-medium mb-1">
                  Message (Optional)
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us about your learning goals or business requirements..."
                  className="w-full px-3.5 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500 resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-between gap-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 text-xs font-semibold text-black bg-white rounded-lg hover:bg-zinc-200 transition-colors disabled:opacity-50 inline-flex items-center gap-1.5 active:scale-95"
                >
                  {isSubmitting ? (
                    <span>Submitting...</span>
                  ) : (
                    <>
                      <span>Send Enrollment Request</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>

                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-zinc-400 hover:text-emerald-400 inline-flex items-center gap-1 transition-colors"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5 fill-current text-emerald-400" />
                  <span>Fast WhatsApp Reply</span>
                </a>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
