import React from 'react';

const Offline = ({ onRetry }) => {
  return (
    <div className="fixed inset-0 z-[9999] bg-[#0a0a0a] flex flex-col items-center justify-center p-6 min-h-screen text-center">
      <div className="relative mb-12">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-[2] animate-pulse"></div>
        
        {/* Radar Ping Animations */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full border border-primary/40 rounded-full animate-ping" style={{ animationDuration: '3s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full border border-primary/20 rounded-full animate-ping" style={{ animationDuration: '3s', animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full border border-primary/10 rounded-full animate-ping" style={{ animationDuration: '3s', animationDelay: '2s' }}></div>

        {/* Icon Container */}
        <div className="relative w-32 h-32 bg-[#181818] border border-white/10 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(255,62,62,0.15)] z-10">
          <svg className="w-14 h-14 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
            <path className="animate-pulse" style={{ animationDuration: '1.5s', animationDelay: '0s' }} d="M12 20h.01"></path>
            <path className="animate-pulse opacity-40" style={{ animationDuration: '1.5s', animationDelay: '0.3s' }} d="M8.53 16.11a6 6 0 0 1 6.95 0"></path>
            <path className="animate-pulse opacity-20" style={{ animationDuration: '1.5s', animationDelay: '0.6s' }} d="M5 12.55a11 11 0 0 1 14.08 0"></path>
            <path className="animate-pulse opacity-10" style={{ animationDuration: '1.5s', animationDelay: '0.9s' }} d="M1.42 9a16 16 0 0 1 21.16 0"></path>
          </svg>
        </div>
      </div>
      
      <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-4 uppercase tracking-widest animate-pulse">
        Searching...
      </h1>
      
      <p className="text-gray-400 text-sm md:text-base max-w-md mx-auto mb-10 leading-relaxed">
        It looks like you've gone off the grid. Check your internet connection to continue your fitness journey and sync your latest stats.
      </p>
      
      <button 
        onClick={onRetry}
        className="px-8 py-4 bg-primary text-white font-bold rounded-xl uppercase tracking-widest hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(255,62,62,0.3)] transition-all duration-300 flex items-center gap-3 mx-auto"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
        </svg>
        Try Again
      </button>
    </div>
  );
};

export default Offline;
