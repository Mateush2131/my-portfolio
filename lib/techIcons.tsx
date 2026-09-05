import type { IconType } from 'react-icons';
import {
  FaDatabase,
  FaMicrosoft,
  FaPython,
  FaServer,
  FaTelegramPlane,
} from 'react-icons/fa';
import {
  SiDocker,
  SiDotnet,
  SiFastapi,
  SiFramer,
  SiNextdotjs,
  SiPostgresql,
  SiRedis,
  SiSharp,
  SiSqlite,
  SiTailwindcss,
} from 'react-icons/si';

const techMap: Record<string, IconType> = {
  python: FaPython,
  aiogram: FaTelegramPlane,
  sqlalchemy: FaDatabase,
  redis: SiRedis,
  sqlite: SiSqlite,
  docker: SiDocker,
  flask: FaServer,
  fastapi: SiFastapi,
  postgresql: SiPostgresql,
  postgres: SiPostgresql,
  nextjs: SiNextdotjs,
  next: SiNextdotjs,
  tailwindcss: SiTailwindcss,
  tailwind: SiTailwindcss,
  'framer-motion': SiFramer,
  framermotion: SiFramer,
  framer: SiFramer,
  csharp: SiSharp,
  'c#': SiSharp,
  winforms: FaMicrosoft,
  dotnet: SiDotnet,
  net: SiDotnet,
  '.net': SiDotnet,
};

export function getTechIcon(tech: string): IconType | null {
  const key = tech.toLowerCase().replace(/\s+/g, '').replace(/\./g, '');
  return techMap[key] ?? null;
}
