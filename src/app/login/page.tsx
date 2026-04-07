'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Fingerprint, Lock, ArrowRight, Shield, CheckCircle2, AlertCircle, LogOut } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState<'idle' | 'authorizing' | 'success' | 'error'>('idle');

  const handleAuthorize = () => {
    setStatus('authorizing');
    setTimeout(() => {
      if (password === '1234') {
        localStorage.setItem('auth_status', 'true');
        setStatus('success');
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 2000);
      }
    }, 1500);
  };

  const handleLogout = () => {
    localStorage.removeItem('auth_status');
    setStatus('idle');
    setPassword('');
  };

  return (
    <div className="min-h-screen bg-[#F9F9F6] grid place-items-center relative overflow-hidden px-6">
      
      {/* Background decoration */}
      <div className="absolute top-0 right-0 h-[600px] w-[600px] bg-primary/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 h-[600px] w-[600px] bg-foreground/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      {/* Security badge at top */}
      <div className="absolute top-10 flex items-center justify-center w-full">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 rounded-full bg-green-100 border border-green-200 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-green-700 shadow-sm"
        >
          <ShieldCheck size={12} strokeWidth={3} /> 
          <span>System Fully Secured</span>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md my-20"
      >
        <div className="mb-8 text-center">
          <Link href="/" className="inline-block mb-8 font-playfair text-3xl font-black text-foreground">
            AK<span className="text-primary">.</span>
          </Link>
          <h1 className="font-playfair text-4xl font-black text-foreground mb-3">
            {status === 'success' ? 'Access Granted' : 'Welcome Back'}
          </h1>
          <p className="text-muted font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-2">
            <Lock size={12} className="text-primary" /> 
            <span>{status === 'success' ? 'Authenticated Session' : 'Encrypted Access Point'}</span>
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-xl border border-white p-10 rounded-[3rem] shadow-2xl shadow-black/5 ring-1 ring-black/5">
          {status === 'success' ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-10"
            >
              <div className="mx-auto w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-green-200">
                <CheckCircle2 size={40} />
              </div>
              <h2 className="text-xl font-black text-foreground mb-2">Authorization Complete</h2>
              <p className="text-muted text-sm font-bold uppercase tracking-wider mb-8">Decryption key applied successfully</p>
              
              <div className="flex flex-col gap-4">
                <Link href="/" className="h-14 w-full rounded-2xl bg-foreground text-white font-black flex items-center justify-center gap-2 transition-all hover:scale-[1.02]">
                  Forward to Base <ArrowRight size={18} />
                </Link>
                
                <button 
                  onClick={handleLogout}
                  className="h-14 w-full rounded-2xl border-2 border-foreground/10 text-foreground font-black flex items-center justify-center gap-2 transition-all hover:bg-red-50 hover:text-red-600 hover:border-red-100"
                >
                  <LogOut size={18} /> Terminate Session
                </button>
              </div>
            </motion.div>
          ) : (
            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); handleAuthorize(); }}>
              <div className="space-y-2">
                <div className="flex items-center justify-between px-2">
                  <label className="text-xs font-black uppercase tracking-wider text-muted">Access Key</label>
                  <button type="button" className="text-[10px] font-bold text-primary hover:underline uppercase tracking-tighter">Emergency Recovery?</button>
                </div>
                <div className="relative group">
                  <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${status === 'error' ? 'text-red-500' : 'text-muted group-focus-within:text-foreground'}`} size={18} />
                  <input 
                    type="password" 
                    autoFocus
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={status === 'authorizing'}
                    className={`h-16 w-full rounded-2xl border-none px-12 text-lg font-black placeholder:text-muted focus:ring-2 transition-all outline-none tracking-[0.2em] shadow-inner ${
                      status === 'error' ? 'bg-red-50 focus:ring-red-500' : 'bg-foreground/5 focus:ring-primary focus:bg-white'
                    }`}
                    placeholder="••••••••••••" 
                  />
                  {status === 'error' && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-red-500 flex items-center gap-1 text-[10px] font-black uppercase">
                      <AlertCircle size={14} /> Denial
                    </div>
                  )}
                </div>
              </div>

              <button 
                disabled={status === 'authorizing' || !password}
                className="h-16 w-full rounded-2xl bg-foreground text-white font-black text-lg transition-all hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-foreground/20 flex items-center justify-center gap-3 disabled:opacity-50 disabled:pointer-events-none"
              >
                {status === 'authorizing' ? (
                  <span className="flex items-center gap-2">
                    <motion.span 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="inline-block"
                    >
                      <Shield size={18} />
                    </motion.span>
                    Authorizing...
                  </span>
                ) : (
                  <>Authorize Access <ArrowRight size={20} /></>
                )}
              </button>

              <div className="relative py-4">
                <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-gray-100" /></div>
                <div className="relative flex justify-center text-xs uppercase font-black text-muted"><span className="bg-[#F9F9F6] px-4 rounded-full">Biometric Protocol</span></div>
              </div>

              <button type="button" className="h-16 w-full rounded-2xl border-2 border-foreground/10 bg-white/50 text-foreground font-black text-sm uppercase tracking-widest transition-all hover:bg-foreground hover:text-white flex items-center justify-center gap-3">
                <Fingerprint size={20} /> Use Secure Key
              </button>
            </form>
          )}

          <div className="mt-8 flex items-center justify-center gap-6 opacity-30 grayscale saturate-0 pointer-events-none">
            <Shield size={24} />
            <div className="h-6 w-px bg-foreground/20" />
            <Lock size={24} />
            <div className="h-6 w-px bg-foreground/20" />
            <ShieldCheck size={24} />
          </div>
        </div>

        <p className="mt-10 text-center text-xs font-bold text-muted uppercase tracking-[0.1em]">
          Powered by <span className="text-foreground font-black">AES-256</span> Infrastructure
        </p>
      </motion.div>
    </div>
  );
}

