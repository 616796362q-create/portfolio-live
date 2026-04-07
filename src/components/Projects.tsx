'use client';

import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';
import projectData from '@/data/projects.json';

type Project = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  link: string;
  githubUrl?: string;
};

export default function Projects() {
  const projects = projectData as Project[];

  return (
    <section id="projects" className="py-32 bg-[#F9F9F6] overflow-hidden">
      <div className="container mx-auto px-6 md:px-10 max-w-7xl">

        {/* Section Title */}
        <div className="mb-24 text-center">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-4 block text-sm font-black uppercase tracking-[0.2em] text-primary"
          >
            — Selected Work
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-playfair text-5xl font-black text-foreground md:text-7xl"
          >
            Projects
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mx-auto mt-4 h-1.5 w-24 origin-left rounded-full bg-primary md:origin-center"
          />
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-8 text-xl text-muted max-w-2xl mx-auto"
          >
            Explore my latest work across retail systems, real estate, and financial technology.
          </motion.p>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, idx) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="group flex flex-col overflow-hidden rounded-3xl bg-white border border-gray-100 shadow-lg shadow-black/5 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/10"
            >
              {/* Image */}
              <a
                href={project.githubUrl || project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="relative h-56 overflow-hidden bg-gray-100 block"
              >
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Category badge */}
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center rounded-full bg-foreground/90 px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-primary shadow-lg backdrop-blur-sm">
                    {project.category}
                  </span>
                </div>
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-foreground/0 transition-all duration-300 group-hover:bg-foreground/20" />
              </a>

              {/* Card Body */}
              <div className="flex flex-1 flex-col p-7">
                <h3 className="mb-3 font-playfair text-xl font-black text-foreground leading-tight">
                  {project.title}
                </h3>
                <p className="mb-6 text-sm leading-relaxed text-muted flex-1">
                  {project.description}
                </p>

                {/* Links */}
                <div className="flex items-center gap-5 border-t border-gray-100 pt-5">
                  {project.link && project.link !== '#' && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-foreground transition-colors hover:text-primary"
                    >
                      Live Demo <ExternalLink size={13} />
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-foreground transition-colors hover:text-primary"
                    >
                      GitHub <Github size={13} />
                    </a>
                  )}
                  {project.link === '#' && !project.githubUrl && (
                    <span className="text-xs font-bold uppercase tracking-widest text-muted">Coming Soon</span>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
