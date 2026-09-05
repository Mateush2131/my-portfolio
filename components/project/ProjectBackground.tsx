import type { ProjectTheme } from '../../lib/projects';

const THEMES: Record<ProjectTheme, { from: string; to: string }> = {
  forest: { from: '#0a1a0a', to: '#1a2a1a' },
  ground: { from: '#1a0a05', to: '#2a1a0a' },
  ore: { from: '#0a0a1a', to: '#1a1a2a' },
  obsidian: { from: '#0a0a1a', to: '#1a0a2a' },
  lava: { from: '#1a0a0a', to: '#3a0a0a' },
};

type ProjectBackgroundProps = {
  theme: ProjectTheme;
};

export default function ProjectBackground({ theme }: ProjectBackgroundProps) {
  const colors = THEMES[theme];

  return (
    <div
      className="project-landing-bg"
      style={{
        background: `linear-gradient(180deg, ${colors.from} 0%, ${colors.to} 55%, ${colors.from} 100%)`,
      }}
      aria-hidden="true"
    />
  );
}
