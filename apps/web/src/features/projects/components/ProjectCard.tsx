import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";
import type { Project } from "../model/types";

export function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="border border-border rounded-2xl overflow-hidden bg-card"
    >
      <div className="relative h-52 bg-muted overflow-hidden">
        <img
          src={`https://images.unsplash.com/${project.imageId}?w=800&h=400&fit=crop&auto=format`}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
        <div className="absolute bottom-4 left-5 right-5">
          <p className="text-white/70 text-xs font-medium mb-0.5">
            {project.period} · {project.role}
          </p>
          <h3 className="text-white text-2xl font-bold">{project.title}</h3>
          <p className="text-white/80 text-sm mt-0.5">{project.subtitle}</p>
        </div>
      </div>

      <div className="p-5">
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-secondary text-secondary-foreground border border-border"
            >
              {tag}
            </span>
          ))}
        </div>

        <p className="text-sm text-foreground/80 leading-relaxed mb-4">
          {project.problem}
        </p>

        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-accent transition-colors"
        >
          <ChevronDown
            className={`w-3.5 h-3.5 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          />
          {open ? "접기" : "만드는 과정 구경하기"}
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35 }}
              className="overflow-hidden"
            >
              <div className="mt-4 pt-4 border-t border-border space-y-4">
                {[
                  { label: "어떤 문제였나요?", content: project.problem },
                  { label: "제가 맡은 일", content: project.role },
                  { label: "가장 어려웠던 순간", content: project.challenge },
                  { label: "어떻게 해결했나요?", content: project.solution },
                ].map(({ label, content }) => (
                  <div key={label}>
                    <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                      {label}
                    </p>
                    <p className="text-sm leading-relaxed text-foreground/85">
                      {content}
                    </p>
                  </div>
                ))}
                <div className="bg-secondary/60 rounded-xl px-4 py-3">
                  <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
                    결과
                  </p>
                  <p className="text-sm font-medium text-foreground">
                    {project.result}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
