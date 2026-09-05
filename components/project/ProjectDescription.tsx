import type { Project } from '../../lib/projects';

type ProjectDescriptionProps = {
  project: Project;
};

export default function ProjectDescription({ project }: ProjectDescriptionProps) {
  return (
    <section className="project-landing-section">
      <h2 className="project-landing-section-title">Описание</h2>
      <div className="project-landing-description-grid">
        <article className="glass-panel project-landing-description-card">
          <h3>Проблема</h3>
          <p>{project.problem || 'Клиенту требовалось автоматизировать рутинные процессы.'}</p>
        </article>
        <article className="glass-panel project-landing-description-card">
          <h3>Решение</h3>
          <p>{project.solution || project.fullDescription || project.description}</p>
        </article>
      </div>
    </section>
  );
}
