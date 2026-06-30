'use client';
// src/app/dashboard/customers/add/page.jsx

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const fieldClass = "w-full px-4 py-2.5 rounded-xl text-sm outline-none";
const fieldStyle = { background: 'var(--color-bg)', border: '1px solid var(--color-border)', color: 'var(--color-text)' };

export default function AddCustomerPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', status: 'Active', value: '' });
  const [saved, setSaved] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    // UI only — no backend yet
    setSaved(true);
    setTimeout(() => router.push('/dashboard/customers'), 900);
  }

  return (
    <div className="max-w-2xl flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: 'var(--color-text)', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
          Add Customer
        </h1>
        <p className="text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>Create a new customer profile.</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 p-6 rounded-2xl"
        style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}
      >
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold block mb-1.5" style={{ color: 'var(--color-text-muted)' }}>Full Name *</label>
            <input required name="name" value={form.name} onChange={handleChange} className={fieldClass} style={fieldStyle} placeholder="e.g. Ayesha Khan" />
          </div>
          <div>
            <label className="text-xs font-semibold block mb-1.5" style={{ color: 'var(--color-text-muted)' }}>Company</label>
            <input name="company" value={form.company} onChange={handleChange} className={fieldClass} style={fieldStyle} placeholder="e.g. Nexora Pvt Ltd" />
          </div>
          <div>
            <label className="text-xs font-semibold block mb-1.5" style={{ color: 'var(--color-text-muted)' }}>Email *</label>
            <input required type="email" name="email" value={form.email} onChange={handleChange} className={fieldClass} style={fieldStyle} placeholder="name@company.com" />
          </div>
          <div>
            <label className="text-xs font-semibold block mb-1.5" style={{ color: 'var(--color-text-muted)' }}>Phone</label>
            <input name="phone" value={form.phone} onChange={handleChange} className={fieldClass} style={fieldStyle} placeholder="+92 300 1234567" />
          </div>
          <div>
            <label className="text-xs font-semibold block mb-1.5" style={{ color: 'var(--color-text-muted)' }}>Status</label>
            <select name="status" value={form.status} onChange={handleChange} className={fieldClass} style={fieldStyle}>
              {['Active', 'Inactive', 'Pending'].map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold block mb-1.5" style={{ color: 'var(--color-text-muted)' }}>Deal Value</label>
            <input name="value" value={form.value} onChange={handleChange} className={fieldClass} style={fieldStyle} placeholder="$0" />
          </div>
        </div>

        <div className="flex items-center gap-3 mt-2">
          <button type="submit" className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white" style={{ background: 'var(--color-accent)' }}>
            Save Customer
          </button>
          <button type="button" onClick={() => router.push('/dashboard/customers')} className="px-5 py-2.5 rounded-xl text-sm font-semibold" style={{ color: 'var(--color-text-muted)' }}>
            Cancel
          </button>
          {saved && <span className="text-xs font-semibold" style={{ color: 'var(--color-success)' }}>Saved! Redirecting...</span>}
        </div>
      </form>
    </div>
  );
}
