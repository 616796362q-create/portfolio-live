'use client';

import { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Activity, Users, Zap, Server, Globe, ArrowUpRight, ArrowDownRight, 
  LayoutDashboard, Settings, Bell, LogOut, Search, Terminal, 
  Mail, MailOpen, Trash2, X, CheckSquare, ListFilter, Trash,
  Plus, Edit3, Save, ExternalLink, Github, FolderCode
} from 'lucide-react';
import Link from 'next/link';

type ContactMessage = {
  name: string;
  email: string;
  message: string;
  time: string;
  read: boolean;
};

type Project = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  link: string;
  githubUrl?: string;
};

type NavTab = 'overview' | 'inbox' | 'projects' | 'performance' | 'logs' | 'settings';

export default function Dashboard() {
  const [isAuth, setIsAuth] = useState<boolean | null>(null);
  const [activeTab, setActiveTab] = useState<NavTab>('overview');
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [selectedMsg, setSelectedMsg] = useState<ContactMessage | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Projects state
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Dynamic stats
  const [telemetry, setTelemetry] = useState({
    uptime: 100,
    latency: 12,
    visitors: 0,
    bandwidth: 0
  });

  useEffect(() => {
    if (localStorage.getItem('auth_status') === 'true') {
      setIsAuth(true);
      const stored = JSON.parse(localStorage.getItem('contact_messages') || '[]');
      setMessages(stored);
      fetchProjects();

      // Real telemetry will be implemented here
      const interval = setInterval(() => {
        setTelemetry(prev => ({ ...prev }));
      }, 5000);

      return () => clearInterval(interval);
    } else {
      window.location.href = '/login';
    }
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects');
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error('Failed to fetch projects', error);
    }
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;

    setIsSaving(true);
    let updatedProjects;
    if (editingProject.id === -1) {
      const newProj = { ...editingProject, id: Date.now() };
      updatedProjects = [...projects, newProj];
    } else {
      updatedProjects = projects.map(p => p.id === editingProject.id ? editingProject : p);
    }

    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProjects),
      });
      if (response.ok) {
        setProjects(updatedProjects);
        setEditingProject(null);
      }
    } catch (error) {
      alert('Failed to save project');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteProject = async (id: number) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    const updated = projects.filter(p => p.id !== id);
    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated),
      });
      if (response.ok) setProjects(updated);
    } catch (error) {
      alert('Failed to delete project');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('auth_status');
    window.location.href = '/login';
  };

  const loadDemoMessages = () => {
    const demos: ContactMessage[] = [
      {
        name: 'Ahmed Hassan',
        email: 'ahmed@example.com',
        message: 'Hi Abdikarim! I saw your POS project and I am really impressed. I would love to discuss a similar system for my retail chain of 5 stores. Can we schedule a call this week?',
        time: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
        read: false,
      },
      {
        name: 'Fatima Ali',
        email: 'fatima@startup.io',
        message: 'Hello! We are a Nairobi-based startup looking for a full-stack developer for a 3-month contract. Your portfolio stood out. Are you available for remote work?',
        time: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        read: false,
      },
      {
        name: 'Mohamed Yusuf',
        email: 'mo.yusuf@agency.com',
        message: 'Great work on the Manara Plaza platform! We are a digital agency looking to partner with talented developers. Would you be interested in a collaboration?',
        time: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        read: true,
      },
    ];
    const merged = [...demos, ...messages];
    setMessages(merged);
    localStorage.setItem('contact_messages', JSON.stringify(merged));
  };

  const markRead = (index: number) => {
    const updated = [...messages];
    updated[index].read = true;
    setMessages(updated);
    localStorage.setItem('contact_messages', JSON.stringify(updated));
    setSelectedMsg(updated[index]);
  };

  const markAllRead = () => {
    const updated = messages.map(m => ({ ...m, read: true }));
    setMessages(updated);
    localStorage.setItem('contact_messages', JSON.stringify(updated));
  };

  const clearRead = () => {
    const unread = messages.filter(m => !m.read);
    setMessages(unread);
    localStorage.setItem('contact_messages', JSON.stringify(unread));
  };

  const deleteMsg = (index: number) => {
    const updated = messages.filter((_, i) => i !== index);
    setMessages(updated);
    localStorage.setItem('contact_messages', JSON.stringify(updated));
    setSelectedMsg(null);
  };

  const filteredMessages = useMemo(() => {
    return messages.filter(m => 
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      m.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [messages, searchQuery]);

  const unreadCount = messages.filter(m => !m.read).length;

  if (isAuth === null) return <div className="min-h-screen bg-background" />;

  const STATS = [
    { label: 'System Uptime', value: `${telemetry.uptime}%`, change: '+0.01%', isUp: true, icon: Server },
    { label: 'Network Latency', value: `${telemetry.latency}ms`, change: '-12.5%', isUp: true, icon: Zap },
    { label: 'Total Visitors', value: telemetry.visitors.toLocaleString(), change: '+24.4%', isUp: true, icon: Users },
    { label: 'Bandwidth Output', value: `${telemetry.bandwidth} TB`, change: '+5.4%', isUp: true, icon: Globe },
  ];

  const RECENT_ACTIVITY: { id: number; action: string; project: string; time: string; status: string }[] = [];

  const CHART_DATA = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  return (
    <div className="min-h-screen bg-[#F0F0F0] flex font-nunito">
      
      {/* Sidebar */}
      <aside className="w-64 bg-foreground text-white hidden md:flex flex-col justify-between fixed h-full z-20">
        <div>
          <div className="p-8">
            <Link href="/" className="font-playfair text-3xl font-black tracking-tight">
              AK<span className="text-primary">.</span>
            </Link>
            <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 mt-1 font-bold">Admin Portal</p>
          </div>
          <nav className="mt-6 space-y-2 px-4">
            <button 
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'overview' ? 'bg-white/10 text-white shadow-lg' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
            >
              <LayoutDashboard size={18} /> Overview
            </button>
            <button 
              onClick={() => setActiveTab('inbox')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'inbox' ? 'bg-white/10 text-white shadow-lg' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
            >
              <Mail size={18} />
              <span>Inbox</span>
              {unreadCount > 0 && (
                <span className="ml-auto bg-primary text-black text-[10px] font-black rounded-full px-2 py-0.5">{unreadCount}</span>
              )}
            </button>
            <button 
              onClick={() => setActiveTab('projects')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'projects' ? 'bg-white/10 text-white shadow-lg' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
            >
              <FolderCode size={18} /> Projects
            </button>
            <button 
              onClick={() => setActiveTab('performance')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'performance' ? 'bg-white/10 text-white shadow-lg' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
            >
              <Activity size={18} /> Performance
            </button>
            <button 
              onClick={() => setActiveTab('logs')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'logs' ? 'bg-white/10 text-white shadow-lg' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
            >
              <Terminal size={18} /> Logs
            </button>
            <button 
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'settings' ? 'bg-white/10 text-white shadow-lg' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
            >
              <Settings size={18} /> Settings
            </button>
          </nav>
        </div>
        <div className="p-4">
          <button 
            onClick={handleLogout}
            className="flex w-full items-center justify-center gap-3 bg-red-500/10 text-red-400 hover:bg-red-500/20 px-4 py-3 rounded-xl font-bold transition-all"
          >
            <LogOut size={18} /> Terminate Session
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-6 md:p-10 max-w-[1600px] w-full">
        
        {/* Header */}
        <header className="flex items-center justify-between mb-12">
          <div>
            <h1 className="font-playfair text-4xl font-black text-foreground capitalize">{activeTab}</h1>
            <p className="text-muted font-bold text-sm uppercase tracking-wider mt-1">
              {activeTab === 'overview' ? 'Live System Telemetry' : `System Admin > ${activeTab}`}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex bg-white px-4 py-2 rounded-full border border-gray-200 items-center gap-2 shadow-sm">
              <Search size={16} className="text-gray-400" />
              <input 
                type="text" 
                placeholder="Global search..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none outline-none text-sm font-bold w-48" 
              />
            </div>
            <button className="h-10 w-10 flex items-center justify-center rounded-full bg-white border border-gray-200 text-foreground relative shadow-sm hover:border-text-primary transition-colors">
              <Bell size={18} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center rounded-full bg-red-500 text-white text-[9px] font-black border-2 border-white">{unreadCount}</span>
              )}
            </button>
          </div>
        </header>

        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {STATS.map((stat, i) => (
                  <motion.div 
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl hover:shadow-black/5 transition-all"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="p-3 rounded-2xl bg-gray-50 text-foreground">
                        <stat.icon size={22} />
                      </div>
                      <div className={`flex items-center gap-1 text-xs font-black uppercase rounded-full px-2 py-1 ${stat.isUp ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                        {stat.isUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                        {stat.change}
                      </div>
                    </div>
                    <h3 className="text-3xl font-black text-foreground mb-1 font-playfair">{stat.value}</h3>
                    <p className="text-xs uppercase font-bold text-muted tracking-wider">{stat.label}</p>
                  </motion.div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                {/* Performance Chart */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                  className="lg:col-span-2 bg-foreground text-white p-8 rounded-3xl shadow-xl shadow-black/5 relative overflow-hidden"
                >
                  <div className="flex justify-between items-center mb-10 relative z-10">
                    <div>
                      <h2 className="text-2xl font-black font-playfair">Global Traffic Map</h2>
                      <p className="text-sm font-bold text-gray-400 mt-1 uppercase tracking-wider">Last 12 hours telemetry</p>
                    </div>
                    <div className="flex gap-2 items-center">
                      <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                      <span className="text-xs font-black uppercase tracking-widest text-primary">Live</span>
                    </div>
                  </div>
                  <div className="h-64 flex items-end justify-between gap-2 relative z-10">
                    {CHART_DATA.map((val, i) => (
                      <div key={i} className="w-full flex flex-col justify-end group">
                        <motion.div 
                          initial={{ height: 0 }}
                          animate={{ height: `${val}%` }}
                          transition={{ delay: 0.5 + (i * 0.05), type: "spring" }}
                          className="w-full bg-white/20 rounded-t-sm relative transition-all group-hover:bg-primary"
                        >
                          <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] font-black px-2 py-1 rounded shadow-lg transition-opacity">
                            {val}k
                          </div>
                        </motion.div>
                      </div>
                    ))}
                  </div>
                  <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-transparent to-primary/10 opacity-20 pointer-events-none" />
                  <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-primary/20 rounded-full blur-[80px]" />
                </motion.div>

                {/* System Logs */}
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col"
                >
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-black text-foreground font-playfair">System Logs</h2>
                    <button onClick={() => setActiveTab('logs')} className="text-xs font-bold text-primary uppercase hover:underline">View All</button>
                  </div>
                  <div className="flex-1 space-y-6 overflow-hidden">
                    {RECENT_ACTIVITY.length === 0 ? (
                      <div className="h-full flex items-center justify-center">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">No active logs</p>
                      </div>
                    ) : (
                      RECENT_ACTIVITY.map((log) => (
                        <div key={log.id} className="relative pl-6">
                          <span className="absolute left-[7px] top-4 bottom-[-24px] w-0.5 bg-gray-100 last:hidden" />
                          <span className={`absolute left-0 top-1.5 w-4 h-4 rounded-full border-4 border-white shadow-sm ${
                            log.status === 'Success' ? 'bg-green-500' : 
                            log.status === 'Warning' ? 'bg-primary' : 'bg-blue-500'
                          }`} />
                          <p className="text-sm font-black text-foreground">{log.action}</p>
                          <div className="flex items-center justify-between mt-1">
                            <p className="text-xs font-bold text-gray-400">{log.project}</p>
                            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-300">{log.time}</p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </motion.div>
              </div>

              {/* Quick Contact Summary */}
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 mt-6">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-2xl bg-gray-50">
                      <Mail size={20} className="text-foreground" />
                    </div>
                    <div>
                      <h2 className="text-xl font-black text-foreground font-playfair">Recent Inquiries</h2>
                      <p className="text-xs font-bold text-muted uppercase tracking-wider">{unreadCount} unread messages</p>
                    </div>
                  </div>
                  <button onClick={() => setActiveTab('inbox')} className="text-xs font-black uppercase tracking-wider bg-primary/10 text-foreground hover:bg-primary px-6 py-2 rounded-xl transition-all">Go to Inbox</button>
                </div>
                {messages.length === 0 ? (
                  <p className="text-center py-10 text-muted font-bold uppercase tracking-widest text-sm">No messages yet</p>
                ) : (
                  <div className="space-y-4">
                    {messages.slice(0, 3).map((msg, i) => (
                      <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                         <div className="flex items-center gap-4">
                           <div className="w-10 h-10 rounded-xl bg-foreground text-white flex items-center justify-center font-playfair font-black">{msg.name.charAt(0)}</div>
                           <div>
                             <p className="text-sm font-black text-foreground">{msg.name}</p>
                             <p className="text-[10px] font-bold text-primary">{msg.email}</p>
                           </div>
                         </div>
                         <p className="text-xs text-muted font-bold">{new Date(msg.time).toLocaleDateString()}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {activeTab === 'inbox' && (
            <motion.div
              key="inbox"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-white rounded-[3rem] shadow-sm border border-gray-100 overflow-hidden min-h-[600px]"
            >
              <div className="flex flex-col md:flex-row items-center justify-between p-8 border-b border-gray-100 gap-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-gray-50">
                    <Mail size={20} className="text-foreground" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-foreground font-playfair">Messaging Hub</h2>
                    <p className="text-xs font-bold text-muted uppercase tracking-wider">
                      {messages.length} total · {unreadCount} unread
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <div className="relative group mr-2">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={14} />
                    <input 
                      type="text" 
                      placeholder="Filter by name..." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="bg-gray-50 pl-10 pr-4 py-2 rounded-xl text-sm font-bold border-none outline-none focus:ring-2 focus:ring-primary/20 w-48 transition-all"
                    />
                  </div>
                  <button
                    onClick={markAllRead}
                    disabled={unreadCount === 0}
                    className="flex items-center gap-2 text-xs font-black uppercase tracking-wider bg-primary/10 text-foreground hover:bg-primary px-4 py-2.5 rounded-xl transition-all disabled:opacity-30 disabled:pointer-events-none"
                  >
                    <CheckSquare size={14} /> Mark All Read
                  </button>
                  <button
                    onClick={clearRead}
                    disabled={messages.filter(m => m.read).length === 0}
                    className="flex items-center gap-2 text-xs font-black uppercase tracking-wider bg-red-50 text-red-500 hover:bg-red-500 hover:text-white px-4 py-2.5 rounded-xl transition-all disabled:opacity-30 disabled:pointer-events-none"
                  >
                    <Trash2 size={14} /> Clear Read
                  </button>
                  <button
                    onClick={loadDemoMessages}
                    className="flex items-center gap-2 text-xs font-black uppercase tracking-wider border-2 border-gray-100 text-foreground hover:bg-gray-100 px-4 py-2 rounded-xl transition-all"
                  >
                    Load Demo
                  </button>
                </div>
              </div>

              {filteredMessages.length === 0 ? (
                <div className="p-32 text-center">
                  <MailOpen size={60} className="mx-auto text-gray-100 mb-6" />
                  <h3 className="text-xl font-black text-foreground mb-2">Inbox is empty</h3>
                  <p className="text-muted font-bold uppercase tracking-widest text-xs mb-8">No messages matching your criteria</p>
                  <button
                    onClick={loadDemoMessages}
                    className="bg-foreground text-white font-black px-8 py-4 rounded-2xl hover:scale-105 transition-all shadow-xl shadow-black/10"
                  >
                    Reload Dataset
                  </button>
                </div>
              ) : (
                <div className="divide-y divide-gray-50 max-h-[600px] overflow-y-auto custom-scrollbar">
                  {filteredMessages.map((msg, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.05 }}
                      className={`flex items-start gap-5 p-8 cursor-pointer transition-all hover:bg-gray-50/50 relative group ${!msg.read ? 'bg-primary/[0.03]' : ''}`}
                      onClick={() => markRead(i)}
                    >
                      {!msg.read && <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary" />}
                      <div className="w-14 h-14 rounded-2xl bg-foreground text-white flex items-center justify-center font-playfair font-black text-xl flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                        {msg.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-3 mb-2">
                          <div className="flex items-center gap-3">
                            <h4 className={`text-lg font-black ${!msg.read ? 'text-foreground' : 'text-gray-600'}`}>{msg.name}</h4>
                            {!msg.read && <span className="bg-primary text-[10px] font-black uppercase px-2 py-0.5 rounded-full">New</span>}
                          </div>
                          <p className="text-xs text-gray-400 font-bold">
                            {new Date(msg.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', month: 'short', day: 'numeric' })}
                          </p>
                        </div>
                        <p className="text-sm text-primary font-bold mb-3">{msg.email}</p>
                        <p className="text-base text-muted/80 leading-relaxed line-clamp-2 italic">"{msg.message}"</p>
                      </div>
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                         <button
                           onClick={(e) => { e.stopPropagation(); deleteMsg(i); }}
                           className="w-10 h-10 flex items-center justify-center rounded-xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-sm"
                         >
                           <Trash size={18} />
                         </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'projects' && (
            <motion.div
              key="projects"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-gray-50">
                    <FolderCode size={24} className="text-foreground" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-foreground font-playfair">Portfolio Management</h2>
                    <p className="text-xs font-bold text-muted uppercase tracking-wider">{projects.length} showcase items</p>
                  </div>
                </div>
                <button
                  onClick={() => setEditingProject({ id: -1, title: '', description: '', imageUrl: '', category: '', link: '', githubUrl: '' })}
                  className="flex items-center gap-2 bg-foreground text-white font-black px-6 py-3 rounded-xl hover:scale-105 transition-all shadow-xl shadow-black/10"
                >
                  <Plus size={18} /> Add Project
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((proj) => (
                  <motion.div
                    key={proj.id}
                    layoutId={`proj-${proj.id}`}
                    className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 group transition-all hover:shadow-xl hover:shadow-black/5"
                  >
                    <div className="relative h-40 bg-gray-100">
                      <img src={proj.imageUrl} alt={proj.title} className="w-full h-full object-cover" />
                      <div className="absolute top-4 right-4 flex gap-2">
                        <button 
                          onClick={() => setEditingProject(proj)}
                          className="p-2.5 rounded-xl bg-white/90 backdrop-blur text-foreground hover:bg-primary transition-all shadow-lg"
                        >
                          <Edit3 size={16} />
                        </button>
                        <button 
                          onClick={() => handleDeleteProject(proj.id)}
                          className="p-2.5 rounded-xl bg-white/90 backdrop-blur text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-lg"
                        >
                          <Trash size={16} />
                        </button>
                      </div>
                    </div>
                    <div className="p-6">
                      <span className="text-[10px] font-black uppercase text-primary tracking-widest">{proj.category}</span>
                      <h3 className="text-lg font-black font-playfair text-foreground mt-1 mb-2">{proj.title}</h3>
                      <p className="text-xs text-muted/80 line-clamp-2 leading-relaxed mb-4">{proj.description}</p>
                      <div className="flex items-center gap-3 pt-4 border-t border-gray-50">
                        <a href={proj.link} target="_blank" className="p-2 rounded-lg bg-gray-50 text-foreground hover:text-primary transition-colors">
                          <ExternalLink size={14} />
                        </a>
                        {proj.githubUrl && (
                          <a href={proj.githubUrl} target="_blank" className="p-2 rounded-lg bg-gray-50 text-foreground hover:text-primary transition-colors">
                            <Github size={14} />
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <AnimatePresence>
                {editingProject && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-6"
                  >
                    <motion.div
                      initial={{ scale: 0.9, y: 20 }}
                      animate={{ scale: 1, y: 0 }}
                      className="bg-white rounded-[3rem] p-10 max-w-2xl w-full shadow-2xl relative"
                    >
                      <button onClick={() => setEditingProject(null)} className="absolute top-8 right-8 text-gray-400 hover:text-foreground p-2">
                        <X size={24} />
                      </button>
                      <h2 className="text-3xl font-black font-playfair mb-8">{editingProject.id === -1 ? 'Add New Project' : 'Edit Project Details'}</h2>
                      
                      <form onSubmit={handleSaveProject} className="grid grid-cols-2 gap-6">
                        <div className="col-span-2 space-y-2">
                           <label className="text-xs font-black uppercase tracking-wider text-muted">Project Title</label>
                           <input 
                             required
                             value={editingProject.title}
                             onChange={e => setEditingProject({...editingProject, title: e.target.value})}
                             className="w-full h-14 bg-gray-50 rounded-2xl px-6 font-bold focus:ring-2 focus:ring-primary/20 transition-all outline-none" 
                           />
                        </div>
                        <div className="space-y-2">
                           <label className="text-xs font-black uppercase tracking-wider text-muted">Category</label>
                           <input 
                             required
                             value={editingProject.category}
                             onChange={e => setEditingProject({...editingProject, category: e.target.value})}
                             className="w-full h-14 bg-gray-50 rounded-2xl px-6 font-bold focus:ring-2 focus:ring-primary/20 transition-all outline-none" 
                           />
                        </div>
                        <div className="space-y-2">
                           <label className="text-xs font-black uppercase tracking-wider text-muted">Thumbnail URL</label>
                           <input 
                             required
                             value={editingProject.imageUrl}
                             onChange={e => setEditingProject({...editingProject, imageUrl: e.target.value})}
                             className="w-full h-14 bg-gray-50 rounded-2xl px-6 font-bold focus:ring-2 focus:ring-primary/20 transition-all outline-none" 
                           />
                        </div>
                        <div className="col-span-2 space-y-2">
                           <label className="text-xs font-black uppercase tracking-wider text-muted">Description</label>
                           <textarea 
                             required
                             rows={3}
                             value={editingProject.description}
                             onChange={e => setEditingProject({...editingProject, description: e.target.value})}
                             className="w-full bg-gray-50 rounded-2xl p-6 font-bold focus:ring-2 focus:ring-primary/20 transition-all outline-none resize-none" 
                           />
                        </div>
                        <div className="space-y-2">
                           <label className="text-xs font-black uppercase tracking-wider text-muted">Demo Link</label>
                           <input 
                             value={editingProject.link}
                             onChange={e => setEditingProject({...editingProject, link: e.target.value})}
                             className="w-full h-14 bg-gray-50 rounded-2xl px-6 font-bold focus:ring-2 focus:ring-primary/20 transition-all outline-none" 
                           />
                        </div>
                        <div className="space-y-2">
                           <label className="text-xs font-black uppercase tracking-wider text-muted">GitHub Repo</label>
                           <input 
                             value={editingProject.githubUrl}
                             onChange={e => setEditingProject({...editingProject, githubUrl: e.target.value})}
                             className="w-full h-14 bg-gray-50 rounded-2xl px-6 font-bold focus:ring-2 focus:ring-primary/20 transition-all outline-none" 
                           />
                        </div>

                        <button
                          type="submit"
                          disabled={isSaving}
                          className="col-span-2 h-16 bg-foreground text-white rounded-2xl font-black text-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                        >
                          {isSaving ? 'Synchronizing Datastore...' : (
                            <><Save size={20} /> Deploy Changes to Production</>
                          )}
                        </button>
                      </form>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {activeTab === 'settings' && (
            <motion.div
              key="settings"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="bg-white rounded-[3rem] p-12 shadow-sm border border-gray-100"
            >
               <h2 className="text-3xl font-black font-playfair mb-8">System Configuration</h2>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="space-y-8">
                     <div>
                        <h3 className="text-xs font-black uppercase tracking-widest text-primary mb-4">— Admin Access</h3>
                        <div className="space-y-4">
                           <div className="flex flex-col gap-2">
                              <label className="text-sm font-bold text-foreground">Access Password</label>
                              <input type="password" value="1234" readOnly className="h-14 bg-gray-50 border-none rounded-2xl px-6 text-foreground font-black opacity-60" />
                              <p className="text-[10px] text-muted font-bold">Primary authentication key for admin portal.</p>
                           </div>
                        </div>
                     </div>
                     <div>
                        <h3 className="text-xs font-black uppercase tracking-widest text-primary mb-4">— Preferences</h3>
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                           <span className="font-bold">Enable Desktop Notifications</span>
                           <div className="w-12 h-6 bg-primary rounded-full relative"><div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" /></div>
                        </div>
                     </div>
                  </div>
                  <div className="space-y-8">
                     <div>
                        <h3 className="text-xs font-black uppercase tracking-widest text-primary mb-4">— Data Persistence</h3>
                        <div className="p-6 border-2 border-dashed border-gray-100 rounded-[2rem]">
                            <p className="text-sm font-bold text-muted mb-6">Your message history is currently stored locally in this browser. To enable cloud syncing, connect a database.</p>
                            <button className="w-full flex items-center justify-center gap-2 h-14 bg-foreground text-white rounded-2xl font-black hover:bg-foreground/80 transition-all">
                               <Server size={18} /> Connect MongoDB Atlas
                            </button>
                        </div>
                     </div>
                     <button 
                       onClick={handleLogout}
                       className="w-full h-16 rounded-2xl border-2 border-red-100 bg-red-50 text-red-500 font-black hover:bg-red-500 hover:text-white transition-all flex items-center justify-center gap-3"
                     >
                        <LogOut size={20} /> Destroy Current Session
                     </button>
                  </div>
               </div>
            </motion.div>
          )}

          {/* Placeholder for other tabs */}
          {(activeTab === 'performance' || activeTab === 'logs') && (
            <motion.div
              key="placeholder"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-[3rem] p-32 text-center shadow-sm border border-gray-100"
            >
               <Terminal size={60} className="mx-auto text-primary/20 mb-8" />
               <h2 className="text-3xl font-black font-playfair mb-4">Under Development</h2>
               <p className="text-muted font-bold uppercase tracking-[0.2em] mb-12">System module offline for maintenance</p>
               <button onClick={() => setActiveTab('overview')} className="text-sm font-black uppercase bg-foreground text-white px-8 py-4 rounded-2xl">Return to Command Center</button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Message Modal */}
        <AnimatePresence>
          {selectedMsg && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-6"
              onClick={() => setSelectedMsg(null)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.9, y: 20, opacity: 0 }}
                className="bg-white rounded-[3rem] shadow-2xl max-w-xl w-full p-12 relative overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="absolute top-0 left-0 w-full h-2 bg-primary" />
                <button onClick={() => setSelectedMsg(null)} className="absolute top-8 right-8 text-gray-400 hover:text-foreground transition-colors p-2 hover:bg-gray-100 rounded-full">
                  <X size={24} />
                </button>
                <div className="flex items-center gap-5 mb-10">
                  <div className="w-16 h-16 rounded-[1.5rem] bg-foreground text-white flex items-center justify-center font-playfair font-black text-3xl shadow-xl shadow-black/10">
                    {selectedMsg.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-3xl font-black text-foreground font-playfair">{selectedMsg.name}</h3>
                    <p className="text-primary font-bold">{selectedMsg.email}</p>
                  </div>
                </div>
                <div className="bg-gray-50/80 rounded-[2rem] p-8 border border-gray-100 mb-8 max-h-[300px] overflow-y-auto">
                  <p className="text-foreground font-semibold leading-relaxed text-lg italic text-muted/70">
                    "{selectedMsg.message}"
                  </p>
                </div>
                <div className="flex items-center justify-between mb-8">
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">
                    Captured: {new Date(selectedMsg.time).toLocaleString()}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Authenticated Transmission</span>
                  </div>
                </div>
                <a
                  href={`mailto:${selectedMsg.email}?subject=Re: Your portfolio inquiry&body=Hi ${selectedMsg.name},%0D%0A%0D%0AThank you for reaching out regarding my work.%0D%0A%0D%0A`}
                  className="flex h-16 items-center justify-center gap-3 rounded-2xl bg-foreground text-white font-black text-lg hover:bg-foreground/80 transition-all shadow-xl shadow-black/10 group"
                >
                  <Mail size={20} className="group-hover:scale-125 transition-transform" /> 
                  <span>Initiate Email Response</span>
                </a>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </main>
    </div>
  );
}
