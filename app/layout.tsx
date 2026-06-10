import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AlaCode — Матвей · Python / Telegram / Backend',
  description:
    'AlaCode: портфолио Python-разработчика Матвея из Санкт-Петербурга. Telegram-боты, backend-системы, API.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
