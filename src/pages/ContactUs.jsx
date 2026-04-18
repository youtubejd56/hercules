import React from 'react';

export default function ContactUs() {
  return (
    <div className="py-20 px-6 md:px-12 max-w-7xl mx-auto animate-fade-in-up">
      <div className="text-center mb-24">
        <h1 className="md:text-6xl text-3xl font-black mb-4 uppercase italic tracking-tighter">CONTACT <span className="text-primary italic">US</span></h1>
        <div className="w-24 h-1.5 bg-primary mx-auto"></div>
        <p className="mt-8 text-gray-400 text-xl font-medium">Ready to start your iron journey? We are here for you.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div className="space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <a
              href="https://www.google.com/maps/dir//Hercules+GYM+PALA,+Municipal+stadium+Municipal+Building,+Pala,+Kerala+686575,+India/@9.7133411,76.6872656,17z"
              target="_blank"
              rel="noopener noreferrer"
              className="p-10 bg-card rounded-[40px] border border-white/5 hover:border-primary/40 transition-all group"
            >
              <span className="text-3xl mb-6 block group-hover:scale-110 transition-transform">📍</span>
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-primary">Visit Us</h3>
              <p className="text-gray-500 font-medium leading-relaxed">
                Hercules GYM PALA, <br />
                Municipal Shopping Complex, Municipal Stadium Building, <br />
                Pala, Kerala 686575
              </p>
              <p className="mt-4 text-primary text-sm font-bold flex items-center gap-2">Get Directions &rarr;</p>
            </a>
            <div className="p-10 bg-card rounded-[40px] border border-white/5 hover:border-primary/20 transition-all">
              <span className="text-3xl mb-6 block">📞</span>
              <h3 className="text-2xl font-bold text-white mb-4">Call Us</h3>
              <p className="text-gray-500 font-medium">097477 69945</p>
              <p className="mt-4 text-gray-600 text-sm">Mon-Sat: 5AM - 10PM</p>
            </div>
            <div className="md:col-span-2 p-10 bg-card rounded-[40px] border border-white/5 flex flex-col md:flex-row items-center justify-between gap-8 hover:border-primary/20 transition-all">
                <div className="text-center md:text-left text-white">
                   <span className="text-3xl mb-4 block">💳</span>
                   <h3 className="text-2xl font-bold mb-2">Pay via UPI</h3>
                   <p className="text-gray-500 font-medium mb-4">Scan using Google Pay, PhonePe, or Paytm to quickly pay your gym fees.</p>
                   <p className="text-gray-400 text-sm">UPI ID: <span className="font-bold text-primary tracking-wide">Q669733104@ybl</span></p>
                </div>
                <div className="w-48 h-48 bg-white rounded-3xl p-3 shrink-0 shadow-xl shadow-black/50">
                   <img src="https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=upi%3A%2F%2Fpay%3Fpa%3DQ669733104%40ybl%26pn%3DHercules%2BGYM%26cu%3DINR" alt="UPI QR Code" className="w-full h-full object-contain" />
                </div>
            </div>
          </div>

          <div className="p-10 bg-gradient-to-br from-card to-dark rounded-[40px] border border-white/5 flex flex-col items-center text-center">
            <h3 className="text-3xl font-bold text-white mb-6 underline decoration-primary">Follow Us</h3>
            <div className="flex gap-10">
              <a href="https://www.instagram.com/hercules_gym_pala/" className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center text-2xl hover:bg-primary transition-all text-white">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
              </a>
              <a href="#" className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center text-2xl hover:bg-primary transition-all text-white">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
              </a>
              <a href="#" className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center text-2xl hover:bg-primary transition-all text-white">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.872.505 9.377.505 9.377.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
              </a>
            </div>
          </div>
        </div>

        <div className="rounded-[40px] overflow-hidden border-2 border-white/10 h-[500px] shadow-2xl relative">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3932.744111327!2d76.6872656!3d9.7133411!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b07cdcccba50433%3A0x4b43ce09361f35fe!2sHercules%20GYM%20PALA!5e0!3m2!1sen!2sin!4v1654877395000!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
