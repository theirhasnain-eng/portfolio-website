import { motion } from "framer-motion";
import { siteConfig } from "../../data/siteConfig";

export default function Stats() {
  return (
    <section className="relative border-y border-[var(--border-subtle)] bg-[var(--bg-secondary)] py-12">
      <div className="container-main px-4 sm:px-6">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
          {siteConfig.stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
            >
              <p className="font-display text-3xl font-bold text-gradient sm:text-4xl">
                {stat.value}
              </p>
              <p className="mt-1 text-sm font-medium text-[var(--text-secondary)]">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
