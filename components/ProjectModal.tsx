'use client';

import Image from 'next/image';
import { useEffect } from 'react';
import { FaExternalLinkAlt, FaGithub, FaTimes } from 'react-icons/fa';
import { getTechIcon } from '../lib/techIcons';
import type { Project } from '../lib/projects';

type ProjectModalProps = {
  project: Project | null;
  onClose: () => void;
};

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const screenshots = project.screenshots ?? [];

  return (
    <div className="project-modal-overlay" onClick={onClose} role="presentation">
      <div
        className="project-modal"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
      >
        <button type="button" className="project-modal-close" onClick={onClose} aria-label="Закрыть">
          <FaTimes />
        </button>

        <div className="project-modal-content">
          <div className="project-modal-image">
            <Image
              src={project.image_url}
              alt={project.title}
              width={160}
              height={160}
              className="project-image"
            />
          </div>

          <div className="project-modal-details">
            <div className="icons">
              {project.tech.map((tech) => {
                const Icon = getTechIcon(tech);
                return Icon ? <Icon key={tech} title={tech} aria-label={tech} /> : null;
              })}
            </div>
            <h3 id="project-modal-title" className="project-tile">
              {project.title}
            </h3>
            <small>{project.tech.join(' · ')}</small>
            <p>{project.fullDescription || project.description}</p>

            {screenshots.length > 0 ? (
              <div className="project-modal-gallery">
                <h4>Скриншоты</h4>
                <div className="project-modal-screenshots">
                  {screenshots.map((src) => (
                    <Image
                      key={src}
                      src={src}
                      alt={`Скриншот проекта ${project.title}`}
                      width={240}
                      height={160}
                      className="project-screenshot"
                      loading="lazy"
                    />
                  ))}
                </div>
              </div>
            ) : null}

            <div className="buttons">
              <a href={project.repo_url} target="_blank" rel="noreferrer">
                Исходный код <FaGithub />
              </a>
              {project.live_url ? (
                <a href={project.live_url} target="_blank" rel="noreferrer">
                  Демо <FaExternalLinkAlt />
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
