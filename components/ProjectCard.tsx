'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FaExternalLinkAlt, FaGithub, FaInfoCircle } from 'react-icons/fa';
import { getTechIcon } from '../lib/techIcons';
import type { Project } from '../lib/projects';

type ProjectCardProps = {
  project: Project;
};

export default function ProjectCard({ project }: ProjectCardProps) {
  const caseUrl = `/projects/${project.id}`;

  return (
    <article className="project-card reveal-on-scroll">
      <Link href={caseUrl} className="project-link" aria-label={`Открыть кейс ${project.title}`}>
        <Image
          src={project.image_url}
          alt={project.title}
          width={100}
          height={100}
          className="project-image"
          loading="lazy"
        />
      </Link>
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
        <div className="buttons buttons-three buttons-aligned">
          <a href={project.repo_url} target="_blank" rel="noreferrer">
            Исходный код <FaGithub />
          </a>
          {project.live_url ? (
            <a href={project.live_url} target="_blank" rel="noreferrer">
              {project.live_label ?? 'Демо'} <FaExternalLinkAlt />
            </a>
          ) : (
            <span className="project-btn-muted">Демо по запросу</span>
          )}
          <Link href={caseUrl} className="project-open-btn">
            Подробнее <FaInfoCircle />
          </Link>
        </div>
      </div>
    </article>
  );
}
