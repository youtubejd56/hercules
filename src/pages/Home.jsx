import React from 'react';
import { API_URLS } from '../apiConfig';

export default function Home({ onNavigate }) {
  const [testimonials, setTestimonials] = React.useState([]);

  React.useEffect(() => {
    fetch(API_URLS.testimonials)
      .then(res => {
        if (!res.ok) return res.json().then(err => { throw new Error(err.error || 'Server error') });
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setTestimonials(data);
        } else {
          setTestimonials([
            { id: 1, name: 'Vinayak NV', text: "The atmosphere here is incredible. I've gained so much strength, and the community is highly supportive. Best gym in Pala without a doubt.", rating: 5, role: 'Pro Member', duration: '1 Yrs' },
            { id: 2, name: 'Albin', text: "Joined a few months ago and I'm already seeing crazy results. The trainers really push you to step outside your comfort zone and exceed your limits.", rating: 5, role: 'Elite Member', duration: '10 Yr' },
            { id: 3, name: 'Athul k shaji', text: "State of the art equipment and perfectly maintained. There's never a wait for machines, and the 24/7 access fits right into my busy schedule.", rating: 5, role: 'Pro Member', duration: '3 Yr' }
          ]);
        }
      })
      .catch(err => {
        console.error('Error fetching testimonials:', err.message);
        // Fallback to static data on error
        setTestimonials([
          { id: 1, name: 'Vinayak NV', text: "The atmosphere here is incredible. I've gained so much strength, and the community is highly supportive. Best gym in Pala without a doubt.", rating: 5, role: 'Pro Member', duration: '2 Yrs' },
          { id: 2, name: 'Albin', text: "Joined a few months ago and I'm already seeing crazy results. The trainers really push you to step outside your comfort zone and exceed your limits.", rating: 5, role: 'Elite Member', duration: '6 Mos' },
          { id: 3, name: 'Athul', text: "State of the art equipment and perfectly maintained. There's never a wait for machines, and the 24/7 access fits right into my busy schedule.", rating: 5, role: 'Basic Member', duration: '1 Yr' }
        ]);
      });
  }, []);

  return (
    <div className="flex-1 flex flex-col w-full min-h-[calc(100vh-80px)]">
      <section className="relative flex-1 flex items-center justify-center text-center p-8 overflow-hidden z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(30,30,30,0.8)_0%,_rgba(18,18,18,1)_100%)] -z-10" />

        <div className="max-w-4xl py-16 mx-auto animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl py-10 font-extrabold uppercase mb-6 leading-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Push Your <span className="bg-gradient-to-r from-primary to-red-400 bg-clip-text text-transparent">Limits</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            Experience world-class equipment, elite trainers, and a community that drives you to be your best self.
            Join the revolution of fitness.
          </p>
          <button
            className="px-8 py-4 bg-primary text-white text-lg font-bold rounded-lg hover:bg-red-600 hover:-translate-y-1 hover:shadow-[0_4px_12px_rgba(255,62,62,0.4)] transition-all duration-300"
            onClick={() => onNavigate('admission')}
          >
            Join Now
          </button>

          <div className="flex flex-wrap justify-center gap-6 mt-24 h-full py-20 " >
            <div className="bg-card p-8 rounded-xl w-full sm:w-64 border border-white/5 hover:-translate-y-2 hover:shadow-xl hover:border-primary/30 transition-all duration-300 group">
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">24/7 Access</h3>
              <p className="text-gray-400 text-sm">Train on your own time with round-the-clock facility access.</p>
            </div>
            <div className="bg-card p-8 rounded-xl w-full sm:w-64 border border-white/5 hover:-translate-y-2 hover:shadow-xl hover:border-primary/30 transition-all duration-300 group">
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">Elite Gear</h3>
              <p className="text-gray-400 text-sm">State-of-the-art machines and free weights for all levels.</p>
            </div>
            <div className="bg-card p-8 rounded-xl w-full sm:w-64 border border-white/5 hover:-translate-y-2 hover:shadow-xl hover:border-primary/30 transition-all duration-300 group">
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">Pro Trainers</h3>
              <p className="text-gray-400 text-sm">Expert guidance to help you reach your maximum potential.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-8 bg-dark relative border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold uppercase text-white mb-4">
              Member <span className="text-primary">Stories</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Don't just take our word for it. Hear what our dedicated members have to say about their transformation journey at Hercules MultiGYM.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <div key={idx} className="bg-card p-8 rounded-2xl border border-white/5 hover:border-primary/50 transition-all duration-300 relative group">
                <div className="text-primary mb-4 flex">
                  {Array.from({ length: t.rating || 5 }).map((_, i) => <span key={i} className="text-xl">★</span>)}
                </div>
                <p className="text-gray-300 italic mb-6 leading-relaxed">
                  "{t.text}"
                </p>
                <div className="flex items-center gap-4 border-t border-white/10 pt-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {t.name ? t.name.charAt(0) : 'H'}
                  </div>
                  <div>
                    <h4 className="text-white font-bold transition-colors group-hover:text-primary">{t.name}</h4>
                    <p className="text-gray-500 text-sm">{t.role} • {t.duration}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
