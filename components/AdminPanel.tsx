'use client';

import { useEffect, useState, useCallback } from 'react';

type Order = {
  id: number;
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string | null;
  status: string;
  createdAt: string;
};

type StatusFilter = 'all' | 'new' | 'in_progress' | 'done';
type SortField = 'id' | 'name' | 'createdAt';
type SortOrder = 'asc' | 'desc';

const statusLabels: Record<StatusFilter, string> = {
  all: 'Все',
  new: '🆕 Новые',
  in_progress: '⚙️ В работе',
  done: '✅ Выполненные',
};

const statusColors: Record<string, string> = {
  new: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/50',
  in_progress: 'bg-blue-500/20 text-blue-300 border-blue-500/50',
  done: 'bg-green-500/20 text-green-300 border-green-500/50',
};

export default function AdminPanel() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  
  // Фильтры и сортировка
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<SortField>('createdAt');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  
  // Пагинация
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Статистика
  const [stats, setStats] = useState({ new: 0, in_progress: 0, done: 0 });

  const loadOrders = useCallback(async () => {
    try {
      const response = await fetch('/api/orders');
      if (!response.ok) throw new Error('Ошибка загрузки');
      const data = await response.json();
      setOrders(data);
      
      // Подсчёт статистики
      const statsData = {
        new: data.filter((o: Order) => o.status === 'new').length,
        in_progress: data.filter((o: Order) => o.status === 'in_progress').length,
        done: data.filter((o: Order) => o.status === 'done').length,
      };
      setStats(statsData);
    } catch (error) {
      showMessage('Ошибка загрузки заявок', 'error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  // Фильтрация и поиск
  useEffect(() => {
    let result = [...orders];
    
    // Фильтр по статусу
    if (statusFilter !== 'all') {
      result = result.filter((order) => order.status === statusFilter);
    }
    
    // Поиск по имени или email
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (order) =>
          order.name.toLowerCase().includes(query) ||
          order.email.toLowerCase().includes(query) ||
          order.phone.includes(query)
      );
    }
    
    // Сортировка
    result.sort((a, b) => {
      let aVal: string | number = a[sortField];
      let bVal: string | number = b[sortField];
      
      if (sortField === 'createdAt') {
        aVal = new Date(aVal).getTime();
        bVal = new Date(bVal).getTime();
      }
      
      if (sortOrder === 'asc') {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });
    
    setFilteredOrders(result);
    setCurrentPage(1);
  }, [orders, statusFilter, searchQuery, sortField, sortOrder]);

  const showMessage = (text: string, type: 'success' | 'error') => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 3000);
  };

  const updateStatus = async (id: number, status: string) => {
    try {
      const response = await fetch(`/api/orders/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      
      if (response.ok) {
        showMessage('Статус обновлён', 'success');
        loadOrders();
      } else {
        showMessage('Ошибка обновления статуса', 'error');
      }
    } catch {
      showMessage('Ошибка сети', 'error');
    }
  };

  const deleteOrder = async (id: number) => {
    if (!confirm('Удалить заявку?')) return;
    
    try {
      const response = await fetch(`/api/orders/${id}`, { method: 'DELETE' });
      if (response.ok) {
        showMessage('Заявка удалена', 'success');
        loadOrders();
      } else {
        showMessage('Ошибка удаления', 'error');
      }
    } catch {
      showMessage('Ошибка сети', 'error');
    }
  };

  // Пагинация
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-purple-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Сообщение */}
      {message && (
        <div className={`rounded-xl border p-4 ${
          message.type === 'success' 
            ? 'border-green-500/50 bg-green-500/10 text-green-300' 
            : 'border-red-500/50 bg-red-500/10 text-red-300'
        }`}>
          {message.text}
        </div>
      )}

      {/* Статистика */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-yellow-500/30 bg-yellow-500/10 p-4 text-center">
          <div className="text-2xl font-bold text-yellow-300">{stats.new}</div>
          <div className="text-sm text-yellow-300/70">Новых</div>
        </div>
        <div className="rounded-xl border border-blue-500/30 bg-blue-500/10 p-4 text-center">
          <div className="text-2xl font-bold text-blue-300">{stats.in_progress}</div>
          <div className="text-sm text-blue-300/70">В работе</div>
        </div>
        <div className="rounded-xl border border-green-500/30 bg-green-500/10 p-4 text-center">
          <div className="text-2xl font-bold text-green-300">{stats.done}</div>
          <div className="text-sm text-green-300/70">Выполнено</div>
        </div>
      </div>

      {/* Фильтры */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2">
          {(Object.keys(statusLabels) as StatusFilter[]).map((key) => (
            <button
              key={key}
              onClick={() => setStatusFilter(key)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                statusFilter === key
                  ? 'bg-purple-600 text-white'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
            >
              {statusLabels[key]}
            </button>
          ))}
        </div>
        
        <input
          type="text"
          placeholder="Поиск по имени, email или телефону..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="rounded-xl border border-slate-700 bg-slate-800/50 px-4 py-2 text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none"
        />
      </div>

      {/* Таблица заявок */}
      <div className="overflow-x-auto rounded-xl border border-slate-700 bg-slate-800/30">
        <table className="min-w-full divide-y divide-slate-700">
          <thead className="bg-slate-800/70">
            <tr>
              {[
                { key: 'id', label: 'ID' },
                { key: 'name', label: 'Имя' },
                { key: 'email', label: 'Email' },
                { key: 'phone', label: 'Телефон' },
                { key: 'service', label: 'Услуга' },
                { key: 'createdAt', label: 'Дата' },
                { key: 'status', label: 'Статус' },
                { key: 'actions', label: 'Действия' },
              ].map((col) => (
                <th
                  key={col.key}
                  className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-400"
                >
                  {col.key !== 'actions' && col.key !== 'status' ? (
                    <button
                      onClick={() => {
                        if (sortField === col.key) {
                          setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                        } else {
                          setSortField(col.key as SortField);
                          setSortOrder('asc');
                        }
                      }}
                      className="flex items-center gap-1 hover:text-white"
                    >
                      {col.label}
                      {sortField === col.key && (
                        <span>{sortOrder === 'asc' ? '↑' : '↓'}</span>
                      )}
                    </button>
                  ) : (
                    col.label
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700">
            {paginatedOrders.map((order) => (
              <tr key={order.id} className="hover:bg-slate-800/50 transition">
                <td className="px-4 py-3 text-sm text-white">{order.id}</td>
                <td className="px-4 py-3 font-medium text-white">{order.name}</td>
                <td className="px-4 py-3 text-sm text-slate-300">{order.email}</td>
                <td className="px-4 py-3 text-sm text-slate-300">{order.phone}</td>
                <td className="px-4 py-3 text-sm text-slate-300">{order.service}</td>
                <td className="px-4 py-3 text-sm text-slate-400">
                  {new Date(order.createdAt).toLocaleDateString('ru-RU')}
                </td>
                <td className="px-4 py-3">
                  <select
                    value={order.status}
                    onChange={(e) => updateStatus(order.id, e.target.value)}
                    className={`rounded-full border px-3 py-1 text-xs font-medium ${statusColors[order.status]} bg-transparent cursor-pointer`}
                  >
                    <option value="new">🆕 Новая</option>
                    <option value="in_progress">⚙️ В работе</option>
                    <option value="done">✅ Выполнена</option>
                  </select>
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => deleteOrder(order.id)}
                    className="rounded-lg bg-red-500/20 px-3 py-1 text-sm text-red-300 transition hover:bg-red-500/30"
                  >
                    Удалить
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Пагинация */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="rounded-lg bg-slate-800 px-4 py-2 text-sm text-white disabled:opacity-50"
          >
            ← Назад
          </button>
          <span className="px-4 py-2 text-sm text-slate-400">
            Страница {currentPage} из {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="rounded-lg bg-slate-800 px-4 py-2 text-sm text-white disabled:opacity-50"
          >
            Вперёд →
          </button>
        </div>
      )}
    </div>
  );
}