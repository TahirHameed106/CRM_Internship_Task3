'use client';
// src/app/dashboard/leads/add/page.jsx

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const fieldClass = "w-full px-4 py-2.5 rounded-xl text-sm outline-none";
const fieldStyle = { background: 'var(--color-bg)', border: '1px solid var(--color-border)', color: 'var(--color-text)' };

export default function AddLeadPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', company: '', source: 'Website', stage: 'New', value: '', owner: '' });
  const [saved, setSaved] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => router.push('/dashboard/leads'), 900);
  }

  return (
    <div className="max-w-2xl flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: 'var(--color-text)', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Add Lead</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>Capture a new sales lead into the pipeline.</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-6 rounded-2xl" style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold block mb-1.5" style={{ color: 'var(--color-text-muted)' }}>Lead Name *</label>
            <input required name="name" value={form.name} onChange={handleChange} className={fieldClass} style={fieldStyle} placeholder="e.g. Faisal Rauf" />
          </div>
          <div>
            <label className="text-xs font-semibold block mb-1.5" style={{ color: 'var(--color-text-muted)' }}>Company</label>
            <input name="company" value={form.company} onChange={handleChange} className={fieldClass} style={fieldStyle} placeholder="e.g. GreenField Agro" />
          </div>
          <div>
            <label className="text-xs font-semibold block mb-1.5" style={{ color: 'var(--color-text-muted)' }}>Source</label>
            <select name="source" value={form.source} onChange={handleChange} className={fieldClass} style={fieldStyle}>
              {['Website', 'Referral', 'Cold Call', 'Event'].map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold block mb-1.5" style={{ color: 'var(--color-text-muted)' }}>Stage</label>
            <select name="stage" value={form.stage} onChange={handleChange} className={fieldClass} style={fieldStyle}>
              {['New', 'Contacted', 'Qualified', 'Negotiation', 'Lost'].map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold block mb-1.5" style={{ color: 'var(--color-text-muted)' }}>Estimated Value</label>
            <input name="value" value={form.value} onChange={handleChange} className={fieldClass} style={fieldStyle} placeholder="$0" />
          </div>
          <div>
            <label className="text-xs font-semibold block mb-1.5" style={{ color: 'var(--color-text-muted)' }}>Owner</label>
            <input name="owner" value={form.owner} onChange={handleChange} className={fieldClass} style={fieldStyle} placeholder="e.g. John Doe" />
          </div>
        </div>

        <div className="flex items-center gap-3 mt-2">
          <button type="submit" className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white" style={{ background: 'var(--color-accent)' }}>
            Save Lead
          </button>
          <button type="button" onClick={() => router.push('/dashboard/leads')} className="px-5 py-2.5 rounded-xl text-sm font-semibold" style={{ color: 'var(--color-text-muted)' }}>
            Cancel
          </button>
          {saved && <span className="text-xs font-semibold" style={{ color: 'var(--color-success)' }}>Saved! Redirecting...</span>}
        </div>
      </form>
    </div>
  );
}
