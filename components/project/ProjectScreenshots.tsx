'use client';

import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import type { Project } from '../../lib/projects';

type ProjectScreenshotsProps = {
  project: Project;
};

export default function ProjectScreenshots({ project }: ProjectScreenshotsProps) {
  const screenshots =
    project.screenshots.length > 0
      ? project.screenshots
      : [project.image_url, '/images/projects/placeholder.svg'];

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const showPrev = useCallback(() => {
    setLightboxIndex((index) =>
      index === null ? null : (index - 1 + screenshots.length) % screenshots.length,
    );
  }, [screenshots.length]);

  const showNext = useCallback(() => {
    setLightboxIndex((index) => (index === null ? null : (index + 1) % screenshots.length));
  }, [screenshots.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeLightbox();
      if (event.key === 'ArrowLeft') showPrev();
      if (event.key === 'ArrowRight') showNext();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [lightboxIndex, closeLightbox, showPrev, showNext]);

  return (
    <>
      <section className="project-landing-section project-landing-section-screenshots">
        <h2 className="project-landing-section-title">Скриншоты</h2>
        {project.screenshotsNote ? (
          <p className="project-landing-screenshots-note">{project.screenshotsNote}</p>
        ) : null}
        <p className="project-landing-screenshots-hint">Нажмите на скриншот, чтобы открыть в полном размере</p>
        <div className="project-landing-screenshots">
          {screenshots.map((src, index) => (
            <button
              key={`${src}-${index}`}
              type="button"
              className="project-landing-shot glass-panel"
              onClick={() => setLightboxIndex(index)}
              aria-label={`Открыть скриншот ${index + 1} проекта ${project.title}`}
            >
              <span className="project-landing-shot-index">
                {index + 1} / {screenshots.length}
              </span>
              <Image
                src={src.split('#')[0]}
                alt={`Скриншот ${project.title} ${index + 1}`}
                width={1200}
                height={2600}
                sizes="(max-width: 900px) 100vw, 1100px"
                quality={95}
                className="project-landing-shot-image"
              />
            </button>
          ))}
        </div>
      </section>

      {lightboxIndex !== null ? (
        <div
          className="project-landing-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`Скриншот ${lightboxIndex + 1}`}
          onClick={closeLightbox}
        >
          <button
            type="button"
            className="project-landing-lightbox-close"
            onClick={closeLightbox}
            aria-label="Закрыть"
          >
            ×
          </button>
          <button
            type="button"
            className="project-landing-lightbox-nav project-landing-lightbox-nav-prev"
            onClick={(event) => {
              event.stopPropagation();
              showPrev();
            }}
            aria-label="Предыдущий скриншот"
          >
            ‹
          </button>
          <figure
            className="project-landing-lightbox-figure"
            onClick={(event) => event.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={screenshots[lightboxIndex].split('#')[0]}
              alt={`Скриншот ${project.title} ${lightboxIndex + 1}`}
              className="project-landing-lightbox-image"
            />
            <figcaption className="project-landing-lightbox-caption">
              {lightboxIndex + 1} / {screenshots.length}
            </figcaption>
          </figure>
          <button
            type="button"
            className="project-landing-lightbox-nav project-landing-lightbox-nav-next"
            onClick={(event) => {
              event.stopPropagation();
              showNext();
            }}
            aria-label="Следующий скриншот"
          >
            ›
          </button>
        </div>
      ) : null}
    </>
  );
}
