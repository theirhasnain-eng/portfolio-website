import { motion } from "framer-motion";

const variants = {
  primary:
    "bg-gradient-to-r from-brand-500 to-accent-500 text-white shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40",
  secondary:
    "glass text-[var(--text-primary)] hover:border-[var(--border-glow)]",
  ghost: "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/5",
};

export default function Button({
  children,
  variant = "primary",
  href,
  onClick,
  className = "",
  type = "button",
  ...props
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-primary)]";

  const classes = `${base} ${variants[variant]} disabled:pointer-events-none disabled:opacity-60 ${className}`;

  if (href) {
    return (
      <motion.a
        href={href}
        className={classes}
        whileHover={{ scale: 1.03, y: -2 }}
        whileTap={{ scale: 0.98 }}
        {...props}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={classes}
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {children}
    </motion.button>
  );
}
