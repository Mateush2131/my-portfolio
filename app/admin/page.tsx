import AdminPanel from '../../components/AdminPanel';

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0a0f1a] to-[#131823] px-4 py-8 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white md:text-4xl">Админ-панель</h1>
          <p className="mt-2 text-slate-400">Управление заявками с яхтенного лендинга и портфолио</p>
        </div>
        <AdminPanel />
      </div>
    </main>
  );
}