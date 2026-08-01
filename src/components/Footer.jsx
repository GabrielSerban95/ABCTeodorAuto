import React from 'react';
import { ENV } from '../config/env';
import { Phone, MapPin, Mail, ShieldCheck, Facebook, Instagram, MessageCircle } from 'lucide-react';

export default function Footer({ onNavigate }) {
  return (
    <footer className="bg-black text-site-muted py-5 border-top border-secondary border-opacity-30">
      <div className="container">
        
        <div className="row gy-4 mb-4">
          
          {/* Col 1: Brand */}
          <div className="col-lg-4 col-md-6">
            <div className="d-flex align-items-center gap-3 mb-3">
              <img 
                src="/Photos/Logo.png" 
                alt="Logo ABC Teodor" 
                height="48"
                className="rounded-circle border border-secondary"
                onError={(e) => { e.target.src = '/Photos/Logo.svg'; }}
              />
              <div>
                <h5 className="fw-bold text-site-heading mb-0 font-heading">{ENV.APP_NAME}</h5>
                <small className="text-warning">Ploiești, Prahova</small>
              </div>
            </div>
            <p className="text-site-muted font-body mb-3" style={{ fontSize: '0.88rem', lineHeight: '1.6' }}>
              {ENV.APP_TAGLINE}
            </p>
            <div className="d-flex align-items-center gap-2">
              <ShieldCheck className="text-warning" size={18} />
              <small className="text-site-body">Școală de instructori & conducători auto autorizată ARR</small>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="col-lg-3 col-md-6">
            <h6 className="fw-bold text-site-heading mb-3 font-heading" style={{ letterSpacing: '0.5px' }}>NAVIGARE RAPIDĂ</h6>
            <ul className="list-unstyled d-flex flex-column gap-2 mb-0" style={{ fontSize: '0.88rem' }}>
              <li>
                <button onClick={() => onNavigate('despre')} className="btn btn-link text-site-muted text-decoration-none p-0 hover-text-warning">
                  🚗 Despre Școală
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('cursuri')} className="btn btn-link text-site-muted text-decoration-none p-0 hover-text-warning">
                  📜 Cursuri Auto & Rate
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('parc-auto')} className="btn btn-link text-site-muted text-decoration-none p-0 hover-text-warning">
                  🚘 Parcul Auto & Instructori
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('programare')} className="btn btn-link text-site-muted text-decoration-none p-0 hover-text-warning fw-semibold">
                  📅 Programări Ore Conducere
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact info & Socials */}
          <div className="col-lg-5 col-md-12">
            <h6 className="fw-bold text-site-heading mb-3 font-heading" style={{ letterSpacing: '0.5px' }}>CONTACT & ADRESĂ</h6>
            <ul className="list-unstyled d-flex flex-column gap-2 mb-3" style={{ fontSize: '0.88rem' }}>
              <li className="d-flex align-items-center gap-2">
                <MapPin size={16} className="text-warning flex-shrink-0" />
                <span className="text-site-body">{ENV.ADDRESS}</span>
              </li>
              <li className="d-flex align-items-center gap-2">
                <Phone size={16} className="text-warning flex-shrink-0" />
                <a href={`tel:${ENV.PHONE_RAW}`} className="text-site-body text-decoration-none">{ENV.PHONE}</a>
              </li>
              <li className="d-flex align-items-center gap-2">
                <Mail size={16} className="text-warning flex-shrink-0" />
                <a href={`mailto:${ENV.EMAIL}`} className="text-site-body text-decoration-none">{ENV.EMAIL}</a>
              </li>
            </ul>

            <div className="d-flex align-items-center gap-2 pt-2">
              <a 
                href={ENV.FACEBOOK} 
                target="_blank" 
                rel="noreferrer" 
                className="btn btn-outline-light btn-sm rounded-circle p-2 d-inline-flex align-items-center justify-content-center hover-lift"
                style={{ width: '38px', height: '38px' }}
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a 
                href={ENV.INSTAGRAM} 
                target="_blank" 
                rel="noreferrer" 
                className="btn btn-outline-light btn-sm rounded-circle p-2 d-inline-flex align-items-center justify-content-center hover-lift"
                style={{ width: '38px', height: '38px' }}
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a 
                href={ENV.WHATSAPP} 
                target="_blank" 
                rel="noreferrer" 
                className="btn btn-outline-warning btn-sm rounded-circle p-2 d-inline-flex align-items-center justify-content-center hover-lift"
                style={{ width: '38px', height: '38px' }}
                aria-label="WhatsApp"
              >
                <MessageCircle size={18} />
              </a>
            </div>
          </div>

        </div>

        <hr className="border-secondary border-opacity-30 my-4" />

        <div className="d-flex flex-column flex-md-row align-items-center justify-content-between text-center text-md-start" style={{ fontSize: '0.8rem' }}>
          <p className="mb-2 mb-md-0">
            © {new Date().getFullYear()} {ENV.APP_NAME}. Toate drepturile rezervate.
          </p>
          <p className="mb-0 text-gray-400">
            {ENV.ADDRESS}
          </p>
        </div>

      </div>
    </footer>
  );
}
