import { MOCK_PROJECTS } from '../data/projects';
import { createSupabaseClient, isSupabaseConfigured } from './supabaseClient';

export type Project = {
  id: number;
  title: string;
  description: string;
  fullDescription: string;
  tech: string[];
  image_url: string;
  repo_url: string;
  live_url: string | null;
  screenshots: string[];
  created_at?: string;
};

export const PROJECT_FILTERS = ['Все', 'Aiogram', 'Docker', 'SQLAlchemy', 'Redis', 'C#'] as const;
export type ProjectFilter = (typeof PROJECT_FILTERS)[number];

export function normalizeProject(row: Record<string, unknown>): Project {
  let tech: string[] = [];

  if (Array.isArray(row.tech)) {
    tech = row.tech.map(String);
  } else if (typeof row.tech === 'string') {
    try {
      const parsed = JSON.parse(row.tech);
      tech = Array.isArray(parsed) ? parsed.map(String) : [row.tech];
    } catch {
      tech = row.tech.split(',').map((item) => item.trim()).filter(Boolean);
    }
  }

  let screenshots: string[] = [];
  if (Array.isArray(row.screenshots)) {
    screenshots = row.screenshots.map(String);
  }

  return {
    id: Number(row.id),
    title: String(row.title ?? ''),
    description: String(row.description ?? ''),
    fullDescription: String(
      row.full_description ?? row.fullDescription ?? row.description ?? ''
    ),
    tech,
    image_url: String(row.image_url ?? '/images/projects/placeholder.svg'),
    repo_url: String(row.repo_url ?? '#'),
    live_url: row.live_url ? String(row.live_url) : null,
    screenshots,
    created_at: row.created_at ? String(row.created_at) : undefined,
  };
}

export function filterProjects(projects: Project[], filter: ProjectFilter): Project[] {
  if (filter === 'Все') {
    return projects;
  }

  const needle = filter.toLowerCase();

  return projects.filter((project) =>
    (project.tech ?? []).some((tech) => {
      const value = tech.toLowerCase();
      return value === needle || value.includes(needle);
    })
  );
}

export async function getProjects(): Promise<Project[]> {
  if (!isSupabaseConfigured()) {
    return MOCK_PROJECTS;
  }

  try {
    const supabase = createSupabaseClient();
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data?.length) {
      return MOCK_PROJECTS;
    }

    return data.map((row) => normalizeProject(row as Record<string, unknown>));
  } catch {
    return MOCK_PROJECTS;
  }
}

export { MOCK_PROJECTS };
