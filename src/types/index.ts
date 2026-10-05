export interface ServiceItem {
  id: string;
  name: string;
  category: ServiceCategory;
  description: string;
  features: string[];
  popular?: boolean;
}

export type ServiceCategory =
  | 'digital-marketing'
  | 'website-services'
  | 'ai-services'
  | 'social-media-services'
  | 'training-consultation'
  | 'digital-services';

export interface CategoryInfo {
  id: ServiceCategory;
  name: string;
  tagline: string;
  description: string;
  icon: string;
}

export interface Inquiry {
  id: string;
  fullName: string;
  whatsappNumber: string;
  email: string;
  service: string;
  message: string;
  createdAt: string;
  status: 'new' | 'contacted' | 'resolved';
  notes?: string;
}

export interface WebinarItem {
  id: string;
  title: string;
  type: 'Webinar' | 'Seminar' | 'Workshop' | 'Training';
  date: string; // ISO date string or formatted date
  time: string;
  mode: 'Online' | 'Physical' | 'Hybrid';
  seatsAvailable?: number;
  description: string;
  topics: string[];
  status: 'active' | 'completed' | 'upcoming';
  registrationLink?: string;
}

export interface CMSContent {
  whatsappNumber: string;
  whatsappChannelUrl: string;
  whatsappGroupUrl: string;
  contactEmail: string;
  tagline: string;
  businessHours: string;
  aiAssistantGreeting: string;
  showWebinarSection: boolean;
  webinars: WebinarItem[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  suggestedAction?: {
    label: string;
    actionType: 'whatsapp' | 'consultation' | 'service';
    data?: string;
  };
}
