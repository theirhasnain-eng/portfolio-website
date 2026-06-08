import { motion } from "framer-motion";
import { FiExternalLink, FiGithub } from "react-icons/fi";

export default function ProjectCard({ project, index }) {
  return (
    <motion.article
      className="group glass glass-hover card-shine relative flex flex-col overflow-hidden rounded-2xl"
      whileHover={{ y: -6 }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-elevated)] via-transparent to-transparent opacity-80" />
        {project.featured && (
          <span className="absolute left-4 top-4 rounded-full bg-brand-500/90 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
            Featured
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-xl font-bold text-[var(--text-primary)]">
          {project.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--text-secondary)]">
          {project.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span
              key={t}
              className="rounded-lg border border-[var(--border-subtle)] bg-white/5 px-2.5 py-1 text-xs font-medium text-[var(--text-secondary)]"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-6 flex gap-3">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-500 to-accent-500 px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            <FiExternalLink className="h-4 w-4" />
            Live Demo
          </a>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.title} on GitHub`}
            className="glass flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-[var(--text-primary)] transition-colors hover:border-[var(--border-glow)]"
          >
            <FiGithub className="h-5 w-5" />
          </a>
        </div>
      </div>
    </motion.article>
  );
}
