'use client';
// src/app/dashboard/customers/page.jsx

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { customers, statusColor } from '@/data/dummy';

const PAGE_SIZE = 5;

export default function CustomersPage() {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('All');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return customers.filter((c) => {
      const matchesQuery =
        c.name.toLowerCase().includes(query.toLowerCase()) ||
        c.company.toLowerCase().includes(query.toLowerCase());
      const matchesStatus = status === 'All' || c.status === status;
      return matchesQuery && matchesStatus;
    });
  }, [query, status]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--color-text)', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            Customers
          </h1>
          <p className="text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>
            {filtered.length} customers found
          </p>
        </div>
        <Link
          href="/dashboard/customers/add"
          className="px-4 py-2.5 rounded-xl text-sm font-semibold text-white text-center"
          style={{ background: 'var(--color-accent)' }}
        >
          + Add Customer
        </Link>
      </div>

      {/* Filters */}
      <div
        className="flex flex-col sm:flex-row gap-3 p-4 rounded-2xl"
        style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}
      >
        <input
          type="text"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setPage(1); }}
          placeholder="Search by name or company..."
          className="flex-1 px-4 py-2.5 rounded-xl text-sm outline-none"
          style={{ background: 'var(--color-bg)', border: '1px solid var(--color-border)', color: 'var(--color-text)' }}
        />
        <select
          value={status}
          onChange={(e) => { setStatus(e.target.value); setPage(1); }}
          className="px-4 py-2.5 rounded-xl text-sm outline-none"
          style={{ background: 'var(--color-bg)', border: '1px solid var(--color-border)', color: 'var(--color-text)' }}
        >
          {['All', 'Active', 'Inactive', 'Pending'].map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                {['Customer', 'Email', 'Phone', 'Status', 'Value', 'Joined', ''].map((h) => (
                  <th key={h} className="text-left px-5 py-3 font-semibold whitespace-nowrap" style={{ color: 'var(--color-text-muted)' }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paged.map((c) => (
                <tr key={c.id} style={{ borderBottom: '1px solid var(--color-border-soft)' }}>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0" style={{ background: 'var(--color-accent)' }}>
                        {c.avatar}
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium truncate" style={{ color: 'var(--color-text)' }}>{c.name}</p>
                        <p className="text-xs truncate" style={{ color: 'var(--color-text-soft)' }}>{c.company}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3 whitespace-nowrap" style={{ color: 'var(--color-text-muted)' }}>{c.email}</td>
                  <td className="px-5 py-3 whitespace-nowrap" style={{ color: 'var(--color-text-muted)' }}>{c.phone}</td>
                  <td className="px-5 py-3">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusColor[c.status]}`}>{c.status}</span>
                  </td>
                  <td className="px-5 py-3 font-medium whitespace-nowrap" style={{ color: 'var(--color-text)' }}>{c.value}</td>
                  <td className="px-5 py-3 whitespace-nowrap" style={{ color: 'var(--color-text-muted)' }}>{c.joined}</td>
                  <td className="px-5 py-3 text-right whitespace-nowrap">
                    <Link href={`/dashboard/customers/${c.id}`} className="text-xs font-semibold" style={{ color: 'var(--color-accent)' }}>
                      View →
                    </Link>
                  </td>
                </tr>
              ))}
              {paged.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-5 py-8 text-center" style={{ color: 'var(--color-text-soft)' }}>
                    No customers match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-5 py-3" style={{ borderTop: '1px solid var(--color-border)' }}>
          <p className="text-xs" style={{ color: 'var(--color-text-soft)' }}>
            Page {page} of {totalPages}
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold disabled:opacity-40"
              style={{ background: 'var(--color-bg)', border: '1px solid var(--color-border)', color: 'var(--color-text)' }}
            >
              Prev
            </button>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold disabled:opacity-40"
              style={{ background: 'var(--color-bg)', border: '1px solid var(--color-border)', color: 'var(--color-text)' }}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
