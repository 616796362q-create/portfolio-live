'use client';

import { Instagram, Linkedin, Mail, Github, ArrowUpRight } from 'lucide-react';

const SOCIAL_LINKS = [
  { icon: Github,    label: 'GitHub',    url: 'https://github.com/616796362q-create' },
  { icon: Linkedin,  label: 'LinkedIn',  url: 'https://www.linkedin.com/in/abdikarim-adam-5b1167253/' },
  { icon: Instagram, label: 'Instagram', url: '#' },
  { icon: Mail,      label: 'Email',     url: 'mailto:616796362q@gmail.com' },
];

const NAV_LINKS = [
  { label: 'About',    href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills',   href: '#skills' },
  { label: 'Contact',  href: '#contacts' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-foreground pt-20 pb-10">
      <div className="container mx-auto px-6 md:px-10 max-w-7xl">

        {/* Top row */}
        <div className="flex flex-col items-start justify-between gap-12 border-b border-white/10 pb-12 md:flex-row md:items-center">
          {/* Brand */}
          <div className="max-w-xs">
            <p className="font-playfair text-4xl font-black text-white">
              AK<span className="text-primary">.</span>
            </p>
            <p className="mt-3 text-base text-white/50 leading-relaxed">
              Crafting high-performance digital systems with precision and purpose.
            </p>
          </div>

          {/* Nav */}
          <nav>
            <p className="mb-4 text-xs font-black uppercase tracking-[0.2em] text-primary">Navigation</p>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="flex items-center gap-1 text-sm font-semibold text-white/60 transition-colors hover:text-white"
                  >
                    {link.label} <ArrowUpRight size={12} />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* CTA */}

        </div>

        {/* Bottom row */}
        <div className="flex flex-col items-center justify-between gap-6 pt-10 md:flex-row">
          <p className="text-sm font-semibold text-white/40">
            © {year} Abdikarim. All rights reserved.
          </p>

          {/* Social icons */}
          <div className="flex items-center gap-5">
            {SOCIAL_LINKS.map((item) => (
              <a
                key={item.label}
                href={item.url}
                target={item.url.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                aria-label={item.label}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-white/60 transition-all hover:border-primary hover:text-primary hover:scale-110"
              >
                <item.icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}
