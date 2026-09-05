import type { Project } from '../../lib/projects';

type ProjectResultsProps = {
  project: Project;
};

export default function ProjectResults({ project }: ProjectResultsProps) {
  if (!project.results.length) {
    return null;
  }

  return (
    <section className="project-landing-section">
      <h2 className="project-landing-section-title">Результаты</h2>
      <div className="project-landing-results">
        {project.results.map((item) => (
          <article key={item.label} className="project-landing-result glass-panel">
            <span className="project-landing-result-value">{item.value}</span>
            <span className="project-landing-result-label">{item.label}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
