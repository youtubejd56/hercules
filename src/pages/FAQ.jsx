import React from 'react';

export default function FAQ() {
  const faqs = [
    { q: "What are your gym timings?", a: "We are open Monday to Saturday from 5:00 AM to 10:00 PM. Sundays are closed for deep cleaning." },
    { q: "Do you have a personal training program?", a: "Yes! We have certified trainers available for one-on-one sessions tailored to your goals." },
    { q: "How much is the registration fee?", a: "The registration (admission) fee is ₹800. This is a one-time fee to secure your membership." },
    { q: "What is the monthly fee?", a: "Our monthly subscription is ₹300, giving you full access to all gym equipment." },
    { q: "Can I join for just one month?", a: "Yes! You can choose to pay monthly without long-term commitments." },
    { q: "Do you provide diet plans?", a: "Yes, our trainers offer basic nutritional guidance and structured diet plans for an additional fee." },
  ];

  return (
    <div className="py-20 px-6 md:px-12 max-w-4xl mx-auto animate-fade-in-up">
       <div className="text-center mb-16 px-4">
        <h1 className="text-5xl font-extrabold mb-4 uppercase italic tracking-tighter">FREQUENTLY <span className="text-primary italic text-3xl md:text-5xl">ASKED QUESTIONS</span></h1>
        <div className="w-24 h-1 bg-primary mx-auto"></div>
        <p className="mt-6 text-gray-400 text-lg">Everything you need to know about joining Hercules GYMPALA.</p>
      </div>

      <div className="space-y-6 px-4">
        {faqs.map((f, idx) => (
          <div key={idx} className="bg-card rounded-2xl p-8 border border-white/5 hover:border-primary/30 transition-all hover:bg-white/[0.02]">
            <h3 className="text-xl font-bold text-white mb-3">❓ {f.q}</h3>
            <p className="text-gray-400 leading-relaxed">{f.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
