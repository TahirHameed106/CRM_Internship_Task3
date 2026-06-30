'use client';
// src/app/dashboard/page.jsx

import { customers, leads, salesChart, todaysMeetings, dashboardActivity } from '@/data/dummy';

export default function DashboardOverview() {
  const stats = [
    { label: 'Total Customers', value: customers.length, sub: '+12% this month', icon: '👥', color: 'var(--color-accent)' },
    { label: 'Active Leads', value: leads.filter((l) => l.stage !== 'Lost').length, sub: '+5 new today', icon: '📈', color: 'var(--color-info)' },
    { label: 'Employees', value: '24', sub: '3 on leave', icon: '🧑‍💼', color: 'var(--color-success)' },
    { label: 'Pending Tasks', value: '12', sub: '4 due today', icon: '✅', color: 'var(--color-warning)' },
  ];

  const maxVal = Math.max(...salesChart.map((s) => s.value));

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: 'var(--color-text)', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
          Dashboard Overview
        </h1>
        <p className="text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>Welcome back, here's what's happening today.</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="p-5 rounded-2xl" style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}>
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg" style={{ background: 'var(--color-accent-soft)' }}>
                {s.icon}
              </div>
            </div>
            <p className="text-2xl font-bold" style={{ color: 'var(--color-text)' }}>{s.value}</p>
            <p className="text-xs font-medium mt-1" style={{ color: 'var(--color-text-soft)' }}>{s.label}</p>
            <p className="text-xs mt-2" style={{ color: s.color }}>{s.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Revenue card */}
        <div className="lg:col-span-1 p-5 rounded-2xl flex flex-col justify-between" style={{ background: 'var(--color-navy-900)' }}>
          <div>
            <p className="text-xs font-medium" style={{ color: 'var(--color-navy-300)' }}>Total Revenue</p>
            <p className="text-3xl font-bold text-white mt-2">$148,600</p>
            <p className="text-xs mt-2" style={{ color: 'var(--color-success)' }}>+18.2% vs last month</p>
          </div>
          <div className="flex gap-1 mt-6 items-end h-12">
            {salesChart.map((s) => (
              <div key={s.month} className="flex-1 rounded-t" style={{ height: `${(s.value / maxVal) * 100}%`, background: 'var(--color-accent)' }} />
            ))}
          </div>
        </div>

        {/* Sales chart (dummy) */}
        <div className="lg:col-span-2 p-5 rounded-2xl" style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold" style={{ color: 'var(--color-text)' }}>Sales Performance</h2>
            <span className="text-xs px-2.5 py-1 rounded-full" style={{ background: 'var(--color-accent-soft)', color: 'var(--color-accent)' }}>Last 6 months</span>
          </div>
          <div className="flex items-end gap-3 h-40">
            {salesChart.map((s) => (
              <div key={s.month} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full rounded-t-lg transition-all" style={{ height: `${(s.value / maxVal) * 100}%`, background: 'var(--color-accent)', minHeight: '8px' }} />
                <span className="text-xs" style={{ color: 'var(--color-text-soft)' }}>{s.month}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Today's meetings */}
        <div className="p-5 rounded-2xl" style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}>
          <h2 className="text-sm font-bold mb-4" style={{ color: 'var(--color-text)' }}>Today's Meetings</h2>
          <ul className="flex flex-col gap-3">
            {todaysMeetings.map((m) => (
              <li key={m.id} className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold shrink-0" style={{ background: 'var(--color-accent-soft)', color: 'var(--color-accent)' }}>
                  {m.time.split(' ')[0]}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate" style={{ color: 'var(--color-text)' }}>{m.title}</p>
                  <p className="text-xs truncate" style={{ color: 'var(--color-text-soft)' }}>with {m.with} · {m.time}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Activity timeline */}
        <div className="lg:col-span-2 p-5 rounded-2xl" style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}>
          <h2 className="text-sm font-bold mb-4" style={{ color: 'var(--color-text)' }}>Activity Timeline</h2>
          <ul className="flex flex-col gap-4">
            {dashboardActivity.map((a, i) => (
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
    </div>
  );
}