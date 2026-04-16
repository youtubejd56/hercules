import React, { useState } from 'react';
import { API_URLS } from '../apiConfig';

const parseApiError = async (response) => {
  const contentType = response.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    const payload = await response.json().catch(() => ({}));
    if (typeof payload?.error === 'string') return payload.error;
    if (typeof payload?.detail === 'string') return payload.detail;
    if (payload?.error && typeof payload.error === 'object') return JSON.stringify(payload.error);
    return response.statusText || 'Request failed';
  }
  const text = await response.text().catch(() => '');
  return text?.trim() || response.statusText || 'Request failed';
};

export default function Admin({ setCurrentPage }) {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [isLogged, setIsLogged] = useState(false);
  const [adminView, setAdminView] = useState('uploads'); // 'uploads', 'admissions', 'add_member'

  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [uploading, setUploading] = useState(false);
  const fileInputRef = React.useRef(null);

  const [admissions, setAdmissions] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);
  const [manualMember, setManualMember] = useState({ name: '', phone: '', joinDate: '', photo: null });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  React.useEffect(() => {
    if (isLogged) {
      fetch(API_URLS.admissions)
        .then(res => res.ok ? res.json() : [])
        .then(data => setAdmissions(Array.isArray(data) ? data : []))
        .catch(error => {
          console.error('Error fetching admissions:', error);
          setAdmissions([]);
        });

      fetch(API_URLS.gallery)
        .then(res => res.ok ? res.json() : [])
        .then(data => setGalleryImages(Array.isArray(data) ? data : []))
        .catch(error => {
          console.error('Error fetching gallery:', error);
          setGalleryImages([]);
        });
    }
  }, [isLogged]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (credentials.username === 'hercules' && credentials.password === 'herculesgympala') {
      setIsLogged(true);
    } else {
      alert(`Invalid credentials.`);
    }
  };

  const handleLogout = () => {
    setIsLogged(false);
    setCredentials({ username: '', password: '' });
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || !title) return alert('Please provide a title and select an image.');
    if (file.size > 500 * 1024) return alert('Image size must be less than 500KB.');
    setUploading(true);
    const formData = new FormData();
    formData.append('title', title);
    formData.append('image', file);
    try {
      const response = await fetch(API_URLS.gallery, { method: 'POST', body: formData });
      if (response.ok) {
        setTitle(''); setFile(null);
        // Reset the file input element visually
        if (fileInputRef.current) fileInputRef.current.value = '';
        alert('Published to Gallery!');
        // Refresh gallery
        fetch(API_URLS.gallery)
          .then(res => res.ok ? res.json() : [])
          .then(data => setGalleryImages(Array.isArray(data) ? data : []));
      } else {
        const errMsg = await parseApiError(response);
        console.error('Gallery upload failed', response.status, errMsg);
        alert(`Upload failed: ${errMsg}`);
      }
    } catch (error) { console.error(error); alert('Network error. Check your connection.'); }
    finally { setUploading(false); }
  };

  const handleDeleteImage = async (id) => {
    if (!window.confirm('Are you sure you want to delete this image?')) return;
    try {
      const response = await fetch(`${API_URLS.gallery}${id}/`, { method: 'DELETE' });
      if (response.ok) {
        setGalleryImages(prev => prev.filter(img => img.id !== id));
      } else {
        alert('Failed to delete image.');
      }
    } catch (error) { console.error(error); }
  };

  const handleManualMember = async (e) => {
    e.preventDefault();
    
    if (!/^\d{10}$/.test(manualMember.phone)) {
      return alert('Mobile number must be exactly 10 digits.');
    }
    if (manualMember.photo && manualMember.photo.size > 500 * 1024) {
      return alert('Profile photo size must be less than 500KB.');
    }
    setUploading(true);
    const formData = new FormData();
    formData.append('name', manualMember.name);
    formData.append('phone', manualMember.phone);
    if (manualMember.joinDate) formData.append('date_joined', manualMember.joinDate);
    if (manualMember.photo) formData.append('profile_pic', manualMember.photo);

    try {
      const response = await fetch(API_URLS.admissions, {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        setManualMember({ name: '', phone: '', joinDate: '', photo: null });
        alert('Member added successfully!');
        fetch(API_URLS.admissions)
          .then(res => res.ok ? res.json() : [])
          .then(data => setAdmissions(Array.isArray(data) ? data : []));
      } else {
        const errMsg = await parseApiError(response);
        console.error('Admission create failed', response.status, errMsg);
        alert(`Failed to add member: ${errMsg}`);
      }
    } catch (error) { console.error(error); alert('Network error. Check your connection.'); }
    finally { setUploading(false); }
  };

  const handleMarkAsPaid = async (id) => {
    try {
      const today = new Date().toISOString().split('T')[0];
      const response = await fetch(`${API_URLS.admissions}${id}/`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ last_payment_date: today }),
      });
      if (response.ok) {
        fetch(API_URLS.admissions)
          .then(res => res.ok ? res.json() : [])
          .then(data => setAdmissions(Array.isArray(data) ? data : []));
      }
    } catch (error) { console.error(error); }
  };

  if (!isLogged) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8 bg-dark">
        <div className="bg-card p-8 md:p-12 rounded-2xl w-full max-w-md border border-white/5 shadow-[0_20px_40px_rgba(0,0,0,0.4)] animate-slide-up relative text-center">
          <button onClick={() => setCurrentPage('home')} className="absolute top-4 left-4 text-gray-500 hover:text-white flex items-center gap-2 text-sm transition-all duration-300 underline decoration-primary/30">
            &larr; Back to Site
          </button>
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Admin Panel</h2>
            <p className="text-gray-400">Authorized personnel only.</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="text-left">
              <label className="block text-sm font-medium text-gray-400 mb-2">Username</label>
              <input type="text" className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-lg text-white" value={credentials.username} onChange={(e) => setCredentials({ ...credentials, username: e.target.value })} required />
            </div>
            <div className="text-left">
              <label className="block text-sm font-medium text-gray-400 mb-2">Password</label>
              <input type="password" className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-lg text-white" value={credentials.password} onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} required />
            </div>
            <button type="submit" className="w-full py-4 bg-primary text-white text-lg font-bold rounded-lg hover:bg-red-600 transition-all duration-300 shadow-lg shadow-primary/20">Sign In</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen w-full font-sans bg-dark text-white relative">
      <div className="md:hidden bg-card p-4 flex justify-between items-center border-b border-white/10 sticky top-0 z-40">
        <h3 className="font-bold text-lg">Admin <span className="text-primary italic">Panel</span></h3>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 bg-white/5 rounded-lg text-primary">
          {isSidebarOpen ? '✕' : '☰'}
        </button>
      </div>

      {isSidebarOpen && <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 md:hidden" onClick={() => setIsSidebarOpen(false)} />}

      <aside className={`fixed md:sticky top-0 left-0 h-screen w-64 bg-card border-r border-white/10 p-6 flex flex-col gap-4 z-50 transition-transform duration-300 overflow-y-auto custom-scrollbar ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/10">
          <h3 className="text-xl font-bold text-gray-300 tracking-tight">DASHBOARD</h3>
        </div>
        <button onClick={() => { setAdminView('uploads'); setIsSidebarOpen(false); }} className={`text-left p-3 rounded-lg font-semibold transition-all ${adminView === 'uploads' ? 'bg-primary text-white shadow-lg' : 'text-gray-400 hover:bg-white/5'}`}>⚙️ Image Uploads</button>
        <button onClick={() => { setAdminView('admissions'); setIsSidebarOpen(false); }} className={`text-left p-3 rounded-lg font-semibold transition-all ${adminView === 'admissions' ? 'bg-primary text-white shadow-lg' : 'text-gray-400 hover:bg-white/5'}`}>📋 Admission Data</button>
        <button onClick={() => { setAdminView('add_member'); setIsSidebarOpen(false); }} className={`text-left p-3 rounded-lg font-semibold transition-all ${adminView === 'add_member' ? 'bg-primary text-white shadow-lg' : 'text-gray-400 hover:bg-white/5'}`}>👤 Add Member</button>

        <div className="mt-auto pt-8 border-t border-white/10 flex flex-col gap-4">
          <button onClick={() => setCurrentPage('home')} className="w-full p-3 text-left rounded-lg text-gray-400 hover:bg-white/5 flex items-center gap-2">🌐 Go to Site</button>
          <button onClick={handleLogout} className="w-full py-3 bg-transparent border border-red-500/50 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-all">Logout Admin</button>
        </div>
      </aside>

      <main className="flex-1 p-4 md:p-12 overflow-y-auto">
        {adminView === 'uploads' && (
          <div className="max-w-4xl mx-auto space-y-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">Upload Image to Gallery</h2>
              <form onSubmit={handleUpload} className="bg-card border border-white/10 p-8 rounded-2xl shadow-2xl">
                <input type="text" placeholder="Post Title" value={title} onChange={e => setTitle(e.target.value)} className="w-full mb-4 px-4 py-3 bg-black/20 border border-white/10 rounded-lg text-white outline-none focus:border-primary transition-all" required />
                <input type="file" accept="image/*" ref={fileInputRef} onChange={e => setFile(e.target.files[0])} className="w-full mb-8 text-gray-400" required />
                <button type="submit" disabled={uploading} className="w-full py-4 bg-primary text-white font-bold rounded-lg hover:bg-red-600 shadow-xl shadow-primary/20"> {uploading ? 'Uploading...' : 'Publish to Gallery'} </button>
              </form>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-6 text-gray-400">Manage Gallery Images</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {galleryImages.map(img => (
                  <div key={img.id} className="bg-card rounded-xl border border-white/5 overflow-hidden group shadow-lg">
                    <div className="h-48 relative overflow-hidden">
                       <img src={img.image?.startsWith('res.cloudinary.com') ? `https://${img.image}` : img.image} alt={img.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                       <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                          <button onClick={() => handleDeleteImage(img.id)} className="bg-red-600 text-white p-3 rounded-full hover:bg-red-700 shadow-2xl transform scale-75 group-hover:scale-100 transition-all">🗑️ Delete</button>
                       </div>
                    </div>
                    <div className="p-4 bg-black/40 border-t border-white/5">
                       <p className="font-bold text-sm truncate">{img.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {adminView === 'admissions' && (
          <div>
            <h2 className="text-3xl font-bold mb-6">Admission Data</h2>
            <div className="bg-card rounded-2xl overflow-x-auto border border-white/10 shadow-2xl custom-scrollbar">
              <table className="w-full text-left min-w-[900px]">
                <thead className="bg-black/40">
                  <tr>
                    <th className="p-5 font-semibold text-gray-400">Photo</th>
                    <th className="p-5 font-semibold text-gray-400">Name</th>
                    <th className="p-5 font-semibold text-gray-400">Phone</th>
                    <th className="p-5 font-semibold text-gray-400">Reg. Fee</th>
                    <th className="p-5 font-semibold text-gray-400">Monthly</th>
                    <th className="p-5 font-semibold text-gray-400">Joint Date</th>
                    <th className="p-5 font-semibold text-gray-400">Status</th>
                    <th className="p-5 font-semibold text-gray-400">Next Due</th>
                    <th className="p-5 font-semibold text-gray-400">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {admissions.map(r => {
                    const joinedDate = r.date_joined ? new Date(r.date_joined) : null;
                    const lastPaymentDate = r.last_payment_date ? new Date(r.last_payment_date) : null;
                    const today = new Date();
                    let status = { text: 'N/A', class: 'bg-gray-500/10 text-gray-500' };
                    let nextDue = 'N/A';
                    if (joinedDate) {
                      const day = joinedDate.getDate();
                      const currentMonth = today.getMonth();
                      const currentYear = today.getFullYear();
                      const isPaidThisMonth = lastPaymentDate && lastPaymentDate.getMonth() === today.getMonth() && lastPaymentDate.getFullYear() === today.getFullYear();
                      let dueThisMonth = new Date(currentYear, currentMonth, day);
                      if (isPaidThisMonth) {
                        status = { text: 'PAID', class: 'bg-green-500/20 text-green-500 border border-green-500/30' };
                        nextDue = new Date(currentYear, currentMonth + 1, day).toLocaleDateString();
                      } else if (today > dueThisMonth) {
                        status = { text: 'OVERDUE', class: 'bg-red-500/20 text-red-500 border border-red-500/30' };
                        nextDue = dueThisMonth.toLocaleDateString();
                      } else {
                        status = { text: 'UP TO DATE', class: 'bg-blue-500/20 text-blue-500 border border-blue-500/30' };
                        nextDue = dueThisMonth.toLocaleDateString();
                      }
                    }
                    return (
                      <tr key={r.id} className="border-b border-white/5 hover:bg-white/5 group">
                        <td className="p-5">
                          {r.profile_pic ? <img src={r.profile_pic?.startsWith('res.cloudinary.com') ? `https://${r.profile_pic}` : r.profile_pic} alt="" className="w-12 h-12 rounded-full object-cover border-2 border-primary" /> : <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-xs text-gray-500">No Pic</div>}
                        </td>
                        <td className="p-5 font-bold">{r.name}</td>
                        <td className="p-5 text-gray-400">{r.phone}</td>
                        <td className="p-5 text-primary italic font-bold">₹800</td>
                        <td className="p-5 text-primary italic font-bold">₹300</td>
                        <td className="p-5 text-gray-500 text-sm">{r.date_joined ? new Date(r.date_joined).toLocaleDateString() : 'N/A'}</td>
                        <td className="p-5"><span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${status.class}`}>{status.text}</span></td>
                        <td className="p-5 text-sm font-semibold text-gray-300">{nextDue}</td>
                        <td className="p-5">
                          <div className="flex flex-col gap-2">
                            <button onClick={() => handleMarkAsPaid(r.id)} className="px-4 py-2 bg-blue-600/20 text-blue-500 border border-blue-500/30 rounded-lg hover:bg-blue-600 hover:text-white transition-all text-xs font-bold">✅ Mark as Paid</button>
                            <a href={`https://wa.me/${(() => { const num = r.phone?.replace(/[^0-9]/g, ''); return num?.startsWith('91') ? num : `91${num}`; })()}?text=Hello%20${encodeURIComponent(r.name)},%20this%20is%20a%20friendly%20reminder%20from%20*Hercules%20MultiGYM*.%20Your%20monthly%20gym%20fee%20of%20*₹300*%20is%20currently%20*pending*%20(Due:%20${nextDue}).%20Please%20clear%20it%20at%20your%20earliest%20convenience.%20Thank%20you!`} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-green-600/20 text-green-500 border border-green-500/30 rounded-lg hover:bg-green-600 hover:text-white transition-all flex items-center justify-center gap-2 text-xs font-bold"><span>💬 Reminder</span></a>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {adminView === 'add_member' && (
          <div className="max-w-xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Manual Member Entry</h2>
            <form onSubmit={handleManualMember} className="bg-card p-8 rounded-2xl border border-white/10 shadow-2xl space-y-4">
              <div><label className="block text-sm font-medium text-gray-400 mb-2">Member Name</label><input type="text" value={manualMember.name} onChange={e => setManualMember({ ...manualMember, name: e.target.value })} className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-lg text-white" required /></div>
              <div><label className="block text-sm font-medium text-gray-400 mb-2">Phone Number</label><input type="tel" value={manualMember.phone} onChange={e => setManualMember({ ...manualMember, phone: e.target.value })} className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-lg text-white" required /></div>
              <div><label className="block text-sm font-medium text-gray-400 mb-2">Joint Date</label><input type="date" value={manualMember.joinDate} onChange={e => setManualMember({ ...manualMember, joinDate: e.target.value })} className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-lg text-white" /></div>
              <div><label className="block text-sm font-medium text-gray-400 mb-2">Upload Pic</label><input type="file" accept="image/*" onChange={e => setManualMember({ ...manualMember, photo: e.target.files[0] })} className="w-full text-gray-400" /></div>
              <button type="submit" disabled={uploading} className="w-full py-4 bg-primary text-white font-bold rounded-lg hover:bg-red-600 transition-all shadow-xl shadow-primary/10">{uploading ? 'Registering...' : 'Save Member Data'}</button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}
