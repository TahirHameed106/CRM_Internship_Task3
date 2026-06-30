'use client';
// src/app/forgot-password/page.jsx

import { useState } from 'react';
import Link from 'next/link';
import { useTheme } from '@/context/ThemeContext';

export default function ForgotPasswordPage() {
  const { theme, toggleTheme } = useTheme();
  const [email,     setEmail]     = useState('');
  const [error,     setError]     = useState('');
  const [loading,   setLoading]   = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function validate() {
    if (!email.trim()) return 'Email is required.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Enter a valid email address.';
    return '';
  }

  function handleSubmit(e) {
    e.preventDefault();
    const err = validate();
    if (err) { setError(err); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 1200);
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-12 relative"
      style={{ background: 'var(--color-bg)' }}
    >
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

      {/* Logo */}
      <Link href="/login" className="flex items-center gap-2.5 mb-8 animate-fade-in">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-sm"
          style={{ background: 'var(--color-accent)' }}
        >
          TD
        </div>
        <span
          className="font-bold text-xl"
          style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', color: 'var(--color-text)' }}
        >
          T.Dev <span style={{ color: 'var(--color-accent)' }}>CRM</span>
        </span>
      </Link>

      {/* Card */}
      <div
        className="w-full max-w-md rounded-2xl p-8 shadow-sm animate-fade-up"
        style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}
      >
        {!submitted ? (
          <>
            {/* Icon */}
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6"
              style={{ background: 'var(--color-accent-soft)' }}
            >
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}
                style={{ color: 'var(--color-accent)' }} aria-hidden="true">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 11V7a5 5 0 0110 0v4"/>
              </svg>
            </div>

            <h1
              className="text-2xl font-bold text-center mb-2"
              style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', color: 'var(--color-text)' }}
            >
              Forgot Password?
            </h1>
            <p className="text-sm text-center mb-7" style={{ color: 'var(--color-text-muted)' }}>
              No worries. Enter your email and we&apos;ll send you a reset link.
            </p>

            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="reset-email"
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
                    id="reset-email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@company.com"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setError(''); }}
                    aria-invalid={!!error}
                    aria-describedby={error ? 'email-err' : undefined}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm outline-none transition-all"
                    style={{
                      background: 'var(--color-bg)',
                      border: `1.5px solid ${error ? 'var(--color-danger)' : 'var(--color-border)'}`,
                      color: 'var(--color-text)',
                    }}
                    onFocus={(e) => { if (!error) e.target.style.borderColor = 'var(--color-accent)'; }}
                    onBlur={(e)  => { if (!error) e.target.style.borderColor = 'var(--color-border)'; }}
                  />
                </div>
                {error && (
                  <p id="email-err" className="text-xs" style={{ color: 'var(--color-danger)' }} role="alert">
                    {error}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl text-sm font-semibold text-white transition-all flex items-center justify-center gap-2"
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
                    Sending…
                  </>
                ) : (
                  'Send Reset Link'
                )}
              </button>
            </form>
          </>
        ) : (
          /* ── Success state ─────────────────────────── */
          <div className="text-center animate-fade-up">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
              style={{ background: '#D1FAE5' }}
            >
              <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                style={{ color: 'var(--color-success)' }} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
              </svg>
            </div>
            <h2
              className="text-xl font-bold mb-2"
              style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', color: 'var(--color-text)' }}
            >
              Check your email
            </h2>
            <p className="text-sm mb-2" style={{ color: 'var(--color-text-muted)' }}>
              We sent a password reset link to
            </p>
            <p className="text-sm font-semibold mb-6" style={{ color: 'var(--color-accent)' }}>
              {email}
            </p>
            <p className="text-xs mb-6" style={{ color: 'var(--color-text-soft)' }}>
              Didn&apos;t receive it?{' '}
              <button
                onClick={() => { setSubmitted(false); }}
                className="font-medium underline"
                style={{ color: 'var(--color-accent)' }}
              >
                Try again
              </button>
            </p>
          </div>
        )}

        {/* Back to login */}
        <div className="mt-6 text-center">
          <Link
            href="/login"
            className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors"
            style={{ color: 'var(--color-text-muted)' }}
          >
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Back to Sign In
          </Link>
        </div>
      </div>

      <p className="text-center text-xs mt-6" style={{ color: 'var(--color-text-soft)' }}>
        T.Dev University — CRM Dashboard Project © {new Date().getFullYear()}
      </p>
    </div>
  );
}