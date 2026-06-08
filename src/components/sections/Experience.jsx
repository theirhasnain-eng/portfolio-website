import { motion } from "framer-motion";
import { HiAcademicCap, HiBriefcase } from "react-icons/hi";
import { experience } from "../../data/experience";
import SectionHeading from "../ui/SectionHeading";

export default function Experience() {
  return (
    <section id="experience" className="section-padding">
      <div className="container-main">
        <SectionHeading
          label="Journey"
          title="Experience & education"
          subtitle="My path from learning to building production-ready applications."
        />

        <div className="relative mx-auto max-w-3xl">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-brand-500 via-accent-500 to-transparent sm:left-1/2 sm:-translate-x-px" />

          <div className="space-y-12">
            {experience.map((item, index) => {
              const isWork = item.type === "work";
              const Icon = isWork ? HiBriefcase : HiAcademicCap;
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={item.id}
                  className={`relative flex flex-col gap-4 sm:flex-row sm:items-center ${
                    isEven ? "sm:flex-row-reverse" : ""
                  }`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                >
                  <div
                    className={`flex-1 pl-12 sm:pl-0 ${
                      isEven ? "sm:pr-12 sm:text-right" : "sm:pl-12"
                    }`}
                  >
                    <div
                      className={`glass glass-hover rounded-2xl p-6 ${
                        isEven ? "sm:ml-auto" : ""
                      } max-w-md`}
                    >
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                          isWork
                            ? "bg-brand-500/15 text-brand-400"
                            : "bg-accent-500/15 text-accent-400"
                        }`}
                      >
                        <Icon className="h-3.5 w-3.5" />
                        {isWork ? "Work" : "Education"}
                      </span>
                      <h3 className="mt-3 font-display text-lg font-bold text-[var(--text-primary)]">
                        {item.title}
                      </h3>
                      <p className="text-sm font-medium text-brand-400">
                        {item.organization}
                      </p>
                      <p className="mt-1 text-xs text-[var(--text-muted)]">
                        {item.period}
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <div className="absolute left-4 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full border-2 border-brand-500 bg-[var(--bg-primary)] sm:left-1/2">
                    <div className="h-2.5 w-2.5 rounded-full bg-gradient-to-br from-brand-500 to-accent-500" />
                  </div>

                  <div className="hidden flex-1 sm:block" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
