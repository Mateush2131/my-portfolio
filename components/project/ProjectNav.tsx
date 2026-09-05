import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';
import type { Project } from '../../lib/projects';

type ProjectNavProps = {
  project: Project;
};

export default function ProjectNav({ project }: ProjectNavProps) {
  return (
    <nav className="project-landing-nav">
      <Link href="/" className="project-landing-back">
        <FaArrowLeft aria-hidden="true" />
        На главную
      </Link>
      <span className="project-landing-nav-title">{project.title}</span>
    </nav>
  );
}
