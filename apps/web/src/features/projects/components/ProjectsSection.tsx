import { motion } from "motion/react";
import { projects } from "../data/projects";
import { ProjectCard } from "./ProjectCard";

interface ProjectsSectionProps {
  sectionRef: (el: HTMLElement | null) => void;
}

export function ProjectsSection({ sectionRef }: ProjectsSectionProps) {
  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-24 px-6 bg-secondary/30"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="text-xs font-semibold tracking-[0.2em] text-primary uppercase mb-3">Featured Projects</p>
          <h2 className="text-heading sm:text-heading-lg font-bold mb-4">부화한 서비스들</h2>
          <p className="text-muted-foreground leading-relaxed max-w-lg">
            작은 아이디어가 실제 서비스가 되기까지,
            <br />제가 어떤 고민을 하고 어떤 선택을 했는지 담았습니다.
          </p>
        </motion.div>

        <div className="space-y-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
