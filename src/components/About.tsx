'use client';

import { motion } from 'framer-motion';

const STATS = [
  { value: '3+', label: 'Years Experience' },
  { value: '12+', label: 'Projects Shipped' },
  { value: '5', label: 'Live Products' },
];

export default function About() {
  return (
    <section id="about" className="py-32 bg-[#F9F9F6] overflow-hidden">
      <div className="container mx-auto px-6 md:px-10 max-w-7xl">
        <div className="flex flex-col items-center justify-between gap-20 md:flex-row">

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
                className={`absolute z-10 rounded-2xl bg-white px-5 py-3 shadow-xl shadow-black/8 border border-gray-100 ${
                  i === 0 ? '-top-6 -right-6 md:-right-10' :
                  i === 1 ? 'top-[60%] -right-10 md:-right-20 -translate-y-1/2' :
                  'top-1/2 -left-6 md:-left-12 -translate-y-1/2'
                }`}
              >
                <p className="font-playfair text-2xl font-black text-foreground">{stat.value}</p>
                <p className="text-xs font-bold uppercase tracking-wider text-muted">{stat.label}</p>
              </motion.div>
            ))}

            {/* Photo */}
            <div className="relative h-[420px] w-[340px] md:h-[520px] md:w-[420px] overflow-hidden rounded-[3rem] bg-foreground shadow-2xl mb-6">
              <img
                src="/profile.jpg"
                alt="Abdikarim — Senior Developer"
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>

            {/* Name label outside photo */}
            <div className="flex flex-col items-center justify-center text-center mt-6">
              <p className="font-playfair text-3xl font-black text-foreground mb-2">Abdikarim</p>
              <div className="inline-flex items-center justify-center rounded-lg bg-black px-4 py-1.5 text-sm font-bold uppercase tracking-widest text-white shadow-lg">
                Web Developer
              </div>
            </div>
          </motion.div>

          {/* Text content */}
          <div className="flex-1 max-w-xl space-y-8 text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="mb-4 inline-block text-sm font-black uppercase tracking-[0.2em] text-primary">
                — About Me
              </span>
              <h2 className="font-playfair text-5xl font-black text-foreground md:text-6xl leading-tight">
                Architect of{' '}
                <span className="relative">
                  <span className="relative z-10">Digital Systems</span>
                  <span className="absolute bottom-1 left-0 z-0 h-3 w-full bg-primary/25 skew-x-[-3deg]" />
                </span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="space-y-5 text-lg leading-relaxed text-muted"
            >
              <p>
                I&apos;m a Senior Full-Stack Developer with a sharp focus on building
                high-performance, production-ready systems. My work spans POS terminals,
                xamarpizza-manara, and dukaan— always engineered for scale.
              </p>
              <p>
                I combine a deep understanding of systems architecture with a refined
                aesthetic eye, producing interfaces as precise as the logic driving them.
                Every product I build is crafted to last.
              </p>
            </motion.div>

            {/* Tech stack pills */}
            <motion.div
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap justify-center gap-3 md:justify-start"
            >
              {['Next.js', 'React', 'Node.js', 'MongoDB', 'TypeScript', 'Vercel'].map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-bold text-foreground shadow-sm"
                >
                  {tech}
                </span>
              ))}
            </motion.div>

            <motion.a
              href="https://github.com/616796362q-create"
              target="_blank"
              rel="noopener noreferrer"
              id="about-github-cta"
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="inline-flex h-14 items-center gap-3 rounded-xl bg-foreground px-10 text-base font-black text-white shadow-xl shadow-foreground/10 transition-all hover:-translate-y-0.5 hover:bg-foreground/80"
            >
              View GitHub Profile
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
}
