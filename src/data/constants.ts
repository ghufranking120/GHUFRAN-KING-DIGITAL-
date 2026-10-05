export const BRAND = {
  name: 'GHUFRAN KING DIGITAL',
  type: 'Digital Agency & AI Solutions Partner',
  tagline: 'Your Digital Growth & AI Solutions Partner',
  whatsappNumber: '03113106280',
  whatsappIntl: '923113106280',
  whatsappUrl: 'https://wa.me/923113106280',
  email: 'ghufrankingrdx12@gmail.com',
  footerCredit: 'Powered by GHUFRAN KING DIGITAL',
  heroBadge: 'AI • DIGITAL • AUTOMATION',
  heroHeading: 'Build Your Digital Future With AI',
  heroSecondaryHeading: 'AI Solutions, Digital Marketing, Automation & Professional Skills',
  heroDescription:
    'GHUFRAN KING DIGITAL helps individuals and businesses use AI, automation, digital marketing and modern technology to build smarter digital systems and grow online.',
  courseName: 'MASTER AI AGENTS',
  courseSubtitle: 'Learn • Build • Automate',
  aboutText:
    'GHUFRAN KING DIGITAL is a modern digital and AI-focused brand helping individuals, creators and businesses learn, build and use modern technology.\n\nOur focus includes AI agents, automation, chatbots, voice AI, digital marketing, websites, ecommerce and practical digital skills.',
};

export const getWhatsAppLink = (customMessage?: string) => {
  if (!customMessage) return BRAND.whatsappUrl;
  return `https://wa.me/${BRAND.whatsappIntl}?text=${encodeURIComponent(customMessage)}`;
};
