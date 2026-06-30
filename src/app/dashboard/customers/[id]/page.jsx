'use client';
// src/app/dashboard/customers/[id]/page.jsx

import { use } from 'react';
import Link from 'next/link';
import { customers, statusColor } from '@/data/dummy';

export default function CustomerProfilePage({ params }) {
  const { id } = use(params);
  const customer = customers.find((c) => String(c.id) === String(id)) || customers[0];

  const stats = [
    { label: 'Total Deals', value: '14' },
    { label: 'Deal Value', value: customer.value },
    { label: 'Open Tasks', value: '3' },
    { label: 'Last Contact', value: '2 days ago' },
  ];

  const activity = [
    { text: 'Closed a deal worth ' + customer.value, time: '2 days ago' },
    { text: 'Sent follow-up email regarding contract renewal', time: '5 days ago' },
    { text: 'Meeting scheduled with sales team', time: '1 week ago' },
  ];

  return (
    <div className="flex flex-col gap-6 max-w-4xl">
      <Link href="/dashboard/customers" className="text-sm font-semibold w-fit" style={{ color: 'var(--color-accent)' }}>
        ← Back to Customers
      </Link>

      {/* Profile header card */}
      <div className="p-6 rounded-2xl flex flex-col sm:flex-row sm:items-center gap-5" style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}>
        <div className="w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-bold shrink-0" style={{ background: 'var(--color-accent)' }}>
          {customer.avatar}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-xl font-bold" style={{ color: 'var(--color-text)', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{customer.name}</h1>
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusColor[customer.status]}`}>{customer.status}</span>
          </div>
          <p className="text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>{customer.company}</p>
          <div className="flex flex-wrap gap-x-6 gap-y-1 mt-3 text-sm" style={{ color: 'var(--color-text-muted)' }}>
            <span>✉️ {customer.email}</span>
            <span>📞 {customer.phone}</span>
            <span>📅 Joined {customer.joined}</span>
          </div>
        </div>
        <button className="px-4 py-2.5 rounded-xl text-sm font-semibold text-white h-fit" style={{ background: 'var(--color-accent)' }}>
          Edit Profile
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="p-4 rounded-2xl" style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}>
            <p className="text-xs font-medium" style={{ color: 'var(--color-text-soft)' }}>{s.label}</p>
            <p className="text-lg font-bold mt-1" style={{ color: 'var(--color-text)' }}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Activity */}
      <div className="rounded-2xl p-6" style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}>
        <h2 className="text-sm font-bold mb-4" style={{ color: 'var(--color-text)' }}>Recent Activity</h2>
        <ul className="flex flex-col gap-4">
          {activity.map((a, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="w-2 h-2 rounded-full mt-1.5 shrink-0" style={{ background: 'var(--color-accent)' }} />
              <div>
                <p className="text-sm" style={{ color: 'var(--color-text)' }}>{a.text}</p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-soft)' }}>{a.time}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
