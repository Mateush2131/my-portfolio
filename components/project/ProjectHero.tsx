import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';
import type { Project } from '../../lib/projects';

type ProjectHeroProps = {
  project: Project;
};

export default function ProjectHero({ project }: ProjectHeroProps) {
  return (
    <section className="project-landing-hero glass-panel">
      <p className="project-landing-eyebrow">Кейс</p>
      <h1 className="project-landing-title">{project.title}</h1>
      <p className="project-landing-lead">{project.fullDescription || project.description}</p>

      <div className="project-landing-hero-actions">
        <a
          href={project.repo_url}
          target="_blank"
          rel="noreferrer"
          className="project-landing-btn"
        >
          GitHub <FaGithub aria-hidden="true" />
        </a>
        {project.live_url ? (
          <a
            href={project.live_url}
            target="_blank"
            rel="noreferrer"
            className="project-landing-btn project-landing-btn-secondary"
          >
            {project.live_label ?? 'Демо'} <FaExternalLinkAlt aria-hidden="true" />
          </a>
        ) : (
          <span className="project-landing-btn project-landing-btn-muted">Демо по запросу</span>
        )}
        <a href="/#contact" className="project-landing-btn project-landing-btn-accent">
          Связаться
        </a>
      </div>
      {project.demoNote ? (
        <p className="project-landing-demo-note">{project.demoNote}</p>
      ) : null}
    </section>
  );
}
