import { motion } from "framer-motion";

export default function SectionHeading({ label, title, subtitle }) {
  return (
    <motion.div
      className="mb-14 text-center"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
    >
      <span className="mb-3 inline-block rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-brand-400">
        {label}
      </span>
      <h2 className="font-display text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mx-auto mt-4 max-w-2xl text-base text-[var(--text-secondary)] sm:text-lg">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
