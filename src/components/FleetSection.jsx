import React from 'react';
import { FLEET, INSTRUCTORS } from '../data/mockData';
import { Car, Award, Shield, Star, CheckCircle, Phone } from 'lucide-react';

export default function FleetSection() {
  return (
    <section id="parc-auto" className="py-5 position-relative bg-dark">
      <div className="container py-4">
        
        {/* Fleet Header */}
        <div className="text-center mb-5">
          <span className="badge-custom badge-amber mb-2">
            <Car size={14} /> Flota & Echipa Noastră
          </span>
          <h2 className="display-6 fw-extrabold text-white font-heading">
            Vehicule Moderne & Instructori Dedicați
          </h2>
          <p className="text-gray-400 mt-2" style={{ color: '#9ca3af', maxWidth: '650px', margin: '0 auto' }}>
            Toate vehiculele sunt dotate cu dublă comandă omologată RAR, climatizare automatizată și sisteme de siguranță de ultimă generație.
          </p>
        </div>

        {/* Fleet Cars Showcase */}
        <h4 className="fw-bold text-white mb-4 font-heading d-flex align-items-center gap-2">
          <Shield className="text-warning" size={22} /> Parcul Auto ABC Teodor
        </h4>

        <div className="row g-4 mb-5">
          {FLEET.map((item) => (
            <div className="col-lg-4 col-md-6" key={item.id}>
              <div className="glass-panel border border-secondary border-opacity-50 rounded-4 overflow-hidden h-100 hover-lift d-flex flex-column">
                
                {/* Vehicle Image */}
                <div className="position-relative" style={{ height: '200px', backgroundColor: '#1f293d' }}>
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-100 h-100 object-fit-cover opacity-90"
                    onError={(e) => { e.target.src = '/Photos/cat.B.jpg'; }}
                  />
                  <div className="position-absolute bottom-0 start-0 m-3">
                    <span className="badge-custom bg-dark bg-opacity-75 text-white border-secondary">
                      An fabricație {item.year}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-4 d-flex flex-column justify-content-between flex-grow-1">
                  <div>
                    <span className="badge-custom badge-amber mb-2" style={{ fontSize: '0.75rem' }}>
                      {item.category}
                    </span>
                    <h5 className="fw-bold text-white mb-3 font-heading">
                      {item.name}
                    </h5>

                    <ul className="list-unstyled d-flex flex-column gap-2 mb-0" style={{ fontSize: '0.85rem' }}>
                      {item.features.map((feat, idx) => (
                        <li key={idx} className="d-flex align-items-center gap-2 text-gray-300">
                          <CheckCircle size={15} className="text-info flex-shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Instructors Showcase */}
        <h4 className="fw-bold text-white mb-4 pt-3 font-heading d-flex align-items-center gap-2">
          <Award className="text-info" size={22} /> Instructori Auto Certificați
        </h4>

        <div className="row g-4">
          {INSTRUCTORS.map((inst) => (
            <div className="col-lg-3 col-md-6" key={inst.id}>
              <div className="glass-panel border border-secondary border-opacity-50 rounded-4 p-4 text-center h-100 hover-lift d-flex flex-column justify-content-between">
                
                <div>
                  {/* Avatar */}
                  <div className="position-relative d-inline-block mb-3">
                    <img 
                      src={inst.avatar} 
                      alt={inst.name}
                      width="96"
                      height="96"
                      className="rounded-circle object-fit-cover border border-2 border-warning shadow"
                    />
                    <span className="position-absolute bottom-0 end-0 bg-warning text-dark fw-bold rounded-pill px-2 py-0.5" style={{ fontSize: '0.7rem' }}>
                      <Star size={11} fill="#1f2937" color="#1f2937" /> {inst.passRate}
                    </span>
                  </div>

                  <h5 className="fw-bold text-white mb-1 font-heading">{inst.name}</h5>
                  <small className="text-warning d-block fw-semibold mb-2">{inst.role}</small>
                  <span className="badge-custom mb-3" style={{ fontSize: '0.75rem' }}>{inst.experience}</span>

                  <p className="text-gray-300 font-body mb-3" style={{ color: '#d1d5db', fontSize: '0.85rem', lineHeight: '1.5' }}>
                    "{inst.bio}"
                  </p>
                </div>

                <div className="pt-3 border-top border-secondary border-opacity-40">
                  <small className="text-gray-400 d-block mb-2" style={{ fontSize: '0.78rem' }}>
                    🚘 {inst.car}
                  </small>
                  <a 
                    href={`tel:${inst.phone}`} 
                    className="btn btn-outline-light btn-sm rounded-pill w-100 d-flex align-items-center justify-content-center gap-2"
                  >
                    <Phone size={14} className="text-warning" /> {inst.phone}
                  </a>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
