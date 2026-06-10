-- Таблица проектов для портфолио AlaCode
create table if not exists public.projects (
  id serial primary key,
  title text not null,
  description text not null,
  full_description text not null,
  tech text[] not null default '{}',
  image_url text not null default '/images/projects/placeholder.svg',
  repo_url text not null,
  live_url text,
  screenshots text[] not null default '{}',
  created_at timestamptz not null default now()
);

alter table public.projects enable row level security;

create policy "Public read access for projects"
  on public.projects
  for select
  using (true);

-- Начальные данные
insert into public.projects (
  title,
  description,
  full_description,
  tech,
  image_url,
  repo_url,
  live_url,
  screenshots
) values
(
  'Ticket Bot',
  'Telegram-бот для автоматизации приёма заявок с ролями, финансами и рефералами.',
  'Многофункциональный Telegram-бот для автоматизации приёма заявок с ролями, финансами, рефералами и интеграцией с API. Поддерживает админ-панель, статистику и гибкую настройку воронки заявок.',
  array['Python', 'Aiogram', 'SQLAlchemy', 'SQLite', 'Redis'],
  '/images/projects/placeholder.svg',
  'https://github.com/Mateush2131/Ticket-bot',
  null,
  '{}'
),
(
  'Mr. Magic Club Bot',
  'Бот для учёта тренировок в боксёрском клубе с абонементами и посещениями.',
  'Бот для учёта тренировок в боксёрском клубе: мультитренерский режим, абонементы, отметка посещений и отчёты для администраторов клуба.',
  array['Python', 'Aiogram', 'SQLAlchemy'],
  '/images/projects/placeholder.svg',
  'https://github.com/Mateush2131/Mrmagicboxingclubbot',
  null,
  '{}'
),
(
  'AppealBot',
  'CRM для приёма заявок на FastAPI с админ-панелью и автодокументацией.',
  'CRM-система для приёма заявок с бэкендом на FastAPI, админ-панелью, автодокументацией OpenAPI и хранением данных в PostgreSQL.',
  array['Python', 'FastAPI', 'SQLAlchemy', 'PostgreSQL'],
  '/images/projects/placeholder.svg',
  'https://github.com/Mateush2131/Appealbot',
  null,
  '{}'
),
(
  'StudyBuddyBot',
  'Интерактивный учебник алгоритмов в Telegram с FSM и визуализацией.',
  'Интерактивный учебник алгоритмов в Telegram с визуализацией, 15+ алгоритмов, FSM и пошаговыми объяснениями для обучения.',
  array['Python', 'Aiogram'],
  '/images/projects/placeholder.svg',
  'https://github.com/Mateush2131/Studybudybotdeploy',
  null,
  '{}'
),
(
  'SysMasterUltra',
  'Системный комбайн для Windows: мониторинг, сеть и шифрование.',
  'Системный комбайн для Windows (C# WinForms): мониторинг ресурсов, сеть, шифрование файлов и хуки клавиатуры в одном desktop-приложении.',
  array['C#', 'WinForms', '.NET'],
  '/images/projects/placeholder.svg',
  'https://github.com/Mateush2131/SysMasterUltra',
  null,
  '{}'
);
