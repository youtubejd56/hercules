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

  React.useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMenuOpen]);

  return (
    <nav className="flex justify-between items-center py-4 px-6 md:px-12 bg-dark/80  sticky top-0 z-[100] border-b border-white/5">
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
        <a 
          href="/HerculesGym-debug.apk" 
          download="HerculesGym.apk"
          className="ml-4 px-5 py-2 bg-gradient-to-r from-green-500 to-green-700 rounded-lg font-bold text-xs uppercase tracking-wide text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_rgba(34,197,94,0.4)] flex items-center gap-2 border border-green-400/50"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
          Get App
        </a>

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

      {/* Mobile Side Drawer */}
      <div className={`fixed inset-0 z-[200] transition-all duration-500 ${isMenuOpen ? 'visible opacity-100' : 'invisible opacity-0'}`}>
        {/* Backdrop - Solid darkness to completely isolate the menu without blur */}
        <div className="absolute inset-0 bg-black" onClick={() => setIsMenuOpen(false)} />

        {/* Drawer Content */}
        <div className={`absolute top-0 right-0 h-full w-[80%] max-w-[300px] bg-[#0d0d0d] border-l border-white/10 p-6 pb-24 flex flex-col gap-6 shadow-[0_0_100px_rgba(0,0,0,1)] transition-transform duration-500 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xl font-bold italic tracking-tighter text-white">MENU</span>
            <button onClick={() => setIsMenuOpen(false)} className="p-2 text-gray-400 hover:text-white">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                className={`flex items-center gap-4 p-4 rounded-xl text-lg font-bold transition-all ${currentPage === link.id ? 'bg-primary/10 text-primary' : 'text-gray-300 hover:bg-white/5'}`}
                onClick={() => handleNavigate(link.id)}
              >
                <span className="opacity-70">
                  {link.id === 'home' && '🏠'}
                  {link.id === 'about' && 'ℹ️'}
                  {link.id === 'trainers' && '👟'}
                  {link.id === 'admission' && '📋'}
                  {link.id === 'gallery' && '🖼️'}
                </span>
                {link.label}
              </button>
            ))}
          </div>

          <div className="mt-auto flex flex-col gap-3">
            <button
              className={`flex items-center gap-4 p-4 rounded-xl text-lg font-bold border border-white/10 ${currentPage === 'admin' ? 'text-primary bg-primary/5' : 'text-primary/70'}`}
              onClick={() => handleNavigate('admin')}
            >
              🔐 Admin Dashboard
            </button>

            <a 
              href="/HerculesGym-debug.apk" 
              download="HerculesGym.apk"
              className="flex items-center justify-center gap-3 w-full py-4 mt-2 bg-gradient-to-r from-green-600 to-green-800 text-white rounded-xl font-bold text-lg hover:from-green-500 hover:to-green-700 transition-all border border-green-400/30 shadow-[0_4px_15px_rgba(34,197,94,0.3)]"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
              Download Android App
            </a>

            {authUser ? (
              <div className="bg-white/5 rounded-2xl p-4 border border-white/5 mt-2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {authUser.username?.[0]?.toUpperCase()}
                  </div>
                  <div>
                    <p className="text-white font-bold">{authUser.username}</p>
                    <p className="text-gray-500 text-xs uppercase tracking-widest">Member</p>
                  </div>
                </div>
                <button
                  className="w-full py-3 bg-red-600/20 text-red-500 rounded-xl font-bold hover:bg-red-600 hover:text-white transition-all"
                  onClick={() => { setIsMenuOpen(false); onLogout(); }}
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                className="w-full py-4 bg-lime text-black rounded-xl font-bold text-lg"
                onClick={() => handleNavigate('login')}
              >
                ⚡ SIGN IN
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
