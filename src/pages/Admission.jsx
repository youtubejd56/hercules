import React, { useState } from 'react';
import { API_URLS } from '../apiConfig';

export default function Admission() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    photo: null,
    feeType: 'registration',
    joinDate: new Date().toISOString().split('T')[0]
  });
  const [isPendingPayment, setIsPendingPayment] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleInitialSubmit = (e) => {
    e.preventDefault();
    if (!/^\d{10}$/.test(formData.phone)) {
      return alert('Mobile number must be exactly 10 digits.');
    }
    if (formData.photo && formData.photo.size > 500 * 1024) {
      return alert('Profile photo size must be less than 500KB.');
    }
    setIsPendingPayment(true);
  };

  const finalSubmit = async () => {
    if (isSaving) return;
    setIsSaving(true);
    const data = new FormData();
    data.append('name', formData.name);
    data.append('phone', formData.phone);
    if (formData.photo) data.append('profile_pic', formData.photo);
    data.append('plan', formData.feeType === 'registration' ? 'New Member' : 'Renewal');
    
    // Use the selected join date!
    data.append('date_joined', formData.joinDate);
    data.append('last_payment_date', formData.joinDate);

    try {
      const response = await fetch(API_URLS.admissions, {
        method: 'POST',
        body: data,
      });
      if (response.ok) {
        alert(`Registration successful! Your data has been stored and is awaiting admin approval.`);
        setIsPendingPayment(false);
        setFormData({ name: '', phone: '', photo: null, feeType: 'registration' });
      } else {
        const errorData = await response.json().catch(() => ({}));
        alert(`Failed to register: ${errorData.error || response.statusText}`);
      }
    } catch (error) {
      alert('Network error. Is the server running?');
    }
    setIsSaving(false);
  };

  if (isPendingPayment) {
    const amount = formData.feeType === 'registration' ? 800 : 300;
    const upiLink = `upi://pay?pa=Q669733104@ybl&pn=Hercules%20GYM&am=${amount}&cu=INR`;
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(upiLink)}`;
    
    return (
      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-8 animate-fade-in-up">
        <div className="bg-card p-8 md:p-12 rounded-2xl w-full max-w-md border border-white/5 shadow-[0_20px_40px_rgba(0,0,0,0.4)] text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-red-500 to-primary"></div>
          <div className="w-20 h-20 bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Payment Pending</h2>
          <p className="text-gray-400 mb-8">Please complete your payment of <span className="font-bold text-white text-lg">₹{amount}</span> to submit your admission.</p>
          
          <div className="bg-white p-3 rounded-2xl mx-auto w-48 h-48 mb-6 shadow-xl shadow-black/50 hover:scale-105 transition-transform">
            <img src={qrUrl} alt="UPI QR Code" className="w-full h-full object-contain" />
          </div>
          
          <p className="text-gray-400 mb-1 text-sm">Or pay using UPI ID:</p>
          <p className="text-xl font-bold text-white tracking-widest mb-8 bg-white/5 py-2 rounded-lg border border-white/10">Q669733104@ybl</p>

          <a href={upiLink} className="md:hidden w-full py-4 bg-primary text-white text-lg font-bold rounded-lg hover:bg-red-600 shadow-[0_4px_12px_rgba(255,62,62,0.4)] transition-all flex items-center justify-center gap-2 mb-4">
            💳 Pay via UPI App
          </a>
          <p className="hidden md:block text-gray-500 text-sm mb-4">Note: Scan the QR code with your mobile UPI App (GPay/PhonePe).</p>

          <button onClick={finalSubmit} disabled={isSaving} className="w-full py-4 bg-transparent border border-white/10 text-white font-bold rounded-lg hover:bg-white/5 transition-all">
            {isSaving ? 'Submitting...' : 'I Have Paid (Finish)'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-8">
      <div className="bg-card p-8 md:p-12 rounded-2xl w-full max-w-lg border border-white/5 shadow-[0_20px_40px_rgba(0,0,0,0.4)] animate-slide-up">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Join The Gym</h2>
          <p className="text-gray-400">Begin your fitness journey today.</p>
        </div>

        <form onSubmit={handleInitialSubmit} className="space-y-6">
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
            <label className="block text-sm font-medium text-gray-400 mb-2">Joining Date</label>
            <input
              type="date"
              className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-lg text-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-sans [color-scheme:dark]"
              value={formData.joinDate}
              onChange={(e) => setFormData({ ...formData, joinDate: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Upload Profile Picture</label>
            <input
              type="file"
              accept="image/*"
              className="w-full bg-black/20 border border-white/10 rounded-lg text-gray-400 file:mr-4 file:py-3 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-white/10 file:text-white hover:file:bg-white/20 cursor-pointer transition-all"
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
