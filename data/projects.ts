import type { Project } from '../lib/projects';

export const MOCK_PROJECTS: Project[] = [
  {
    id: 1,
    title: 'Ticket Bot',
    description:
      'Telegram-бот для автоматизации приёма заявок с ролями, финансами и рефералами.',
    fullDescription:
      'Многофункциональный Telegram-бот для автоматизации приёма заявок с ролями, финансами, рефералами и интеграцией с API. Поддерживает админ-панель, статистику и гибкую настройку воронки заявок.',
    tech: ['Python', 'Aiogram', 'SQLAlchemy', 'SQLite', 'Redis'],
    image_url: '/images/projects/placeholder.svg',
    repo_url: 'https://github.com/Mateush2131/Ticket-bot',
    live_url: null,
    screenshots: [],
  },
  {
    id: 2,
    title: 'Mr. Magic Club Bot',
    description: 'Бот для учёта тренировок в боксёрском клубе с абонементами и посещениями.',
    fullDescription:
      'Бот для учёта тренировок в боксёрском клубе: мультитренерский режим, абонементы, отметка посещений и отчёты для администраторов клуба.',
    tech: ['Python', 'Aiogram', 'SQLAlchemy'],
    image_url: '/images/projects/placeholder.svg',
    repo_url: 'https://github.com/Mateush2131/Mrmagicboxingclubbot',
    live_url: null,
    screenshots: [],
  },
  {
    id: 3,
    title: 'AppealBot',
    description: 'CRM для приёма заявок на FastAPI с админ-панелью и автодокументацией.',
    fullDescription:
      'CRM-система для приёма заявок с бэкендом на FastAPI, админ-панелью, автодокументацией OpenAPI и хранением данных в PostgreSQL.',
    tech: ['Python', 'FastAPI', 'SQLAlchemy', 'PostgreSQL'],
    image_url: '/images/projects/placeholder.svg',
    repo_url: 'https://github.com/Mateush2131/Appealbot',
    live_url: null,
    screenshots: [],
  },
  {
    id: 4,
    title: 'StudyBuddyBot',
    description: 'Интерактивный учебник алгоритмов в Telegram с FSM и визуализацией.',
    fullDescription:
      'Интерактивный учебник алгоритмов в Telegram с визуализацией, 15+ алгоритмов, FSM и пошаговыми объяснениями для обучения.',
    tech: ['Python', 'Aiogram'],
    image_url: '/images/projects/placeholder.svg',
    repo_url: 'https://github.com/Mateush2131/Studybudybotdeploy',
    live_url: null,
    screenshots: [],
  },
  {
    id: 5,
    title: 'SysMasterUltra',
    description: 'Системный комбайн для Windows: мониторинг, сеть и шифрование.',
    fullDescription:
      'Системный комбайн для Windows (C# WinForms): мониторинг ресурсов, сеть, шифрование файлов и хуки клавиатуры в одном desktop-приложении.',
    tech: ['C#', 'WinForms', '.NET'],
    image_url: '/images/projects/placeholder.svg',
    repo_url: 'https://github.com/Mateush2131/SysMasterUltra',
    live_url: null,
    screenshots: [],
  },
];
