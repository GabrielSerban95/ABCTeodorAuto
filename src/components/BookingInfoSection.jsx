import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { ROUTES } from '../constants/routes';
import { ENV } from '../config/env';
import {
  Calendar,
  ShieldCheck,
  UserCheck,
  Clock,
  Car,
  Award,
  ArrowRight,
  LogIn,
  UserPlus,
  LayoutDashboard,
  CheckCircle,
} from 'lucide-react';

export default function BookingInfoSection() {
  const navigate = useNavigate();
  const { isAuthenticated, user, profile } = useAuth();

  const steps = [
    {
      step: '01',
      title: 'Înscriere & Obținere Cod',
      description: 'Te înscrii la școală și primești codul secret de acces direct de la instructorul tău sau secretariat.',
      icon: <ShieldCheck size={24} className="text-warning" />,
    },
    {
      step: '02',
      title: 'Creare Cont & Alocare',
      description: 'Îți creezi contul securizat de elev. Sistemul te conectează automat cu instructorul tău desemnat.',
      icon: <UserCheck size={24} className="text-info" />,
    },
    {
      step: '03',
      title: 'Programare Ore în Dashboard',
      description: 'Alegi direct din panoul tău data, intervalul orar și locația de preluare pentru fiecare ședință.',
      icon: <Clock size={24} className="text-success" />,
    },
    {
      step: '04',
      title: 'Confirmare & Condus',
      description: 'Instructorul tău confirmă ședința, iar tu ești gata pentru traseu și pregătirea examenului auto!',
      icon: <Car size={24} className="text-warning" />,
    },
  ];

  return (
    <section id="programare" className="py-5 position-relative" style={{ backgroundColor: '#090d16' }}>
      <div className="container py-4">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-5">
          <span className="badge-custom badge-amber mb-2 d-inline-flex align-items-center gap-1.5">
            <Calendar size={14} /> Sistem Inteligent de Programare
          </span>
          <h2 className="display-6 fw-extrabold text-site-heading font-heading">
            Cum Funcționează Programările Orelelor Practice
          </h2>
          <p className="text-site-muted mt-2" style={{ maxWidth: '620px', margin: '0 auto' }}>
            Pentru o organizare impecabilă și siguranța calendarului, ședințele practice se programează direct din <strong>Portalul Elevului</strong>, în conexiune directă cu instructorul tău.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="row g-4 mb-5">
          {steps.map((item, idx) => (
            <div className="col-lg-3 col-md-6" key={idx}>
              <div className="glass-panel p-4 rounded-4 border border-secondary border-opacity-50 h-100 d-flex flex-column justify-content-between hover-lift">
                <div>
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <div className="p-3 rounded-3 bg-dark bg-opacity-80 border border-secondary border-opacity-40">
                      {item.icon}
                    </div>
                    <span className="display-6 fw-extrabold text-secondary text-opacity-30 font-heading">
                      {item.step}
                    </span>
                  </div>
                  <h3 className="h6 fw-bold text-white mb-2 font-heading">{item.title}</h3>
                  <p className="text-muted small mb-0" style={{ lineHeight: '1.5' }}>
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Card */}
        <div className="glass-panel p-4 p-md-5 rounded-4 border border-warning border-opacity-40 text-center shadow-2xl position-relative overflow-hidden">
          <div className="position-relative" style={{ zIndex: 2 }}>
            
            {isAuthenticated ? (
              <>
                <div className="d-inline-flex p-3 rounded-circle bg-success bg-opacity-20 text-success mb-3 border border-success border-opacity-40">
                  <CheckCircle size={36} />
                </div>
                <h3 className="h4 fw-bold text-white font-heading mb-2">
                  Ești conectat ca {profile?.name || user?.displayName || user?.email}!
                </h3>
                <p className="text-muted mb-4 max-w-md mx-auto" style={{ maxWidth: 520, margin: '0 auto' }}>
                  Accesează panoul tău de elev pentru a alege data și ora următoarei ședințe practice de conducere.
                </p>
                <button
                  className="btn btn-warning bg-gradient-warning rounded-pill px-5 py-3 fw-bold text-dark d-inline-flex align-items-center gap-2 shadow hover-lift"
                  onClick={() => navigate(ROUTES.DASHBOARD)}
                >
                  <LayoutDashboard size={18} />
                  <span>Mergi la Panoul de Elev &amp; Programează</span>
                  <ArrowRight size={18} />
                </button>
              </>
            ) : (
              <>
                <h3 className="h4 fw-bold text-white font-heading mb-2">
                  Gata să începi orele de condus?
                </h3>
                <p className="text-muted mb-4 max-w-md mx-auto" style={{ maxWidth: 560, margin: '0 auto' }}>
                  Dacă ești deja elev înscris, intră în cont pentru a-ți alege orele. Dacă ești elev nou, creează-ți contul folosind codul primit de la instructor.
                </p>

                <div className="d-flex flex-wrap justify-content-center gap-3">
                  <button
                    className="btn btn-warning bg-gradient-warning rounded-pill px-4 py-2.5 fw-bold text-dark d-flex align-items-center gap-2 shadow"
                    onClick={() => navigate(ROUTES.LOGIN)}
                  >
                    <LogIn size={18} />
                    <span>Autentificare Elev</span>
                  </button>

                  <button
                    className="btn btn-outline-light rounded-pill px-4 py-2.5 fw-semibold d-flex align-items-center gap-2"
                    onClick={() => navigate(ROUTES.REGISTER)}
                  >
                    <UserPlus size={18} />
                    <span>Înregistrare Cont Elev (cu Cod)</span>
                  </button>
                </div>

                <div className="mt-4 pt-3 border-top border-secondary border-opacity-30">
                  <small className="text-muted">
                    Ai nevoie de asistență sau dorești să te înscrii? Sună la{' '}
                    <a href={`tel:${ENV.PHONE_RAW}`} className="text-warning text-decoration-none fw-semibold">
                      {ENV.PHONE}
                    </a>
                  </small>
                </div>
              </>
            )}

          </div>
        </div>

      </div>
    </section>
  );
}
