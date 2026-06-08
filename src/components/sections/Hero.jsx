import { motion } from "framer-motion";
import { FiDownload } from "react-icons/fi";
import { HiArrowDown, HiOutlineMail, HiSparkles } from "react-icons/hi";
import { siteConfig } from "../../data/siteConfig";
import Button from "../ui/Button";
import ProfileImage from "../ui/ProfileImage";

const floatingOrbs = [
  { size: 400, x: "-5%", y: "10%", delay: 0 },
  { size: 300, x: "80%", y: "5%", delay: 0.4 },
  { size: 220, x: "70%", y: "65%", delay: 0.8 },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pt-28 pb-16"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "var(--gradient-hero)" }}
      />
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-50" />
      <div className="pointer-events-none absolute inset-0 spotlight" />

      {floatingOrbs.map((orb, i) => (
        <motion.div
          key={i}
          className="pointer-events-none absolute rounded-full bg-brand-500/25 blur-3xl"
          style={{ width: orb.size, height: orb.size, left: orb.x, top: orb.y }}
          animate={{ y: [0, -40, 0], x: [0, 20, 0], scale: [1, 1.08, 1] }}
          transition={{
            duration: 10 + i,
            repeat: Infinity,
            delay: orb.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      <div className="container-main relative z-10 px-4 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="text-center lg:text-left"
          >
            <motion.div variants={item}>
              <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-500/40 bg-brand-500/10 px-4 py-2 text-sm font-medium text-brand-300 shadow-lg shadow-brand-500/10">
                <HiSparkles className="h-4 w-4 text-accent-400" />
                Available for freelance & full-time roles
              </span>
            </motion.div>

            <motion.p
              variants={item}
              className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-brand-400"
            >
              Welcome to my portfolio
            </motion.p>

            <motion.h1
              variants={item}
              className="font-display text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl"
            >
              Hi, I&apos;m{" "}
              <span className="text-gradient">{siteConfig.name}</span>
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-3 font-display text-2xl font-semibold text-[var(--text-secondary)] sm:text-3xl"
            >
              {siteConfig.title}
            </motion.p>

            <motion.p
              variants={item}
              className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-[var(--text-secondary)] lg:mx-0"
            >
              {siteConfig.tagline}
            </motion.p>

            <motion.div
              variants={item}
              className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start"
            >
              <Button href="#projects">View Projects</Button>
              <Button href="#contact" variant="secondary">
                <HiOutlineMail className="h-5 w-5" />
                Contact Me
              </Button>
              <Button
                href={siteConfig.resumeUrl}
                download={siteConfig.resumeFileName}
                variant="ghost"
              >
                <FiDownload className="h-5 w-5" />
                Download CV
              </Button>
            </motion.div>

            <motion.div
              variants={item}
              className="mt-12 hidden lg:flex"
            >
              <a
                href="#about"
                className="group flex items-center gap-3 text-[var(--text-muted)] transition-colors hover:text-brand-400"
              >
                <motion.span
                  animate={{ y: [0, 6, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-subtle)]"
                >
                  <HiArrowDown className="h-4 w-4" />
                </motion.span>
                <span className="text-sm font-medium">Scroll to explore</span>
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative flex justify-center lg:justify-end"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <ProfileImage size="hero" />
            <motion.div
              className="glass absolute -bottom-2 -left-2 rounded-2xl px-4 py-3 sm:left-4 lg:-left-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <p className="text-xs text-[var(--text-muted)]">Specialized in</p>
              <p className="font-display font-bold text-[var(--text-primary)]">
                React · Tailwind · UI/UX
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
