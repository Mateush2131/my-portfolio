import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProjectPage from '../../../components/project/ProjectPage';
import { getProjectById, getProjects } from '../../../lib/projects';

type PageProps = {
  params: { id: string };
};

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({ id: String(project.id) }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const project = await getProjectById(Number(params.id));

  if (!project) {
    return { title: 'Проект не найден — AlaCode' };
  }

  return {
    title: `${project.title} — Кейс AlaCode`,
    description: project.description,
  };
}

export default async function ProjectLandingRoute({ params }: PageProps) {
  const project = await getProjectById(Number(params.id));

  if (!project) {
    notFound();
  }

  return <ProjectPage project={project} />;
}
