import React from 'react';

export default function SafetyPolicies() {
  const policies = [
    { title: 'HYGIENE FIRST', text: 'All equipment must be wiped down after use. Sanitation stations are provided throughout the gym.' },
    { title: 'PROPER ATTIRE', text: 'Appropriate gym clothing and clean indoor shoes are mandatory. No flip-flops or open-toed shoes.' },
    { title: 'TOWEL POLICY', text: 'Each member must carry a clean gym towel to use during their workout.' },
    { title: 'RE-RACK WEIGHTS', text: 'All weights, dumbbells, and bars must be returned to their original racks after use.' },
    { title: 'RESPECT OTHERS', text: 'Be mindful of others during peak hours. Avoid excessive noise or dropping weights unnecessarily.' },
    { title: 'MEMBERSHIP ACCESS', text: 'Entry is strictly restricted to members with active plans. Sharing access is not permitted.' },
  ];

  return (
    <div className="py-20 px-6 md:px-12 max-w-7xl mx-auto animate-fade-in-up">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-extrabold mb-4 uppercase italic tracking-tighter shadow-sm">
           SAFETY <span className="text-primary italic">POLICIES</span>
        </h1>
        <div className="w-24 h-1 bg-primary mx-auto"></div>
        <p className="mt-6 text-gray-400 text-lg">Maintaining a professional and safe environment for all.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {policies.map((p, idx) => (
          <div key={idx} className="p-10 bg-card rounded-3xl border border-white/5 shadow-2xl hover:border-primary/50 transition-all group hover:-translate-y-2">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 border border-primary/20 group-hover:bg-primary transition-colors duration-500">
               <span className="text-primary group-hover:text-white font-black text-2xl">{idx + 1}</span>
            </div>
            <h3 className="text-2xl font-black text-white mb-4 group-hover:text-primary transition-colors font-sans">{p.title}</h3>
            <p className="text-gray-500 leading-relaxed font-semibold">{p.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
