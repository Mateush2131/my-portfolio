export const theme = {
  colors: {
    accent: '#f300b4',
    textPrimary: '#f0f0f5',
    textMuted: '#a0a0b8',
    forest: '#1a2a1a',
    ground: '#2a1a0a',
    ore: '#2a2a2a',
    obsidian: '#1a0a2a',
    lava: '#3a0a0a',
  },
  layers: {
    forest: 'linear-gradient(180deg, #1a2a1a 0%, #0a1a0a 100%)',
    ground: 'linear-gradient(180deg, #1a0a0a 0%, #2a1a0a 100%)',
    ore: 'linear-gradient(180deg, #1a1a1a 0%, #2a2a2a 100%)',
    obsidian: 'linear-gradient(180deg, #0a0a1a 0%, #1a0a2a 100%)',
    lava: 'linear-gradient(180deg, #1a0a0a 0%, #2a0a0a 50%, #3a0a0a 100%)',
  },
} as const;
