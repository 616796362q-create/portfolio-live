'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, Users, Zap, Server, Globe, ArrowUpRight, ArrowDownRight, LayoutDashboard, Settings, Bell, LogOut, Search, Terminal } from 'lucide-react';
import Link from 'next/link';

const STATS = [
  { label: 'System Uptime', value: '99.99%', change: '+0.01%', isUp: true, icon: Server },
  { label: 'Network Latency', value: '24ms', change: '-12.5%', isUp: true, icon: Zap },
  { label: 'Total Visitors', value: '14,293', change: '+24.4%', isUp: true, icon: Users },
  { label: 'Bandwidth Output', value: '1.2 TB', change: '+5.4%', isUp: true, icon: Globe },
];

const RECENT_ACTIVITY = [
  { id: 1, action: 'Deployed to Production', project: 'portfolio-live', time: '2 mins ago', status: 'Success' },
  { id: 2, action: 'Database Index rebuild', project: 'Manara System', time: '1 hour ago', status: 'Success' },
  { id: 3, action: 'Traffic Spike Detected', project: 'Dukaan Scan', time: '4 hours ago', status: 'Warning' },
  { id: 4, action: 'SSL Certificate Renewed', project: 'Xamar Pizza', time: '1 day ago', status: 'Success' },
  { id: 5, action: 'System reboot initiated', project: 'Core Infrastructure', time: '2 days ago', status: 'Info' },
];

const CHART_DATA = [30, 45, 38, 65, 48, 75, 55, 82, 60, 45, 70, 95];

export default function Dashboard() {
  const [isAuth, setIsAuth] = useState<boolean | null>(null);

  useEffect(() => {
    // Basic auth check
    if (localStorage.getItem('auth_status') === 'true') {
      setIsAuth(true);
    } else {
      window.location.href = '/login';
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('auth_status');
    window.location.href = '/login';
  };

  if (isAuth === null) return <div className="min-h-screen bg-background" />; // blank white before redirect

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
            <a href="#" className="flex items-center gap-3 bg-white/10 text-white px-4 py-3 rounded-xl font-bold transition-colors">
              <LayoutDashboard size={18} /> Overview
            </a>
            <a href="#" className="flex items-center gap-3 text-gray-400 hover:bg-white/5 hover:text-white px-4 py-3 rounded-xl font-bold transition-colors">
              <Activity size={18} /> Performance
            </a>
            <a href="#" className="flex items-center gap-3 text-gray-400 hover:bg-white/5 hover:text-white px-4 py-3 rounded-xl font-bold transition-colors">
              <Terminal size={18} /> Logs
            </a>
            <a href="#" className="flex items-center gap-3 text-gray-400 hover:bg-white/5 hover:text-white px-4 py-3 rounded-xl font-bold transition-colors">
              <Settings size={18} /> Settings
            </a>
          </nav>
        </div>
        
        <div className="p-4">
          <button 
            onClick={handleLogout}
            className="flex w-full items-center gap-3 bg-red-500/10 text-red-400 hover:bg-red-500/20 px-4 py-3 rounded-xl font-bold transition-all"
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
            <h1 className="font-playfair text-4xl font-black text-foreground">Dashboard</h1>
            <p className="text-muted font-bold text-sm uppercase tracking-wider mt-1">Live System Telemetry</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex bg-white px-4 py-2 rounded-full border border-gray-200 items-center gap-2 shadow-sm">
              <Search size={16} className="text-gray-400" />
              <input type="text" placeholder="Search logs..." className="bg-transparent border-none outline-none text-sm font-bold w-48" />
            </div>
            <button className="h-10 w-10 flex items-center justify-center rounded-full bg-white border border-gray-200 text-foreground relative shadow-sm">
              <Bell size={18} />
              <span className="absolute top-2 right-2.5 h-2 w-2 rounded-full bg-red-500 border border-white" />
            </button>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {STATS.map((stat, i) => (
            <motion.div 
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100"
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Performance Chart Simulation */}
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
              <div className="flex gap-2">
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
                    {/* Tooltip on hover */}
                    <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] font-black px-2 py-1 rounded shadow-lg transition-opacity">
                      {val}k
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
            
            {/* Background design */}
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-transparent to-primary/10 opacity-20 pointer-events-none" />
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-primary/20 rounded-full blur-[80px]" />
          </motion.div>

          {/* Recent Activity */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-black text-foreground font-playfair">System Logs</h2>
              <button className="text-xs font-bold text-primary uppercase hover:underline">View All</button>
            </div>
            
            <div className="flex-1 space-y-6">
              {RECENT_ACTIVITY.map((log) => (
                <div key={log.id} className="relative pl-6">
                  {/* Timeline line */}
                  <span className="absolute left-[7px] top-4 bottom-[-24px] w-0.5 bg-gray-100 last:hidden" />
                  
                  {/* Timeline dot */}
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
              ))}
            </div>
          </motion.div>

        </div>
      </main>
    </div>
  );
}
