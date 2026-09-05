import { MOCK_PROJECTS } from '../data/projects';
import { createSupabaseClient, isSupabaseConfigured } from './supabaseClient';

export type ProjectTheme = 'forest' | 'ground' | 'ore' | 'obsidian' | 'lava';

export type ProjectResult = {
  label: string;
  value: string;
};

export type Project = {
  id: number;
  title: string;
  description: string;
  fullDescription: string;
  tech: string[];
  image_url: string;
  repo_url: string;
  live_url: string | null;
  live_label?: string;
  demoNote?: string;
  screenshots: string[];
  screenshotsNote?: string;
  theme: ProjectTheme;
  problem: string;
  solution: string;
  results: ProjectResult[];
  created_at?: string;
};

export const PROJECT_FILTERS = ['Все', 'Aiogram', 'Docker', 'SQLAlchemy', 'Redis', 'C#'] as const;
export type ProjectFilter = (typeof PROJECT_FILTERS)[number];

const THEMES: ProjectTheme[] = ['forest', 'ground', 'ore', 'obsidian', 'lava'];

function parseResults(value: unknown): ProjectResult[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => {
      if (!item || typeof item !== 'object') {
        return null;
      }

      const record = item as Record<string, unknown>;
      const label = String(record.label ?? '').trim();
      const resultValue = String(record.value ?? '').trim();

      if (!label || !resultValue) {
        return null;
      }

      return { label, value: resultValue };
    })
    .filter((item): item is ProjectResult => item !== null);
}

function parseTheme(value: unknown, fallbackIndex = 0): ProjectTheme {
  if (typeof value === 'string' && THEMES.includes(value as ProjectTheme)) {
    return value as ProjectTheme;
  }

  return THEMES[fallbackIndex % THEMES.length];
}

export function normalizeProject(row: Record<string, unknown>, index = 0): Project {
  let tech: string[] = [];

  if (Array.isArray(row.tech)) {
    tech = row.tech.map(String);
  } else if (typeof row.tech === 'string') {
    const trimmed = row.tech.trim();
    if (!trimmed) {
      tech = [];
    } else {
      try {
        const parsed = JSON.parse(trimmed);
        tech = Array.isArray(parsed) ? parsed.map(String) : [row.tech];
      } catch {
        tech = row.tech.split(',').map((item) => item.trim()).filter(Boolean);
      }
    }
  }

  let screenshots: string[] = [];
  if (Array.isArray(row.screenshots)) {
    screenshots = row.screenshots.map(String);
  } else if (typeof row.screenshots === 'string' && row.screenshots.trim()) {
    try {
      const parsed = JSON.parse(row.screenshots);
      screenshots = Array.isArray(parsed) ? parsed.map(String) : [];
    } catch {
      screenshots = [];
    }
  }

  const description = String(row.description ?? '');
  const fullDescription = String(row.full_description ?? row.fullDescription ?? description);

  return {
    id: Number(row.id),
    title: String(row.title ?? ''),
    description,
    fullDescription,
    tech,
    image_url: String(row.image_url ?? '/images/projects/placeholder.svg'),
    repo_url: String(row.repo_url ?? '#'),
    live_url: row.live_url ? String(row.live_url) : null,
    live_label: row.live_label ? String(row.live_label) : undefined,
    screenshots,
    theme: parseTheme(row.theme, index),
    problem: String(row.problem ?? ''),
    solution: String(row.solution ?? fullDescription),
    results: parseResults(row.results),
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
    }),
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

    return data.map((row, index) => normalizeProject(row as Record<string, unknown>, index));
  } catch {
    return MOCK_PROJECTS;
  }
}

export async function getProjectById(id: number): Promise<Project | null> {
  const projects = await getProjects();
  return projects.find((project) => project.id === id) ?? null;
}

export { MOCK_PROJECTS };
