import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { siteConfig } from "../../data/siteConfig";
import { useActiveSection } from "../../hooks/useActiveSection";
import ThemeToggle from "../ui/ThemeToggle";

const sectionIds = siteConfig.navLinks.map((l) => l.id);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeId = useActiveSection(sectionIds);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleNavClick = (id) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <nav
        className={`container-main mx-auto flex items-center justify-between px-4 transition-all duration-300 sm:px-6 ${
          scrolled ? "glass rounded-2xl px-5 py-3 shadow-lg" : ""
        }`}
        aria-label="Main navigation"
      >
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick("home");
          }}
          className="font-display text-lg font-bold tracking-tight"
        >
          <span className="text-gradient">{siteConfig.name.split(" ")[0]}</span>
          <span className="text-[var(--text-primary)]">.</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {siteConfig.navLinks.map((link) => (
            <li key={link.id}>
              <button
                type="button"
                onClick={() => handleNavClick(link.id)}
                className={`relative rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  activeId === link.id
                    ? "text-brand-400"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                {link.label}
                {activeId === link.id && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute inset-x-2 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-brand-500 to-accent-500"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("contact");
            }}
            className="hidden rounded-xl bg-gradient-to-r from-brand-500 to-accent-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-brand-500/20 transition-opacity hover:opacity-90 sm:inline-flex"
          >
            Hire Me
          </a>
          <ThemeToggle />
          <button
            type="button"
            className="glass flex h-10 w-10 items-center justify-center rounded-xl md:hidden"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <HiX className="h-5 w-5" />
            ) : (
              <HiMenuAlt3 className="h-5 w-5" />
            )}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 top-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
          >
            <motion.div
              className="glass absolute right-4 left-4 top-20 rounded-2xl p-6"
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              onClick={(e) => e.stopPropagation()}
            >
              <ul className="flex flex-col gap-2">
                {siteConfig.navLinks.map((link) => (
                  <li key={link.id}>
                    <button
                      type="button"
                      onClick={() => handleNavClick(link.id)}
                      className={`w-full rounded-xl px-4 py-3 text-left text-base font-medium transition-colors ${
                        activeId === link.id
                          ? "bg-brand-500/15 text-brand-400"
                          : "text-[var(--text-secondary)]"
                      }`}
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
