import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="project-landing">
      <div className="project-landing-content" style={{ paddingTop: '6rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Кейс не найден</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '1.5rem' }}>
          Такого проекта нет в портфолио.
        </p>
        <Link href="/" className="project-landing-btn project-landing-btn-accent" style={{ display: 'inline-flex' }}>
          На главную
        </Link>
      </div>
    </main>
  );
}
