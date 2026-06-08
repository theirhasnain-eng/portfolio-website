import { motion } from "framer-motion";
import {
  HiCode,
  HiColorSwatch,
  HiDatabase,
  HiCog,
} from "react-icons/hi";
import { skillCategories } from "../../data/skills";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import SectionHeading from "../ui/SectionHeading";
import SkillBar from "../ui/SkillBar";

const iconMap = {
  code: HiCode,
  palette: HiColorSwatch,
  server: HiDatabase,
  wrench: HiCog,
};

function SkillCategoryCard({ category, index }) {
  const { ref, isVisible } = useScrollReveal();

  const Icon = iconMap[category.icon] || HiCode;

  return (
    <motion.div
      ref={ref}
      className="glass glass-hover rounded-2xl p-6"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500/20 to-accent-500/20 text-brand-400">
          <Icon className="h-5 w-5" />
        </div>
        <h3 className="font-display text-lg font-bold text-[var(--text-primary)]">
          {category.title}
        </h3>
      </div>

      <div className="space-y-5">
        {category.skills.map((skill, i) => (
          <SkillBar
            key={skill.name}
            name={skill.name}
            level={skill.level}
            delay={i * 0.08}
            animate={isVisible}
          />
        ))}
      </div>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="section-padding">
      <div className="container-main">
        <SectionHeading
          label="Skills"
          title="Technologies I work with"
          subtitle="From pixel-perfect layouts to interactive React applications."
        />

        <div className="grid gap-6 sm:grid-cols-2">
          {skillCategories.map((category, index) => (
            <SkillCategoryCard
              key={category.id}
              category={category}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
