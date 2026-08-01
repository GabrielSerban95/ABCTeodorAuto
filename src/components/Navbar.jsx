import React, { useState, useEffect } from 'react';
import { ENV } from '../config/env';
import { Phone, Calendar, UserCheck, Menu, X } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setActiveTab('main');
    setMobileMenuOpen(false);
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <nav 
      className={`fixed-top transition-nav ${
        scrolled ? 'glass-nav py-2 shadow-lg' : 'py-2'
      }`} 
      style={{ zIndex: 1040 }}
    >
      <div className="container-fluid px-3 px-lg-5 d-flex align-items-center justify-content-between">
        
        {/* Brand Logo & Name */}
        <div 
          className="d-flex align-items-center gap-2 me-3 flex-shrink-0 cursor-pointer" 
          style={{ cursor: 'pointer' }}
          onClick={() => { setActiveTab('main'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
        >
          <img 
            src="/Photos/Logo.png" 
            alt="Logo ABC Teodor" 
            height="40" 
            className="rounded-circle shadow-sm border border-secondary flex-shrink-0"
            onError={(e) => { e.target.src = '/Photos/Logo.svg'; }}
          />
          <div className="d-flex flex-column">
            <span className="fw-extrabold text-white tracking-wide font-heading lh-1" style={{ fontSize: '1.05rem', whiteSpace: 'nowrap' }}>
              {ENV.APP_NAME}
            </span>
            <small className="text-warning fw-semibold d-none d-sm-block lh-1 mt-1" style={{ fontSize: '0.68rem', whiteSpace: 'nowrap' }}>
              Instructori Autorizați Ploiești
            </small>
          </div>
        </div>

        {/* Desktop Navigation Links (visible ≥ 1200px) */}
        <div className="d-none d-xl-flex align-items-center gap-3 mx-auto">
          <button 
            onClick={() => scrollToSection('despre')} 
            className="btn btn-link text-white text-decoration-none fw-medium hover-text-warning p-0"
            style={{ whiteSpace: 'nowrap', fontSize: '0.88rem' }}
          >
            Despre Noi
          </button>
          
          <button 
            onClick={() => scrollToSection('cursuri')} 
            className="btn btn-link text-white text-decoration-none fw-medium hover-text-warning p-0"
            style={{ whiteSpace: 'nowrap', fontSize: '0.88rem' }}
          >
            Cursuri &amp; Tarife
          </button>

          <button 
            onClick={() => scrollToSection('parc-auto')} 
            className="btn btn-link text-white text-decoration-none fw-medium hover-text-warning p-0"
            style={{ whiteSpace: 'nowrap', fontSize: '0.88rem' }}
          >
            Parc Auto
          </button>

          <button 
            onClick={() => scrollToSection('programare')} 
            className="btn btn-link text-warning text-decoration-none fw-semibold p-0 d-flex align-items-center gap-2"
            style={{ whiteSpace: 'nowrap', fontSize: '0.88rem' }}
          >
            <Calendar size={14} className="flex-shrink-0" />
            <span>Programări</span>
          </button>

          <button 
            onClick={() => scrollToSection('faq')} 
            className="btn btn-link text-white text-decoration-none fw-medium hover-text-warning p-0"
            style={{ whiteSpace: 'nowrap', fontSize: '0.88rem' }}
          >
            FAQ
          </button>

          <button 
            onClick={() => scrollToSection('contact')} 
            className="btn btn-link text-white text-decoration-none fw-medium hover-text-warning p-0"
            style={{ whiteSpace: 'nowrap', fontSize: '0.88rem' }}
          >
            Contact
          </button>
        </div>

        {/* Action Buttons */}
        <div className="d-none d-md-flex align-items-center gap-2 flex-shrink-0 ms-2">
          {/* Quick Call Button */}
          <a 
            href={`tel:${ENV.PHONE_RAW}`} 
            className="btn btn-outline-light btn-sm rounded-pill px-2.5 py-1.5 d-flex align-items-center gap-1.5 text-nowrap"
            style={{ whiteSpace: 'nowrap' }}
          >
            <Phone size={13} className="text-warning flex-shrink-0" />
            <span className="fw-semibold" style={{ fontSize: '0.8rem' }}>{ENV.PHONE}</span>
          </a>

          {/* Instructor Portal Access Button */}
          <button 
            onClick={() => {
              setActiveTab(activeTab === 'portal' ? 'main' : 'portal');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`btn btn-sm rounded-pill px-3 py-1.5 d-flex align-items-center gap-1.5 fw-semibold text-nowrap ${
              activeTab === 'portal' 
                ? 'btn-warning text-dark' 
                : 'btn-primary bg-gradient-primary border-0'
            }`}
            style={{ whiteSpace: 'nowrap', fontSize: '0.8rem' }}
          >
            <UserCheck size={14} className="flex-shrink-0" />
            <span>{activeTab === 'portal' ? 'Înapoi la Site' : 'Portal Instructori'}</span>
          </button>
        </div>

        {/* Mobile Hamburger Button — hidden on xl and up */}
        <button 
          className="btn btn-link text-white d-xl-none p-1 ms-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Meniu Navigare"
        >
          {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>

      </div>

      {/* Mobile & Tablet Drawer Menu */}
      {mobileMenuOpen && (
        <div className="glass-panel mt-2 p-4 border-top border-secondary d-xl-none container rounded-4 shadow-xl">
          <div className="d-flex flex-column gap-3">
            <button 
              onClick={() => scrollToSection('despre')}
              className="btn btn-outline-secondary text-start text-white border-0 py-2"
            >
              🚗 Despre Noi
            </button>
            <button 
              onClick={() => scrollToSection('cursuri')}
              className="btn btn-outline-secondary text-start text-white border-0 py-2"
            >
              📜 Cursuri & Tarife
            </button>
            <button 
              onClick={() => scrollToSection('parc-auto')}
              className="btn btn-outline-secondary text-start text-white border-0 py-2"
            >
              🚘 Parc Auto
            </button>
            <button 
              onClick={() => scrollToSection('programare')}
              className="btn btn-outline-warning text-start text-warning border-0 py-2 fw-bold"
            >
              📅 Programări Ore Conducere
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="btn btn-outline-secondary text-start text-white border-0 py-2"
            >
              📍 Contact & Locație
            </button>
            <hr className="border-secondary my-1" />
            <div className="d-flex flex-column gap-2 pt-2">
              <a 
                href={`tel:${ENV.PHONE_RAW}`} 
                className="btn btn-outline-light rounded-pill py-2 text-center d-flex align-items-center justify-content-center gap-2"
              >
                <Phone size={18} className="text-warning" /> Sună Acum: {ENV.PHONE}
              </a>
              <button 
                onClick={() => {
                  setActiveTab(activeTab === 'portal' ? 'main' : 'portal');
                  setMobileMenuOpen(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="btn btn-primary bg-gradient-primary border-0 rounded-pill py-2 text-center d-flex align-items-center justify-content-center gap-2 fw-semibold"
              >
                <UserCheck size={18} />
                {activeTab === 'portal' ? 'Întoarcere la Pagina Principală' : 'Acces Portal Cadre Didactice'}
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
