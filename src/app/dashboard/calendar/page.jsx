'use client';
// src/app/dashboard/calendar/page.jsx

import { useMemo, useState } from 'react';
import { meetings } from '@/data/dummy';

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const DAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

export default function CalendarPage() {
  const today = new Date();
  const [current, setCurrent] = useState({ month: today.getMonth(), year: today.getFullYear() });
  const [selected, setSelected] = useState(null);

  const firstDay = new Date(current.year, current.month, 1).getDay();
  const daysInMonth = new Date(current.year, current.month + 1, 0).getDate();

  // Map meetings to their day numbers for the current month/year
  const meetingsByDay = useMemo(() => {
    const map = {};
    meetings.forEach((m) => {
      const d = new Date(m.date);
      if (d.getMonth() === current.month && d.getFullYear() === current.year) {
        const day = d.getDate();
        if (!map[day]) map[day] = [];
        map[day].push(m);
      }
    });
    return map;
  }, [current]);

  const selectedMeetings = selected ? (meetingsByDay[selected] || []) : [];

  function prev() {
    setCurrent((c) => c.month === 0 ? { month: 11, year: c.year - 1 } : { month: c.month - 1, year: c.year });
    setSelected(null);
  }
  function next() {
    setCurrent((c) => c.month === 11 ? { month: 0, year: c.year + 1 } : { month: c.month + 1, year: c.year });
    setSelected(null);
  }

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const isToday = (d) => d === today.getDate() && current.month === today.getMonth() && current.year === today.getFullYear();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: 'var(--color-text)', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
          Calendar
        </h1>
        <p className="text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>Click a date to see scheduled meetings.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* Calendar grid */}
        <div className="lg:col-span-2 rounded-2xl p-5" style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}>
          {/* Month nav */}
          <div className="flex items-center justify-between mb-5">
            <button onClick={prev} className="w-8 h-8 rounded-xl flex items-center justify-center text-sm"
              style={{ border: '1px solid var(--color-border)', color: 'var(--color-text)' }}>←</button>
            <h2 className="text-sm font-bold" style={{ color: 'var(--color-text)' }}>
              {MONTHS[current.month]} {current.year}
            </h2>
            <button onClick={next} className="w-8 h-8 rounded-xl flex items-center justify-center text-sm"
              style={{ border: '1px solid var(--color-border)', color: 'var(--color-text)' }}>→</button>
          </div>

          {/* Day labels */}
          <div className="grid grid-cols-7 mb-2">
            {DAYS.map((d) => (
              <div key={d} className="text-center text-xs font-semibold py-1" style={{ color: 'var(--color-text-muted)' }}>{d}</div>
            ))}
          </div>

          {/* Date cells */}
          <div className="grid grid-cols-7 gap-1">
            {cells.map((d, i) => (
              <div key={i}
                onClick={() => d && setSelected(d)}
                className="relative aspect-square flex flex-col items-center justify-start pt-1.5 rounded-xl cursor-pointer transition-colors text-sm"
                style={{
                  background: !d ? 'transparent'
                    : selected === d ? 'var(--color-accent)'
                    : isToday(d) ? 'var(--color-accent-soft)'
                    : 'transparent',
                  color: !d ? 'transparent'
                    : selected === d ? '#fff'
                    : isToday(d) ? 'var(--color-accent)'
                    : 'var(--color-text)',
                  fontWeight: isToday(d) || selected === d ? 700 : 400,
                  cursor: d ? 'pointer' : 'default',
                }}>
                {d}
                {d && meetingsByDay[d] && (
                  <span className="w-1.5 h-1.5 rounded-full mt-0.5"
                    style={{ background: selected === d ? '#fff' : 'var(--color-accent)' }} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Meetings for selected day */}
        <div className="rounded-2xl p-5 flex flex-col gap-4" style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}>
          <h2 className="text-sm font-bold" style={{ color: 'var(--color-text)' }}>
            {selected ? `${MONTHS[current.month]} ${selected}` : 'Select a date'}
          </h2>
          {selected && selectedMeetings.length === 0 && (
            <p className="text-sm" style={{ color: 'var(--color-text-soft)' }}>No meetings on this day.</p>
          )}
          {!selected && (
            <p className="text-sm" style={{ color: 'var(--color-text-soft)' }}>Click any date to view meetings.</p>
          )}
          <ul className="flex flex-col gap-3">
            {selectedMeetings.map((m) => (
              <li key={m.id} className="p-3 rounded-xl flex flex-col gap-1.5" style={{ background: 'var(--color-bg)', border: '1px solid var(--color-border-soft)' }}>
                <p className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>{m.title}</p>
                <p className="text-xs" style={{ color: 'var(--color-text-soft)' }}>🕐 {m.time} · 👤 {m.with}</p>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full w-fit"
                  style={{ background: 'var(--color-accent-soft)', color: 'var(--color-accent)' }}>{m.type}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}