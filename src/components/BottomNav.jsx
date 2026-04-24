import React from 'react';

const BottomNav = ({ currentPage, setCurrentPage, authUser }) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" /></svg> },
    { id: 'gallery', label: 'Gallery', icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c0 1.1-.9-2-2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" /></svg> },
    { id: 'admission', label: 'Admission', icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" /></svg> },
    { id: 'profile', label: 'Profile', icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" /></svg> },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#0d0d0d] border-t border-white/10 grid grid-cols-4 items-center py-2 z-[100] pb-safe shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
      {navItems.map((item) => {
        const isActive = currentPage === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setCurrentPage(item.id)}
            className={`flex flex-col items-center gap-1 transition-all duration-300 ${isActive ? 'text-primary scale-110' : 'text-gray-500'}`}
          >
            <div className={`p-1 rounded-lg ${isActive ? 'bg-primary/10' : ''}`}>
              {item.icon}
            </div>
            <span className="text-[9px] font-bold uppercase tracking-wide text-center w-full truncate px-1">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default BottomNav;
