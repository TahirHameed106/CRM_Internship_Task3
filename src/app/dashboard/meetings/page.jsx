'use client';
// src/app/dashboard/meetings/page.jsx

import { useState } from 'react';
import { meetings } from '@/data/dummy';

const typeColor = {
  Demo: 'bg-blue-100 text-blue-700',
  Internal: 'bg-violet-100 text-violet-700',
  Onboarding: 'bg-emerald-100 text-emerald-700',
};

const statusColor = {
  Upcoming: 'bg-amber-100 text-amber-700',
  Completed: 'bg-gray-100 text-gray-500',
};

export default function MeetingsPage() {
  const [filter, setFilter] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [localMeetings, setLocalMeetings] = useState(meetings);
  const [form, setForm] = useState({ title: '', date: '', time: '', with: '', type: 'Demo' });
  const [saved, setSaved] = useState(false);

  const filtered = localMeetings.filter((m) => filter === 'All' || m.status === filter);

  function handleSubmit(e) {
    e.preventDefault();
    setLocalMeetings((prev) => [...prev, { id: Date.now(), ...form, status: 'Upcoming' }]);
    setSaved(true);
    setTimeout(() => { setShowModal(false); setSaved(false); setForm({ title: '', date: '', time: '', with: '', type: 'Demo' }); }, 900);
  }

  return (
    <div className="flex flex-col gap-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--color-text)', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            Meeting Scheduler
          </h1>
          <p className="text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>{filtered.length} meetings</p>
        </div>
        <button onClick={() => setShowModal(true)}
          className="px-4 py-2.5 rounded-xl text-sm font-semibold text-white"
          style={{ background: 'var(--color-accent)' }}>
          + Schedule Meeting
        </button>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2">
        {['All', 'Upcoming', 'Completed'].map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            className="px-4 py-2 rounded-xl text-xs font-semibold"
            style={{
              background: filter === f ? 'var(--color-accent)' : 'var(--color-bg-card)',
              color: filter === f ? '#fff' : 'var(--color-text-muted)',
              border: '1px solid var(--color-border)',
            }}>
            {f}
          </button>
        ))}
      </div>

      {/* Meeting Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((m) => (
          <div key={m.id} className="p-5 rounded-2xl flex flex-col gap-3" style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}>
            <div className="flex items-start justify-between gap-2">
              <p className="text-sm font-semibold leading-snug" style={{ color: 'var(--color-text)' }}>{m.title}</p>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full shrink-0 ${statusColor[m.status]}`}>{m.status}</span>
            </div>
            <div className="flex flex-col gap-1 text-xs" style={{ color: 'var(--color-text-muted)' }}>
              <span>📅 {m.date} · {m.time}</span>
              <span>👤 {m.with}</span>
            </div>
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full w-fit ${typeColor[m.type]}`}>{m.type}</span>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="col-span-3 text-center py-10 text-sm" style={{ color: 'var(--color-text-soft)' }}>No meetings found.</p>
        )}
      </div>

      {/* Schedule Meeting Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.5)' }}>
          <div className="w-full max-w-md rounded-2xl p-6 flex flex-col gap-4" style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}>
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold" style={{ color: 'var(--color-text)' }}>Schedule Meeting</h2>
              <button onClick={() => setShowModal(false)} style={{ color: 'var(--color-text-muted)' }}>✕</button>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              {[['title', 'Meeting Title', 'text', 'e.g. Product Demo'], ['with', 'With', 'text', 'e.g. Ayesha Khan']].map(([key, label, type, ph]) => (
                <div key={key}>
                  <label className="text-xs font-semibold block mb-1" style={{ color: 'var(--color-text-muted)' }}>{label}</label>
                  <input required type={type} value={form[key]} onChange={(e) => setForm((p) => ({ ...p, [key]: e.target.value }))}
                    placeholder={ph} className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                    style={{ background: 'var(--color-bg)', border: '1px solid var(--color-border)', color: 'var(--color-text)' }} />
                </div>
              ))}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold block mb-1" style={{ color: 'var(--color-text-muted)' }}>Date</label>
                  <input required type="date" value={form.date} onChange={(e) => setForm((p) => ({ ...p, date: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                    style={{ background: 'var(--color-bg)', border: '1px solid var(--color-border)', color: 'var(--color-text)' }} />
                </div>
                <div>
                  <label className="text-xs font-semibold block mb-1" style={{ color: 'var(--color-text-muted)' }}>Time</label>
                  <input required type="time" value={form.time} onChange={(e) => setForm((p) => ({ ...p, time: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                    style={{ background: 'var(--color-bg)', border: '1px solid var(--color-border)', color: 'var(--color-text)' }} />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold block mb-1" style={{ color: 'var(--color-text-muted)' }}>Type</label>
                <select value={form.type} onChange={(e) => setForm((p) => ({ ...p, type: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                  style={{ background: 'var(--color-bg)', border: '1px solid var(--color-border)', color: 'var(--color-text)' }}>
                  {['Demo', 'Internal', 'Onboarding'].map((t) => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div className="flex items-center gap-3 mt-1">
                <button type="submit" className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white" style={{ background: 'var(--color-accent)' }}>Save</button>
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