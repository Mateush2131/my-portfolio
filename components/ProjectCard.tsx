'use client';

import Image from 'next/image';
import { FaExternalLinkAlt, FaGithub, FaInfoCircle } from 'react-icons/fa';
import { getTechIcon } from '../lib/techIcons';
import type { Project } from '../lib/projects';

type ProjectCardProps = {
  project: Project;
  onOpen: (project: Project) => void;
};

export default function ProjectCard({ project, onOpen }: ProjectCardProps) {
  return (
    <article className="project-card reveal-on-scroll">
      <button
        type="button"
        className="project-link"
        onClick={() => onOpen(project)}
        aria-label={`Открыть проект ${project.title}`}
      >
        <Image
          src={project.image_url}
          alt={project.title}
          width={100}
          height={100}
          className="project-image"
          loading="lazy"
        />
      </button>
      <div className="project-details">
        <div className="icons">
          {project.tech.map((tech) => {
            const Icon = getTechIcon(tech);
            return Icon ? <Icon key={tech} title={tech} aria-label={tech} /> : null;
          })}
        </div>
        <h3 className="project-tile">{project.title}</h3>
        <small>{project.tech.join(' · ')}</small>
        <p>{project.description}</p>
        <div className="buttons buttons-three">
          <a
            href={project.repo_url}
            target="_blank"
            rel="noreferrer"
            onClick={(event) => event.stopPropagation()}
          >
            Исходный код <FaGithub />
          </a>
          {project.live_url ? (
            <a
              href={project.live_url}
              target="_blank"
              rel="noreferrer"
              onClick={(event) => event.stopPropagation()}
            >
              Демо <FaExternalLinkAlt />
            </a>
          ) : null}
          <button type="button" className="project-open-btn" onClick={() => onOpen(project)}>
            Подробнее <FaInfoCircle />
          </button>
        </div>
      </div>
    </article>
  );
}
