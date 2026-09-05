import type { Project } from '../../lib/projects';
import ProjectBackground from './ProjectBackground';
import ProjectCTA from './ProjectCTA';
import ProjectDescription from './ProjectDescription';
import ProjectHero from './ProjectHero';
import ProjectNav from './ProjectNav';
import ProjectResults from './ProjectResults';
import ProjectScreenshots from './ProjectScreenshots';
import ProjectTech from './ProjectTech';

type ProjectPageProps = {
  project: Project;
};

export default function ProjectPage({ project }: ProjectPageProps) {
  return (
    <div className="project-landing">
      <ProjectBackground theme={project.theme} />
      <div className="project-landing-content">
        <ProjectNav project={project} />
        <ProjectHero project={project} />
        <ProjectTech project={project} />
        <ProjectScreenshots project={project} />
        <ProjectResults project={project} />
        <ProjectDescription project={project} />
        <ProjectCTA title={project.title} />
      </div>
    </div>
  );
}
