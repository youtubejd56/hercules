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
import Header from './components/Header';
import Footer from './components/Footer';
import './index.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  // Scroll to top when page changes
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  return (
    <div className="min-h-screen flex flex-col bg-dark text-white font-sans">
      {currentPage !== 'admin' && <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />}

      <main className="flex-1 flex flex-col">
        {currentPage === 'home' && <Home onNavigate={setCurrentPage} />}
        {currentPage === 'admission' && <Admission />}
        {currentPage === 'admin' && <Admin setCurrentPage={setCurrentPage} />}
        {currentPage === 'gallery' && <Gallery />}
        {currentPage === 'about' && <AboutUs />}
        {currentPage === 'trainers' && <Trainers />}
        {currentPage === 'safety' && <SafetyPolicies />}
        {currentPage === 'faq' && <FAQ />}
        {currentPage === 'contact' && <ContactUs />}
        {currentPage === 'terms' && <TermsConditions />}
      </main>

      {currentPage !== 'admin' && <Footer onNavigate={setCurrentPage} />}
    </div>
  );
}

export default App;
