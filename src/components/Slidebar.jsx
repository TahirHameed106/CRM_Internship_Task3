'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

/* ── Nav items ──────────────────────────────────────────── */
const navItems = [
  {
    group: 'Main',
    links: [
      {
        label: 'Dashboard',
        href: '/dashboard',
        icon: (
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
            <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
          </svg>
        ),
      },
    ],
  },
  {
    group: 'CRM',
    links: [
      {
        label: 'Customers',
        href: '/dashboard/customers',
        icon: (
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path strokeLinecap="round" strokeLinejoin="round" d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
          </svg>
        ),
        badge: '2.4k',
      },
      {
        label: 'Leads',
        href: '/dashboard/leads',
        icon: (
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
          </svg>
        ),
        badge: '38',
        badgeColor: 'bg-amber-100 text-amber-700',
      },
      {
        label: 'Employees',
        href: '/dashboard/employees',
        icon: (
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
          </svg>
        ),
      },
    ],
  },
  {
    group: 'Work',
    links: [
      {
        label: 'Tasks',
        href: '/dashboard/tasks',
        icon: (
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/>
          </svg>
        ),
        badge: '12',
        badgeColor: 'bg-red-100 text-red-600',
      },
      {
        label: 'Meetings',
        href: '/dashboard/meetings',
        icon: (
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.069A1 1 0 0121 8.87v6.26a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
          </svg>
        ),
      },
      {
        label: 'Calendar',
        href: '/dashboard/calendar',
        icon: (
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
            <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/>
            <line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
        ),
      },
    ],
  },
  {
    group: 'Insights',
    links: [
      {
        label: 'Reports',
        href: '/dashboard/reports',
        icon: (
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
          </svg>
        ),
      },
      {
        label: 'Notifications',
        href: '/dashboard/notifications',
        icon: (
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
          </svg>
        ),
        badge: '5',
        badgeColor: 'bg-violet-100 text-violet-700',
      },
    ],
  },
  {
    group: 'Account',
    links: [
      {
        label: 'Settings',
        href: '/dashboard/settings',
        icon: (
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <circle cx="12" cy="12" r="3"/>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/>
          </svg>
        ),
      },
      {
        label: 'Profile',
        href: '/dashboard/profile',
        icon: (
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        ),
      },
    ],
  },
];

export default function Sidebar({ collapsed, onToggle }) {
  const pathname = usePathname();

  return (
    <aside
      className={`flex flex-col h-screen shrink-0 transition-all duration-300 ${collapsed ? 'w-16' : 'w-60'}`}
      style={{
        background: 'var(--color-navy-900)',
        borderRight: '1px solid var(--color-navy-800)',
      }}
      aria-label="Sidebar navigation"
    >
      {/* ── Logo ────────────────────────────────────────── */}
      <div
        className="flex items-center gap-3 px-4 h-16 shrink-0"
        style={{ borderBottom: '1px solid var(--color-navy-800)' }}
      >
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-xs shrink-0"
          style={{ background: 'var(--color-accent)' }}
        >
          TD
        </div>
        {!collapsed && (
          <span
            className="font-bold text-base text-white truncate"
            style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
          >
            T.Dev <span style={{ color: 'var(--color-accent-muted)' }}>CRM</span>
          </span>
        )}
        <button
          onClick={onToggle}
          className="ml-auto p-1.5 rounded-lg transition-colors shrink-0"
          style={{ color: 'var(--color-navy-400)' }}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            {collapsed
              ? <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
              : <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>
            }
          </svg>
        </button>
      </div>

      {/* ── Nav ─────────────────────────────────────────── */}
      <nav className="flex-1 overflow-y-auto scrollbar-hide py-4 px-2 flex flex-col gap-5" aria-label="Main navigation">
        {navItems.map((group) => (
          <div key={group.group}>
            {/* Group label */}
            {!collapsed && (
              <p
                className="text-xs font-semibold uppercase tracking-widest px-3 mb-2"
                style={{ color: 'var(--color-navy-500)' }}
              >
                {group.group}
              </p>
            )}
            <ul className="flex flex-col gap-0.5">
              {group.links.map((link) => {
                const active = pathname === link.href;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150 group
                        ${collapsed ? 'justify-center' : ''}`}
                      style={{
                        background: active ? 'var(--color-accent)' : 'transparent',
                        color: active ? '#fff' : 'var(--color-navy-300)',
                      }}
                      title={collapsed ? link.label : undefined}
                    >
                      {/* Icon */}
                      <span className="shrink-0">{link.icon}</span>

                      {/* Label + badge */}
                      {!collapsed && (
                        <>
                          <span className="text-sm font-medium flex-1 truncate">{link.label}</span>
                          {link.badge && (
                            <span
                              className={`text-xs font-semibold px-2 py-0.5 rounded-full ${active ? 'bg-white/20 text-white' : (link.badgeColor || 'bg-emerald-100 text-emerald-700')}`}
                            >
                              {link.badge}
                            </span>
                          )}
                        </>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* ── User card ───────────────────────────────────── */}
      <div
        className={`p-3 shrink-0 ${collapsed ? 'flex justify-center' : ''}`}
        style={{ borderTop: '1px solid var(--color-navy-800)' }}
      >
        {collapsed ? (
          <div className="w-9 h-9 rounded-full bg-violet-500 flex items-center justify-center text-white text-xs font-bold">
            JD
          </div>
        ) : (
          <div className="flex items-center gap-3 p-2 rounded-xl" style={{ background: 'var(--color-navy-800)' }}>
            <div className="w-8 h-8 rounded-full bg-violet-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
              JD
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-white truncate">John Doe</p>
              <p className="text-xs truncate" style={{ color: 'var(--color-navy-400)' }}>Admin</p>
            </div>
            <Link
              href="/login"
              className="shrink-0 p-1 rounded-lg transition-colors"
              style={{ color: 'var(--color-navy-400)' }}
              title="Logout"
              aria-label="Logout"
            >
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
              </svg>
            </Link>
          </div>
        )}
      </div>
    </aside>
  );
}