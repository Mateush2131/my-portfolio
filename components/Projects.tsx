'use client';

import { useCallback, useState } from 'react';
import type { Project } from '../lib/projects';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';

type ProjectsProps = {
  projects: Project[];
};

export default function Projects({ projects }: ProjectsProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const closeModal = useCallback(() => {
    setSelectedProject(null);
  }, []);

  const list = Array.isArray(projects) ? projects : [];

  return (
    <section id="projects">
      <div className="projects-container">
        <div className="heading reveal-on-scroll">
          <h3 className="title">Портфолио</h3>
          <div className="separator" />
          <p className="subtitle">
            Telegram-боты, backend-системы и desktop-утилиты. Проекты загружаются из Supabase с
            резервными данными для локальной разработки.
          </p>
        </div>

        <div className="projects-grid">
          {list.map((project) => (
            <ProjectCard key={project.id} project={project} onOpen={setSelectedProject} />
          ))}
        </div>
      </div>

      <ProjectModal project={selectedProject} onClose={closeModal} />
    </section>
  );
}
