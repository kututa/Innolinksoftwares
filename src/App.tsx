import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import HowItWorks from './components/HowItWorks';
import Footer from './components/Footer';
import Auth from './components/Auth';
import QuoteForm from './components/QuoteForm';
import Contact from './components/Contact';
import Blog from './components/Blog';

function App() {
  const [showAuth, setShowAuth] = useState(false);
  const [showQuoteForm, setShowQuoteForm] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  const handleAuthClick = (mode: 'login' | 'register') => {
    setAuthMode(mode);
    setShowAuth(true);
  };

  const handleCloseAuth = () => {
    setShowAuth(false);
  };

  const handleQuoteClick = () => {
    setShowQuoteForm(true);
  };

  const handleCloseQuote = () => {
    setShowQuoteForm(false);
  };

  if (showAuth) {
    return (
      <div>
        <button
          onClick={handleCloseAuth}
          className="fixed top-4 right-4 z-50 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors"
        >
          ✕
        </button>
        <Auth initialMode={authMode} />
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header onAuthClick={handleAuthClick} />
        <Routes>
          <Route path="/" element={
            <main className="pt-16">
              <Hero />
              <About />
              <Services onQuoteClick={handleQuoteClick} />
              <Portfolio />
              <HowItWorks />
            </main>
          } />
          <Route path="/about" element={
            <main className="pt-16">
              <About />
            </main>
          } />
          <Route path="/services" element={
            <main className="pt-16">
              <Services onQuoteClick={handleQuoteClick} />
            </main>
          } />
          <Route path="/services/web-design" element={<Navigate to="/services" replace />} />
          <Route path="/services/mobile-apps" element={<Navigate to="/services" replace />} />
          <Route path="/services/software-dev" element={<Navigate to="/services" replace />} />
          <Route path="/services/graphic-design" element={<Navigate to="/services" replace />} />
          <Route path="/services/digital-marketing" element={<Navigate to="/services" replace />} />
          <Route path="/services/it-consultancy" element={<Navigate to="/services" replace />} />
          <Route path="/portfolio" element={
            <main className="pt-16">
              <Portfolio />
            </main>
          } />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
        </Routes>
        <Footer />
        {showQuoteForm && <QuoteForm onClose={handleCloseQuote} />}
      </div>
    </Router>
  );
}

export default App;