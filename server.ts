import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import crypto from 'crypto';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import {
  COURSE_PHASES,
  FAQS,
  SERVICES_LIST,
  ABOUT_FEATURES,
  WHY_CHOOSE_US,
  AI_AGENTS_SHOWCASE,
} from './src/data/academyData';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Initialize data storage directory
const DATA_DIR = path.join(__dirname, 'data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const INQUIRIES_FILE = path.join(DATA_DIR, 'inquiries.json');
const CMS_FILE = path.join(DATA_DIR, 'cms_data.json');
const ADMIN_FILE = path.join(DATA_DIR, 'admin.json');

// Default Academy & Agency CMS State
const DEFAULT_CMS = {
  brandName: 'GHUFRAN KING DIGITAL',
  tagline: 'Your Digital Growth & AI Solutions Partner',
  whatsappNumber: '03113106280',
  whatsappIntl: '923113106280',
  whatsappUrl: 'https://wa.me/923113106280',
  contactEmail: 'ghufrankingrdx12@gmail.com',
  heroBadge: 'AI • DIGITAL • AUTOMATION',
  heroHeading: 'Build Your Digital Future With AI',
  heroSecondaryHeading: 'AI Solutions, Digital Marketing, Automation & Professional Skills',
  heroDescription:
    'GHUFRAN KING DIGITAL helps individuals and businesses use AI, automation, digital marketing and modern technology to build smarter digital systems and grow online.',
  aboutHeading: 'About GHUFRAN KING DIGITAL',
  aboutText:
    'GHUFRAN KING DIGITAL is a modern digital and AI-focused brand helping individuals, creators and businesses learn, build and use modern technology.\n\nOur focus includes AI agents, automation, chatbots, voice AI, digital marketing, websites, ecommerce and practical digital skills.',
  aboutFeatures: ABOUT_FEATURES,
  servicesHeading: 'Our Services',
  servicesSubtitle: 'Practical Digital & AI Solutions',
  services: SERVICES_LIST,
  whyChooseUs: WHY_CHOOSE_US,
  aiAgents: AI_AGENTS_SHOWCASE,
  courseTitle: 'MASTER AI AGENTS',
  courseSubtitle: 'Learn • Build • Automate',
  courseDescription:
    'A comprehensive, hands-on 20-class curriculum designed to master conversational chatbots, voice AI calling systems, no-code automation, ecommerce store building, and digital marketing.',
  courseHighlights: [
    '20 Classes',
    'Practical Projects',
    'AI Tools',
    'Chatbots',
    'Voice AI',
    'Automation',
    'Digital Marketing',
    'Ecommerce',
    'Final Project',
    'Certificate',
  ],
  announcement: 'Admissions Open for Next Master AI Agents Cohort! Limited Seats Available.',
  showAnnouncement: true,
  phases: COURSE_PHASES,
  faqs: FAQS,
  footerCredit: 'Powered by GHUFRAN KING DIGITAL',
  aiWelcomeMessage:
    'Assalamu Alaikum / Welcome to GHUFRAN KING DIGITAL! We provide digital marketing, AI agents, voice calling systems, automation, website development, and our flagship "MASTER AI AGENTS" course. How can I help you today?',
  aiInstructions:
    'You are the official AI assistant for GHUFRAN KING DIGITAL (Your Digital Growth & AI Solutions Partner). You provide information on our 8 Services, 20-class MASTER AI AGENTS course, AI voice calling bots, web development, and admissions. If the user asks in Roman Urdu, reply in Roman Urdu. If in Urdu, reply in Urdu. If in English, reply in English. Always mention our official WhatsApp: 03113106280 (https://wa.me/923113106280). Keep responses crisp, professional, and helpful.',
};

/* =========================================================================
   STORAGE HELPERS
========================================================================= */

function readInquiries(): any[] {
  try {
    if (fs.existsSync(INQUIRIES_FILE)) {
      const data = fs.readFileSync(INQUIRIES_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Error reading inquiries:', err);
  }
  return [];
}

function writeInquiries(inquiries: any[]) {
  fs.writeFileSync(INQUIRIES_FILE, JSON.stringify(inquiries, null, 2), 'utf-8');
}

function readCMS(): any {
  try {
    if (fs.existsSync(CMS_FILE)) {
      const data = fs.readFileSync(CMS_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Error reading CMS file:', err);
  }
  fs.writeFileSync(CMS_FILE, JSON.stringify(DEFAULT_CMS, null, 2), 'utf-8');
  return DEFAULT_CMS;
}

function writeCMS(data: any) {
  fs.writeFileSync(CMS_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

interface AdminRecord {
  isSetupComplete: boolean;
  email?: string;
  passwordHash?: string;
  salt?: string;
  createdAt?: string;
  updatedAt?: string;
  recoveryCode?: string | null;
  recoveryExpiry?: number | null;
}

function readAdmin(): AdminRecord {
  try {
    if (fs.existsSync(ADMIN_FILE)) {
      const data = fs.readFileSync(ADMIN_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Error reading admin record:', err);
  }
  return { isSetupComplete: false };
}

function writeAdmin(record: AdminRecord) {
  fs.writeFileSync(ADMIN_FILE, JSON.stringify(record, null, 2), 'utf-8');
}

/* =========================================================================
   CRYPTOGRAPHIC PASSWORD SECURITY
========================================================================= */

function hashPassword(password: string, salt = crypto.randomBytes(16).toString('hex')): { salt: string; hash: string } {
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');
  return { salt, hash };
}

function verifyPassword(password: string, salt: string, storedHash: string): boolean {
  try {
    const keyBuffer = Buffer.from(storedHash, 'hex');
    const derivedKey = crypto.scryptSync(password, salt, 64);
    return crypto.timingSafeEqual(keyBuffer, derivedKey);
  } catch {
    return false;
  }
}

// In-memory active tokens mapping: token -> { email: string, createdAt: number }
const activeTokens = new Map<string, { email: string; createdAt: number }>();

// Rate Limiter
const ipRateLimits = new Map<string, { attempts: number; firstAttempt: number }>();
function checkRateLimit(ip: string, maxAttempts = 10, windowMs = 60000): boolean {
  const now = Date.now();
  const record = ipRateLimits.get(ip);
  if (!record || now - record.firstAttempt > windowMs) {
    ipRateLimits.set(ip, { attempts: 1, firstAttempt: now });
    return true;
  }
  if (record.attempts >= maxAttempts) {
    return false;
  }
  record.attempts++;
  return true;
}

// Admin Auth Middleware
function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: Admin authentication token required' });
  }
  const token = authHeader.split(' ')[1];
  const session = activeTokens.get(token);
  if (!session) {
    return res.status(403).json({ error: 'Forbidden: Invalid or expired admin session' });
  }
  (req as any).adminEmail = session.email;
  next();
}

/* =========================================================================
   ADMIN AUTHENTICATION & SETUP ENDPOINTS
========================================================================= */

// 1. Check Setup Status (whether First-Time Setup is required)
app.get('/api/admin/setup-status', (req, res) => {
  const admin = readAdmin();
  res.json({
    isSetupComplete: Boolean(admin.isSetupComplete),
  });
});

// 2. First-Time Admin Account Creation
app.post('/api/admin/setup', (req, res) => {
  const admin = readAdmin();
  if (admin.isSetupComplete) {
    return res.status(403).json({
      error: 'First-time setup has already been completed. This endpoint is permanently disabled.',
    });
  }

  const { email, password, confirmPassword } = req.body;

  if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return res.status(400).json({ error: 'Please enter a valid admin email address.' });
  }

  if (!password || typeof password !== 'string' || password.length < 8) {
    return res.status(400).json({ error: 'Password must be at least 8 characters long.' });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ error: 'Passwords do not match.' });
  }

  // Hash password securely
  const { salt, hash } = hashPassword(password);

  const newAdmin: AdminRecord = {
    isSetupComplete: true,
    email: email.trim().toLowerCase(),
    passwordHash: hash,
    salt,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    recoveryCode: null,
    recoveryExpiry: null,
  };

  writeAdmin(newAdmin);

  // Generate secure initial session token
  const token = `gkd_adm_${crypto.randomBytes(24).toString('hex')}`;
  activeTokens.set(token, { email: newAdmin.email!, createdAt: Date.now() });

  res.status(201).json({
    success: true,
    message: 'Admin account created successfully. Welcome to GHUFRAN KING DIGITAL Admin Center.',
    token,
    email: newAdmin.email,
  });
});

// 3. Admin Login (Email + Password)
app.post('/api/admin/login', (req, res) => {
  const ip = req.ip || req.socket.remoteAddress || 'unknown';
  if (!checkRateLimit(ip, 6, 300000)) {
    return res.status(429).json({ error: 'Too many login attempts. Please wait 5 minutes.' });
  }

  const admin = readAdmin();
  if (!admin.isSetupComplete || !admin.email) {
    return res.status(400).json({
      error: 'Admin account has not been setup yet. Please complete initial setup first.',
      needsSetup: true,
    });
  }

  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  const inputEmail = String(email).trim().toLowerCase();
  if (inputEmail !== admin.email) {
    return res.status(401).json({ error: 'Invalid admin email or password.' });
  }

  const isValid = verifyPassword(String(password), admin.salt || '', admin.passwordHash || '');
  if (!isValid) {
    return res.status(401).json({ error: 'Invalid admin email or password.' });
  }

  // Generate session token
  const token = `gkd_adm_${crypto.randomBytes(24).toString('hex')}`;
  activeTokens.set(token, { email: admin.email!, createdAt: Date.now() });

  res.json({
    success: true,
    token,
    email: admin.email,
    message: 'Authentication successful',
  });
});

// 4. Verify Active Admin Session
app.get('/api/admin/verify', requireAdmin, (req, res) => {
  res.json({
    success: true,
    authorized: true,
    email: (req as any).adminEmail,
  });
});

// 5. Admin Logout
app.post('/api/admin/logout', (req, res) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    activeTokens.delete(token);
  }
  res.json({ success: true, message: 'Logged out successfully' });
});

// 6. Admin Password Change
app.post('/api/admin/change-password', requireAdmin, (req, res) => {
  const admin = readAdmin();
  const { currentPassword, newPassword, confirmNewPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({ error: 'Current password and new password are required.' });
  }

  const isValid = verifyPassword(String(currentPassword), admin.salt || '', admin.passwordHash || '');
  if (!isValid) {
    return res.status(401).json({ error: 'Current password is incorrect.' });
  }

  if (newPassword.length < 8) {
    return res.status(400).json({ error: 'New password must be at least 8 characters long.' });
  }

  if (confirmNewPassword && newPassword !== confirmNewPassword) {
    return res.status(400).json({ error: 'New passwords do not match.' });
  }

  const { salt, hash } = hashPassword(newPassword);
  admin.passwordHash = hash;
  admin.salt = salt;
  admin.updatedAt = new Date().toISOString();
  writeAdmin(admin);

  res.json({ success: true, message: 'Password changed successfully.' });
});

// 7. Forgot Password (Generates Recovery Code)
app.post('/api/admin/forgot-password', (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email is required.' });

  const admin = readAdmin();
  if (!admin.isSetupComplete || String(email).trim().toLowerCase() !== admin.email) {
    return res.status(404).json({ error: 'No admin account found with that email address.' });
  }

  // Generate 6-digit recovery code (valid for 15 minutes)
  const recoveryCode = Math.floor(100000 + Math.random() * 900000).toString();
  const recoveryExpiry = Date.now() + 15 * 60 * 1000;

  admin.recoveryCode = recoveryCode;
  admin.recoveryExpiry = recoveryExpiry;
  writeAdmin(admin);

  res.json({
    success: true,
    message: 'Recovery code generated successfully. Enter this code to reset your password.',
    recoveryCode, // Provided directly for immediate reset convenience
  });
});

// 8. Reset Password With Recovery Code
app.post('/api/admin/reset-password', (req, res) => {
  const { email, recoveryCode, newPassword } = req.body;
  const admin = readAdmin();

  if (!email || !recoveryCode || !newPassword) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  if (String(email).trim().toLowerCase() !== admin.email) {
    return res.status(401).json({ error: 'Invalid email address.' });
  }

  if (!admin.recoveryCode || admin.recoveryCode !== String(recoveryCode).trim()) {
    return res.status(401).json({ error: 'Invalid recovery code.' });
  }

  if (admin.recoveryExpiry && Date.now() > admin.recoveryExpiry) {
    return res.status(400).json({ error: 'Recovery code has expired. Please request a new one.' });
  }

  if (newPassword.length < 8) {
    return res.status(400).json({ error: 'Password must be at least 8 characters long.' });
  }

  const { salt, hash } = hashPassword(newPassword);
  admin.passwordHash = hash;
  admin.salt = salt;
  admin.recoveryCode = null;
  admin.recoveryExpiry = null;
  admin.updatedAt = new Date().toISOString();
  writeAdmin(admin);

  res.json({ success: true, message: 'Password has been reset successfully. You can now login.' });
});

/* =========================================================================
   PUBLIC & PROTECTED CONTENT ENDPOINTS
========================================================================= */

// Health & Brand Info
app.get('/api/health', (req, res) => {
  const admin = readAdmin();
  res.json({
    status: 'online',
    brand: 'GHUFRAN KING DIGITAL',
    type: 'Professional AI Academy',
    adminSetupComplete: admin.isSetupComplete,
    timestamp: new Date().toISOString(),
  });
});

// Public CMS Content
app.get('/api/content', (req, res) => {
  const cms = readCMS();
  res.json(cms);
});

// Protected Update CMS Content
app.put('/api/content', requireAdmin, (req, res) => {
  const updatedData = req.body;
  if (!updatedData || typeof updatedData !== 'object') {
    return res.status(400).json({ error: 'Invalid content payload' });
  }
  const current = readCMS();
  const merged = { ...current, ...updatedData };
  writeCMS(merged);
  res.json({ success: true, content: merged, message: 'Content published successfully' });
});

// Submit Enrollment Request (Public)
app.post('/api/inquiries', (req, res) => {
  const ip = req.ip || req.socket.remoteAddress || 'unknown';
  if (!checkRateLimit(ip, 8, 60000)) {
    return res.status(429).json({ error: 'Too many requests. Please wait a moment.' });
  }

  const { fullName, whatsappNumber, email, course, message } = req.body;

  if (!fullName || typeof fullName !== 'string' || fullName.trim().length < 2) {
    return res.status(400).json({ error: 'Please enter a valid full name.' });
  }
  if (!whatsappNumber || typeof whatsappNumber !== 'string' || whatsappNumber.trim().length < 7) {
    return res.status(400).json({ error: 'Please enter a valid WhatsApp contact number.' });
  }
  if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Please provide a valid email address.' });
  }

  const inquiries = readInquiries();
  const newInquiry = {
    id: `GKD-${Date.now().toString(36).toUpperCase()}`,
    fullName: fullName.trim(),
    whatsappNumber: whatsappNumber.trim(),
    email: email.trim().toLowerCase(),
    course: (course || 'MASTER AI AGENTS').trim(),
    message: (message || '').trim(),
    createdAt: new Date().toISOString(),
    status: 'New', // 'New' | 'Contacted' | 'Enrolled' | 'Completed'
    ipAddress: ip,
  };

  inquiries.unshift(newInquiry);
  writeInquiries(inquiries);

  res.status(201).json({
    success: true,
    inquiryId: newInquiry.id,
    message: 'Your enrollment request has been successfully submitted to GHUFRAN KING DIGITAL.',
    inquiry: newInquiry,
  });
});

// Protected: Get Inquiries (Admin only)
app.get('/api/inquiries', requireAdmin, (req, res) => {
  const inquiries = readInquiries();
  res.json(inquiries);
});

// Protected: Update Inquiry Status
app.patch('/api/inquiries/:id', requireAdmin, (req, res) => {
  const { id } = req.params;
  const { status, notes } = req.body;

  const inquiries = readInquiries();
  const index = inquiries.findIndex((inq) => inq.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Inquiry not found' });
  }

  if (status) inquiries[index].status = status;
  if (notes !== undefined) inquiries[index].notes = notes;
  inquiries[index].updatedAt = new Date().toISOString();

  writeInquiries(inquiries);
  res.json({ success: true, inquiry: inquiries[index] });
});

// Protected: Delete Inquiry
app.delete('/api/inquiries/:id', requireAdmin, (req, res) => {
  const { id } = req.params;
  let inquiries = readInquiries();
  const originalLength = inquiries.length;
  inquiries = inquiries.filter((inq) => inq.id !== id);

  if (inquiries.length === originalLength) {
    return res.status(404).json({ error: 'Inquiry not found' });
  }

  writeInquiries(inquiries);
  res.json({ success: true, message: 'Inquiry deleted successfully' });
});

/* =========================================================================
   AI ASSISTANT ENDPOINT (MULTILINGUAL)
========================================================================= */

app.post('/api/chat', async (req, res) => {
  const { messages } = req.body;

  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'Messages array is required' });
  }

  const latestUserMessage = messages[messages.length - 1]?.content || '';
  const apiKey = process.env.GEMINI_API_KEY;

  if (apiKey) {
    try {
      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: { 'User-Agent': 'aistudio-build' },
        },
      });

      const systemInstruction = `You are the official AI Assistant for GHUFRAN KING DIGITAL AI Academy.
Tagline: "Learn AI. Build Systems. Create Opportunities."
WhatsApp Number: 03113106280 (https://wa.me/923113106280)

Key Course:
"MASTER AI AGENTS" (Build • Automate • Launch)
- 20 Practical Classes across 6 Comprehensive Phases:
  * Phase 01: AI Foundation & Agent Thinking (Classes 1-3)
  * Phase 02: AI Chatbots & Lead Automation (Classes 4-6)
  * Phase 03: Voice AI Systems (Classes 7-9: Inbound, Outbound, Calling Bots)
  * Phase 04: Ecommerce Business (Classes 10-12: Store Setup, Product Validation, Launch)
  * Phase 05: Marketing & Sales (Classes 13-17: AI Web Dev, Meta Ads, Lead Gen, Ecommerce Scaling)
  * Phase 06: AI Business & Scaling (Classes 18-20: Selling AI Services, High-ticket clients, Capstone Project & Certificate)
- Tools: OpenAI, Gemini, Claude, n8n, Make, Zapier, ElevenLabs, Vapi, WhatsApp API, Lovable, Cursor, Shopify, Meta Ads.
- Zero coding experience needed to start. Live classes + project recordings + certification.

Language Rule:
- If the user asks in Roman Urdu (e.g. "course ki timing kia hai", "fee kitni hai", "kya coding zaroori hai"), reply in clear, professional Roman Urdu.
- If the user asks in Urdu, reply in Urdu.
- If the user asks in English, reply in English.
- Keep responses compact, clear, and professional. Always include the official WhatsApp: 03113106280.`;

      const contents = messages.map((m: any) => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }],
      }));

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      const reply = response.text || 'Welcome to GHUFRAN KING DIGITAL. Connect with us on WhatsApp at 03113106280.';
      return res.json({ reply, source: 'gemini' });
    } catch (err: any) {
      console.warn('Gemini API call warning, falling back to built-in knowledge engine:', err.message);
    }
  }

  // Multilingual Heuristic Fallback
  const lowerMsg = latestUserMessage.toLowerCase();
  let reply = '';

  const isRomanUrdu =
    lowerMsg.includes('kya') ||
    lowerMsg.includes('kia') ||
    lowerMsg.includes('kitni') ||
    lowerMsg.includes('hai') ||
    lowerMsg.includes('kese') ||
    lowerMsg.includes('kaise') ||
    lowerMsg.includes('chahiye') ||
    lowerMsg.includes('seekh') ||
    lowerMsg.includes('batao') ||
    lowerMsg.includes('hein');

  if (isRomanUrdu) {
    if (lowerMsg.includes('fee') || lowerMsg.includes('price') || lowerMsg.includes('pese')) {
      reply = `GHUFRAN KING DIGITAL ke "MASTER AI AGENTS" course ki discounted fee structure aur upcoming batch timings ke liye admissions team se direct WhatsApp par rabta karein: **03113106280** (https://wa.me/923113106280).`;
    } else if (lowerMsg.includes('coding') || lowerMsg.includes('experience')) {
      reply = `Bilkul nahi! Is course ke liye pehle se coding aana zaroori nahi hai. Hum modern no-code/low-code AI tools jaise n8n, Vapi, WhatsApp API aur AI-assisted tools (Cursor) sikhate hain jo har koi asani se seekh sakta hai.`;
    } else if (lowerMsg.includes('course') || lowerMsg.includes('classes') || lowerMsg.includes('roadmap')) {
      reply = `Hamara "MASTER AI AGENTS" course 20 classes aur 6 phases par mushtamil hai:
1. AI Foundation & Agent Thinking
2. AI Chatbots & Lead Automation
3. Voice AI & AI Calling Systems
4. Ecommerce Business Setup
5. AI Web Dev & Meta Ads
6. Selling AI Services & Certification

Mazeed tafseelat aur enrollment ke liye WhatsApp karein: **03113106280**.`;
    } else {
      reply = `Assalamu Alaikum! GHUFRAN KING DIGITAL AI Academy mein khushamdeed. Aap course roadmap, AI agents, chatbots, voice AI calling ya enrollment ke baray mein sawal pooch saktay hain. WhatsApp support: **03113106280**.`;
    }
  } else {
    if (lowerMsg.includes('fee') || lowerMsg.includes('cost') || lowerMsg.includes('price')) {
      reply = `For current cohort fee details, flexible payment options, and scholarship assistance, please reach our admissions team directly on WhatsApp at **03113106280** (https://wa.me/923113106280).`;
    } else if (lowerMsg.includes('coding') || lowerMsg.includes('prerequisite')) {
      reply = `No prior coding background is needed. The curriculum focuses on modern no-code/low-code platforms (n8n, Vapi, ElevenLabs, WhatsApp API) and AI coding assistants (Cursor) accessible to beginners.`;
    } else if (lowerMsg.includes('roadmap') || lowerMsg.includes('curriculum') || lowerMsg.includes('classes')) {
      reply = `The **MASTER AI AGENTS** program covers 20 classes in 6 phases:
- Phase 01: AI Foundation & Agent Thinking
- Phase 02: AI Chatbots & Lead Automation
- Phase 03: Voice AI & AI Calling Systems
- Phase 04: Ecommerce Business Launch
- Phase 05: AI Web Dev & Meta Ads
- Phase 06: Selling AI Services & Certification

Connect on WhatsApp (**03113106280**) to enroll!`;
    } else {
      reply = `Welcome to GHUFRAN KING DIGITAL AI Academy. Learn how to build AI agents, smart chatbots, voice calling bots, automation pipelines, and digital systems. For admissions support, WhatsApp us at **03113106280**.`;
    }
  }

  res.json({ reply, source: 'knowledge-engine' });
});

/* =========================================================================
   SERVER STARTUP & MIDDLEWARE
========================================================================= */

async function startServer() {
  if (process.env.NODE_ENV === 'production' || process.env.PROD === 'true') {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, () => {
    console.log(`[GHUFRAN KING DIGITAL] AI Academy Server running on port ${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Server startup error:', err);
});
