import React from 'react';

export default function Trainers() {
  const trainers = [


  ];

  return (
    <div className="py-20 px-6 md:px-12 max-w-7xl mx-auto animate-fade-in-up">
      <div className="text-center mb-16 px-4">
        <h1 className="text-5xl font-extrabold mb-4 uppercase italic tracking-tighter">OUR <span className="text-primary italic">TEAM</span></h1>
        <div className="w-24 h-1 bg-primary mx-auto"></div>
        <p className="mt-6 text-gray-400 text-lg">Work with the most experienced iron masters in Pala.</p>
      </div>

      {/* Featured Head Coach */}
      <div className="bg-card rounded-[40px] p-8 md:p-12 border border-primary/20 shadow-[0_20px_50px_rgba(255,62,62,0.1)] mb-20 overflow-hidden relative group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
        <div className="flex flex-col lg:flex-row gap-12 items-center relative z-10">
          <div className="w-full lg:w-1/3">
            <div className="relative rounded-3xl overflow-hidden border-4 border-primary shadow-2xl skew-y-2 group-hover:skew-y-0 transition-transform duration-500">
              <img
                src="https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=600&fit=crop"
                alt="Head Coach Varkey Devassia"
                className="w-full h-[450px] object-cover scale-105 group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-primary py-4 text-center">
                <span className="text-white font-black uppercase tracking-widest text-sm underline decoration-white/50 underline-offset-4">25+ Years Experience</span>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-2/3 space-y-6">
            <h2 className="text-4xl md:text-6xl font-black text-white leading-none">VARKEY <br /> <span className="text-primary italic">DEVASSIA</span></h2>
            <div className="flex items-center gap-4 py-2">
              <div className="h-px flex-1 bg-white/10"></div>
              <span className="text-primary font-bold tracking-widest uppercase text-sm">Head Coach</span>
              <div className="h-px flex-1 bg-white/10"></div>
            </div>
            <p className="text-gray-300 text-xl leading-relaxed italic font-medium">
              "With over 25 years of mastery in bodybuilding and fitness coaching, Varkey Devassia is the legendary architect behind thousands of transformations. As the Head Coach of Hercules GYMPALA, he brings a deep, time-tested understanding of strength training, biomechanics, and discipline."
            </p>
            {/* <p className="text-gray-400 text-lg leading-relaxed">
              His philosophy blends old-school iron grit with modern precision, ensuring that every member—from beginner to elite athlete—receives the guidance of a true veteran who has shaped the fitness culture of Pala since the beginning.
            </p> */}
            <div className="pt-6">
              {/* <button className="px-8 py-4 bg-primary text-white font-bold rounded-full hover:bg-red-600 transition-all shadow-lg shadow-primary/20">Book a Session with Coach</button> */}
            </div>
          </div>
        </div>
      </div>

      {/* <div className="text-center mb-10">
        <h3 className="text-2xl font-bold uppercase tracking-widest text-gray-500">Other Expert Coaches</h3>
      </div> */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {trainers.map((t, idx) => (
          <div key={idx} className="bg-card group rounded-2xl overflow-hidden border border-white/5 hover:border-primary/40 transition-all duration-300 shadow-xl hover:-translate-y-2">
            <div className="h-80 overflow-hidden relative">
              <img src={t.img} alt={t.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent opacity-60"></div>
            </div>
            <div className="p-6 text-center">
              <h3 className="text-xl font-bold text-white mb-1 group-hover:text-primary transition-colors">{t.name}</h3>
              <p className="text-gray-500 text-sm font-semibold uppercase tracking-widest">{t.specialty}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
