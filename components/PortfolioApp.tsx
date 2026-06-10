'use client';

import { useScrollEffects } from '../hooks/useScrollEffects';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';
import type { Project } from '../lib/projects';
import About from './About';
import Contact from './Contact';
import Footer from './Footer';
import Hero from './Hero';
import Navbar from './Navbar';
import Projects from './Projects';

type PortfolioAppProps = {
  projects: Project[];
};

export default function PortfolioApp({ projects }: PortfolioAppProps) {
  useScrollEffects();
  useRevealOnScroll();

  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Projects projects={projects} />
      <Contact />
      <Footer />
    </>
  );
}
