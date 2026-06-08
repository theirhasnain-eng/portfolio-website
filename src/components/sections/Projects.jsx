import { projects } from "../../data/projects";
import ProjectCard from "../ui/ProjectCard";
import SectionHeading from "../ui/SectionHeading";

export default function Projects() {
  return (
    <section id="projects" className="section-padding bg-[var(--bg-secondary)]">
      <div className="container-main">
        <SectionHeading
          label="Portfolio"
          title="Featured projects"
          subtitle="A selection of work showcasing UI craft, performance, and modern tooling."
        />

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
