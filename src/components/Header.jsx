import React, { useState } from 'react';
import logo from '../assets/Logo a.jpg.jpeg';

export default function Header({ currentPage, setCurrentPage, authUser, onLogout }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'trainers', label: 'Trainers' },
    { id: 'admission', label: 'Admission' },
    { id: 'gallery', label: 'Gallery' },
  ];

  const handleNavigate = (page) => {
    setCurrentPage(page);
    setIsMenuOpen(false);
  };

  return (
    <nav className="flex justify-between items-center py-4 px-6 md:px-12 bg-dark/80 backdrop-blur-md sticky top-0 z-[100] border-b border-white/5">
      {/* Logo Section */}
      <div className="flex items-center gap-3 text-lg md:text-xl font-extrabold uppercase tracking-widest text-white cursor-pointer" onClick={() => handleNavigate('home')}>
        <img src={logo} alt="Hercules Gym Logo" className="w-10 h-10 md:w-12 md:h-12 object-cover rounded-full border-2 border-primary shadow-[0_0_15px_rgba(255,62,62,0.3)]" />
        <span>Hercules<span className="text-primary">GYMPALA</span></span>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex gap-2 items-center">
        {navLinks.map((link) => (
          <button
            key={link.id}
            className={`px-4 py-2 rounded-md font-semibold text-sm transition-all duration-300 ${currentPage === link.id ? 'text-primary' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
            onClick={() => handleNavigate(link.id)}
          >
            {link.label}
          </button>
        ))}
        <button
          className={`ml-4 px-5 py-2 border border-white/20 rounded-lg font-bold text-xs uppercase tracking-tighter transition-all duration-300 ${currentPage === 'admin' ? 'border-primary text-primary bg-primary/10' : 'text-gray-400 hover:text-white hover:border-white/40 hover:bg-white/5'}`}
          onClick={() => handleNavigate('admin')}
        >
          Admin
        </button>

        {/* Auth Controls */}
        {authUser ? (
          <div className="ml-4 flex items-center gap-2">
            <div className="header-user-chip" style={{ cursor: 'pointer' }}
              onClick={() => handleNavigate('profile')}
              title="View profile"
            >
              <span className="header-user-avatar">{authUser.username?.[0]?.toUpperCase()}</span>
              <span className="header-user-name">{authUser.username}</span>
            </div>
            <button
              id="header-logout-btn"
              className="header-logout-btn"
              onClick={onLogout}
              title="Sign out"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <button
            id="header-signin-btn"
            className="ml-4 px-5 py-2 bg-lime rounded-lg font-bold text-xs uppercase tracking-wide text-black transition-all duration-300 hover:opacity-90 hover:scale-105"
            onClick={() => handleNavigate('login')}
          >
            Sign In
          </button>
        )}
      </div>

      {/* Mobile Toggle Button */}
      <button 
        className="md:hidden p-2 text-gray-400 hover:text-white transition-colors"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        ) : (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
        )}
      </button>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-card/95 backdrop-blur-xl border-b border-white/10 flex flex-col p-6 gap-4 md:hidden animate-slide-down shadow-2xl overflow-hidden z-[100]">
          {navLinks.map((link) => (
            <button
              key={link.id}
              className={`text-left p-4 rounded-xl text-lg font-bold transition-all ${currentPage === link.id ? 'bg-primary text-white shadow-lg' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
              onClick={() => handleNavigate(link.id)}
            >
              {link.label}
            </button>
          ))}
          <button
            className={`text-left p-4 rounded-xl text-lg font-bold border-t border-white/10 mt-2 ${currentPage === 'admin' ? 'text-primary' : 'text-primary/70 hover:text-primary'}`}
            onClick={() => handleNavigate('admin')}
          >
            🔐 Admin Dashboard
          </button>
          {authUser ? (
            <>
              <button
                id="mobile-profile-btn"
                className={`text-left p-4 rounded-xl text-lg font-bold border-t border-white/10 mt-2 ${currentPage === 'profile' ? 'bg-lime text-black shadow-lg' : 'text-lime/70 hover:bg-white/5 hover:text-lime'}`}
                onClick={() => handleNavigate('profile')}
              >
                👤 My Profile & Steps
              </button>
              <button
                id="mobile-logout-btn"
                className="text-left p-4 rounded-xl text-lg font-bold text-red-400 hover:text-red-300 border-t border-white/10 mt-2"
                onClick={() => { setIsMenuOpen(false); onLogout(); }}
              >
                Sign Out ({authUser.username})
              </button>
            </>
          ) : (
            <button
              id="mobile-signin-btn"
              className="text-left p-4 rounded-xl text-lg font-bold text-lime-400 hover:text-lime-300 border-t border-white/10 mt-2"
              onClick={() => handleNavigate('login')}
            >
              ⚡ Sign In
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
