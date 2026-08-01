import React from 'react';
import { ENV } from '../config/env';
import { ShieldCheck, Calendar, ArrowRight, Award, Users, CheckCircle2, PhoneCall } from 'lucide-react';

export default function Hero({ onOpenBooking, onOpenCourses }) {
  return (
    <section id="hero" className="position-relative min-vh-100 d-flex align-items-center overflow-hidden" style={{ paddingTop: '80px', paddingBottom: '3rem' }}>
      
      {/* Background Video Layer */}
      <div className="hero-video-wrapper">
        <video autoPlay muted loop playsInline id="bg-video">
          <source src="/Photos/background.mp4" type="video/mp4" />
          Browserul tău nu suportă elementul video.
        </video>
      </div>

      {/* Hero Darkness & Gradient Overlay */}
      <div className="hero-overlay"></div>

      {/* Main Content */}
      <div className="container position-relative py-5" style={{ zIndex: 2 }}>
        <div className="row align-items-center gy-5">
          
          <div className="col-lg-7 text-start">
            
            {/* Top Badge */}
            <div className="mb-3">
              <span className="badge-custom badge-amber shadow-sm">
                <ShieldCheck size={16} /> Școală Auto Autorizată Ploiești & Prahova
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="display-4 fw-black text-white mb-3 font-heading lh-sm" style={{ letterSpacing: '-0.02em', lineHeight: 1.05 }}>
              {ENV.HERO_TITLE.split('ABC Teodor')[0]}
              <span className="text-gradient d-inline-block">ABC Teodor</span>
            </h1>

            {/* Subtitle */}
            <p className="lead text-gray-300 mb-4 me-lg-4 font-body" style={{ color: '#d1d5db', fontSize: 'clamp(1rem, 1.1rem, 1.14rem)', lineHeight: 1.7 }}>
              {ENV.HERO_SUBTITLE}
            </p>

            {/* Highlights bullet points */}
            <div className="d-flex flex-column flex-sm-row gap-3 mb-4 text-gray-200">
              <div className="d-flex align-items-center gap-2">
                <CheckCircle2 size={18} className="text-warning flex-shrink-0" />
                <span className="fw-medium" style={{ fontSize: '0.95rem' }}>Plată flexibilă în 3 rate</span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <CheckCircle2 size={18} className="text-warning flex-shrink-0" />
                <span className="fw-medium" style={{ fontSize: '0.95rem' }}>Mașini noi (Manual / Automat)</span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <CheckCircle2 size={18} className="text-warning flex-shrink-0" />
                <span className="fw-medium" style={{ fontSize: '0.95rem' }}>Instructori răbdători</span>
              </div>
            </div>

            {/* Call to Action Buttons */}
            <div className="d-flex flex-wrap align-items-center hero-cta-stack">
              <button 
                onClick={onOpenBooking}
                className="btn btn-warning btn-lg rounded-pill px-4 py-3 fw-bold d-flex align-items-center gap-2 shadow-lg hover-lift text-dark"
              >
                <Calendar size={20} />
                <span>Programează-te Online</span>
                <ArrowRight size={18} />
              </button>

              <button 
                onClick={onOpenCourses}
                className="btn btn-outline-light btn-lg rounded-pill px-4 py-3 fw-semibold hover-lift"
              >
                Vezi Cursurile & Tarifele
              </button>
            </div>

          </div>

          {/* Right Side Visual Badge Card */}
          <div className="col-lg-5">
            <div className="glass-panel p-4 p-md-5 border border-secondary shadow-2xl rounded-4 position-relative" style={{ transform: 'translateY(8px)' }}>
              
              {/* Card Header with Logo */}
              <div className="d-flex align-items-center gap-3 mb-4">
                <img 
                  src="/Photos/Logo.png" 
                  alt="ABC Teodor Logo" 
                  width="64"
                  className="rounded-3 shadow"
                  onError={(e) => { e.target.src = '/Photos/Logo.svg'; }}
                />
                <div>
                  <h4 className="fw-bold text-site-heading mb-0 font-heading">Pregătire Auto Premium</h4>
                  <small className="text-warning">Permis Categoria B, C, C+E</small>
                </div>
              </div>

              <hr className="border-secondary my-3" />

              {/* Stat Counters Grid */}
              <div className="row g-3 text-center">
                
                <div className="col-6">
                  <div className="p-3 rounded-3 bg-dark bg-opacity-50 border border-secondary">
                    <h2 className="fw-extrabold text-warning mb-0 font-heading">96%</h2>
                    <small className="text-gray-400 d-block" style={{ fontSize: '0.8rem' }}>Rată Promovabilitate</small>
                  </div>
                </div>

                <div className="col-6">
                  <div className="p-3 rounded-3 bg-dark bg-opacity-50 border border-secondary">
                    <h2 className="fw-extrabold text-info mb-0 font-heading">1500+</h2>
                    <small className="text-gray-400 d-block" style={{ fontSize: '0.8rem' }}>Elevi Permis Obținut</small>
                  </div>
                </div>

                <div className="col-6">
                  <div className="p-3 rounded-3 bg-dark bg-opacity-50 border border-secondary">
                    <h2 className="fw-extrabold text-success mb-0 font-heading">14+ Ani</h2>
                    <small className="text-gray-400 d-block" style={{ fontSize: '0.8rem' }}>Experiență Instructori</small>
                  </div>
                </div>

                <div className="col-6">
                  <div className="p-3 rounded-3 bg-dark bg-opacity-50 border border-secondary">
                    <h2 className="fw-extrabold text-primary mb-0 font-heading">3 Rate</h2>
                    <small className="text-gray-400 d-block" style={{ fontSize: '0.8rem' }}>Fără Dobândă</small>
                  </div>
                </div>

              </div>

              {/* Quick Info Box */}
              <div className="mt-4 p-3 rounded-3 bg-primary bg-opacity-15 border border-primary border-opacity-30 d-flex align-items-center gap-3" style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)' }}>
                <Award size={28} className="text-warning flex-shrink-0" />
                <div className="text-start">
                  <span className="fw-bold text-site-heading d-block" style={{ fontSize: '0.9rem' }}>Punct de plecare flexibil</span>
                  <small className="text-gray-300" style={{ fontSize: '0.8rem' }}>Preluare din Ploiești de acasă sau de la locul de muncă/școală.</small>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
