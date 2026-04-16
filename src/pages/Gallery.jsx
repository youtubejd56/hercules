import React, { useEffect, useState } from 'react';
import { API_URLS } from '../apiConfig';

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(API_URLS.gallery)
      .then(res => {
        if (!res.ok) throw new Error(`Server error: ${res.status}`);
        return res.json();
      })
      .then(data => {
        setImages(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching images:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-8 md:p-12 animate-slide-up max-w-7xl mx-auto w-full min-h-[calc(100vh-80px)]">
      <header className="mb-10 text-center">
        <h2 className="text-5xl font-extrabold mb-3 text-white">Gym Gallery</h2>
        <p className="text-gray-400 text-lg">Explore member transformations and workout features from Hercules Gym.</p>
      </header>

      {loading ? (
        <div className="flex flex-col items-center justify-center p-20 text-gray-500">
          <span className="text-5xl mb-4 animate-spin">⏳</span>
          <p className="text-xl">Loading gallery...</p>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center p-20 border border-red-500/20 bg-red-500/5 rounded-2xl text-gray-500">
          <span className="text-5xl mb-4">⚠️</span>
          <p className="text-xl text-red-400">Could not load gallery</p>
          <p className="text-sm text-gray-600 mt-2">{error}</p>
        </div>
      ) : images.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-20 border border-white/10 bg-card rounded-2xl text-gray-500 shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
          <span className="text-5xl mb-4">🏋️</span>
          <p className="text-xl">No gym milestones posted yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {images.map((img) => (
            <div key={img.id} className="group relative rounded-2xl overflow-hidden bg-card shadow-[0_20px_40px_rgba(0,0,0,0.4)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(255,62,62,0.15)] border border-white/5">
              <img
                src={img.image}
                alt={img.title}
                className="w-full h-72 object-cover object-center transition-transform duration-700 group-hover:scale-105"
                onError={(e) => { e.target.src = 'https://placehold.co/600x400/1e1e1e/ff3e3e?text=Image+Unavailable'; }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent opacity-90"></div>
              <div className="absolute bottom-0 left-0 p-6 w-full">
                <h3 className="font-bold text-xl text-white truncate drop-shadow-md pb-1">{img.title}</h3>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
