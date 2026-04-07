'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, LogOut } from 'lucide-react';

const NAV_ITEMS = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contacts' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    setIsAuth(localStorage.getItem('auth_status') === 'true');
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('auth_status');
    setIsAuth(false);
    window.location.href = '/login';
  };

  return (
    <nav
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 shadow-sm shadow-black/5 backdrop-blur-xl'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-6 py-5 md:px-10 max-w-7xl">
        {/* Logo */}
        <Link
          href="/"
          className="font-playfair text-xl font-black text-foreground tracking-tight"
        >
          AK<span className="text-primary">.</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center md:flex gap-10">
          <ul className="flex items-center space-x-10">
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  id={`nav-${item.label.toLowerCase()}`}
                  className="relative text-sm font-bold uppercase tracking-widest text-foreground transition-opacity hover:text-primary group"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>
          
          {isAuth && (
            <button 
              onClick={handleSignOut}
              className="flex h-10 items-center gap-2 rounded-xl bg-red-50 px-5 text-sm font-black text-red-600 transition-all hover:bg-red-100 hover:scale-[1.02]"
            >
              <LogOut size={16} /> Sign Out
            </button>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          id="nav-mobile-toggle"
          aria-label="Toggle mobile menu"
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-foreground md:hidden"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div className="md:hidden border-t border-gray-100 bg-white px-6 pb-8 pt-4 shadow-xl">
          <ul className="space-y-5">
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block text-lg font-bold text-foreground hover:text-primary transition-colors"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          
          {isAuth && (
            <button 
              onClick={handleSignOut}
              className="mt-8 flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-red-50 text-base font-black text-red-600"
            >
              <LogOut size={20} /> Sign Out
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
