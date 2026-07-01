'use client';
// src/app/dashboard/employees/page.jsx

import { useMemo, useState } from 'react';
import { employees } from '@/data/dummy';

const statusColor = {
  Active: 'bg-emerald-100 text-emerald-700',
  Inactive: 'bg-gray-200 text-gray-500',
  'On Leave': 'bg-amber-100 text-amber-700',
};

const depts = ['All', 'Sales', 'Design', 'Engineering', 'Marketing', 'Support'];
const PAGE_SIZE = 5;

export default function EmployeesPage() {
  const [query, setQuery] = useState('');
  const [dept, setDept] = useState('All');
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: '', role: '', dept: 'Sales', email: '' });
  const [saved, setSaved] = useState(false);

  const filtered = useMemo(() =>
    employees.filter((e) => {
      const q = query.toLowerCase();
      return (
        (e.name.toLowerCase().includes(q) || e.role.toLowerCase().includes(q)) &&
        (dept === 'All' || e.dept === dept)
      );
    }), [query, dept]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function handleSubmit(e) {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => { setShowModal(false); setSaved(false); setForm({ name: '', role: '', dept: 'Sales', email: '' }); }, 1000);
  }

  return (
    <div className="flex flex-col gap-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--color-text)', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            Employees
          </h1>
          <p className="text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>
            {filtered.length} team members
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2.5 rounded-xl text-sm font-semibold text-white"
          style={{ background: 'var(--color-accent)' }}
        >
          + Add Employee
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 p-4 rounded-2xl" style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}>
        <input
          type="text" value={query}
          onChange={(e) => { setQuery(e.target.value); setPage(1); }}
          placeholder="Search by name or role..."
          className="flex-1 px-4 py-2.5 rounded-xl text-sm outline-none"
          style={{ background: 'var(--color-bg)', border: '1px solid var(--color-border)', color: 'var(--color-text)' }}
        />
        <select
          value={dept} onChange={(e) => { setDept(e.target.value); setPage(1); }}
          className="px-4 py-2.5 rounded-xl text-sm outline-none"
          style={{ background: 'var(--color-bg)', border: '1px solid var(--color-border)', color: 'var(--color-text)' }}
        >
          {depts.map((d) => <option key={d}>{d}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="rounded-2xl overflow-hidden" style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                {['Employee', 'Department', 'Email', 'Status', 'Open Tasks', 'Joined'].map((h) => (
                  <th key={h} className="text-left px-5 py-3 font-semibold whitespace-nowrap" style={{ color: 'var(--color-text-muted)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paged.map((emp) => (
                <tr key={emp.id} style={{ borderBottom: '1px solid var(--color-border-soft)' }}>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0" style={{ background: 'var(--color-accent)' }}>
                        {emp.avatar}
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium truncate" style={{ color: 'var(--color-text)' }}>{emp.name}</p>
                        <p className="text-xs truncate" style={{ color: 'var(--color-text-soft)' }}>{emp.role}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3 whitespace-nowrap" style={{ color: 'var(--color-text-muted)' }}>{emp.dept}</td>
                  <td className="px-5 py-3 whitespace-nowrap" style={{ color: 'var(--color-text-muted)' }}>{emp.email}</td>
                  <td className="px-5 py-3">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusColor[emp.status]}`}>{emp.status}</span>
                  </td>
                  <td className="px-5 py-3 whitespace-nowrap" style={{ color: 'var(--color-text)' }}>{emp.tasks}</td>
                  <td className="px-5 py-3 whitespace-nowrap" style={{ color: 'var(--color-text-muted)' }}>{emp.joined}</td>
                </tr>
              ))}
              {paged.length === 0 && (
                <tr><td colSpan={6} className="px-5 py-8 text-center" style={{ color: 'var(--color-text-soft)' }}>No employees match your filters.</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-5 py-3" style={{ borderTop: '1px solid var(--color-border)' }}>
          <p className="text-xs" style={{ color: 'var(--color-text-soft)' }}>Page {page} of {totalPages}</p>
          <div className="flex gap-2">
            <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold disabled:opacity-40"
              style={{ background: 'var(--color-bg)', border: '1px solid var(--color-border)', color: 'var(--color-text)' }}>Prev</button>
            <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold disabled:opacity-40"
              style={{ background: 'var(--color-bg)', border: '1px solid var(--color-border)', color: 'var(--color-text)' }}>Next</button>
          </div>
        </div>
      </div>

      {/* Add Employee Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.5)' }}>
          <div className="w-full max-w-md rounded-2xl p-6 flex flex-col gap-4" style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}>
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold" style={{ color: 'var(--color-text)' }}>Add Employee</h2>
              <button onClick={() => setShowModal(false)} className="text-lg leading-none" style={{ color: 'var(--color-text-muted)' }}>✕</button>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              {[['name', 'Full Name', 'text', 'e.g. John Doe'], ['role', 'Role', 'text', 'e.g. Sales Manager'], ['email', 'Email', 'email', 'name@crm.com']].map(([key, label, type, ph]) => (
                <div key={key}>
                  <label className="text-xs font-semibold block mb-1" style={{ color: 'var(--color-text-muted)' }}>{label}</label>
                  <input required type={type} value={form[key]} onChange={(e) => setForm((p) => ({ ...p, [key]: e.target.value }))}
                    placeholder={ph} className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                    style={{ background: 'var(--color-bg)', border: '1px solid var(--color-border)', color: 'var(--color-text)' }} />
                </div>
              ))}
              <div>
                <label className="text-xs font-semibold block mb-1" style={{ color: 'var(--color-text-muted)' }}>Department</label>
                <select value={form.dept} onChange={(e) => setForm((p) => ({ ...p, dept: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                  style={{ background: 'var(--color-bg)', border: '1px solid var(--color-border)', color: 'var(--color-text)' }}>
                  {['Sales', 'Design', 'Engineering', 'Marketing', 'Support'].map((d) => <option key={d}>{d}</option>)}
                </select>
              </div>
              <div className="flex items-center gap-3 mt-1">
                <button type="submit" className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white" style={{ background: 'var(--color-accent)' }}>
                  Save
                </button>
                <button type="button" onClick={() => setShowModal(false)} className="px-5 py-2.5 rounded-xl text-sm font-semibold" style={{ color: 'var(--color-text-muted)' }}>
                  Cancel
                </button>
                {saved && <span className="text-xs font-semibold" style={{ color: 'var(--color-success)' }}>Saved!</span>}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}