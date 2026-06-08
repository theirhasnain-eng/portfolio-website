import { motion } from "framer-motion";

export default function SkillBar({ name, level, delay = 0, animate }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="font-medium text-[var(--text-primary)]">{name}</span>
        <span className="text-[var(--text-muted)]">{level}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-white/5">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-brand-500 to-accent-500"
          initial={{ width: 0 }}
          animate={animate ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}
