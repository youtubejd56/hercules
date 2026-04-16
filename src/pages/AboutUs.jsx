import React from 'react';

export default function AboutUs() {
  return (
    <div className="py-20 px-6 md:px-12 max-w-7xl mx-auto animate-fade-in-up">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-extrabold mb-4 uppercase italic tracking-tighter shadow-sm">
          ABOUT <span className="text-primary italic">US</span>
        </h1>
        <div className="w-24 h-1 bg-primary mx-auto"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div className="space-y-6">
          <div className="inline-block px-4 py-1 bg-primary/20 text-primary border border-primary/30 rounded-full text-xs font-bold tracking-widest mb-2 animate-pulse">
            ESTABLISHED IN 1983
          </div>
          <h2 className="text-3xl font-bold text-white">40+ YEARS OF <span className="text-primary italic">IRON LEGACY</span></h2>
          <p className="text-gray-400 leading-relaxed text-lg">
            Hercules GYMPALA started in 1983 with a single mission: to provide the most powerful training atmosphere in Pala.
            For over four decades, we have been the heartbeat of local fitness, helping generations unleash their inner Hercules.
          </p>
          <p className="text-gray-400 leading-relaxed text-lg">
            Our facility combines the wisdom of old-school lifting with modern equipment.
            We are not just a gym; we are a landmark of strength that has stood the test of time since 1983.
          </p>
          <div className="grid grid-cols-2 gap-6 pt-6">
            <div className="p-4 bg-card rounded-xl border-l-4 border-primary shadow-xl">
              <h4 className="text-2xl font-bold text-white">300+</h4>
              <p className="text-gray-500 text-sm">Happy Members</p>
            </div>
            <div className="p-4 bg-card rounded-xl border-l-4 border-primary shadow-xl">
              <h4 className="text-2xl font-bold text-white">2+</h4>
              <p className="text-gray-500 text-sm">Expert Trainers</p>
            </div>
          </div>
        </div>
        <div className="relative group overflow-hidden rounded-3xl border-2 border-white/5">
          <img
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop"
            alt="Gym Interior"
            className="w-full h-[500px] object-cover hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent"></div>
        </div>
      </div>
    </div>
  );
}
