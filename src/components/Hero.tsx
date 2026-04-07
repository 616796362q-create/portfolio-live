'use client';

import { motion } from 'framer-motion';
import { ArrowDown, Linkedin, Github } from 'lucide-react';

export default function Hero() {
  return (
    <section id="hero" className="container mx-auto px-6 pt-16 pb-24 md:px-10 md:pt-20 md:pb-36 max-w-7xl">
      <div className="flex flex-col-reverse items-center justify-between gap-16 md:flex-row">

        {/* ── Left: Text Content ── */}
        <div className="max-w-xl text-center md:text-left">

          {/* Badge */}
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-5 py-2 text-sm font-bold uppercase tracking-widest text-primary"
          >
            <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
            Full-Stack Developer
          </motion.span>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-6 font-playfair text-5xl font-black leading-[1.05] text-foreground md:text-[5.5rem]"
          >
            Hello, I&apos;m{' '}
            <span className="relative inline-block">
              <span className="relative z-10">Abdikarim</span>
              <span className="absolute bottom-1 left-0 z-0 h-4 w-full bg-primary/30" />
            </span>
          </motion.h1>

          {/* Bio */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-10 text-xl leading-relaxed text-muted"
          >
            I architect high-scale, full-stack systems — from POS terminals and
            fireshoe platforms to manara products — with obsessive attention to
            performance and precision.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4 md:justify-start"
          >
            <a
              href="#projects"
              id="hero-cta-projects"
              className="inline-flex h-14 items-center gap-2 rounded-xl bg-foreground px-10 text-base font-bold text-white transition-all hover:bg-foreground/80 hover:-translate-y-0.5 shadow-xl shadow-foreground/10"
            >
              View Work
            </a>
            <a
              href="https://github.com/616796362q-create"
              target="_blank"
              rel="noopener noreferrer"
              id="hero-cta-github"
              className="inline-flex h-14 w-14 items-center justify-center rounded-xl border-2 border-foreground text-foreground transition-all hover:bg-foreground hover:text-white hover:-translate-y-0.5"
              title="GitHub Profile"
            >
              <Github size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/abdikarim-adam-5b1167253/"
              target="_blank"
              rel="noopener noreferrer"
              id="hero-cta-linkedin"
              className="inline-flex h-14 w-14 items-center justify-center rounded-xl border-2 border-foreground text-foreground transition-all hover:bg-foreground hover:text-white hover:-translate-y-0.5"
              title="LinkedIn Profile"
            >
              <Linkedin size={20} />
            </a>
          </motion.div>

          {/* Scroll hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="mt-14 hidden items-center gap-3 text-sm font-semibold uppercase tracking-widest text-muted md:flex"
          >
            <ArrowDown className="h-4 w-4 animate-bounce" />
            Scroll to explore
          </motion.div>
        </div>

        {/* ── Right: Illustration ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="relative flex h-[340px] w-[340px] shrink-0 items-center justify-center md:h-[500px] md:w-[500px]"
        >
          {/* Outer decorative rings */}
          <div className="absolute inset-0 rounded-full border-[14px] border-primary/15" />
          <div className="absolute inset-6 rounded-full border-2 border-dashed border-primary/30 animate-[spin_40s_linear_infinite]" />

          {/* Background circle fill */}
          <div className="absolute inset-10 rounded-full bg-gradient-to-br from-primary/10 to-foreground/5" />

          {/* Illustration */}
          <div className="relative z-10 h-[85%] w-[85%] flex items-end justify-center">
            <img
              src="/hero-illustration.png"
              alt="Developer at work — Abdikarim"
              className="h-full w-full object-contain drop-shadow-2xl"
            />
          </div>

          {/* Floating "Available" badge */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9 }}
            className="absolute -bottom-2 -right-2 rounded-2xl bg-foreground px-5 py-3 shadow-2xl md:-bottom-4 md:-right-4"
          >
            <p className="text-[10px] font-bold uppercase tracking-widest text-primary">Available</p>
            <p className="text-sm font-black text-white">For Projects</p>
          </motion.div>

          {/* Floating stat */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.0 }}
            className="absolute -top-2 -left-2 rounded-2xl bg-white border border-gray-100 px-5 py-3 shadow-xl md:-top-4 md:-left-4"
          >
            <p className="font-playfair text-2xl font-black text-foreground">12+</p>
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted">Projects Shipped</p>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
