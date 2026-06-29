'use client';
// src/app/login/page.jsx

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/context/ThemeContext';

export default function LoginPage() {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();

  const [form,    setForm]    = useState({ email: '', password: '' });
  const [errors,  setErrors]  = useState({});
  const [loading, setLoading] = useState(false);
  const [showPw,  setShowPw]  = useState(false);

  /* ── Validation ──────────────────────────────────────── */
  function validate() {
    const e = {};
    if (!form.email.trim())
      e.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = 'Enter a valid email address.';
    if (!form.password)
      e.password = 'Password is required.';
    else if (form.password.length < 6)
      e.password = 'Password must be at least 6 characters.';
    return e;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: '' }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    // Simulate auth — replace with real API call later
    setTimeout(() => {
      setLoading(false);
      router.push('/dashboard');
    }, 1200);
  }

  return (
    <div className="min-h-screen flex" style={{ background: 'var(--color-bg)' }}>

      {/* ── LEFT PANEL — branding ─────────────────────── */}
      <div
        className="hidden lg:flex lg:w-[52%] flex-col justify-between p-12 relative overflow-hidden"
        style={{ background: 'var(--color-navy-900)' }}
      >
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-10"
            style={{ background: 'var(--color-accent)' }} />
          <div className="absolute top-1/2 -right-24 w-80 h-80 rounded-full opacity-5"
            style={{ background: 'var(--color-accent)' }} />
          <div className="absolute -bottom-20 left-1/4 w-64 h-64 rounded-full opacity-10"
            style={{ background: 'var(--color-accent)' }} />
          {/* Grid pattern */}
          <svg className="absolute inset-0 w-full h-full opacity-5" aria-hidden="true">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Logo */}
        <div className="relative z-10 animate-fade-in">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm"
              style={{ background: 'var(--color-accent)' }}>
              TD
            </div>
            <span className="text-white font-bold text-xl" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              T.Dev <span style={{ color: 'var(--color-accent-muted)' }}>CRM</span>
            </span>
          </div>
          <p className="text-sm" style={{ color: 'var(--color-navy-300)' }}>T.Dev University — Student Project</p>
        </div>

        {/* Center copy */}
        <div className="relative z-10 animate-fade-up">
          <h1
            className="text-4xl xl:text-5xl font-bold text-white mb-5 leading-tight"
            style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
          >
            Manage Everything<br />
            <span style={{ color: 'var(--color-accent-muted)' }}>In One Place.</span>
          </h1>
          <p className="text-base leading-relaxed mb-10" style={{ color: 'var(--color-navy-300)' }}>
            A universal CRM dashboard for customers, leads, employees, tasks, and meetings — built for modern teams.
          </p>

          {/* Feature pills */}
          <div className="flex flex-wrap gap-3">
            {['Customer Management', 'Lead Tracking', 'Task Automation', 'Team Overview', 'Analytics'].map((f) => (
              <span
                key={f}
                className="text-xs font-medium px-3 py-1.5 rounded-full border"
                style={{ borderColor: 'var(--color-navy-600)', color: 'var(--color-navy-300)' }}
              >
                {f}
              </span>
            ))}
          </div>
        </div>

        {/* Stats row */}
        <div className="relative z-10 grid grid-cols-3 gap-4 animate-fade-up delay-200">
          {[
            { value: '12K+', label: 'Active Users' },
            { value: '98%',  label: 'Uptime' },
            { value: '4.9★', label: 'Rating' },
          ].map((s) => (
            <div key={s.label} className="p-4 rounded-2xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <p className="text-2xl font-bold text-white" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{s.value}</p>
              <p className="text-xs mt-0.5" style={{ color: 'var(--color-navy-300)' }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── RIGHT PANEL — form ────────────────────────── */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 py-12 relative">

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="absolute top-6 right-6 w-9 h-9 rounded-xl flex items-center justify-center transition-colors"
          style={{ background: 'var(--color-border)', color: 'var(--color-text-muted)' }}
          aria-label="Toggle theme"
        >
          {theme === 'light' ? (
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
            </svg>
          ) : (
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <circle cx="12" cy="12" r="5"/>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
            </svg>
          )}
        </button>

        {/* Mobile logo */}
        <div className="lg:hidden flex items-center gap-2.5 mb-10">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-sm"
            style={{ background: 'var(--color-accent)' }}>
            TD
          </div>
          <span className="font-bold text-xl" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', color: 'var(--color-text)' }}>
            T.Dev <span style={{ color: 'var(--color-accent)' }}>CRM</span>
          </span>
        </div>

        {/* Card */}
        <div className="w-full max-w-md animate-fade-up">
          <div
            className="rounded-2xl p-8 shadow-sm"
            style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}
          >
            {/* Header */}
            <div className="mb-7">
              <h2
                className="text-2xl font-bold mb-1"
                style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', color: 'var(--color-text)' }}
              >
                Welcome back
              </h2>
              <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                Sign in to your T.Dev CRM account
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="email"
                  className="text-sm font-medium"
                  style={{ color: 'var(--color-text)' }}
                >
                  Email Address
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--color-text-soft)' }}>
                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                  </span>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@company.com"
                    value={form.email}
                    onChange={handleChange}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm outline-none transition-all"
                    style={{
                      background: 'var(--color-bg)',
                      border: `1.5px solid ${errors.email ? 'var(--color-danger)' : 'var(--color-border)'}`,
                      color: 'var(--color-text)',
                    }}
                    onFocus={(e) => { if (!errors.email) e.target.style.borderColor = 'var(--color-accent)'; }}
                    onBlur={(e)  => { if (!errors.email) e.target.style.borderColor = 'var(--color-border)'; }}
                  />
                </div>
                {errors.email && (
                  <p id="email-error" className="text-xs" style={{ color: 'var(--color-danger)' }} role="alert">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-sm font-medium"
                    style={{ color: 'var(--color-text)' }}
                  >
                    Password
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-xs font-medium transition-colors"
                    style={{ color: 'var(--color-accent)' }}
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--color-text-soft)' }}>
                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 11V7a5 5 0 0110 0v4"/>
                    </svg>
                  </span>
                  <input
                    id="password"
                    name="password"
                    type={showPw ? 'text' : 'password'}
                    autoComplete="current-password"
                    placeholder="••••••••"
                    value={form.password}
                    onChange={handleChange}
                    aria-invalid={!!errors.password}
                    aria-describedby={errors.password ? 'pw-error' : undefined}
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl text-sm outline-none transition-all"
                    style={{
                      background: 'var(--color-bg)',
                      border: `1.5px solid ${errors.password ? 'var(--color-danger)' : 'var(--color-border)'}`,
                      color: 'var(--color-text)',
                    }}
                    onFocus={(e) => { if (!errors.password) e.target.style.borderColor = 'var(--color-accent)'; }}
                    onBlur={(e)  => { if (!errors.password) e.target.style.borderColor = 'var(--color-border)'; }}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                    style={{ color: 'var(--color-text-soft)' }}
                    onClick={() => setShowPw((p) => !p)}
                    aria-label={showPw ? 'Hide password' : 'Show password'}
                  >
                    {showPw ? (
                      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
                      </svg>
                    ) : (
                      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                      </svg>
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p id="pw-error" className="text-xs" style={{ color: 'var(--color-danger)' }} role="alert">
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Remember me */}
              <label className="flex items-center gap-2.5 cursor-pointer select-none">
                <input type="checkbox" className="w-4 h-4 rounded accent-violet-600" />
                <span className="text-sm" style={{ color: 'var(--color-text-muted)' }}>Remember me for 30 days</span>
              </label>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl text-sm font-semibold text-white transition-all duration-150 flex items-center justify-center gap-2"
                style={{
                  background: loading ? 'var(--color-accent-muted)' : 'var(--color-accent)',
                  cursor: loading ? 'not-allowed' : 'pointer',
                }}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                    </svg>
                    Signing in…
                  </>
                ) : (
                  'Sign In'
                )}
              </button>

            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-px" style={{ background: 'var(--color-border)' }} />
              <span className="text-xs" style={{ color: 'var(--color-text-soft)' }}>or continue with</span>
              <div className="flex-1 h-px" style={{ background: 'var(--color-border)' }} />
            </div>

            {/* Social */}
            <div className="grid grid-cols-2 gap-3">
              {[
                {
                  name: 'Google',
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                  ),
                },
                {
                  name: 'Microsoft',
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                      <path fill="#F25022" d="M1 1h10v10H1z"/>
                      <path fill="#00A4EF" d="M13 1h10v10H13z"/>
                      <path fill="#7FBA00" d="M1 13h10v10H1z"/>
                      <path fill="#FFB900" d="M13 13h10v10H13z"/>
                    </svg>
                  ),
                },
              ].map(({ name, icon }) => (
                <button
                  key={name}
                  type="button"
                  className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-colors"
                  style={{
                    border: '1.5px solid var(--color-border)',
                    background: 'var(--color-bg)',
                    color: 'var(--color-text)',
                  }}
                >
                  {icon}
                  {name}
                </button>
              ))}
            </div>
          </div>

          {/* Footer note */}
          <p className="text-center text-xs mt-6" style={{ color: 'var(--color-text-soft)' }}>
            T.Dev University — CRM Dashboard Project © {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </div>
  );
}