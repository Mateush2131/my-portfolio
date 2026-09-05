'use client';

import type { Project } from '../lib/projects';
import CtaButton from './CtaButton';
import ProjectCard from './ProjectCard';

type ProjectsProps = {
  projects: Project[];
};

export default function Projects({ projects }: ProjectsProps) {
  const list = Array.isArray(projects) ? projects : [];

  return (
    <section id="projects" className="site-section">
      <div className="projects-container">
        <div className="heading reveal-on-scroll">
          <h3 className="title">Кейсы</h3>
          <div className="separator" />
          <p className="subtitle">
            Telegram-боты, backend-системы, лендинги и desktop-утилиты. Нажми на карточку, чтобы
            увидеть полный кейс.
          </p>
          <p className="projects-live-banner">
            <strong>Смотрите проекты онлайн</strong> — у части кейсов есть кнопка «Смотреть сайт»
            или «Демо»: так можно оценить анимации и интерфейс вживую, не только по скриншотам.
          </p>
          <p className="projects-hint">Нажми на карточку, чтобы увидеть полный кейс</p>
        </div>

        <div className="projects-grid">
          {list.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        <CtaButton />
      </div>
    </section>
  );
}
