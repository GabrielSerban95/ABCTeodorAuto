import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ENV } from '../config/env';
import { ROUTES, ROLE_DEFAULT_ROUTE } from '../constants/routes';
import { useAuth } from '../hooks/useAuth';
import { Calendar, Menu, X, LogIn, LogOut, LayoutDashboard } from 'lucide-react';

export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout, loading, role } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const dashboardRoute = ROLE_DEFAULT_ROUTE[role] || ROUTES.DASHBOARD;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
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
          style={{ cursor: 'pointer', padding: '0.2rem 0.4rem', borderRadius: '999px' }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
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
          {loading ? null : user ? (
            <>
              <button
                type="button"
                className="btn btn-outline-light btn-sm rounded-pill px-3 py-1.5 d-flex align-items-center gap-1.5 text-nowrap"
                onClick={() => navigate(dashboardRoute)}
                style={{ whiteSpace: 'nowrap', fontSize: '0.8rem' }}
              >
                <LayoutDashboard size={14} className="flex-shrink-0" />
                <span>Contul meu</span>
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary btn-sm rounded-pill px-3 py-1.5 d-flex align-items-center gap-1.5 text-nowrap"
                onClick={async () => {
                  await logout();
                  navigate(ROUTES.HOME);
                }}
                style={{ whiteSpace: 'nowrap', fontSize: '0.8rem' }}
              >
                <LogOut size={14} className="flex-shrink-0" />
                <span>Ieşire</span>
              </button>
            </>
          ) : (
            <button
              type="button"
              className="btn btn-primary btn-sm rounded-pill px-3 py-1.5 d-flex align-items-center gap-1.5 text-nowrap"
              onClick={() => navigate(ROUTES.LOGIN)}
              style={{ whiteSpace: 'nowrap', fontSize: '0.8rem' }}
            >
              <LogIn size={14} className="flex-shrink-0" />
              <span>Autentificare</span>
            </button>
          )}
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
              {loading ? null : user ? (
              <>
                <button
                  type="button"
                  className="btn btn-primary bg-gradient-primary border-0 rounded-pill py-2 text-center d-flex align-items-center justify-content-center gap-2 fw-semibold"
                  onClick={() => {
                    navigate(dashboardRoute);
                    setMobileMenuOpen(false);
                  }}
                >
                  <LayoutDashboard size={18} />
                  Contul meu
                </button>
                <button
                  type="button"
                  className="btn btn-outline-secondary rounded-pill py-2 text-center d-flex align-items-center justify-content-center gap-2"
                  onClick={async () => {
                    await logout();
                    navigate(ROUTES.HOME);
                    setMobileMenuOpen(false);
                  }}
                >
                  <LogOut size={18} />
                  Ieşire
                </button>
              </>
            ) : (
              <button
                type="button"
                className="btn btn-primary bg-gradient-primary border-0 rounded-pill py-2 text-center d-flex align-items-center justify-content-center gap-2 fw-semibold"
                onClick={() => {
                  navigate(ROUTES.LOGIN);
                  setMobileMenuOpen(false);
                }}
              >
                <LogIn size={18} />
                Autentificare
              </button>
            )}
          </div>
          </div>
        </div>
      )}
    </nav>
  );
}
