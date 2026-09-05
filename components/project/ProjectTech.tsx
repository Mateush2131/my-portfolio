import { getTechIcon } from '../../lib/techIcons';
import type { Project } from '../../lib/projects';

type ProjectTechProps = {
  project: Project;
};

export default function ProjectTech({ project }: ProjectTechProps) {
  return (
    <section className="project-landing-section">
      <h2 className="project-landing-section-title">Технологии</h2>
      <div className="project-landing-tech-row glass-panel">
        {project.tech.map((tech) => {
          const Icon = getTechIcon(tech);
          return (
            <div key={tech} className="project-landing-tech-item" title={tech}>
              {Icon ? <Icon aria-hidden="true" /> : <span>{tech.charAt(0)}</span>}
              <span>{tech}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
