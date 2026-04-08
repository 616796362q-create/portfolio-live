'use client';

import { motion } from 'framer-motion';
import { 
  Code2, Sparkles, Terminal, Globe, 
  Cpu, Database, Layers, Zap 
} from 'lucide-react';
import { 
  SiNextdotjs, SiReact, SiTypescript, SiNodedotjs, 
  SiMongodb, SiVercel, SiTailwindcss, SiFramer 
} from 'react-icons/si';

const STATS = [
  { value: '3+', label: 'Years Experience', icon: Sparkles },
  { value: '12+', label: 'Projects Shipped', icon: Code2 },
  { value: '5', label: 'Live Products', icon: Terminal },
];

const TECH_STACK = [
  { name: 'Next.js', icon: SiNextdotjs, color: '#000000' },
  { name: 'React', icon: SiReact, color: '#61DAFB' },
  { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
  { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
  { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
  { name: 'Vercel', icon: SiVercel, color: '#000000' },
  { name: 'Tailwind', icon: SiTailwindcss, color: '#06B6D4' },
  { name: 'Framer', icon: SiFramer, color: '#0055FF' },
];

export default function About() {
  return (
    <section id="about" className="py-32 bg-[#F9F9F6] overflow-hidden">
      <div className="container mx-auto px-6 md:px-10 max-w-7xl">
        <div className="flex flex-col items-center justify-between gap-16 lg:flex-row">

          {/* Portrait side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative flex-shrink-0"
          >
            {/* Stats floating cards */}
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.15 }}
                className={`absolute z-10 rounded-2xl bg-white px-5 py-3 shadow-xl shadow-black/8 border border-gray-100 flex items-center gap-3 ${
                  i === 0 ? '-top-6 -right-6 md:-right-10' :
                  i === 1 ? 'top-[75%] -right-10 md:-right-20 -translate-y-1/2' :
                  'top-1/2 -left-6 md:-left-12 -translate-y-1/2'
                }`}
              >
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <stat.icon size={18} />
                </div>
                <div>
                  <p className="font-playfair text-2xl font-black text-foreground leading-none">{stat.value}</p>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-muted mt-1">{stat.label}</p>
                </div>
              </motion.div>
            ))}

            {/* Portrait Frame */}
            <div className="relative h-[480px] w-[340px] md:h-[580px] md:w-[440px] p-4 bg-white rounded-[3.5rem] shadow-2xl overflow-hidden group">
               <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
               <div className="h-full w-full rounded-[2.5rem] overflow-hidden bg-gray-100 relative">
                  <img
                    src="/profile.jpg"
                    alt="Abdikarim — Senior Developer"
                    className="h-full w-full object-cover transition-all duration-700 hover:scale-105"
                  />
               </div>
            </div>

            {/* Name & Title Shape */}
            <div className="relative mt-8 mx-auto bg-white px-10 py-5 rounded-3xl shadow-xl shadow-black/5 border border-gray-100 text-center z-20 w-[90%] md:w-[380px] hover:-translate-y-2 transition-transform duration-500">
               <p className="font-playfair text-3xl font-black mb-1 italic text-foreground">Abdikarim</p>
               <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary">Senior Developer</p>
            </div>

            {/* Decorative elements */}
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-primary/20 rounded-full blur-3xl" />
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
          </motion.div>

          {/* Text content */}
          <div className="flex-1 max-w-xl space-y-10 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 justify-center lg:justify-start mb-6">
                <span className="h-px w-8 bg-primary" />
                <span className="text-sm font-black uppercase tracking-[0.3em] text-primary">
                  The Architect
                </span>
              </div>
              <h2 className="font-playfair text-5xl font-black text-foreground md:text-7xl leading-[1.1]">
                Mastering the<br />
                <span className="text-primary italic">Full Stack.</span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="space-y-6 text-lg leading-relaxed text-muted font-medium"
            >
              <p>
                I thrive at the intersection of complex **systems architecture** and 
                state-of-the-art **user interfaces**. My mission is to build digital environments 
                that aren't just functional, but legendary.
              </p>
              <p>
                From architecting robust POS terminals to scaling international SaaS platforms, 
                I bring a "performance-first" mindset to every line of code.
              </p>
            </motion.div>

            {/* Visual Tech Stack Grid (Replacing text with images as requested) */}
            <div className="space-y-6">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground">Commanding Technologies</p>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="grid grid-cols-4 md:grid-cols-4 gap-4"
              >
                {TECH_STACK.map((tech, i) => (
                  <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.05 }}
                    className="group relative flex aspect-square items-center justify-center rounded-2xl bg-white border border-gray-100 shadow-sm transition-all hover:shadow-xl hover:shadow-primary/10 hover:border-primary/30"
                  >
                    <tech.icon
                      style={{ color: tech.color }}
                      className="h-10 w-10 transition-all duration-300 group-hover:scale-110"
                    />
                    <div className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <span className="text-[10px] font-black uppercase tracking-widest text-primary">{tech.name}</span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="pt-10 flex flex-col sm:flex-row items-center gap-6"
            >
              <a
                href="https://github.com/616796362q-create"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-3 px-10 py-5 bg-foreground text-white rounded-2xl overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-black/10"
              >
                <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative z-10 font-black uppercase tracking-widest text-sm group-hover:text-black transition-colors">Observe Source Code</span>
                <Globe className="relative z-10 w-4 h-4 group-hover:text-black group-hover:rotate-12 transition-all" />
              </a>
              <div className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                 <span className="text-[10px] font-black uppercase tracking-tighter text-muted">Currently Available for New Systems</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
