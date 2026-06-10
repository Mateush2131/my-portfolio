import type { IconType } from 'react-icons';
import {
  FaDatabase,
  FaMicrosoft,
  FaPython,
  FaServer,
  FaTelegramPlane,
} from 'react-icons/fa';
import { SiDocker, SiDotnet, SiFastapi, SiPostgresql, SiRedis, SiSharp, SiSqlite } from 'react-icons/si';

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
  csharp: SiSharp,
  'c#': SiSharp,
  winforms: FaMicrosoft,
  dotnet: SiDotnet,
  net: SiDotnet,
  '.net': SiDotnet,
};

export function getTechIcon(tech: string): IconType | null {
  const key = tech.toLowerCase().replace(/\s+/g, '');
  return techMap[key] ?? null;
}
