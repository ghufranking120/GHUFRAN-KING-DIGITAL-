export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

export interface AboutFeature {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface WhyChooseItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface AgentCard {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: string;
  capabilities: string[];
}

export interface CoursePhase {
  phaseNumber: string;
  title: string;
  classes: CourseClass[];
}

export interface CourseClass {
  classNumber: string;
  title: string;
  topics: string[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

// 8 Professional Services per brief
export const SERVICES_LIST: ServiceItem[] = [
  {
    id: 'digital-marketing',
    number: 'SERVICE 01',
    title: 'Digital Marketing',
    description:
      'Data-driven digital marketing campaigns engineered to build brand awareness, capture qualified interest, and drive consistent customer acquisition.',
    icon: 'TrendingUp',
    features: [
      'Social media marketing',
      'Content strategy',
      'Growth strategy',
      'Lead generation',
      'Marketing automation',
    ],
  },
  {
    id: 'social-media',
    number: 'SERVICE 02',
    title: 'Social Media Services',
    description:
      'Comprehensive channel management and content distribution across major platforms to engage target audiences and grow an active digital following.',
    icon: 'Share2',
    features: [
      'Facebook',
      'Instagram',
      'TikTok',
      'YouTube',
      'Social media management',
      'Content support',
    ],
  },
  {
    id: 'ai-agents',
    number: 'SERVICE 03',
    title: 'AI Agents',
    description:
      'Autonomous intelligent agents designed to handle inquiries, retrieve internal company documentation, and execute multi-step business tasks around the clock.',
    icon: 'Bot',
    features: [
      'AI chatbots',
      'Business AI agents',
      'Customer support agents',
      'Knowledge/RAG agents',
      'Task automation',
    ],
  },
  {
    id: 'voice-calling',
    number: 'SERVICE 04',
    title: 'AI Voice & Calling',
    description:
      'Ultra-low-latency voice agents capable of conducting natural inbound and outbound telephone calls with full CRM call-logging and calendar booking.',
    icon: 'PhoneCall',
    features: [
      'AI voice agents',
      'AI calling',
      'Inbound calls',
      'Outbound calls',
      'Appointment booking',
      'Voice automation',
    ],
  },
  {
    id: 'ai-automation',
    number: 'SERVICE 05',
    title: 'AI Automation',
    description:
      'End-to-end workflow automation connecting messaging apps, spreadsheets, databases, and CRMs to eliminate manual operational overhead.',
    icon: 'Workflow',
    features: [
      'n8n automation',
      'Make automation',
      'Zapier automation',
      'Business workflows',
      'Lead automation',
      'CRM automation',
    ],
  },
  {
    id: 'website-development',
    number: 'SERVICE 06',
    title: 'Website Development',
    description:
      'High-performance, modern, responsive websites and landing pages with custom AI assistant integration designed for maximum visitor conversion.',
    icon: 'Globe',
    features: [
      'Business websites',
      'Landing pages',
      'AI-powered websites',
      'Ecommerce websites',
      'Responsive websites',
    ],
  },
  {
    id: 'ecommerce',
    number: 'SERVICE 07',
    title: 'Ecommerce',
    description:
      'Complete online retail setup from product research and high-converting storefront architecture to automated fulfillment and retention marketing.',
    icon: 'ShoppingBag',
    features: [
      'Store setup',
      'Product research',
      'Product pages',
      'Marketing',
      'Automation',
    ],
  },
  {
    id: 'ai-training',
    number: 'SERVICE 08',
    title: 'AI Training & Courses',
    description:
      'Hands-on practical training programs covering modern AI models, agentic workflows, chatbots, telephony systems, and monetizable digital skillsets.',
    icon: 'GraduationCap',
    features: [
      'AI fundamentals',
      'AI agents',
      'Automation',
      'Chatbots',
      'Voice AI',
      'Digital marketing',
    ],
  },
];

// About Section 3 feature cards
export const ABOUT_FEATURES: AboutFeature[] = [
  {
    id: 'ai-automation',
    title: 'AI & Automation',
    description:
      'Deploy autonomous agents, chatbots, and no-code pipelines to scale business operations efficiently.',
    icon: 'Bot',
  },
  {
    id: 'digital-growth',
    title: 'Digital Growth',
    description:
      'High-impact digital marketing, Meta Ads, and performance funnels that turn traffic into paying clients.',
    icon: 'TrendingUp',
  },
  {
    id: 'practical-skills',
    title: 'Practical Skills',
    description:
      'Step-by-step training focused on live project deliverables and monetizable client-facing expertise.',
    icon: 'Layers',
  },
];

// Why Choose Us 6 cards
export const WHY_CHOOSE_US: WhyChooseItem[] = [
  {
    id: 'practical-solutions',
    title: 'Practical Solutions',
    description:
      'We build real, testable systems that solve operational bottlenecks rather than theoretical concepts.',
    icon: 'CheckCircle',
  },
  {
    id: 'modern-technology',
    title: 'Modern Technology',
    description:
      'Leverage cutting-edge platforms including n8n, Vapi, OpenAI, Gemini, Cursor, Lovable, and Meta APIs.',
    icon: 'Cpu',
  },
  {
    id: 'ai-focused',
    title: 'AI-Focused Services',
    description:
      'Tailored AI agents, natural voice bots, and automated CRM pipelines built for modern business needs.',
    icon: 'Sparkles',
  },
  {
    id: 'support',
    title: 'Professional Support',
    description:
      'Dedicated guidance, active WhatsApp helpline, and responsive communication throughout every project.',
    icon: 'Headphones',
  },
  {
    id: 'business-approach',
    title: 'Business-Focused Approach',
    description:
      'Every automation and campaign is engineered with a strict focus on ROI, efficiency, and revenue growth.',
    icon: 'Briefcase',
  },
  {
    id: 'continuous-learning',
    title: 'Continuous Learning',
    description:
      'Stay ahead of rapid AI developments with continuous updates, live cohort training, and evolving toolstacks.',
    icon: 'BookOpen',
  },
];

// 8 AI Agents & Automation Showcases
export const AI_AGENTS_SHOWCASE: AgentCard[] = [
  {
    id: 'ai-chatbot',
    title: 'AI Chatbot',
    description:
      'Smart customer service and qualification bots embedded on websites and messaging channels.',
    icon: 'MessageSquare',
    category: 'Conversational AI',
    capabilities: ['24/7 Availability', 'Context Memory', 'Multi-Language'],
  },
  {
    id: 'voice-agent',
    title: 'AI Voice Agent',
    description:
      'Ultra-natural voice agents handling real-time interactive conversations with latency under 500ms.',
    icon: 'Mic',
    category: 'Voice AI',
    capabilities: ['Sub-500ms Latency', 'Human Tone', 'Custom Vocabularies'],
  },
  {
    id: 'calling-agent',
    title: 'AI Calling Agent',
    description:
      'Outbound and inbound phone automation that connects to telephony carriers and logs calls in CRM.',
    icon: 'PhoneCall',
    category: 'Telephony',
    capabilities: ['Inbound & Outbound', 'Live Transfer', 'Call Summaries'],
  },
  {
    id: 'whatsapp-agent',
    title: 'WhatsApp Agent',
    description:
      'Official WhatsApp Business API bots providing instant product catalogs and ordering flows.',
    icon: 'Smartphone',
    category: 'Messaging',
    capabilities: ['Cloud API', 'Catalog Browsing', 'Automated Quotes'],
  },
  {
    id: 'lead-generation-agent',
    title: 'Lead Generation Agent',
    description:
      'Autonomous systems that qualify prospects, verify contact details, and schedule sales calls.',
    icon: 'Filter',
    category: 'Growth',
    capabilities: ['Lead Scoring', 'CRM Injection', 'Follow-up Sequences'],
  },
  {
    id: 'customer-support-agent',
    title: 'Customer Support Agent',
    description:
      'Resolves customer support tickets, answers FAQs, and escalates complex issues to human staff.',
    icon: 'Headphones',
    category: 'Support',
    capabilities: ['Knowledge Grounded', 'Ticket Resolution', 'Escalation'],
  },
  {
    id: 'booking-agent',
    title: 'Booking Agent',
    description:
      'Checks live Google Calendar or Calendly availability and books appointments autonomously.',
    icon: 'Calendar',
    category: 'Scheduling',
    capabilities: ['Calendar Sync', 'Timezone Detection', 'Confirmations'],
  },
  {
    id: 'business-automation',
    title: 'Business Automation',
    description:
      'Multi-app workflows connecting payments, email notifications, data pipelines, and ERP records.',
    icon: 'Workflow',
    category: 'Automation',
    capabilities: ['Webhook Handlers', 'Multi-App Sync', 'Zero Manual Entry'],
  },
];

// Master AI Agents: 20 Classes across 6 Phases
export const COURSE_PHASES: CoursePhase[] = [
  {
    phaseNumber: 'PHASE 01',
    title: 'AI Foundation & Agent Thinking',
    classes: [
      {
        classNumber: 'Class 01',
        title: 'AI Fundamentals & Agentic Thinking',
        topics: [
          'Core AI ecosystem & paradigms',
          'Agentic architecture overview',
          'Autonomous task loops blueprint',
          'Practical business use-cases',
        ],
      },
      {
        classNumber: 'Class 02',
        title: 'LLMs, Prompts & Smart Agents',
        topics: [
          'LLM parameters & temperature',
          'Zero-shot & few-shot prompt engineering',
          'Role-based agent design',
          'Agent boundary & safety enforcement',
        ],
      },
      {
        classNumber: 'Class 03',
        title: 'RAG & Memory Systems',
        topics: [
          'Retrieval-Augmented Generation (RAG)',
          'Vector embeddings & storage',
          'Context window management',
          'Grounding & hallucination prevention',
        ],
      },
    ],
  },
  {
    phaseNumber: 'PHASE 02',
    title: 'AI Chatbots & Lead Automation',
    classes: [
      {
        classNumber: 'Class 04',
        title: 'AI Chatbots & Social Automation',
        topics: [
          'Building conversational AI chatbots',
          'WhatsApp Cloud API integration',
          'Instagram direct message flows',
          'Autonomous response handling',
        ],
      },
      {
        classNumber: 'Class 05',
        title: 'Lead Generation Automation',
        topics: [
          'Inbound lead capture funnels',
          'Automated multi-channel follow-ups',
          'Lead nurturing & scoring pipelines',
          'CRM synchronization',
        ],
      },
      {
        classNumber: 'Class 06',
        title: 'Support & Booking Agents',
        topics: [
          '24/7 customer support agent',
          'Calendar & appointment scheduling',
          'Payment trigger workflows',
          'Human-in-the-loop escalation',
        ],
      },
    ],
  },
  {
    phaseNumber: 'PHASE 03',
    title: 'Voice AI Systems',
    classes: [
      {
        classNumber: 'Class 07',
        title: 'Voice AI Fundamentals',
        topics: [
          'Voice AI architecture & audio pipelines',
          'Latency reduction strategies',
          'Speech-to-text & text-to-speech models',
          'Conversation turn-taking logic',
        ],
      },
      {
        classNumber: 'Class 08',
        title: 'Inbound & Outbound Voice Agents',
        topics: [
          'Inbound call handling & IVR',
          'Outbound appointment confirmations',
          'Live call recording & transcription',
          'Telephony carrier integration',
        ],
      },
      {
        classNumber: 'Class 09',
        title: 'Advanced Voice Automation',
        topics: [
          'Missed call auto-callback agents',
          'Dynamic variable injection during calls',
          'Multi-department transfer logic',
          'Call quality analytics & reporting',
        ],
      },
    ],
  },
  {
    phaseNumber: 'PHASE 04',
    title: 'Ecommerce Business',
    classes: [
      {
        classNumber: 'Class 10',
        title: 'Ecommerce Fundamentals',
        topics: [
          'Online retail business models',
          'Product research with AI tools',
          'Margin analysis & validation',
          'Supplier sourcing workflows',
        ],
      },
      {
        classNumber: 'Class 11',
        title: 'Store Creation & Setup',
        topics: [
          'Shopify storefront configuration',
          'High-converting product landing pages',
          'Payment gateway integration',
          'Inventory & checkout flows',
        ],
      },
      {
        classNumber: 'Class 12',
        title: 'Store Launch & Optimization',
        topics: [
          'Pre-launch checklist & speed audit',
          'AI customer support for stores',
          'Abandoned cart recovery automation',
          'Review generation workflows',
        ],
      },
    ],
  },
  {
    phaseNumber: 'PHASE 05',
    title: 'Marketing & Sales',
    classes: [
      {
        classNumber: 'Class 13',
        title: 'AI-Powered Web Development',
        topics: [
          'AI-assisted coding with Cursor & Lovable',
          'Rapid landing page development',
          'Conversion optimization principles',
          'Responsive design deployment',
        ],
      },
      {
        classNumber: 'Class 14',
        title: 'Digital Marketing Foundations',
        topics: [
          'Marketing funnel architecture',
          'Target audience segmentation',
          'Content marketing strategy',
          'Conversion tracking & pixels',
        ],
      },
      {
        classNumber: 'Class 15',
        title: 'Meta Ads Introduction',
        topics: [
          'Ads Manager setup & hierarchy',
          'Campaign objectives & structure',
          'Budget optimization (ABO vs CBO)',
          'Creative testing methodologies',
        ],
      },
      {
        classNumber: 'Class 16',
        title: 'Meta Ads for Lead Generation',
        topics: [
          'Lead form campaign setup',
          'Direct-to-WhatsApp messaging ads',
          'Instant lead CRM routing',
          'Cost-per-lead optimization',
        ],
      },
      {
        classNumber: 'Class 17',
        title: 'Meta Ads for Ecommerce',
        topics: [
          'Catalog & dynamic product ads',
          'Retargeting custom audiences',
          'Lookalike audience modeling',
          'ROAS scaling frameworks',
        ],
      },
    ],
  },
  {
    phaseNumber: 'PHASE 06',
    title: 'AI Business & Scaling',
    classes: [
      {
        classNumber: 'Class 18',
        title: 'Selling AI & Automation Services',
        topics: [
          'Agency packaging & pricing models',
          'Outreach to businesses & founders',
          'Client onboarding & service proposals',
          'Monthly retainer agreements',
        ],
      },
      {
        classNumber: 'Class 19',
        title: 'Scaling AI Systems',
        topics: [
          'Multi-agent workflow orchestration',
          'Error monitoring & fallback systems',
          'API cost optimization & caching',
          'Enterprise security standards',
        ],
      },
      {
        classNumber: 'Class 20',
        title: 'Final Project & Certification',
        topics: [
          'End-to-end capstone project submission',
          'Live project defense & evaluation',
          'Portfolio review & presentation',
          'Verified completion certificate',
        ],
      },
    ],
  },
];

// Exact 9 FAQ Questions per brief
export const FAQS: FAQItem[] = [
  {
    question: 'What services do you provide?',
    answer:
      'GHUFRAN KING DIGITAL provides comprehensive digital and AI services including Digital Marketing, Social Media Services, AI Agents & Chatbots, AI Voice & Calling systems, Workflow Automation (n8n/Make/Zapier), Website Development, Ecommerce solutions, and AI Training & Courses.',
  },
  {
    question: 'What is an AI Agent?',
    answer:
      'An AI Agent is an autonomous software system powered by large language models that can perceive instructions, retrieve relevant knowledge (RAG), make decisions, and execute multi-step business actions such as replying to customers, scheduling appointments, and updating CRMs without constant human intervention.',
  },
  {
    question: 'Can you build AI chatbots?',
    answer:
      'Yes. We design and deploy intelligent, custom-trained AI chatbots for websites, WhatsApp Business API, Instagram, and internal communication channels with grounding in your company documents and product catalogs.',
  },
  {
    question: 'Do you provide AI voice solutions?',
    answer:
      'Yes. We engineer ultra-low-latency Voice AI systems for both inbound customer service and outbound appointment setting, complete with telephony integration, call recording, and real-time CRM updates.',
  },
  {
    question: 'Do you provide website development?',
    answer:
      'Yes. We build modern, responsive, high-converting business websites, landing pages, ecommerce storefronts, and AI-powered web applications optimized for speed and search engine visibility.',
  },
  {
    question: 'Do you provide digital marketing?',
    answer:
      'Yes. Our digital marketing solutions include Meta Ads (Facebook & Instagram), performance lead-generation funnels, content marketing, growth strategies, and automated follow-up sequences.',
  },
  {
    question: 'What courses are available?',
    answer:
      'Our flagship course is "MASTER AI AGENTS" (Learn • Build • Automate), a comprehensive 20-class curriculum across 6 phases covering AI foundations, chatbots, voice calling bots, ecommerce, AI web development, Meta Ads, and agency monetization with a verified completion certificate.',
  },
  {
    question: 'How can I enroll?',
    answer:
      'You can submit the Enrollment Form directly on our website with your Name, WhatsApp Number, and Email, or message our admissions desk directly on WhatsApp at 03113106280 (https://wa.me/923113106280) to secure your seat.',
  },
  {
    question: 'How can I contact you?',
    answer:
      'You can contact GHUFRAN KING DIGITAL directly via WhatsApp at 03113106280 (https://wa.me/923113106280) or submit the contact inquiry form on our website.',
  },
];
