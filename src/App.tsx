import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { AboutSection } from './components/AboutSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { AiAgentsSection } from './components/AiAgentsSection';
import { CoursesSection } from './components/CoursesSection';
import { CourseRoadmap } from './components/CourseRoadmap';
import { EnrollSection } from './components/EnrollSection';
import { ContactSection } from './components/ContactSection';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { FloatingActions } from './components/FloatingActions';
import { AiAssistantModal } from './components/AiAssistantModal';
import { AdminPortal } from './components/AdminPortal';

export default function App() {
  const [isAiAssistantOpen, setIsAiAssistantOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      return (
        window.location.pathname === '/admin' ||
        window.location.hash === '#admin'
      );
    }
    return false;
  });

  // Sync /admin URL with history API
  useEffect(() => {
    const handleLocationCheck = () => {
      const isRouteAdmin =
        window.location.pathname === '/admin' ||
        window.location.hash === '#admin';
      setIsAdminOpen(isRouteAdmin);
    };

    window.addEventListener('popstate', handleLocationCheck);
    return () => window.removeEventListener('popstate', handleLocationCheck);
  }, []);

  const closeAdmin = () => {
    setIsAdminOpen(false);
    if (window.location.pathname === '/admin') {
      window.history.pushState(null, '', '/');
    }
  };

  const scrollToEnrollment = () => {
    const elem = document.getElementById('enroll');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToServices = () => {
    const elem = document.getElementById('services');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToRoadmap = () => {
    const elem = document.getElementById('roadmap');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#070709] text-zinc-100 flex flex-col transition-colors duration-200 selection:bg-white selection:text-black">
      {/* 1. Header / Navbar (Sticky, complete brand name visible, no public admin link) */}
      <Navbar onEnrollClick={scrollToEnrollment} />

      <main className="flex-1">
        {/* 2. Hero Section (Compact typography, badge, buttons, WhatsApp icon, subtle futuristic visual) */}
        <Hero
          onExploreServices={scrollToServices}
          onEnrollClick={scrollToEnrollment}
        />

        {/* 3. Services Section (8 Services with icons, descriptions, and Learn More) */}
        <ServicesSection onEnrollClick={scrollToEnrollment} />

        {/* 4. About Section (About narrative + 3 small feature cards) */}
        <AboutSection />

        {/* 5. Why Choose Us (6 Cards) */}
        <WhyChooseUs />

        {/* 6. AI Agents & Automation (8 Showcases + Talk to AI Assistant action) */}
        <AiAgentsSection
          onOpenAiAssistant={() => setIsAiAssistantOpen(true)}
          onEnrollClick={scrollToEnrollment}
        />

        {/* 7. Courses Section (MASTER AI AGENTS, 10 highlights, View Course & Enroll Now) */}
        <CoursesSection
          onEnrollClick={scrollToEnrollment}
          onExploreRoadmap={scrollToRoadmap}
        />

        {/* 8. Course Roadmap (6 Expandable Phases, all 20 classes) */}
        <CourseRoadmap onEnrollClick={scrollToEnrollment} />

        {/* 9. Enroll Section (Enrollment form + WhatsApp action) */}
        <EnrollSection />

        {/* 10. Contact Section (WhatsApp 03113106280, email/message form) */}
        <ContactSection />

        {/* 11. FAQ Accordion (9 Exact Questions) */}
        <FAQSection />
      </main>

      {/* 12. Footer (Powered by GHUFRAN KING DIGITAL, Tagline, Quick links, WhatsApp) */}
      <Footer onEnrollClick={scrollToEnrollment} />

      {/* Floating Actions: AI Assistant Button & Floating WhatsApp */}
      <FloatingActions onOpenAiAssistant={() => setIsAiAssistantOpen(true)} />

      {/* Multilingual AI Assistant Modal (English, Urdu, Roman Urdu) */}
      <AiAssistantModal
        isOpen={isAiAssistantOpen}
        onClose={() => setIsAiAssistantOpen(false)}
        onEnrollClick={scrollToEnrollment}
      />

      {/* Protected Admin Panel (Accessible strictly via /admin) */}
      <AdminPortal
        isOpen={isAdminOpen}
        onClose={closeAdmin}
        onContentUpdated={() => window.location.reload()}
      />
    </div>
  );
}
