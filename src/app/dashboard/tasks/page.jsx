'use client';
// src/app/dashboard/tasks/page.jsx

import { useMemo, useState } from 'react';
import { tasks } from '@/data/dummy';

const priorityColor = {
  High: 'bg-red-100 text-red-600',
  Medium: 'bg-amber-100 text-amber-700',
  Low: 'bg-gray-100 text-gray-500',
};

const statusColor = {
  Todo: 'bg-blue-100 text-blue-700',
  'In Progress': 'bg-violet-100 text-violet-700',
  Done: 'bg-emerald-100 text-emerald-700',
};

const columns = ['Todo', 'In Progress', 'Done'];

export default function TasksPage() {
  const [view, setView] = useState('board'); // 'board' | 'list'
  const [filter, setFilter] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [localTasks, setLocalTasks] = useState(tasks);
  const [form, setForm] = useState({ title: '', assignee: '', priority: 'Medium', status: 'Todo', due: '' });
  const [saved, setSaved] = useState(false);

  const filtered = useMemo(() =>
    localTasks.filter((t) => filter === 'All' || t.priority === filter),
    [localTasks, filter]);

  function handleSubmit(e) {
    e.preventDefault();
    setLocalTasks((prev) => [...prev, { id: Date.now(), ...form }]);
    setSaved(true);
    setTimeout(() => { setShowModal(false); setSaved(false); setForm({ title: '', assignee: '', priority: 'Medium', status: 'Todo', due: '' }); }, 900);
  }

  return (
    <div className="flex flex-col gap-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--color-text)', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            Task Management
          </h1>
          <p className="text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>{filtered.length} tasks total</p>
        </div>
        <div className="flex items-center gap-2">
          {/* View toggle */}
          <div className="flex rounded-xl overflow-hidden" style={{ border: '1px solid var(--color-border)' }}>
            {['board', 'list'].map((v) => (
              <button key={v} onClick={() => setView(v)}
                className="px-3 py-2 text-xs font-semibold capitalize"
                style={{
                  background: view === v ? 'var(--color-accent)' : 'var(--color-bg)',
                  color: view === v ? '#fff' : 'var(--color-text-muted)',
                }}>
                {v === 'board' ? '⊞ Board' : '☰ List'}
              </button>
            ))}
          </div>
          <button onClick={() => setShowModal(true)}
            className="px-4 py-2.5 rounded-xl text-sm font-semibold text-white"
            style={{ background: 'var(--color-accent)' }}>
            + Add Task
          </button>
        </div>
      </div>

      {/* Priority filter */}
      <div className="flex gap-2 flex-wrap">
        {['All', 'High', 'Medium', 'Low'].map((p) => (
          <button key={p} onClick={() => setFilter(p)}
            className="px-3 py-1.5 rounded-xl text-xs font-semibold"
            style={{
              background: filter === p ? 'var(--color-accent)' : 'var(--color-bg-card)',
              color: filter === p ? '#fff' : 'var(--color-text-muted)',
              border: '1px solid var(--color-border)',
            }}>
            {p}
          </button>
        ))}
      </div>

      {/* Board View */}
      {view === 'board' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {columns.map((col) => {
            const colTasks = filtered.filter((t) => t.status === col);
            return (
              <div key={col} className="rounded-2xl p-4 flex flex-col gap-3" style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold" style={{ color: 'var(--color-text)' }}>{col}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background: 'var(--color-accent-soft)', color: 'var(--color-accent)' }}>
                    {colTasks.length}
                  </span>
                </div>
                {colTasks.map((t) => (
                  <div key={t.id} className="p-3 rounded-xl flex flex-col gap-2" style={{ background: 'var(--color-bg)', border: '1px solid var(--color-border-soft)' }}>
                    <p className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>{t.title}</p>
                    <div className="flex items-center justify-between flex-wrap gap-1">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${priorityColor[t.priority]}`}>{t.priority}</span>
                      <span className="text-xs" style={{ color: 'var(--color-text-soft)' }}>Due {t.due}</span>
                    </div>
                    <p className="text-xs" style={{ color: 'var(--color-text-soft)' }}>👤 {t.assignee}</p>
                  </div>
                ))}
                {colTasks.length === 0 && (
                  <p className="text-xs text-center py-4" style={{ color: 'var(--color-text-soft)' }}>No tasks here</p>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* List View */}
      {view === 'list' && (
        <div className="rounded-2xl overflow-hidden" style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                  {['Task', 'Assignee', 'Priority', 'Status', 'Due Date'].map((h) => (
                    <th key={h} className="text-left px-5 py-3 font-semibold whitespace-nowrap" style={{ color: 'var(--color-text-muted)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((t) => (
                  <tr key={t.id} style={{ borderBottom: '1px solid var(--color-border-soft)' }}>
                    <td className="px-5 py-3 font-medium" style={{ color: 'var(--color-text)' }}>{t.title}</td>
                    <td className="px-5 py-3 whitespace-nowrap" style={{ color: 'var(--color-text-muted)' }}>{t.assignee}</td>
                    <td className="px-5 py-3"><span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${priorityColor[t.priority]}`}>{t.priority}</span></td>
                    <td className="px-5 py-3"><span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusColor[t.status]}`}>{t.status}</span></td>
                    <td className="px-5 py-3 whitespace-nowrap" style={{ color: 'var(--color-text-muted)' }}>{t.due}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Task Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.5)' }}>
          <div className="w-full max-w-md rounded-2xl p-6 flex flex-col gap-4" style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}>
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold" style={{ color: 'var(--color-text)' }}>Add Task</h2>
              <button onClick={() => setShowModal(false)} style={{ color: 'var(--color-text-muted)' }}>✕</button>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <div>
                <label className="text-xs font-semibold block mb-1" style={{ color: 'var(--color-text-muted)' }}>Task Title *</label>
                <input required value={form.title} onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
                  placeholder="e.g. Send proposal to client"
                  className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                  style={{ background: 'var(--color-bg)', border: '1px solid var(--color-border)', color: 'var(--color-text)' }} />
              </div>
              <div>
                <label className="text-xs font-semibold block mb-1" style={{ color: 'var(--color-text-muted)' }}>Assignee</label>
                <input value={form.assignee} onChange={(e) => setForm((p) => ({ ...p, assignee: e.target.value }))}
                  placeholder="e.g. John Doe"
                  className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                  style={{ background: 'var(--color-bg)', border: '1px solid var(--color-border)', color: 'var(--color-text)' }} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold block mb-1" style={{ color: 'var(--color-text-muted)' }}>Priority</label>
                  <select value={form.priority} onChange={(e) => setForm((p) => ({ ...p, priority: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                    style={{ background: 'var(--color-bg)', border: '1px solid var(--color-border)', color: 'var(--color-text)' }}>
                    {['High', 'Medium', 'Low'].map((v) => <option key={v}>{v}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold block mb-1" style={{ color: 'var(--color-text-muted)' }}>Status</label>
                  <select value={form.status} onChange={(e) => setForm((p) => ({ ...p, status: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                    style={{ background: 'var(--color-bg)', border: '1px solid var(--color-border)', color: 'var(--color-text)' }}>
                    {['Todo', 'In Progress', 'Done'].map((v) => <option key={v}>{v}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold block mb-1" style={{ color: 'var(--color-text-muted)' }}>Due Date</label>
                <input type="date" value={form.due} onChange={(e) => setForm((p) => ({ ...p, due: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                  style={{ background: 'var(--color-bg)', border: '1px solid var(--color-border)', color: 'var(--color-text)' }} />
              </div>
              <div className="flex items-center gap-3 mt-1">
                <button type="submit" className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white" style={{ background: 'var(--color-accent)' }}>Save Task</button>
                <button type="button" onClick={() => setShowModal(false)} className="px-5 py-2.5 rounded-xl text-sm font-semibold" style={{ color: 'var(--color-text-muted)' }}>Cancel</button>
                {saved && <span className="text-xs font-semibold" style={{ color: 'var(--color-success)' }}>Saved!</span>}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}