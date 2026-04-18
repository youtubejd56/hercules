// API base selection:
// 1) VITE_API_BASE_URL if explicitly provided
// 2) local Django during `npm run dev`
// 3) Render backend fallback for deployed frontend builds
const ENV_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const DEV_BASE_URL = 'http://127.0.0.1:8000';
const PROD_FALLBACK_BASE_URL = 'https://hercules-backend-a8bu.onrender.com';
const BASE_URL = (ENV_BASE_URL || (import.meta.env.DEV ? DEV_BASE_URL : PROD_FALLBACK_BASE_URL)).replace(/\/+$/, '');

export const API_URLS = {
  testimonials: `${BASE_URL}/api/testimonials/`,
  gallery: `${BASE_URL}/api/gallery/`,
  admissions: `${BASE_URL}/api/admissions/`,
  overdue: `${BASE_URL}/api/admissions/overdue/`,
};

export default BASE_URL;
