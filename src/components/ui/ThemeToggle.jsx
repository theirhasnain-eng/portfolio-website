import { motion } from "framer-motion";
import { HiMoon, HiSun } from "react-icons/hi";
import { useTheme } from "../../context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <motion.button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="glass flex h-10 w-10 items-center justify-center rounded-xl text-[var(--text-primary)] transition-colors hover:border-[var(--border-glow)]"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.span
        key={theme}
        initial={{ rotate: -90, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ duration: 0.25 }}
      >
        {isDark ? <HiSun className="h-5 w-5" /> : <HiMoon className="h-5 w-5" />}
      </motion.span>
    </motion.button>
  );
}
