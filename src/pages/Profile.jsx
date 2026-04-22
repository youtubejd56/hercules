import React, { useState, useEffect, useRef } from 'react';
import { getUser, clearAuth, getToken } from '../utils/auth';
import { API_URLS } from '../apiConfig';

// --- ASSET IMPORTS ---
import SquatsImg from '../assets/Barbell Squats.jpg';
import BenchImg from '../assets/Bench Press.jpg';
import DeadliftImg from '../assets/Deadlifts.jpg';
import OHPressImg from '../assets/Overhead Press.png';
import PullUpsImg from '../assets/Pull Ups.png';

// Cardio Assets
import TreadmillImg from '../assets/Treadmill Sprints.png';
import JumpingJacksImg from '../assets/Jumping Jacks.png';
import BurpeesImg from '../assets/Burpees.png';
import MntClimbersImg from '../assets/Mountain Climbers.png';
import HighKneesImg from '../assets/High Knees.png';
import BoxJumpsImg from '../assets/Box Jumps.png';
import JumpRopeImg from '../assets/Jump Rope.png';

const WORKOUTS = [
  { 
    id: 1, name: 'Full Body Strength', sessions: 24, level: 'Intermediate', img: SquatsImg,
    exercises: [
      { name: 'Barbell Squats', sets: '4 Sets', reps: '10-12 Reps', img: SquatsImg },
      { name: 'Bench Press', sets: '4 Sets', reps: '8-10 Reps', img: BenchImg },
      { name: 'Deadlifts', sets: '3 Sets', reps: '6-8 Reps', img: DeadliftImg },
      { name: 'Pull Ups', sets: '3 Sets', reps: 'Until Failure', img: PullUpsImg },
      { name: 'Overhead Press', sets: '3 Sets', reps: '10 Reps', img: OHPressImg },
      { name: 'Bent Over Rows', sets: '3 Sets', reps: '12 Reps' },
      { name: 'Barbell Curls', sets: '3 Sets', reps: '12 Reps' }
    ]
  },
  { 
    id: 2, name: 'Cardio Blast', sessions: 18, level: 'Beginner', img: TreadmillImg,
    exercises: [
      { name: 'Treadmill Sprints', sets: '5 Rounds', reps: '1 Min', img: TreadmillImg },
      { name: 'Jumping Jacks', sets: '3 Sets', reps: '50 Reps', img: JumpingJacksImg },
      { name: 'Burpees', sets: '3 Sets', reps: '15 Reps', img: BurpeesImg },
      { name: 'Mountain Climbers', sets: '4 Sets', reps: '30 Secs', img: MntClimbersImg },
      { name: 'High Knees', sets: '3 Sets', reps: '45 Secs', img: HighKneesImg },
      { name: 'Box Jumps', sets: '3 Sets', reps: '12 Reps', img: BoxJumpsImg },
      { name: 'Jump Rope', sets: '5 Sets', reps: '2 Mins', img: JumpRopeImg }
    ]
  },
  { 
    id: 3, name: 'Core & Abs', sessions: 30, level: 'All Levels', img: '/workout_core_1776847983708.png',
    exercises: [
      { name: 'Plank', sets: '3 Sets', reps: '60 Secs' },
      { name: 'Russian Twists', sets: '4 Sets', reps: '20 Reps' },
      { name: 'Leg Raises', sets: '3 Sets', reps: '15 Reps' },
      { name: 'Bicycle Crunches', sets: '3 Sets', reps: '20 Reps' },
      { name: 'Hollow Body Hold', sets: '3 Sets', reps: '45 Secs' },
      { name: 'V-Sits', sets: '3 Sets', reps: '12 Reps' },
      { name: 'Superman Hold', sets: '3 Sets', reps: '30 Secs' }
    ]
  },
  { 
    id: 4, name: 'Upper Body Power', sessions: 22, level: 'Advanced', img: '/workout_upper_body_1776848001580.png',
    exercises: [
      { name: 'Incline Bench', sets: '4 Sets', reps: '8 Reps' },
      { name: 'Weighted Dips', sets: '3 Sets', reps: '10 Reps' },
      { name: 'Dumbbell Flys', sets: '3 Sets', reps: '12 Reps' },
      { name: 'Lateral Raises', sets: '4 Sets', reps: '15 Reps' },
      { name: 'Skull Crushers', sets: '3 Sets', reps: '10 Reps' },
      { name: 'Lat Pulldowns', sets: '4 Sets', reps: '10 Reps' },
      { name: 'Face Pulls', sets: '3 Sets', reps: '15 Reps' }
    ]
  },
  { 
    id: 5, name: 'Leg Day', sessions: 20, level: 'Intermediate', img: '/workout_legs_1776848018178.png',
    exercises: [
      { name: 'Barbell Squats', sets: '4 Sets', reps: '10 Reps', img: SquatsImg },
      { name: 'Leg Press', sets: '3 Sets', reps: '12 Reps' },
      { name: 'Lunges', sets: '3 Sets', reps: '20 Steps' },
      { name: 'Leg Extensions', sets: '4 Sets', reps: '15 Reps' },
      { name: 'Hamstring Curls', sets: '4 Sets', reps: '12 Reps' },
      { name: 'Calf Raises', sets: '5 Sets', reps: '20 Reps' },
      { name: 'Sumo Deadlifts', sets: '3 Sets', reps: '8 Reps' }
    ]
  },
  { 
    id: 6, name: 'Flexibility & Yoga', sessions: 15, level: 'Beginner', img: '/workout_yoga_1776848038537.png',
    exercises: [
      { name: 'Cat-Cow Stretch', sets: '1 Set', reps: '2 Mins' },
      { name: 'Downward Dog', sets: '3 Sets', reps: '45 Secs' },
      { name: 'Warrior I & II', sets: '3 Sets', reps: '30 Secs Each' },
      { name: 'Cobra Pose', sets: '3 Sets', reps: '30 Secs' },
      { name: 'Child’s Pose', sets: '1 Set', reps: '2 Mins' },
      { name: 'Pigeon Pose', sets: '2 Sets', reps: '1 Min Each' },
      { name: 'Forward Fold', sets: '3 Sets', reps: '45 Secs' }
    ]
  },
  { 
    id: 7, name: 'HIIT Circuit', sessions: 28, level: 'Advanced', img: '/workout_hiit_1776848054104.png',
    exercises: [
      { name: 'Kettlebell Swings', sets: '4 Sets', reps: '45 Secs' },
      { name: 'Battle Ropes', sets: '4 Sets', reps: '30 Secs' },
      { name: 'Box Jumps', sets: '3 Sets', reps: '15 Reps', img: BoxJumpsImg },
      { name: 'Medicine Ball Slams', sets: '4 Sets', reps: '20 Reps' },
      { name: 'Thrusters', sets: '3 Sets', reps: '12 Reps' },
      { name: 'Plank Jacks', sets: '3 Sets', reps: '45 Secs' },
      { name: 'Bear Crawls', sets: '3 Sets', reps: '20 Meters' }
    ]
  },
  { 
    id: 8, name: 'Calisthenics Workout', sessions: 25, level: 'Intermediate', img: '/workout_calisthenics_1776848070643.png',
    exercises: [
      { name: 'Standard Push Ups', sets: '4 Sets', reps: '25 Reps' },
      { name: 'Wide Pull Ups', sets: '3 Sets', reps: 'Max Reps', img: PullUpsImg },
      { name: 'Diamond Push Ups', sets: '3 Sets', reps: '15 Reps' },
      { name: 'Chin Ups', sets: '3 Sets', reps: '10 Reps' },
      { name: 'Dips', sets: '4 Sets', reps: '15 Reps' },
      { name: 'L-Sit Hold', sets: '3 Sets', reps: '20 Secs' },
      { name: 'Muscle Ups', sets: '3 Sets', reps: '5 Reps' }
    ]
  },
];

function StepRing({ steps, goal }) {
  const pct = Math.min(steps / goal, 1);
  const circ = 2 * Math.PI * 70;
  return (
    <svg viewBox="0 0 170 170" width="150" height="150">
      <circle cx="85" cy="85" r="70" fill="none" stroke="#222" strokeWidth="10" />
      <circle cx="85" cy="85" r="70" fill="none" stroke="#a8e63d" strokeWidth="10" strokeDasharray={`${pct * circ} ${circ}`} strokeDashoffset={circ * 0.25} transform="rotate(-90 85 85)" strokeLinecap="round" />
      <text x="85" y="85" textAnchor="middle" fill="#fff" fontSize="24" fontWeight="800" dy="8">{steps.toLocaleString()}</text>
    </svg>
  );
}

export default function Profile({ onNavigate, onLogout }) {
  const user = getUser();
  const [tab, setTab]           = useState('steps');
  const [profile, setProfile]   = useState(null);
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [focusedEx, setFocusedEx]             = useState(null);

  function todayStr() { return new Date().toISOString().slice(0, 10); }

  const [seconds, setSeconds]           = useState(0);
  const [isActive, setIsActive]         = useState(false);
  const [sessionSteps, setSessionSteps] = useState(0);
  const [wSeconds, setWSeconds]         = useState(0);
  const [wIsActive, setWIsActive]       = useState(false);

  const [steps, setSteps] = useState(() => {
    const d = localStorage.getItem('gym_steps_today');
    if (!d) return { date: todayStr(), count: 0 };
    try { return JSON.parse(d); } catch { return { date: todayStr(), count: 0 }; }
  });

  const formatTime = (s) => {
    const hrs = Math.floor(s / 3600);
    const mins = Math.floor((s % 3600) / 60);
    const secs = s % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    let int = null;
    if (isActive) int = setInterval(() => {
      setSeconds(s => s + 1);
      if (Math.random() > 0.6) setSessionSteps(p => p + Math.floor(Math.random() * 3) + 1);
    }, 1000);
    return () => clearInterval(int);
  }, [isActive]);

  useEffect(() => {
    let int = null;
    if (wIsActive) int = setInterval(() => setWSeconds(s => s + 1), 1000);
    return () => clearInterval(int);
  }, [wIsActive]);

  const saveSteps = (count) => {
    const u = { date: todayStr(), count };
    setSteps(u); localStorage.setItem('gym_steps_today', JSON.stringify(u));
  };

  const closeWorkout = () => { setSelectedWorkout(null); setFocusedEx(null); setWIsActive(false); setWSeconds(0); };

  useEffect(() => {
    const token = getToken();
    if (token) fetch(API_URLS.me, { headers: { Authorization: `Token ${token}` } })
      .then(r => r.json()).then(d => setProfile(d)).catch(() => {});
  }, []);

  if (!user) return <div className="prof-empty"><button onClick={() => onNavigate('login')}>Sign In</button></div>;

  return (
    <div className="prof-page">
      {selectedWorkout && (
        <div className="workout-player">
          {!focusedEx ? (
            <>
              <div className="player-header">
                <button className="player-close" onClick={closeWorkout}>✕</button>
                <h2 className="player-title">{selectedWorkout.name}</h2>
              </div>
              <div className="player-timer-card">
                <div style={{ position: 'relative' }}>
                  <p className="p-timer-label">WORKOUT TIME</p>
                  <button className="small-reset-btn" onClick={() => setWSeconds(0)}>↺ Reset</button>
                </div>
                <div className="p-timer-val">{formatTime(wSeconds)}</div>
                <button className={`p-timer-btn ${wIsActive ? 'pause' : 'start'}`} onClick={() => setWIsActive(!wIsActive)}>
                  {wIsActive ? 'PAUSE' : (wSeconds > 0 ? 'RESUME' : 'START')}
                </button>
              </div>
              <div className="player-exercise-list">
                <h3 className="section-title">EXERCISES</h3>
                {selectedWorkout.exercises.map((ex, i) => (
                  <div key={i} className="player-exercise-item-premium" onClick={() => setFocusedEx(ex)}>
                    <div className="ex-img-wrap">{ex.img ? <img src={ex.img} className="ex-img" /> : <div className="ex-placeholder">🔥</div>}</div>
                    <div className="ex-info"><p className="ex-name">{ex.name}</p><p className="ex-meta">{ex.sets} · {ex.reps}</p></div>
                  </div>
                ))}
              </div>
              <button className="player-finish-btn" onClick={closeWorkout}>FINISH SESSION</button>
            </>
          ) : (
            <div className="focus-mode">
              <div className="focus-top-img">
                <button className="focus-back" onClick={() => setFocusedEx(null)}>✕ BACK</button>
                {focusedEx.img ? <img src={focusedEx.img} className="focus-img" /> : <div className="focus-placeholder-main">⚡</div>}
              </div>
              <div className="focus-timer-section">
                <div style={{ position: 'relative' }}>
                  <button className="small-reset-btn focus" onClick={() => setWSeconds(0)}>↺ Reset</button>
                  <div className="focus-timer-val">{formatTime(wSeconds)}</div>
                </div>
                <button className={`focus-timer-btn ${wIsActive ? 'pause' : 'start'}`} onClick={() => setWIsActive(!wIsActive)}>
                  {wIsActive ? 'PAUSE' : 'RESUME'}
                </button>
              </div>
              <div className="focus-details">
                <h2 className="focus-ex-name">{focusedEx.name}</h2>
                <div className="focus-stats">
                  <div className="f-stat"><span className="f-l">SETS</span><span className="f-v">{focusedEx.sets}</span></div>
                  <div className="f-stat-div" />
                  <div className="f-stat"><span className="f-l">REPS</span><span className="f-v">{focusedEx.reps}</span></div>
                </div>
              </div>
              <button className="focus-complete-btn" onClick={() => setFocusedEx(null)}>NEXT EXERCISE</button>
            </div>
          )}
        </div>
      )}

      <div className="prof-hero">
        <div className="prof-avatar">{user.username?.[0]?.toUpperCase()}</div>
        <div className="prof-info-stack"><h2 className="prof-username">{user.username}</h2></div>
        <button className="prof-logout-btn" onClick={onLogout}>⏻</button>
      </div>

      <div className="prof-tabs">
        {[{ id: 'steps', label: '👣 Steps' }, { id: 'workouts', label: '🏋️ Workouts' }].map(t => (
          <button key={t.id} className={`prof-tab ${tab === t.id ? 'active' : ''}`} onClick={() => setTab(t.id)}>{t.label}</button>
        ))}
      </div>

      <div className="prof-content">
        {tab === 'steps' && (
          <div className="prof-section">
            <div className="prof-card live-session-card">
              <div className="live-header"><span className="live-dot" /><h3>LIVE STEP SESSION</h3><button className="small-reset-btn mini" onClick={() => setSeconds(0)}>↺ Reset</button></div>
              <div className="stopwatch-display">{formatTime(seconds)}</div>
              <div className="live-controls"><button className={`live-btn ${isActive ? 'pause' : 'start'}`} onClick={() => setIsActive(!isActive)}>{isActive ? 'PAUSE' : 'START'}</button></div>
            </div>
            <div className="prof-card steps-card"><StepRing steps={steps.count} goal={8500} /></div>
          </div>
        )}

        {tab === 'workouts' && (
          <div className="prof-section">
            <div className="workouts-list">
              {WORKOUTS.map(w => (
                <div key={w.id} className="workout-item-premium" onClick={() => setSelectedWorkout(w)}>
                  <div className="workout-img-wrap"><img src={w.img} className="workout-img" /><div className="workout-img-overlay" /></div>
                  <div className="workout-info-premium"><p className="workout-name">{w.name}</p><p className="workout-meta">{w.sessions} sessions · {w.level}</p></div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
