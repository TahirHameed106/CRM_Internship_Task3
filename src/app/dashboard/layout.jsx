'use client';
// src/app/dashboard/layout.jsx

import { useState } from 'react';
import Sidebar from '@/components/Slidebar';
import { useTheme } from '@/context/ThemeContext';

export default function DashboardLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: 'var(--color-bg)' }}>
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((c) => !c)} />

      <div className="flex-1 flex flex-col min-w-0">
        <header
          className="h-16 shrink-0 flex items-center gap-4 px-6"
          style={{ background: 'var(--color-bg-soft)', borderBottom: '1px solid var(--color-border)' }}
        >
          <div className="relative flex-1 max-w-md">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
              className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--color-text-soft)' }}>
              <circle cx="11" cy="11" r="7" /><path strokeLinecap="round" d="M21 21l-4-4" />
            </svg>
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-9 pr-3 py-2 rounded-xl text-sm outline-none"
              style={{ background: 'var(--color-bg)', border: '1px solid var(--color-border)', color: 'var(--color-text)' }}
            />
          </div>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl transition-colors"
            style={{ background: 'var(--color-bg)', border: '1px solid var(--color-border)', color: 'var(--color-text-muted)' }}
            aria-label="Toggle theme"
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>

          <button
            className="relative p-2 rounded-xl"
            style={{ background: 'var(--color-bg)', border: '1px solid var(--color-border)', color: 'var(--color-text-muted)' }}
            aria-label="Notifications"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.4-1.4A2 2 0 0118 14.2V11a6 6 0 10-12 0v3.2a2 2 0 01-.6 1.4L4 17h5m6 0a3 3 0 11-6 0" />
            </svg>
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full" style={{ background: 'var(--color-danger)' }} />
          </button>

          <div className="flex items-center gap-2 pl-3" style={{ borderLeft: '1px solid var(--color-border)' }}>
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ background: 'var(--color-accent)' }}>
              JD
            </div>
            <span className="text-sm font-medium hidden sm:block" style={{ color: 'var(--color-text)' }}>John Doe</span>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}