import React, { useState } from 'react';
import { API_URLS } from '../apiConfig';
import { saveAuth } from '../utils/auth';

const STEPS = ['gender', 'goal', 'account'];
const TOTAL = STEPS.length;

const GENDERS = [
  { value: 'male',   label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other',  label: 'Other' },
];

const GOALS = [
  { value: 'lose_fat',     label: 'Lose Fat' },
  { value: 'build_muscle', label: 'Build Lean Muscle' },
  { value: 'learn_body',   label: 'Learn About My Body' },
];

export default function Register({ onNavigate, onLoginSuccess }) {
  const [step, setStep]   = useState(0);
  const [form, setForm]   = useState({
    gender: '', goal: '', username: '', phone: '', password: '', confirm: '',
  });
  const [error, setError]   = useState('');
  const [loading, setLoading] = useState(false);

  const progress = ((step + 1) / TOTAL) * 100;

  const pick = (field, value) =>
    setForm((p) => ({ ...p, [field]: value }));

  const handleChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const next = () => {
    setError('');
    if (step === 0 && !form.gender) { setError('Please select your gender.'); return; }
    if (step === 1 && !form.goal)   { setError('Please select your goal.');   return; }
    setStep((s) => Math.min(s + 1, TOTAL - 1));
  };

  const back = () => { setError(''); setStep((s) => Math.max(s - 1, 0)); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!/^\d{10}$/.test(form.phone)) { setError('Phone number must be exactly 10 digits.'); return; }
    if (form.password.length < 8) { setError('Password must be at least 8 characters.'); return; }
    if (form.password !== form.confirm) { setError('Passwords do not match.'); return; }

    setLoading(true);
    try {
      const res = await fetch(API_URLS.register, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: form.username,
          phone:    form.phone,
          password: form.password,
          gender:   form.gender,
          goal:     form.goal,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        const msg =
          data?.username?.[0] ||
          data?.password?.[0] ||
          data?.error ||
          'Registration failed.';
        setError(msg);
      } else {
        saveAuth(data.token, data.user);
        onLoginSuccess && onLoginSuccess(data.user);
        onNavigate('profile');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card register-card">
        {/* Header with back + progress */}
        <div className="onboard-header">
          {step > 0 ? (
            <button id="register-back-btn" className="onboard-back" onClick={back}>
              ‹
            </button>
          ) : (
            <button
              id="register-cancel-btn"
              className="onboard-back"
              onClick={() => onNavigate('login')}
            >
              ‹
            </button>
          )}
          <div className="onboard-progress-bar">
            <div
              className="onboard-progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {error && <div className="auth-error">{error}</div>}

        {/* ── Step 0: Gender ── */}
        {step === 0 && (
          <div className="onboard-step">
            <h2 className="onboard-question">What is your gender?</h2>
            <div className="onboard-options">
              {GENDERS.map(({ value, label }) => (
                <button
                  key={value}
                  id={`gender-${value}-btn`}
                  className={`onboard-option ${form.gender === value ? 'selected' : ''}`}
                  onClick={() => pick('gender', value)}
                  type="button"
                >
                  <span className="onboard-radio">
                    {form.gender === value && <span className="onboard-radio-dot" />}
                  </span>
                  {label}
                </button>
              ))}
            </div>
            <button
              id="gender-next-btn"
              className="auth-btn primary onboard-next"
              onClick={next}
              type="button"
            >
              Next
            </button>
          </div>
        )}

        {/* ── Step 1: Goal ── */}
        {step === 1 && (
          <div className="onboard-step">
            <h2 className="onboard-question">What is your main goal?</h2>
            <div className="onboard-options">
              {GOALS.map(({ value, label }) => (
                <button
                  key={value}
                  id={`goal-${value}-btn`}
                  className={`onboard-option ${form.goal === value ? 'selected' : ''}`}
                  onClick={() => pick('goal', value)}
                  type="button"
                >
                  <span className="onboard-radio">
                    {form.goal === value && <span className="onboard-radio-dot" />}
                  </span>
                  {label}
                </button>
              ))}
            </div>
            <button
              id="goal-next-btn"
              className="auth-btn primary onboard-next"
              onClick={next}
              type="button"
            >
              Next
            </button>
          </div>
        )}

        {/* ── Step 2: Account Details ── */}
        {step === 2 && (
          <div className="onboard-step">
            <h2 className="onboard-question">Create your account</h2>
            <form onSubmit={handleSubmit} className="auth-form">
              <div className="auth-field">
                <label htmlFor="reg-username">Username *</label>
                <input
                  id="reg-username"
                  name="username"
                  type="text"
                  placeholder="Choose a username"
                  value={form.username}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="auth-field">
                <label htmlFor="reg-phone">Phone *</label>
                <input
                  id="reg-phone"
                  name="phone"
                  type="tel"
                  placeholder="10 digit mobile number"
                  value={form.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="auth-field">
                <label htmlFor="reg-password">Password *</label>
                <input
                  id="reg-password"
                  name="password"
                  type="password"
                  placeholder="Min. 8 characters"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="auth-field">
                <label htmlFor="reg-confirm">Confirm Password *</label>
                <input
                  id="reg-confirm"
                  name="confirm"
                  type="password"
                  placeholder="Repeat password"
                  value={form.confirm}
                  onChange={handleChange}
                  required
                />
              </div>
              <button
                id="register-submit-btn"
                type="submit"
                className="auth-btn primary"
                disabled={loading}
              >
                {loading ? <span className="auth-spinner" /> : 'Create Account'}
              </button>
            </form>
          </div>
        )}

        {step === 0 && (
          <p className="auth-switch">
            Already have an account?{' '}
            <button
              id="goto-login-btn"
              className="auth-link-btn"
              onClick={() => onNavigate('login')}
            >
              Sign in
            </button>
          </p>
        )}
      </div>
    </div>
  );
}
