'use client';

import { motion } from 'framer-motion';

const SKILL_GROUPS = [
  {
    category: 'Frontend',
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'HTML5 / CSS3'],
  },
  {
    category: 'Backend',
    skills: ['Node.js', 'Express.js', 'REST APIs', 'JWT / Auth', 'Serverless', 'WebSockets'],
  },
  {
    category: 'Database & Infra',
    skills: ['MongoDB', 'Mongoose', 'Vercel', 'MongoDB Atlas', 'Git / GitHub', 'Postman'],
  },
  {
    category: 'Specializations',
    skills: [' POS Systems', 'Manara Platforms', 'Retail Scan-Hubs', 'Xamar Pizza Ordering', 'fireshoe', 'Protected Systems'],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-32 bg-foreground overflow-hidden">
      <div className="container mx-auto px-6 md:px-10 max-w-7xl">

        {/* Title */}
        <div className="mb-20 text-center">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-4 block text-sm font-black uppercase tracking-[0.2em] text-primary"
          >
            — Expertise
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-playfair text-5xl font-black text-white md:text-7xl"
          >
            Skills & Stack
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-6 text-xl text-white/50 max-w-xl mx-auto"
          >
            Battle-tested technologies I reach for to build production systems.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SKILL_GROUPS.map((group, gi) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: gi * 0.1 }}
              className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm hover:border-primary/40 transition-all hover:bg-white/8"
            >
              <div className="mb-6 flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-primary" />
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-primary">
                  {group.category}
                </h3>
              </div>
              <ul className="space-y-3">
                {group.skills.map((skill, si) => (
                  <motion.li
                    key={skill}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: gi * 0.1 + si * 0.05 }}
                    className="flex items-center gap-3 text-base font-semibold text-white/80"
                  >
                    <span className="h-px w-4 bg-primary/60 flex-shrink-0" />
                    {skill}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
