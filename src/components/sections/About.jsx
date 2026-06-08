import { motion } from "framer-motion";
import { FiDownload, FiMapPin } from "react-icons/fi";
import { siteImages } from "../../data/images";
import { siteConfig } from "../../data/siteConfig";
import Button from "../ui/Button";
import ProfileImage from "../ui/ProfileImage";
import SectionHeading from "../ui/SectionHeading";

const highlights = [
  "3+ years building web interfaces",
  "50+ components & pages shipped",
  "Performance & accessibility focused",
  "Remote collaboration experience",
];

export default function About() {
  return (
    <section id="about" className="section-padding relative overflow-hidden">
      <div className="pointer-events-none absolute right-0 top-1/4 h-96 w-96 rounded-full bg-accent-500/10 blur-3xl" />

      <div className="container-main relative">
        <SectionHeading
          label="About Me"
          title="Crafting digital products with purpose"
          subtitle="A frontend specialist blending design sensibility with engineering precision."
        />

        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <motion.div
            className="relative mx-auto lg:mx-0"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <ProfileImage src={siteImages.about} />
            <div className="glass absolute -bottom-4 -right-2 rounded-2xl px-5 py-3 sm:-right-6">
              <p className="text-2xl font-bold text-gradient">3+</p>
              <p className="text-xs text-[var(--text-muted)]">Years Experience</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="mb-5 inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-sm text-[var(--text-secondary)]">
              <FiMapPin className="h-4 w-4 text-brand-400" />
              {siteConfig.location}
            </div>

            {siteConfig.bio.split("\n\n").map((paragraph, i) => (
              <p
                key={i}
                className="mb-4 text-base leading-relaxed text-[var(--text-secondary)] last:mb-8 lg:text-lg"
              >
                {paragraph}
              </p>
            ))}

            <div className="mb-8 grid gap-3 sm:grid-cols-2">
              {highlights.map((item, i) => (
                <motion.div
                  key={item}
                  className="glass glass-hover flex items-center gap-3 rounded-xl px-4 py-3"
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500/30 to-accent-500/30 text-xs font-bold text-brand-400">
                    {i + 1}
                  </span>
                  <span className="text-sm font-medium text-[var(--text-primary)]">
                    {item}
                  </span>
                </motion.div>
              ))}
            </div>

            <Button
              href={siteConfig.resumeUrl}
              download={siteConfig.resumeFileName}
              variant="secondary"
            >
              <FiDownload className="h-5 w-5" />
              Download CV
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
