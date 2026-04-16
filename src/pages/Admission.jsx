import React, { useState } from 'react';
import { API_URLS } from '../apiConfig';

export default function Admission() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    photo: null,
    feeType: 'registration'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!/^\d{10}$/.test(formData.phone)) {
      return alert('Mobile number must be exactly 10 digits.');
    }
    if (formData.photo && formData.photo.size > 500 * 1024) {
      return alert('Profile photo size must be less than 500KB.');
    }
    
    const data = new FormData();
    data.append('name', formData.name);
    data.append('phone', formData.phone);
    // You could also send the fee type if the backend model accepts it.
    // data.append('fee_type', formData.feeType);
    if (formData.photo) data.append('profile_pic', formData.photo);

    try {
      const response = await fetch(API_URLS.admissions, {
        method: 'POST',
        body: data,
      });
      if (response.ok) {
        alert(`Registration successful for ${formData.name}! Welcome to the Gym.`);
        setFormData({ name: '', phone: '', photo: null, feeType: 'registration' });
        if (e.target) e.target.reset();
      } else {
        const errorData = await response.json().catch(() => ({}));
        alert(`Failed to register: ${errorData.error || response.statusText}`);
      }
    } catch (error) {
      console.error('Error submitting admission:', error);
      alert('Network error. Is the server running?');
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-8">
      <div className="bg-card p-8 md:p-12 rounded-2xl w-full max-w-lg border border-white/5 shadow-[0_20px_40px_rgba(0,0,0,0.4)] animate-slide-up">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Join The Gym</h2>
          <p className="text-gray-400">Begin your fitness journey today.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Full Name</label>
            <input
              type="text"
              className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-sans"
              placeholder="John Doe"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>


          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Phone Number</label>
            <input
              type="tel"
              className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-sans"
              placeholder="(555) 123-4567"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Upload Profile Picture</label>
            <input
              type="file"
              accept="image/*"
              className="w-full text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-red-600 transition-all"
              onChange={(e) => setFormData({ ...formData, photo: e.target.files[0] })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Registration Type</label>
            <div className="flex flex-col sm:flex-row gap-4">
              <div 
                onClick={() => setFormData({ ...formData, feeType: 'registration' })}
                className={`flex-1 p-4 rounded-xl flex items-center justify-between cursor-pointer transition-all ${
                  formData.feeType === 'registration' 
                    ? 'border-2 border-primary bg-primary/10 shadow-[0_0_15px_rgba(255,62,62,0.2)]' 
                    : 'border border-white/10 bg-black/20 hover:bg-white/5'
                }`}
              >
                <div className="flex flex-col">
                  <span className="font-bold text-white text-sm">New Member</span>
                  <span className="text-xs text-gray-400">Includes admission</span>
                </div>
                <span className={`text-xl font-bold ${formData.feeType === 'registration' ? 'text-primary' : 'text-gray-300'}`}>₹800</span>
              </div>
              
              <div 
                onClick={() => setFormData({ ...formData, feeType: 'monthly' })}
                className={`flex-1 p-4 rounded-xl flex items-center justify-between cursor-pointer transition-all ${
                  formData.feeType === 'monthly' 
                    ? 'border-2 border-primary bg-primary/10 shadow-[0_0_15px_rgba(255,62,62,0.2)]' 
                    : 'border border-white/10 bg-black/20 hover:bg-white/5'
                }`}
              >
                <div className="flex flex-col">
                  <span className="font-bold text-white text-sm">Renewal</span>
                  <span className="text-xs text-gray-400">Existing member</span>
                </div>
                <span className={`text-xl font-bold ${formData.feeType === 'monthly' ? 'text-primary' : 'text-gray-300'}`}>₹300</span>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 mt-6 bg-primary text-white text-lg font-bold rounded-lg hover:bg-red-600 hover:-translate-y-1 hover:shadow-[0_4px_12px_rgba(255,62,62,0.4)] transition-all duration-300"
          >
            Complete Registration
          </button>
        </form>
      </div>
    </div>
  );
}
