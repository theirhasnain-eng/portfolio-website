import { motion } from "framer-motion";

export default function Loader({ onComplete }) {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[var(--bg-primary)]"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: 1.6, duration: 0.5 }}
      onAnimationComplete={onComplete}
    >
      <motion.div
        className="relative flex h-16 w-16 items-center justify-center"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <motion.div
          className="absolute inset-0 rounded-2xl bg-gradient-to-br from-brand-500 to-accent-500"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
        <div className="absolute inset-[3px] rounded-[13px] bg-[var(--bg-primary)]" />
        <span className="relative font-display text-xl font-bold text-gradient">
          &lt;/&gt;
        </span>
      </motion.div>
      <motion.p
        className="mt-6 text-sm font-medium text-[var(--text-muted)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Loading portfolio...
      </motion.p>
    </motion.div>
  );
}
