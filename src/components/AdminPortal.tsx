import React, { useState, useEffect } from 'react';
import {
  Shield,
  Lock,
  LogOut,
  X,
  CheckCircle2,
  AlertCircle,
  Trash2,
  Plus,
  RefreshCw,
  Search,
  Filter,
  Save,
  BookOpen,
  Users,
  Settings,
  Sparkles,
  Layers,
  HelpCircle,
  Phone,
  Image as ImageIcon,
  KeyRound,
  LayoutDashboard,
  Menu,
  ChevronRight,
  Globe,
  Briefcase,
  FileText,
  UserCheck,
} from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';

interface Inquiry {
  id: string;
  fullName: string;
  whatsappNumber: string;
  email: string;
  course: string;
  message: string;
  createdAt: string;
  status: 'New' | 'Contacted' | 'Enrolled' | 'Completed';
}

interface AdminPortalProps {
  isOpen: boolean;
  onClose: () => void;
  onContentUpdated?: () => void;
}

type AdminTab =
  | 'dashboard'
  | 'website'
  | 'services'
  | 'courses'
  | 'classes'
  | 'about'
  | 'enrollments'
  | 'leads'
  | 'faq'
  | 'ai'
  | 'whatsapp'
  | 'media'
  | 'settings';

export const AdminPortal: React.FC<AdminPortalProps> = ({
  isOpen,
  onClose,
  onContentUpdated,
}) => {
  // Session & Setup State
  const [token, setToken] = useState<string | null>(() => {
    return sessionStorage.getItem('gkd_admin_token');
  });
  const [isSetupComplete, setIsSetupComplete] = useState<boolean | null>(null);
  const [isCheckingSetup, setIsCheckingSetup] = useState(true);

  // First-Time Setup Form State
  const [setupEmail, setSetupEmail] = useState('');
  const [setupPassword, setSetupPassword] = useState('');
  const [setupConfirmPassword, setSetupConfirmPassword] = useState('');

  // Login Form State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Forgot / Reset Password Flow State
  const [authMode, setAuthMode] = useState<'login' | 'forgot' | 'reset'>('login');
  const [forgotEmail, setForgotEmail] = useState('');
  const [resetCode, setResetCode] = useState('');
  const [resetNewPassword, setResetNewPassword] = useState('');
  const [generatedCodeNotice, setGeneratedCodeNotice] = useState<string | null>(null);

  // Authenticated Dashboard Navigation & Data
  const [activeSection, setActiveSection] = useState<AdminTab>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [cmsData, setCmsData] = useState<any>(null);
  const [isLoadingData, setIsLoadingData] = useState(false);

  // Search & Filters for leads
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Alerts & Notifications
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successToast, setSuccessToast] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Confirmation Modal State for Deletions
  const [deleteConfirmation, setDeleteConfirmation] = useState<{
    type: 'inquiry' | 'faq' | 'class' | 'service';
    id: string;
    label: string;
  } | null>(null);

  // Security Password Change State
  const [currentPwd, setCurrentPwd] = useState('');
  const [newPwd, setNewPwd] = useState('');
  const [confirmNewPwd, setConfirmNewPwd] = useState('');

  useEffect(() => {
    if (isOpen) {
      checkSetupStatus();
    }
  }, [isOpen]);

  const checkSetupStatus = async () => {
    setIsCheckingSetup(true);
    try {
      const res = await fetch('/api/admin/setup-status');
      const data = await res.json();
      setIsSetupComplete(data.isSetupComplete);

      if (token) {
        verifySession();
      }
    } catch (err) {
      console.error('Failed to check setup status:', err);
    } finally {
      setIsCheckingSetup(false);
    }
  };

  const verifySession = async () => {
    if (!token) return;
    try {
      const res = await fetch('/api/admin/verify', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        handleLogout();
      } else {
        loadAdminData();
      }
    } catch {
      handleLogout();
    }
  };

  const loadAdminData = async () => {
    if (!token) return;
    setIsLoadingData(true);
    try {
      const [inqRes, cmsRes] = await Promise.all([
        fetch('/api/inquiries', {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch('/api/content'),
      ]);

      if (inqRes.ok) {
        const inqs = await inqRes.json();
        setInquiries(inqs);
      }
      if (cmsRes.ok) {
        const cms = await cmsRes.json();
        setCmsData(cms);
      }
    } catch (err) {
      console.error('Failed to load admin data:', err);
    } finally {
      setIsLoadingData(false);
    }
  };

  const showToast = (msg: string) => {
    setSuccessToast(msg);
    setTimeout(() => setSuccessToast(null), 3500);
  };

  // 1. First-Time Setup Submission
  const handleFirstTimeSetup = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (setupPassword !== setupConfirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }
    if (setupPassword.length < 8) {
      setErrorMessage('Password must be at least 8 characters long.');
      return;
    }

    setIsProcessing(true);
    try {
      const res = await fetch('/api/admin/setup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: setupEmail,
          password: setupPassword,
          confirmPassword: setupConfirmPassword,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Setup failed');

      setToken(data.token);
      sessionStorage.setItem('gkd_admin_token', data.token);
      setIsSetupComplete(true);
      showToast('Admin account created! Welcome to the Admin Center.');
      loadAdminData();
    } catch (err: any) {
      setErrorMessage(err.message || 'Setup encountered an error');
    } finally {
      setIsProcessing(false);
    }
  };

  // 2. Admin Login Submission
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsProcessing(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: loginEmail,
          password: loginPassword,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Authentication failed');

      setToken(data.token);
      sessionStorage.setItem('gkd_admin_token', data.token);
      setLoginPassword('');
      showToast('Logged in successfully');
      loadAdminData();
    } catch (err: any) {
      setErrorMessage(err.message || 'Invalid credentials');
    } finally {
      setIsProcessing(false);
    }
  };

  // 3. Logout
  const handleLogout = async () => {
    if (token) {
      fetch('/api/admin/logout', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      }).catch(() => {});
    }
    setToken(null);
    sessionStorage.removeItem('gkd_admin_token');
    setInquiries([]);
    setCmsData(null);
    setAuthMode('login');
  };

  // 4. Forgot Password Flow
  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsProcessing(true);

    try {
      const res = await fetch('/api/admin/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: forgotEmail }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Could not process request');

      setGeneratedCodeNotice(data.recoveryCode || null);
      setAuthMode('reset');
      showToast('Recovery verification code generated.');
    } catch (err: any) {
      setErrorMessage(err.message || 'Request failed');
    } finally {
      setIsProcessing(false);
    }
  };

  // 5. Reset Password Flow
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsProcessing(true);

    try {
      const res = await fetch('/api/admin/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: forgotEmail,
          recoveryCode: resetCode,
          newPassword: resetNewPassword,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Reset failed');

      showToast('Password reset successfully! Please login with your new password.');
      setAuthMode('login');
      setResetCode('');
      setResetNewPassword('');
      setGeneratedCodeNotice(null);
    } catch (err: any) {
      setErrorMessage(err.message || 'Reset failed');
    } finally {
      setIsProcessing(false);
    }
  };

  // 6. Change Password (Authenticated)
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setErrorMessage(null);

    if (newPwd !== confirmNewPwd) {
      setErrorMessage('New passwords do not match.');
      return;
    }

    setIsProcessing(true);
    try {
      const res = await fetch('/api/admin/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          currentPassword: currentPwd,
          newPassword: newPwd,
          confirmNewPassword: confirmNewPwd,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Password update failed');

      setCurrentPwd('');
      setNewPwd('');
      setConfirmNewPwd('');
      showToast('Password changed successfully.');
    } catch (err: any) {
      setErrorMessage(err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  // 7. Save / Publish Content to Public Website
  const handleSaveCMS = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!token || !cmsData) return;
    setIsProcessing(true);
    try {
      const res = await fetch('/api/content', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(cmsData),
      });

      if (res.ok) {
        showToast('Changes saved and published to public website!');
        if (onContentUpdated) onContentUpdated();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  // 8. Lead Status Update
  const handleStatusChange = async (id: string, newStatus: string) => {
    if (!token) return;
    try {
      const res = await fetch(`/api/inquiries/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setInquiries((prev) =>
          prev.map((i) => (i.id === id ? { ...i, status: newStatus as any } : i))
        );
        showToast('Lead status updated');
      }
    } catch (err) {
      console.error(err);
    }
  };

  // 9. Execute Confirmed Deletions
  const executeDelete = async () => {
    if (!deleteConfirmation || !token) return;
    const { type, id } = deleteConfirmation;

    if (type === 'inquiry') {
      try {
        const res = await fetch(`/api/inquiries/${id}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          setInquiries((prev) => prev.filter((i) => i.id !== id));
          showToast('Inquiry deleted');
        }
      } catch (err) {
        console.error(err);
      }
    } else if (type === 'faq' && cmsData) {
      const idx = Number(id);
      const updatedFaqs = [...cmsData.faqs];
      updatedFaqs.splice(idx, 1);
      setCmsData({ ...cmsData, faqs: updatedFaqs });
      showToast('FAQ removed. Click "Save & Publish" to update live site.');
    } else if (type === 'class' && cmsData) {
      const [pIdx, cIdx] = id.split(':').map(Number);
      const updatedPhases = [...cmsData.phases];
      updatedPhases[pIdx].classes.splice(cIdx, 1);
      setCmsData({ ...cmsData, phases: updatedPhases });
      showToast('Class removed. Click "Save & Publish" to update live site.');
    } else if (type === 'service' && cmsData) {
      const idx = Number(id);
      const updatedServices = [...cmsData.services];
      updatedServices.splice(idx, 1);
      setCmsData({ ...cmsData, services: updatedServices });
      showToast('Service removed. Click "Save & Publish" to update live site.');
    }

    setDeleteConfirmation(null);
  };

  if (!isOpen) return null;

  const filteredInquiries = inquiries.filter((inq) => {
    const matchesSearch =
      inq.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.whatsappNumber.includes(searchQuery) ||
      inq.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.course.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || inq.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalLeads = inquiries.length;
  const newLeads = inquiries.filter((i) => i.status === 'New').length;
  const contactedLeads = inquiries.filter((i) => i.status === 'Contacted').length;
  const enrolledLeads = inquiries.filter((i) => i.status === 'Enrolled').length;

  const sidebarLinks: { id: AdminTab; label: string; icon: React.ElementType; badge?: number }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'website', label: 'Website', icon: Globe },
    { id: 'services', label: 'Services', icon: Briefcase },
    { id: 'courses', label: 'Courses', icon: BookOpen },
    { id: 'classes', label: 'Course Classes', icon: Layers },
    { id: 'about', label: 'About', icon: FileText },
    { id: 'enrollments', label: 'Enrollments', icon: Users, badge: inquiries.length },
    { id: 'leads', label: 'Leads', icon: UserCheck, badge: newLeads },
    { id: 'faq', label: 'FAQ', icon: HelpCircle },
    { id: 'ai', label: 'AI Assistant', icon: Sparkles },
    { id: 'whatsapp', label: 'WhatsApp/Contact', icon: Phone },
    { id: 'media', label: 'Media', icon: ImageIcon },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-6xl bg-[#09090c] border border-zinc-800 rounded-2xl shadow-2xl flex flex-col h-[94vh] max-h-[900px] overflow-hidden animate-in fade-in duration-150">
        {/* Top Navbar */}
        <div className="px-4 py-3 bg-zinc-950 border-b border-zinc-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            {token && (
              <button
                type="button"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-1.5 text-zinc-400 hover:text-white rounded border border-zinc-800"
              >
                <Menu className="w-4 h-4" />
              </button>
            )}

            <div className="w-7 h-7 rounded bg-zinc-900 border border-zinc-800 flex items-center justify-center text-white shrink-0">
              <Shield className="w-3.5 h-3.5" />
            </div>

            <div className="flex items-center gap-2">
              <span className="font-display text-xs sm:text-sm font-bold text-white tracking-tight">
                GHUFRAN KING DIGITAL
              </span>
              <span className="text-[10px] font-mono text-zinc-400 bg-zinc-900 border border-zinc-800 px-1.5 py-0.5 rounded">
                Admin Panel (/admin)
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {token && (
              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center gap-1 px-2.5 py-1 text-xs text-zinc-400 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-zinc-400 hover:text-white rounded hover:bg-zinc-900 transition-colors"
              title="Close Admin Panel"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Global Toast Alert */}
        {successToast && (
          <div className="bg-emerald-500/10 border-b border-emerald-500/20 px-4 py-2 text-xs text-emerald-300 flex items-center gap-2 shrink-0 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{successToast}</span>
          </div>
        )}

        {/* Error Alert */}
        {errorMessage && (
          <div className="bg-rose-500/10 border-b border-rose-500/20 px-4 py-2 text-xs text-rose-300 flex items-center gap-2 shrink-0 animate-in fade-in">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span className="flex-1">{errorMessage}</span>
            <button
              type="button"
              onClick={() => setErrorMessage(null)}
              className="text-rose-400 hover:text-rose-200"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Main Body */}
        <div className="flex-1 overflow-hidden flex">
          {isCheckingSetup ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center text-xs text-zinc-400 space-y-2">
                <RefreshCw className="w-5 h-5 animate-spin mx-auto text-zinc-300" />
                <p>Verifying admin security environment...</p>
              </div>
            </div>
          ) : !token ? (
            /* Unauthenticated: First-Time Setup OR Secure Login */
            <div className="flex-1 overflow-y-auto p-4 sm:p-8 flex items-center justify-center">
              {!isSetupComplete ? (
                /* First-Time Setup: CREATE ADMIN ACCOUNT */
                <div className="w-full max-w-md bg-zinc-950/80 border border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-5 animate-in fade-in">
                  <div className="text-center space-y-2">
                    <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-white mx-auto shadow-inner">
                      <KeyRound className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-white tracking-tight uppercase">
                      Create Admin Account
                    </h3>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      First-time system initialization. Create your own master administrative credentials.
                      Once created, this setup screen is permanently disabled.
                    </p>
                  </div>

                  <form onSubmit={handleFirstTimeSetup} className="space-y-3.5 text-left text-xs">
                    <div>
                      <label className="block text-zinc-300 font-medium mb-1">
                        Admin Email
                      </label>
                      <input
                        type="email"
                        required
                        value={setupEmail}
                        onChange={(e) => setSetupEmail(e.target.value)}
                        placeholder="admin@email.com"
                        className="w-full px-3.5 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500"
                      />
                    </div>

                    <div>
                      <label className="block text-zinc-300 font-medium mb-1">
                        Admin Password (Min 8 Characters)
                      </label>
                      <input
                        type="password"
                        required
                        value={setupPassword}
                        onChange={(e) => setSetupPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full px-3.5 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500"
                      />
                    </div>

                    <div>
                      <label className="block text-zinc-300 font-medium mb-1">
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        required
                        value={setupConfirmPassword}
                        onChange={(e) => setSetupConfirmPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full px-3.5 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="w-full py-2.5 text-xs font-semibold text-black bg-white rounded-lg hover:bg-zinc-200 transition-colors disabled:opacity-50 mt-2"
                    >
                      {isProcessing ? 'Initializing System...' : 'Create Admin Account & Launch'}
                    </button>
                  </form>
                </div>
              ) : authMode === 'login' ? (
                /* Admin Login */
                <div className="w-full max-w-sm bg-zinc-950/80 border border-zinc-800 rounded-2xl p-6 sm:p-7 shadow-2xl space-y-4 animate-in fade-in">
                  <div className="text-center space-y-1.5">
                    <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-white mx-auto">
                      <Lock className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-base font-bold text-white tracking-tight">Admin Sign In</h3>
                    <p className="text-xs text-zinc-400">
                      Sign in to manage website content, services, courses, and leads.
                    </p>
                  </div>

                  <form onSubmit={handleLogin} className="space-y-3 text-left text-xs">
                    <div>
                      <label className="block text-zinc-300 font-medium mb-1">Admin Email</label>
                      <input
                        type="email"
                        required
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        placeholder="admin@email.com"
                        className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-white focus:outline-none focus:border-zinc-500"
                      />
                    </div>

                    <div>
                      <label className="block text-zinc-300 font-medium mb-1">Password</label>
                      <input
                        type="password"
                        required
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-white focus:outline-none focus:border-zinc-500"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="w-full py-2.5 text-xs font-semibold text-black bg-white rounded-lg hover:bg-zinc-200 transition-colors disabled:opacity-50"
                    >
                      {isProcessing ? 'Authenticating...' : 'Sign In to Dashboard'}
                    </button>
                  </form>

                  <div className="text-center pt-2 border-t border-zinc-900">
                    <button
                      type="button"
                      onClick={() => {
                        setErrorMessage(null);
                        setAuthMode('forgot');
                      }}
                      className="text-xs text-zinc-400 hover:text-white transition-colors"
                    >
                      Forgot Admin Password?
                    </button>
                  </div>
                </div>
              ) : authMode === 'forgot' ? (
                /* Forgot Password */
                <div className="w-full max-w-sm bg-zinc-950/80 border border-zinc-800 rounded-2xl p-6 shadow-2xl space-y-4 animate-in fade-in">
                  <div className="text-center space-y-1.5">
                    <h3 className="text-base font-bold text-white">Reset Admin Password</h3>
                    <p className="text-xs text-zinc-400">
                      Enter your registered admin email to generate a verification code.
                    </p>
                  </div>

                  <form onSubmit={handleForgotPassword} className="space-y-3 text-xs">
                    <div>
                      <label className="block text-zinc-300 font-medium mb-1">Registered Email</label>
                      <input
                        type="email"
                        required
                        value={forgotEmail}
                        onChange={(e) => setForgotEmail(e.target.value)}
                        placeholder="admin@email.com"
                        className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-white focus:outline-none focus:border-zinc-500"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="w-full py-2.5 text-xs font-semibold text-black bg-white rounded-lg hover:bg-zinc-200 transition-colors disabled:opacity-50"
                    >
                      {isProcessing ? 'Generating Code...' : 'Request Recovery Code'}
                    </button>
                  </form>

                  <div className="text-center pt-2">
                    <button
                      type="button"
                      onClick={() => setAuthMode('login')}
                      className="text-xs text-zinc-400 hover:text-white"
                    >
                      Back to Login
                    </button>
                  </div>
                </div>
              ) : (
                /* Reset Password With Code */
                <div className="w-full max-w-sm bg-zinc-950/80 border border-zinc-800 rounded-2xl p-6 shadow-2xl space-y-4 animate-in fade-in">
                  <div className="text-center space-y-1.5">
                    <h3 className="text-base font-bold text-white">Enter Verification Code</h3>
                    <p className="text-xs text-zinc-400">
                      Enter the 6-digit recovery code and set your new password.
                    </p>
                  </div>

                  {generatedCodeNotice && (
                    <div className="p-3 rounded bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 text-center font-mono">
                      Your Recovery Code: <strong className="text-white text-sm">{generatedCodeNotice}</strong>
                    </div>
                  )}

                  <form onSubmit={handleResetPassword} className="space-y-3 text-xs">
                    <div>
                      <label className="block text-zinc-300 font-medium mb-1">6-Digit Code</label>
                      <input
                        type="text"
                        required
                        value={resetCode}
                        onChange={(e) => setResetCode(e.target.value)}
                        placeholder="e.g. 849201"
                        className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-white font-mono text-center tracking-widest text-sm focus:outline-none focus:border-zinc-500"
                      />
                    </div>

                    <div>
                      <label className="block text-zinc-300 font-medium mb-1">New Password</label>
                      <input
                        type="password"
                        required
                        value={resetNewPassword}
                        onChange={(e) => setResetNewPassword(e.target.value)}
                        placeholder="Min 8 characters..."
                        className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-white focus:outline-none focus:border-zinc-500"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="w-full py-2.5 text-xs font-semibold text-black bg-white rounded-lg hover:bg-zinc-200 transition-colors disabled:opacity-50"
                    >
                      {isProcessing ? 'Updating...' : 'Set New Password'}
                    </button>
                  </form>

                  <div className="text-center pt-2">
                    <button
                      type="button"
                      onClick={() => setAuthMode('login')}
                      className="text-xs text-zinc-400 hover:text-white"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Authenticated Admin Dashboard With Full Section 16 Sidebar */
            <div className="flex-1 flex overflow-hidden">
              {/* Sidebar Navigation */}
              <aside
                className={`fixed lg:static inset-y-0 left-0 z-40 w-60 bg-zinc-950 border-r border-zinc-800 flex flex-col justify-between transition-transform duration-200 ${
                  sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
                }`}
              >
                <div className="p-3 space-y-0.5 overflow-y-auto">
                  <div className="px-3 py-2 text-[10px] font-mono uppercase tracking-wider text-zinc-500">
                    Admin Navigation
                  </div>

                  {sidebarLinks.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeSection === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          setActiveSection(item.id);
                          setSidebarOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                          isActive
                            ? 'bg-white text-black font-semibold'
                            : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Icon className="w-3.5 h-3.5" />
                          <span>{item.label}</span>
                        </div>
                        {item.badge !== undefined && (
                          <span
                            className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
                              isActive ? 'bg-black text-white' : 'bg-zinc-800 text-zinc-400'
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}

                  <div className="pt-2 border-t border-zinc-900">
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-colors"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>

                <div className="p-3 border-t border-zinc-800 text-[10px] text-zinc-500 font-mono">
                  <div>Status: Online</div>
                  <div className="text-[10px] text-zinc-600 mt-0.5">Session: Encrypted</div>
                </div>
              </aside>

              {/* Main Content Viewer */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#09090c]">
                {/* 1. DASHBOARD */}
                {activeSection === 'dashboard' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                        Dashboard Overview
                      </h3>
                      <p className="text-xs text-zinc-400">
                        Real-time student inquiry metrics, services catalog, and system statuses.
                      </p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/60">
                        <div className="text-xs text-zinc-400">Total Inquiries</div>
                        <div className="text-xl sm:text-2xl font-bold text-white mt-1 font-mono">
                          {totalLeads}
                        </div>
                        <div className="text-[10px] text-zinc-500 mt-1">Logged requests</div>
                      </div>

                      <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/60">
                        <div className="text-xs text-amber-400">New Leads</div>
                        <div className="text-xl sm:text-2xl font-bold text-amber-300 mt-1 font-mono">
                          {newLeads}
                        </div>
                        <div className="text-[10px] text-zinc-500 mt-1">Pending review</div>
                      </div>

                      <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/60">
                        <div className="text-xs text-emerald-400">Enrolled</div>
                        <div className="text-xl sm:text-2xl font-bold text-emerald-300 mt-1 font-mono">
                          {enrolledLeads}
                        </div>
                        <div className="text-[10px] text-zinc-500 mt-1">Active students</div>
                      </div>

                      <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/60">
                        <div className="text-xs text-zinc-400">Contacted</div>
                        <div className="text-xl sm:text-2xl font-bold text-white mt-1 font-mono">
                          {contactedLeads}
                        </div>
                        <div className="text-[10px] text-zinc-500 mt-1">In communication</div>
                      </div>
                    </div>

                    {/* Quick Recent Activity */}
                    <div className="border border-zinc-800 rounded-xl bg-zinc-950/60 p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                          Recent Submissions
                        </h4>
                        <button
                          type="button"
                          onClick={() => setActiveSection('enrollments')}
                          className="text-xs text-zinc-400 hover:text-white inline-flex items-center gap-1"
                        >
                          <span>Manage Leads ({inquiries.length})</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {inquiries.length === 0 ? (
                        <p className="text-xs text-zinc-500 py-4 text-center">No inquiries logged yet.</p>
                      ) : (
                        <div className="space-y-2">
                          {inquiries.slice(0, 4).map((inq) => (
                            <div
                              key={inq.id}
                              className="p-3 rounded-lg bg-zinc-900/50 border border-zinc-800/80 flex items-center justify-between gap-3 text-xs"
                            >
                              <div>
                                <span className="font-semibold text-white">{inq.fullName}</span>
                                <span className="text-zinc-500 mx-2">·</span>
                                <span className="text-zinc-400">{inq.course}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">
                                  {inq.status}
                                </span>
                                <a
                                  href={`https://wa.me/${inq.whatsappNumber.replace(/[^0-9]/g, '')}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-emerald-400 hover:text-emerald-300 p-1"
                                  title="WhatsApp Chat"
                                >
                                  <WhatsAppIcon className="w-3.5 h-3.5 fill-current" />
                                </a>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* 2. WEBSITE CONTENT */}
                {activeSection === 'website' && cmsData && (
                  <form onSubmit={handleSaveCMS} className="space-y-4 max-w-2xl text-xs">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h3 className="text-base font-bold text-white">Website Content Editor</h3>
                        <p className="text-zinc-400">Update website name, hero text, and buttons.</p>
                      </div>
                      <button
                        type="submit"
                        disabled={isProcessing}
                        className="px-3.5 py-1.5 font-semibold text-black bg-white rounded-lg hover:bg-zinc-200 transition-colors flex items-center gap-1.5"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>Save &amp; Publish</span>
                      </button>
                    </div>

                    <div>
                      <label className="block text-zinc-300 font-medium mb-1">Website Brand Name</label>
                      <input
                        type="text"
                        value={cmsData.brandName || ''}
                        onChange={(e) => setCmsData({ ...cmsData, brandName: e.target.value })}
                        className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-zinc-300 font-medium mb-1">Tagline</label>
                      <input
                        type="text"
                        value={cmsData.tagline || ''}
                        onChange={(e) => setCmsData({ ...cmsData, tagline: e.target.value })}
                        className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-zinc-300 font-medium mb-1">Hero Badge</label>
                      <input
                        type="text"
                        value={cmsData.heroBadge || ''}
                        onChange={(e) => setCmsData({ ...cmsData, heroBadge: e.target.value })}
                        className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-zinc-300 font-medium mb-1">Hero Main Heading</label>
                      <textarea
                        rows={2}
                        value={cmsData.heroHeading || ''}
                        onChange={(e) => setCmsData({ ...cmsData, heroHeading: e.target.value })}
                        className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-white font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-zinc-300 font-medium mb-1">Hero Secondary Heading</label>
                      <input
                        type="text"
                        value={cmsData.heroSecondaryHeading || ''}
                        onChange={(e) => setCmsData({ ...cmsData, heroSecondaryHeading: e.target.value })}
                        className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-zinc-300 font-medium mb-1">Hero Description</label>
                      <textarea
                        rows={3}
                        value={cmsData.heroDescription || ''}
                        onChange={(e) => setCmsData({ ...cmsData, heroDescription: e.target.value })}
                        className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-zinc-300 font-medium mb-1">Footer Credit</label>
                      <input
                        type="text"
                        value={cmsData.footerCredit || ''}
                        onChange={(e) => setCmsData({ ...cmsData, footerCredit: e.target.value })}
                        className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-white"
                      />
                    </div>
                  </form>
                )}

                {/* 3. SERVICES */}
                {activeSection === 'services' && cmsData && (
                  <div className="space-y-4 max-w-3xl text-xs">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-base font-bold text-white">Services Editor</h3>
                        <p className="text-zinc-400">Edit or add agency &amp; AI services.</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            const newService = {
                              id: `custom-${Date.now()}`,
                              number: `SERVICE ${String((cmsData.services?.length || 0) + 1).padStart(2, '0')}`,
                              title: 'New Service',
                              description: 'Service description...',
                              icon: 'Bot',
                              features: ['Feature 1', 'Feature 2'],
                            };
                            setCmsData({
                              ...cmsData,
                              services: [...(cmsData.services || []), newService],
                            });
                          }}
                          className="px-3 py-1.5 text-zinc-300 hover:text-white bg-zinc-900 border border-zinc-800 rounded flex items-center gap-1"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add Service</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleSaveCMS()}
                          className="px-3.5 py-1.5 font-semibold text-black bg-white rounded hover:bg-zinc-200 transition-colors flex items-center gap-1"
                        >
                          <Save className="w-3.5 h-3.5" />
                          <span>Publish</span>
                        </button>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {cmsData.services?.map((svc: any, idx: number) => (
                        <div key={svc.id || idx} className="p-4 rounded-xl border border-zinc-800 bg-zinc-950 space-y-2.5">
                          <div className="flex items-center justify-between gap-3">
                            <span className="font-mono text-zinc-500 uppercase">{svc.number}</span>
                            <button
                              type="button"
                              onClick={() =>
                                setDeleteConfirmation({
                                  type: 'service',
                                  id: String(idx),
                                  label: svc.title,
                                })
                              }
                              className="text-zinc-500 hover:text-rose-400"
                              title="Delete Service"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div>
                            <label className="block text-zinc-400 mb-0.5">Title</label>
                            <input
                              type="text"
                              value={svc.title}
                              onChange={(e) => {
                                const copy = [...cmsData.services];
                                copy[idx].title = e.target.value;
                                setCmsData({ ...cmsData, services: copy });
                              }}
                              className="w-full font-bold text-white bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded"
                            />
                          </div>

                          <div>
                            <label className="block text-zinc-400 mb-0.5">Description</label>
                            <textarea
                              rows={2}
                              value={svc.description}
                              onChange={(e) => {
                                const copy = [...cmsData.services];
                                copy[idx].description = e.target.value;
                                setCmsData({ ...cmsData, services: copy });
                              }}
                              className="w-full text-zinc-300 bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 4. COURSES */}
                {activeSection === 'courses' && cmsData && (
                  <form onSubmit={handleSaveCMS} className="space-y-4 max-w-2xl text-xs">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h3 className="text-base font-bold text-white">Course Overview Editor</h3>
                        <p className="text-zinc-400">Edit course title, subtitle, and highlights.</p>
                      </div>
                      <button
                        type="submit"
                        disabled={isProcessing}
                        className="px-3.5 py-1.5 font-semibold text-black bg-white rounded-lg hover:bg-zinc-200 transition-colors flex items-center gap-1.5"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>Save &amp; Publish</span>
                      </button>
                    </div>

                    <div>
                      <label className="block text-zinc-300 font-medium mb-1">Course Title</label>
                      <input
                        type="text"
                        value={cmsData.courseTitle || ''}
                        onChange={(e) => setCmsData({ ...cmsData, courseTitle: e.target.value })}
                        className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-zinc-300 font-medium mb-1">Subtitle</label>
                      <input
                        type="text"
                        value={cmsData.courseSubtitle || ''}
                        onChange={(e) => setCmsData({ ...cmsData, courseSubtitle: e.target.value })}
                        className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-zinc-300 font-medium mb-1">Course Description</label>
                      <textarea
                        rows={3}
                        value={cmsData.courseDescription || ''}
                        onChange={(e) => setCmsData({ ...cmsData, courseDescription: e.target.value })}
                        className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-white"
                      />
                    </div>
                  </form>
                )}

                {/* 5. COURSE CLASSES */}
                {activeSection === 'classes' && cmsData && (
                  <div className="space-y-4 max-w-3xl text-xs">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-base font-bold text-white">Course Classes (20 Classes)</h3>
                        <p className="text-zinc-400">Manage syllabus phases and class topics.</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleSaveCMS()}
                        className="px-3.5 py-1.5 font-semibold text-black bg-white rounded hover:bg-zinc-200 transition-colors flex items-center gap-1"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>Publish</span>
                      </button>
                    </div>

                    <div className="space-y-4">
                      {cmsData.phases?.map((phase: any, pIdx: number) => (
                        <div key={phase.phaseNumber} className="p-4 rounded-xl border border-zinc-800 bg-zinc-950 space-y-3">
                          <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                            <span className="font-bold text-white">
                              {phase.phaseNumber}: {phase.title}
                            </span>
                            <span className="text-zinc-500 font-mono text-[11px]">
                              {phase.classes.length} Classes
                            </span>
                          </div>

                          <div className="space-y-2">
                            {phase.classes.map((cls: any, cIdx: number) => (
                              <div
                                key={cls.classNumber}
                                className="p-2.5 rounded bg-zinc-900 border border-zinc-800/80 flex items-center justify-between"
                              >
                                <div>
                                  <span className="font-mono text-zinc-400 mr-2">{cls.classNumber}:</span>
                                  <strong className="text-white">{cls.title}</strong>
                                  <div className="text-[11px] text-zinc-500 mt-0.5 truncate max-w-md">
                                    {cls.topics.join(', ')}
                                  </div>
                                </div>

                                <button
                                  type="button"
                                  onClick={() =>
                                    setDeleteConfirmation({
                                      type: 'class',
                                      id: `${pIdx}:${cIdx}`,
                                      label: `${cls.classNumber}: ${cls.title}`,
                                    })
                                  }
                                  className="p-1 text-zinc-500 hover:text-rose-400"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 6. ABOUT */}
                {activeSection === 'about' && cmsData && (
                  <form onSubmit={handleSaveCMS} className="space-y-4 max-w-2xl text-xs">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h3 className="text-base font-bold text-white">About Section Editor</h3>
                        <p className="text-zinc-400">Edit company narrative and feature points.</p>
                      </div>
                      <button
                        type="submit"
                        disabled={isProcessing}
                        className="px-3.5 py-1.5 font-semibold text-black bg-white rounded-lg hover:bg-zinc-200 transition-colors flex items-center gap-1.5"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>Save &amp; Publish</span>
                      </button>
                    </div>

                    <div>
                      <label className="block text-zinc-300 font-medium mb-1">About Heading</label>
                      <input
                        type="text"
                        value={cmsData.aboutHeading || ''}
                        onChange={(e) => setCmsData({ ...cmsData, aboutHeading: e.target.value })}
                        className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-zinc-300 font-medium mb-1">About Narrative</label>
                      <textarea
                        rows={4}
                        value={cmsData.aboutText || ''}
                        onChange={(e) => setCmsData({ ...cmsData, aboutText: e.target.value })}
                        className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-white"
                      />
                    </div>
                  </form>
                )}

                {/* 7. ENROLLMENTS & 8. LEADS */}
                {(activeSection === 'enrollments' || activeSection === 'leads') && (
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <h3 className="text-base font-bold text-white">
                          {activeSection === 'enrollments' ? 'Enrollment Submissions' : 'Leads Pipeline'}
                        </h3>
                        <p className="text-xs text-zinc-400">
                          Review candidate registrations and follow up directly on WhatsApp.
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={loadAdminData}
                        className="px-2.5 py-1.5 text-xs text-zinc-400 hover:text-white bg-zinc-900 border border-zinc-800 rounded flex items-center gap-1"
                      >
                        <RefreshCw className={`w-3 h-3 ${isLoadingData ? 'animate-spin' : ''}`} />
                        <span>Refresh</span>
                      </button>
                    </div>

                    {/* Filter bar */}
                    <div className="flex flex-col sm:flex-row gap-2.5 items-stretch sm:items-center justify-between">
                      <div className="relative flex-1 max-w-sm">
                        <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          type="text"
                          placeholder="Search student name, phone, course..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full pl-9 pr-3 py-1.5 text-xs bg-zinc-900 border border-zinc-800 rounded-lg text-white"
                        />
                      </div>

                      <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-2.5 py-1.5 text-xs bg-zinc-900 border border-zinc-800 rounded-lg text-white"
                      >
                        <option value="all">All Statuses ({inquiries.length})</option>
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Enrolled">Enrolled</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </div>

                    {/* Table */}
                    {filteredInquiries.length === 0 ? (
                      <div className="p-8 text-center border border-zinc-800 rounded-xl bg-zinc-900/30 text-xs text-zinc-400">
                        No entries found matching criteria.
                      </div>
                    ) : (
                      <div className="border border-zinc-800 rounded-xl overflow-hidden overflow-x-auto">
                        <table className="w-full text-left text-xs">
                          <thead className="bg-zinc-950 border-b border-zinc-800 text-[11px] font-mono text-zinc-400">
                            <tr>
                              <th className="p-3">Name</th>
                              <th className="p-3">WhatsApp</th>
                              <th className="p-3">Email</th>
                              <th className="p-3">Course / Interest</th>
                              <th className="p-3">Date</th>
                              <th className="p-3">Status</th>
                              <th className="p-3 text-right">Action</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-zinc-800/80">
                            {filteredInquiries.map((inq) => (
                              <tr key={inq.id} className="hover:bg-zinc-900/40 transition-colors">
                                <td className="p-3 font-semibold text-white">{inq.fullName}</td>
                                <td className="p-3 font-mono">
                                  <a
                                    href={`https://wa.me/${inq.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                                      `Hello ${inq.fullName}! GHUFRAN KING DIGITAL admissions here regarding your ${inq.course} inquiry.`
                                    )}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 text-emerald-400 hover:underline"
                                    title="Open WhatsApp chat"
                                  >
                                    <WhatsAppIcon className="w-3 h-3 fill-current" />
                                    <span>{inq.whatsappNumber}</span>
                                  </a>
                                </td>
                                <td className="p-3 text-zinc-400">{inq.email}</td>
                                <td className="p-3 text-zinc-300">{inq.course}</td>
                                <td className="p-3 text-zinc-500 font-mono text-[11px]">
                                  {new Date(inq.createdAt).toLocaleDateString()}
                                </td>
                                <td className="p-3">
                                  <select
                                    value={inq.status}
                                    onChange={(e) => handleStatusChange(inq.id, e.target.value)}
                                    className="text-[11px] font-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-200"
                                  >
                                    <option value="New">New</option>
                                    <option value="Contacted">Contacted</option>
                                    <option value="Enrolled">Enrolled</option>
                                    <option value="Completed">Completed</option>
                                  </select>
                                </td>
                                <td className="p-3 text-right">
                                  <button
                                    type="button"
                                    onClick={() =>
                                      setDeleteConfirmation({
                                        type: 'inquiry',
                                        id: inq.id,
                                        label: `Lead from ${inq.fullName}`,
                                      })
                                    }
                                    className="p-1 text-zinc-500 hover:text-rose-400 transition-colors"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                )}

                {/* 9. FAQ */}
                {activeSection === 'faq' && cmsData && (
                  <div className="space-y-4 max-w-3xl text-xs">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-base font-bold text-white">FAQ Editor</h3>
                        <p className="text-zinc-400">Add, edit, or delete customer FAQs.</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            const newFaqs = [
                              { question: 'New Question?', answer: 'Answer details here...' },
                              ...cmsData.faqs,
                            ];
                            setCmsData({ ...cmsData, faqs: newFaqs });
                          }}
                          className="px-3 py-1.5 text-zinc-300 hover:text-white bg-zinc-900 border border-zinc-800 rounded flex items-center gap-1"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add Question</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleSaveCMS()}
                          className="px-3.5 py-1.5 font-semibold text-black bg-white rounded hover:bg-zinc-200 transition-colors flex items-center gap-1"
                        >
                          <Save className="w-3.5 h-3.5" />
                          <span>Publish</span>
                        </button>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {cmsData.faqs?.map((faq: any, idx: number) => (
                        <div key={idx} className="p-3.5 rounded-xl border border-zinc-800 bg-zinc-950 space-y-2">
                          <div className="flex items-center justify-between gap-2">
                            <input
                              type="text"
                              value={faq.question}
                              onChange={(e) => {
                                const copy = [...cmsData.faqs];
                                copy[idx].question = e.target.value;
                                setCmsData({ ...cmsData, faqs: copy });
                              }}
                              className="w-full font-bold text-white bg-zinc-900 border border-zinc-800 px-2.5 py-1.5 rounded"
                            />
                            <button
                              type="button"
                              onClick={() =>
                                setDeleteConfirmation({
                                  type: 'faq',
                                  id: String(idx),
                                  label: faq.question,
                                })
                              }
                              className="p-1 text-zinc-500 hover:text-rose-400"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <textarea
                            rows={2}
                            value={faq.answer}
                            onChange={(e) => {
                              const copy = [...cmsData.faqs];
                              copy[idx].answer = e.target.value;
                              setCmsData({ ...cmsData, faqs: copy });
                            }}
                            className="w-full text-zinc-300 bg-zinc-900 border border-zinc-800 px-2.5 py-1.5 rounded"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 10. AI ASSISTANT */}
                {activeSection === 'ai' && cmsData && (
                  <form onSubmit={handleSaveCMS} className="space-y-4 max-w-2xl text-xs">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-base font-bold text-white">AI Assistant Settings</h3>
                        <p className="text-zinc-400">Configure greeting and system behavior.</p>
                      </div>
                      <button
                        type="submit"
                        disabled={isProcessing}
                        className="px-3.5 py-1.5 font-semibold text-black bg-white rounded-lg hover:bg-zinc-200 transition-colors flex items-center gap-1.5"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>Save &amp; Publish</span>
                      </button>
                    </div>

                    <div>
                      <label className="block text-zinc-300 font-medium mb-1">
                        Welcome Message (English / Roman Urdu)
                      </label>
                      <textarea
                        rows={3}
                        value={cmsData.aiWelcomeMessage || ''}
                        onChange={(e) => setCmsData({ ...cmsData, aiWelcomeMessage: e.target.value })}
                        className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-zinc-300 font-medium mb-1">
                        System Prompt Instructions
                      </label>
                      <textarea
                        rows={5}
                        value={cmsData.aiInstructions || ''}
                        onChange={(e) => setCmsData({ ...cmsData, aiInstructions: e.target.value })}
                        className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-white font-mono text-[11px]"
                      />
                    </div>
                  </form>
                )}

                {/* 11. WHATSAPP & CONTACT */}
                {activeSection === 'whatsapp' && cmsData && (
                  <form onSubmit={handleSaveCMS} className="space-y-4 max-w-2xl text-xs">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-base font-bold text-white">WhatsApp &amp; Contact Settings</h3>
                        <p className="text-zinc-400">Manage communication contact details.</p>
                      </div>
                      <button
                        type="submit"
                        disabled={isProcessing}
                        className="px-3.5 py-1.5 font-semibold text-black bg-white rounded-lg hover:bg-zinc-200 transition-colors flex items-center gap-1.5"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>Save &amp; Publish</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-zinc-300 font-medium mb-1">
                          WhatsApp Number
                        </label>
                        <input
                          type="text"
                          value={cmsData.whatsappNumber || ''}
                          onChange={(e) => setCmsData({ ...cmsData, whatsappNumber: e.target.value })}
                          className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-zinc-300 font-medium mb-1">
                          Admissions Email
                        </label>
                        <input
                          type="email"
                          value={cmsData.contactEmail || ''}
                          onChange={(e) => setCmsData({ ...cmsData, contactEmail: e.target.value })}
                          className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-white"
                        />
                      </div>
                    </div>

                    <div className="p-3.5 rounded-lg bg-zinc-950 border border-zinc-800 text-[11px] text-zinc-400">
                      Live URL: <span className="font-mono text-emerald-400">{cmsData.whatsappUrl || 'https://wa.me/923113106280'}</span>
                    </div>
                  </form>
                )}

                {/* 12. MEDIA */}
                {activeSection === 'media' && (
                  <div className="space-y-6 max-w-2xl text-xs">
                    <div>
                      <h3 className="text-base font-bold text-white">Media &amp; Logo Management</h3>
                      <p className="text-zinc-400">Active branding assets for GHUFRAN KING DIGITAL.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-950 space-y-2">
                        <div className="font-bold text-white">Brand Crown Logo</div>
                        <div className="w-20 h-20 rounded-lg bg-zinc-900 border border-zinc-800 overflow-hidden mx-auto my-2">
                          <img
                            src="/src/assets/images/brand_crown_logo_1791171755909.jpg"
                            alt="Logo"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <p className="text-[11px] text-zinc-500 text-center">
                          Active in Navbar, Favicon, &amp; Footer
                        </p>
                      </div>

                      <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-950 space-y-2">
                        <div className="font-bold text-white">Hero Cyber Visual</div>
                        <div className="w-full h-20 rounded-lg bg-zinc-900 border border-zinc-800 overflow-hidden my-2">
                          <img
                            src="/src/assets/images/hero_digital_growth_1791171696581.jpg"
                            alt="Hero"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <p className="text-[11px] text-zinc-500 text-center">
                          Active in Platform Showcase
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* 13. SETTINGS */}
                {activeSection === 'settings' && (
                  <form onSubmit={handleChangePassword} className="space-y-4 max-w-md text-xs">
                    <div>
                      <h3 className="text-base font-bold text-white">Admin Security &amp; Password</h3>
                      <p className="text-zinc-400">
                        Update your master admin password securely.
                      </p>
                    </div>

                    <div>
                      <label className="block text-zinc-300 font-medium mb-1">
                        Current Password
                      </label>
                      <input
                        type="password"
                        required
                        value={currentPwd}
                        onChange={(e) => setCurrentPwd(e.target.value)}
                        className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-zinc-300 font-medium mb-1">
                        New Password (Min 8 Characters)
                      </label>
                      <input
                        type="password"
                        required
                        value={newPwd}
                        onChange={(e) => setNewPwd(e.target.value)}
                        className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-zinc-300 font-medium mb-1">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        required
                        value={confirmNewPwd}
                        onChange={(e) => setConfirmNewPwd(e.target.value)}
                        className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-white"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="px-4 py-2 text-xs font-semibold text-black bg-white rounded-lg hover:bg-zinc-200 transition-colors disabled:opacity-50"
                    >
                      {isProcessing ? 'Updating...' : 'Update Password'}
                    </button>
                  </form>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Confirmation Modal Before Deleting */}
      {deleteConfirmation && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-sm bg-[#0c0c10] border border-zinc-800 rounded-2xl p-6 space-y-4 shadow-2xl">
            <div className="flex items-center gap-2.5 text-rose-400">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <h4 className="text-sm font-bold text-white">Confirm Permanent Deletion</h4>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed">
              Are you sure you want to delete <strong className="text-white">&ldquo;{deleteConfirmation.label}&rdquo;</strong>?
              This action cannot be undone.
            </p>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setDeleteConfirmation(null)}
                className="px-3 py-1.5 text-xs text-zinc-400 hover:text-white rounded"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={executeDelete}
                className="px-3.5 py-1.5 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-500 rounded transition-colors"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
