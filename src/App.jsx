import React, { useState } from 'react';
import Home from './pages/Home';
import Admission from './pages/Admission';
import Admin from './pages/Admin';
import Gallery from './pages/Gallery';
import AboutUs from './pages/AboutUs';
import Trainers from './pages/Trainers';
import SafetyPolicies from './pages/SafetyPolicies';
import FAQ from './pages/FAQ';
import ContactUs from './pages/ContactUs';
import TermsConditions from './pages/TermsConditions';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Header from './components/Header';
import Footer from './components/Footer';
import { getUser, clearAuth } from './utils/auth';
import './index.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [authUser, setAuthUser] = useState(getUser);

  // Scroll to top when page changes
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const handleLoginSuccess = (user) => {
    setAuthUser(user);
  };

  const handleLogout = () => {
    clearAuth();
    setAuthUser(null);
    setCurrentPage('home');
  };

  const noHeaderFooter = currentPage === 'admin' || currentPage === 'login' || currentPage === 'register' || currentPage === 'profile';

  return (
    <div className="min-h-screen flex flex-col bg-dark text-white font-sans">
      {!noHeaderFooter && (
        <Header
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          authUser={authUser}
          onLogout={handleLogout}
        />
      )}

      <main className="flex-1 flex flex-col">
        {currentPage === 'home'     && <Home onNavigate={setCurrentPage} />}
        {currentPage === 'admission'&& <Admission />}
        {currentPage === 'admin'    && <Admin setCurrentPage={setCurrentPage} />}
        {currentPage === 'gallery'  && <Gallery />}
        {currentPage === 'about'    && <AboutUs />}
        {currentPage === 'trainers' && <Trainers />}
        {currentPage === 'safety'   && <SafetyPolicies />}
        {currentPage === 'faq'      && <FAQ />}
        {currentPage === 'contact'  && <ContactUs />}
        {currentPage === 'terms'    && <TermsConditions />}
        {currentPage === 'login'    && (
          <Login onNavigate={setCurrentPage} onLoginSuccess={handleLoginSuccess} />
        )}
        {currentPage === 'register' && (
          <Register onNavigate={setCurrentPage} onLoginSuccess={handleLoginSuccess} />
        )}
        {currentPage === 'profile'  && (
          <Profile onNavigate={setCurrentPage} onLogout={handleLogout} />
        )}
      </main>

      {!noHeaderFooter && <Footer onNavigate={setCurrentPage} />}
    </div>
  );
}

export default App;
