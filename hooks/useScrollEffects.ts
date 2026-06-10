'use client';

import { useEffect } from 'react';

export function useScrollEffects() {
  useEffect(() => {
    const navbar = document.querySelector('#navbar');
    const header = document.querySelector('#welcome-section') as HTMLElement | null;
    const forest = document.querySelector('.forest') as HTMLElement | null;
    const silhouette = document.querySelector('#welcome-section .silhouette') as HTMLElement | null;
    const moon = document.querySelector('.moon') as HTMLElement | null;
    const forestInitPos = -300;

    const onScroll = () => {
      const scrollPos = document.documentElement.scrollTop || document.body.scrollTop;

      if (scrollPos <= window.innerHeight) {
        if (forest) {
          forest.style.bottom = `${Math.floor(forestInitPos + scrollPos / 6)}px`;
        }
        if (silhouette) {
          silhouette.style.bottom = `${Math.floor(scrollPos / 6)}px`;
        }
        if (moon) {
          moon.style.transform = `translateY(${Math.floor(scrollPos / 8)}px)`;
        }
      }

      if (header) {
        if (scrollPos - 100 <= window.innerHeight) {
          header.style.visibility =
            header.style.visibility === 'hidden' ? 'visible' : header.style.visibility || 'visible';
        } else {
          header.style.visibility = 'hidden';
        }
      }

      if (navbar) {
        if (scrollPos + 100 >= window.innerHeight) {
          navbar.classList.add('bg-active');
        } else {
          navbar.classList.remove('bg-active');
        }
      }
    };

    const internalLinks = document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]');
    const handleClick = (e: Event) => {
      const link = e.currentTarget as HTMLAnchorElement;
      const target = document.querySelector(link.hash);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ block: 'start', behavior: 'smooth' });
    };

    internalLinks.forEach((link) => link.addEventListener('click', handleClick));
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      internalLinks.forEach((link) => link.removeEventListener('click', handleClick));
      window.removeEventListener('scroll', onScroll);
    };
  }, []);
}
