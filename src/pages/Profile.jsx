import React, { useState, useEffect, useRef } from 'react';
import { getUser, clearAuth, getToken } from '../utils/auth';
import { API_URLS } from '../apiConfig';

// --- ASSET IMPORTS ---
import SquatsImg from '../assets/Barbell Squats.jpg';
import BenchImg from '../assets/Bench Press.jpg';
import DeadliftImg from '../assets/Deadlifts.jpg';
import OHPressImg from '../assets/Overhead Press.png';
import PullUpsImg from '../assets/Pull Ups.png';
import BentOverRowsImg from '../assets/Bent Over Rows.png';
import BarbellCurlsImg from '../assets/Barbell Curls.png';

// Cardio Assets
import TreadmillImg from '../assets/Treadmill Sprints.png';
import JumpingJacksImg from '../assets/Jumping Jacks.png';
import BurpeesImg from '../assets/Burpees.png';
import MntClimbersImg from '../assets/Mountain Climbers.png';
import HighKneesImg from '../assets/High Knees.png';
import BoxJumpsImg from '../assets/Box Jumps.png';
import JumpRopeImg from '../assets/Jump Rope.png';

// Core Assets
import PlankImg from '../assets/Plank.png';
import RussianTwistsImg from '../assets/Russian Twists.png';
import LegRaisesImg from '../assets/Leg Raises.png';
import BicycleCrunchesImg from '../assets/Bicycle Crunches.png';
import HollowBodyHoldImg from '../assets/Hollow Body Hold.png';
import VSitsImg from '../assets/V-Sits.png';
import SupermanHoldImg from '../assets/Superman Hold.png';

//Upper Body Power
import InclineBenchImg from '../assets/Incline Bench.png';
import WeightedDipsImg from '../assets/Weighted Dips.png';
import DumbbellFlysImg from '../assets/Dumbbell Fly.png';
import LateralRaisesImg from '../assets/Lateral Raises.png';
import SkullCrushersImg from '../assets/Skull Crushers.png';
import LatPulldownsImg from '../assets/Lat Pulldowns.png';
import FacePullsImg from '../assets/Face Pulls.png';

// Leg Day Assets
import LegPressImg from '../assets/Leg Press.png';
import LungesImg from '../assets/Lunges.png';
import LegExtensionsImg from '../assets/Leg Extensions.png';
import HamstringCurlsImg from '../assets/Hamstring Curls.png';
import CalfRaisesImg from '../assets/Calf Raises.png';
import SumoDeadliftsImg from '../assets/Sumo Deadlifts.png';

// Yoga Assets
import CatCowImg from '../assets/Cat-Cow Stretch.png';
import DownwardDogImg from '../assets/Downward Dog.png';
import WarriorImg from '../assets/Warrior I & II.png';
import CobraImg from '../assets/Cobra Pose.png';
import ChildsPoseImg from '../assets/Child’s Pose.png';
import PigeonImg from '../assets/Pigeon Pose.png';
import ForwardFoldImg from '../assets/Forward Fold.png';

// HIIT Assets
import KettlebellImg from '../assets/Kettlebell Swings.png';
import BattleRopesImg from '../assets/Battle Ropes.png';
import MedBallSlamsImg from '../assets/Medicine Ball Slams.png';
import ThrustersImg from '../assets/Thrusters.png';
import PlankJacksImg from '../assets/Plank Jacks.png';
import BearCrawlsImg from '../assets/Bear Crawls.png';

// Calisthenics Assets
import StdPushUpsImg from '../assets/Standard Push Ups.png';
import DiamondPushUpsImg from '../assets/Diamond Push Ups.png';
import ChinUpsImg from '../assets/Chin Ups.png';
import DipsImg from '../assets/Dips.png';
import LSitHoldImg from '../assets/L-Sit Hold.png';
import MuscleUpsImg from '../assets/Muscle Ups.png';


const WORKOUTS = [
  {
    id: 1, name: 'Full Body Strength', sessions: 24, level: 'Intermediate', img: SquatsImg,
    exercises: [
      { name: 'Barbell Squats', sets: '4 Sets', reps: '10-12 Reps', img: SquatsImg },
      { name: 'Bench Press', sets: '4 Sets', reps: '8-10 Reps', img: BenchImg },
      { name: 'Deadlifts', sets: '3 Sets', reps: '6-8 Reps', img: DeadliftImg },
      { name: 'Pull Ups', sets: '3 Sets', reps: 'Until Failure', img: PullUpsImg },
      { name: 'Overhead Press', sets: '3 Sets', reps: '10 Reps', img: OHPressImg },
      { name: 'Bent Over Rows', sets: '3 Sets', reps: '12 Reps', img: BentOverRowsImg },
      { name: 'Barbell Curls', sets: '3 Sets', reps: '12 Reps', img: BarbellCurlsImg },
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
    id: 3, name: 'Core & Abs', sessions: 30, level: 'All Levels', img: PlankImg,
    exercises: [
      { name: 'Plank', sets: '3 Sets', reps: '60 Secs', img: PlankImg },
      { name: 'Russian Twists', sets: '4 Sets', reps: '20 Reps', img: RussianTwistsImg },
      { name: 'Leg Raises', sets: '3 Sets', reps: '15 Reps', img: LegRaisesImg },
      { name: 'Bicycle Crunches', sets: '3 Sets', reps: '20 Reps', img: BicycleCrunchesImg },
      { name: 'Hollow Body Hold', sets: '3 Sets', reps: '45 Secs', img: HollowBodyHoldImg },
      { name: 'V-Sits', sets: '3 Sets', reps: '12 Reps', img: VSitsImg },
      { name: 'Superman Hold', sets: '3 Sets', reps: '30 Secs', img: SupermanHoldImg }
    ]
  },
  {
    id: 4, name: 'Upper Body Power', sessions: 22, level: 'Advanced', img: InclineBenchImg,
    exercises: [
      { name: 'Incline Bench', sets: '4 Sets', reps: '8 Reps', img: InclineBenchImg },
      { name: 'Weighted Dips', sets: '3 Sets', reps: '10 Reps', img: WeightedDipsImg },
      { name: 'Dumbbell Flys', sets: '3 Sets', reps: '12 Reps', img: DumbbellFlysImg },
      { name: 'Lateral Raises', sets: '4 Sets', reps: '15 Reps', img: LateralRaisesImg },
      { name: 'Skull Crushers', sets: '3 Sets', reps: '10 Reps', img: SkullCrushersImg },
      { name: 'Lat Pulldowns', sets: '4 Sets', reps: '10 Reps', img: LatPulldownsImg },
      { name: 'Face Pulls', sets: '3 Sets', reps: '15 Reps', img: FacePullsImg }
    ]
  },
  {
    id: 5, name: 'Leg Day', sessions: 20, level: 'Intermediate', img: LegPressImg,
    exercises: [
      { name: 'Barbell Squats', sets: '4 Sets', reps: '10 Reps', img: SquatsImg },
      { name: 'Leg Press', sets: '3 Sets', reps: '12 Reps', img: LegPressImg },
      { name: 'Lunges', sets: '3 Sets', reps: '20 Steps', img: LungesImg },
      { name: 'Leg Extensions', sets: '4 Sets', reps: '15 Reps', img: LegExtensionsImg },
      { name: 'Hamstring Curls', sets: '4 Sets', reps: '12 Reps', img: HamstringCurlsImg },
      { name: 'Calf Raises', sets: '5 Sets', reps: '20 Reps', img: CalfRaisesImg },
      { name: 'Sumo Deadlifts', sets: '3 Sets', reps: '8 Reps', img: SumoDeadliftsImg }
    ]
  },
  {
    id: 6, name: 'Flexibility & Yoga', sessions: 15, level: 'Beginner', img: WarriorImg,
    exercises: [
      { name: 'Cat-Cow Stretch', sets: '1 Set', reps: '2 Mins', img: CatCowImg },
      { name: 'Downward Dog', sets: '3 Sets', reps: '45 Secs', img: DownwardDogImg },
      { name: 'Warrior I & II', sets: '3 Sets', reps: '30 Secs Each', img: WarriorImg },
      { name: 'Cobra Pose', sets: '3 Sets', reps: '30 Secs', img: CobraImg },
      { name: 'Child’s Pose', sets: '1 Set', reps: '2 Mins', img: ChildsPoseImg },
      { name: 'Pigeon Pose', sets: '2 Sets', reps: '1 Min Each', img: PigeonImg },
      { name: 'Forward Fold', sets: '3 Sets', reps: '45 Secs', img: ForwardFoldImg }
    ]
  },
  {
    id: 7, name: 'HIIT Circuit', sessions: 28, level: 'Advanced', img: KettlebellImg,
    exercises: [
      { name: 'Kettlebell Swings', sets: '4 Sets', reps: '45 Secs', img: KettlebellImg },
      { name: 'Battle Ropes', sets: '4 Sets', reps: '30 Secs', img: BattleRopesImg },
      { name: 'Box Jumps', sets: '3 Sets', reps: '15 Reps', img: BoxJumpsImg },
      { name: 'Medicine Ball Slams', sets: '4 Sets', reps: '20 Reps', img: MedBallSlamsImg },
      { name: 'Thrusters', sets: '3 Sets', reps: '12 Reps', img: ThrustersImg },
      { name: 'Plank Jacks', sets: '3 Sets', reps: '45 Secs', img: PlankJacksImg },
      { name: 'Bear Crawls', sets: '3 Sets', reps: '20 Meters', img: BearCrawlsImg }
    ]
  },
  {
    id: 8, name: 'Calisthenics Workout', sessions: 25, level: 'Intermediate', img: PullUpsImg,
    exercises: [
      { name: 'Standard Push Ups', sets: '4 Sets', reps: '25 Reps', img: StdPushUpsImg },
      { name: 'Wide Pull Ups', sets: '3 Sets', reps: 'Max Reps', img: PullUpsImg },
      { name: 'Diamond Push Ups', sets: '3 Sets', reps: '15 Reps', img: DiamondPushUpsImg },
      { name: 'Chin Ups', sets: '3 Sets', reps: '10 Reps', img: ChinUpsImg },
      { name: 'Dips', sets: '4 Sets', reps: '15 Reps', img: DipsImg },
      { name: 'L-Sit Hold', sets: '3 Sets', reps: '20 Secs', img: LSitHoldImg },
      { name: 'Muscle Ups', sets: '3 Sets', reps: '5 Reps', img: MuscleUpsImg }
    ]
  },
];

const DIET_PLANS = [
  {
    id: 1,
    name: "Hypertrophy Catalyst Pro",
    tag: "Pro Bulking",
    calories: "2,900 - 3,300",
    protein: "190g",
    aiDescription: "Optimized for myofibrillar hypertrophy through strategic glycogen loading and high-bioavailability amino acid timing.",
    color: "#ff3e3e",
    meals: [
      { time: "Breakfast", food: "4 Whole Eggs, 1 cup Oats with Milk & Berries", cal: 650 },
      { time: "Lunch", food: "200g Grilled Chicken, 1.5 cups Brown Rice, Broccoli", cal: 750 },
      { time: "Pre-Workout", food: "Whey Protein Shake, 1 Banana, 20g Peanut Butter", cal: 400 },
      { time: "Dinner", food: "200g Lean Beef or Salmon, Sweet Potato, Asparagus", cal: 800 }
    ],
    tips: [
      "Prioritize 8 hours of sleep for recovery",
      "Drink 4L+ water to maintain hydration",
      "Ensure progressive overload in your lifts"
    ]
  },
  {
    id: 2,
    name: "Metabolic Lean Protocol",
    tag: "Elite Shred",
    calories: "1,900 - 2,100",
    protein: "175g",
    aiDescription: "Advanced metabolic phasing designed to maximize fat oxidation while utilizing protein-sparing modified fast principles to protect muscle density.",
    color: "#a8e63d",
    meals: [
      { time: "08:00 AM", food: "5 Egg Whites, 1/2 Avocado, 30g Steel Cut Oats", cal: 420 },
      { time: "12:30 PM", food: "180g Wild Caught Tuna, Large Kale & Spinach Salad, Apple Cider Vinaigrette", cal: 480 },
      { time: "04:00 PM", food: "1 Scoop Isolate Whey, 15g Walnut Halves", cal: 220 },
      { time: "08:00 PM", food: "200g White Fish or Lean Turkey, Steamed Asparagus, Lemon Garnish", cal: 520 }
    ],
    tips: [
      "Maintain a 10,000+ step baseline to optimize non-exercise thermogenesis (NEAT)",
      "Utilize cold-pressed green tea for natural metabolic enhancement",
      "Prioritize high-fiber cruciferous vegetables for hormonal balance and satiety"
    ]
  },
  {
    id: 3,
    name: "Ketogenic Endurance Matrix",
    tag: "Peak Performance",
    calories: "2,300 - 2,600",
    protein: "150g",
    aiDescription: "Precision fat-to-protein ratios designed to maintain nutritional ketosis while fueling high-output endurance and metabolic flexibility.",
    color: "#3d9ae6",
    meals: [
      { time: "Breakfast", food: "Coffee with 1tbsp MCT Oil, 3 Bacon Strips", cal: 450 },
      { time: "Lunch", food: "Chicken Thighs with Skin, 1/2 Avocado, Leafy Greens", cal: 650 },
      { time: "Snack", food: "String Cheese, 5 Walnuts", cal: 250 },
      { time: "Dinner", food: "Fatty Steak, Asparagus with Butter & Garlic", cal: 750 }
    ],
    tips: [
      "Monitor electrolyte intake (Sodium/Magnesium)",
      "Test ketone levels if performance drops",
      "Focus on low-carb fiber sources"
    ]
  }
];

function StepRing({ steps = 0, goal = 8500 }) {
  const currentSteps = Number(steps) || 0;
  const pct = Math.min(currentSteps / goal, 1);
  const circ = 2 * Math.PI * 70;
  return (
    <svg viewBox="0 0 170 170" width="150" height="150">
      <circle cx="85" cy="85" r="70" fill="none" stroke="#222" strokeWidth="10" />
      <circle cx="85" cy="85" r="70" fill="none" stroke="#a8e63d" strokeWidth="10" strokeDasharray={`${pct * circ} ${circ}`} strokeDashoffset={circ * 0.25} transform="rotate(-90 85 85)" strokeLinecap="round" />
      <text x="85" y="85" textAnchor="middle" fill="#fff" fontSize="24" fontWeight="800" dy="8">{currentSteps.toLocaleString()}</text>
    </svg>
  );
}

export default function Profile({ onNavigate, onLogout }) {
  const user = getUser();
  const [tab, setTab] = useState('steps');
  const [profile, setProfile] = useState(null);
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [selectedDiet, setSelectedDiet] = useState(null);
  const [focusedEx, setFocusedEx] = useState(null);

  function todayStr() { return new Date().toISOString().slice(0, 10); }

  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [sessionSteps, setSessionSteps] = useState(0);
  const [wSeconds, setWSeconds] = useState(0);
  const [wIsActive, setWIsActive] = useState(false);

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

  const finishSession = () => {
    const totalCount = (steps?.count || 0) + sessionSteps;
    saveSteps(totalCount);
    setSessionSteps(0);
    setSeconds(0);
    setIsActive(false);
  };

  useEffect(() => {
    const token = getToken();
    if (token) fetch(API_URLS.me, { headers: { Authorization: `Token ${token}` } })
      .then(r => r.json()).then(d => setProfile(d)).catch(() => { });
  }, []);

  if (!user) return <div className="prof-empty"><button onClick={() => onNavigate('login')}>Sign In</button></div>;

  return (
    <div className="prof-page">
      {selectedDiet && (
        <div className="diet-overlay">
          <div className="diet-modal">
            <div className="modal-header">
              <button className="modal-close" onClick={() => setSelectedDiet(null)}>✕</button>
              <div className="diet-tag-large" style={{ backgroundColor: `${selectedDiet.color}22`, color: selectedDiet.color }}>{selectedDiet.tag}</div>
              <h2 className="modal-title">{selectedDiet.name}</h2>
            </div>

            <div className="modal-scrollable">
              <div className="ai-summary-card">
                <div className="ai-sparkle">✨ AI ANALYSIS</div>
                <p>{selectedDiet.aiDescription}</p>
                <div className="summary-stats">
                  <div className="s-stat"><span>Daily Cals</span><strong>{selectedDiet.calories}</strong></div>
                  <div className="s-stat"><span>Target Protein</span><strong>{selectedDiet.protein}</strong></div>
                </div>
              </div>

              <div className="diet-section-label">FULL DAY MEAL PLAN</div>
              <div className="meal-list">
                {selectedDiet.meals.map((meal, idx) => (
                  <div key={idx} className="meal-item">
                    <div className="meal-time">{meal.time}</div>
                    <div className="meal-content">
                      <p className="meal-food">{meal.food}</p>
                      <span className="meal-cal">~{meal.cal} kcal</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="diet-section-label">EXPERT TIPS & KNOWLEDGE</div>
              <div className="tips-list">
                {selectedDiet.tips.map((tip, idx) => (
                  <div key={idx} className="tip-item">
                    <div className="tip-bullet" style={{ backgroundColor: selectedDiet.color }} />
                    <p className="tip-text">{tip}</p>
                  </div>
                ))}
              </div>

              <div className="consultation-box">
                <p className="consult-text">Want a personalized plan? Chat with our head coach directly.</p>
                <a
                  href={`https://wa.me/919747769945?text=Hello Coach, I'm interested in the ${selectedDiet.name} diet plan. Can you give me more advice?`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="whatsapp-consult-btn"
                >
                  <span className="wa-icon">💬</span> CHAT WITH COACH
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

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
            <div className="prof-card live-session-card premium-steps">
              <div className="live-header">
                <div className="live-status">
                  <span className="live-dot" />
                  <h3>LIVE TRACKING</h3>
                </div>
                <button className="small-reset-btn mini" onClick={() => { setSeconds(0); setSessionSteps(0); }}>↺ Reset</button>
              </div>

              <div className="live-main-stat">
                <div className="stopwatch-display">{formatTime(seconds)}</div>
                <div className="session-step-count">
                  <span className="s-val">{sessionSteps.toLocaleString()}</span>
                  <span className="s-lab">STEPS THIS SESSION</span>
                </div>
              </div>

              <div className="live-metrics-grid">
                <div className="m-item">
                  <span className="m-icon">🔥</span>
                  <span className="m-val">{(sessionSteps * 0.045).toFixed(1)}</span>
                  <span className="m-lab">KCAL</span>
                </div>
                <div className="m-item">
                  <span className="m-icon">📍</span>
                  <span className="m-val">{(sessionSteps * 0.00078).toFixed(2)}</span>
                  <span className="m-lab">KM</span>
                </div>
                <div className="m-item">
                  <span className="m-icon">⚡</span>
                  <span className="m-val">{seconds > 0 ? Math.round((sessionSteps / seconds) * 60) : 0}</span>
                  <span className="m-lab">SPM</span>
                </div>
              </div>

              <div className="live-controls">
                <button className={`live-btn ${isActive ? 'pause' : 'start'}`} onClick={() => setIsActive(!isActive)}>
                  {isActive ? 'PAUSE' : 'START SESSION'}
                </button>
                {sessionSteps > 0 && (
                  <button className="live-btn finish" onClick={() => finishSession()}>FINISH & SAVE</button>
                )}
              </div>
            </div>

            <div className="prof-card steps-card">
              <div className="daily-goal-header">
                <h4>DAILY PROGRESS</h4>
                <p>{Math.round((steps.count / 8500) * 100)}% OF GOAL</p>
              </div>
              <StepRing steps={steps.count} goal={8500} />
            </div>

            <div className="diet-section">
              <div className="section-header">
                <h3 className="section-title">AI DIET RECOMMENDATIONS</h3>
                <span className="ai-badge">AI POWERED</span>
              </div>
              <div className="diet-list">
                {DIET_PLANS.map(plan => (
                  <div key={plan.id} className="diet-card-premium clickable" onClick={() => setSelectedDiet(plan)}>
                    <div className="diet-card-top">
                      <div className="diet-tag" style={{ backgroundColor: `${plan.color}22`, color: plan.color }}>{plan.tag}</div>
                      <h4 className="diet-name">{plan.name}</h4>
                    </div>
                    <div className="diet-stats-mini">
                      <div className="d-stat-mini"><span>CAL</span><strong>{plan.calories}</strong></div>
                      <div className="d-stat-mini"><span>PRO</span><strong>{plan.protein}</strong></div>
                    </div>
                    <div className="ai-description-box">
                      <div className="ai-sparkle">✨</div>
                      <p className="ai-text">{plan.aiDescription}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
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
