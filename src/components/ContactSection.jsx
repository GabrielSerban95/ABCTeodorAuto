import React, { useState } from 'react';
import { ENV } from '../config/env';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, MessageSquare } from 'lucide-react';

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    category: 'cat-b',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', phone: '', email: '', category: 'cat-b', message: '' });
    }, 4000);
  };

  return (
    <section id="contact" className="py-5 position-relative" style={{ backgroundColor: '#090d16' }}>
      <div className="container py-4">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-5">
          <span className="badge-custom badge-amber mb-2">
            <MapPin size={14} /> Contact & Locație Sediul ABC Teodor
          </span>
          <h2 className="display-6 fw-extrabold text-site-heading font-heading">
            Ne Găsești În Ploiești Sau Ne Poți Scrie Online
          </h2>
          <p className="text-site-muted mt-2">
            Echipa noastră îți stă la dispoziție pentru orice detaliu sau pentru înscriere directă.
          </p>
        </div>

        <div className="row g-4">
          
          {/* Left Column: Contact Cards */}
          <div className="col-lg-5">
            <div className="d-flex flex-column gap-3 h-100">
              
              {/* Address Card */}
              <div className="glass-panel p-4 border border-secondary border-opacity-50 rounded-4 hover-lift">
                <div className="d-flex align-items-start gap-3">
                  <div className="p-3 rounded-3 bg-primary bg-opacity-20 text-primary border border-primary border-opacity-30">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h5 className="fw-bold text-site-heading mb-1 font-heading">Sediul Nostru Central</h5>
                    <p className="text-site-body font-body mb-2" style={{ fontSize: '0.9rem' }}>
                      {ENV.ADDRESS}
                    </p>
                    <a 
                      href={ENV.MAPS_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline-warning btn-sm rounded-pill px-3 fw-semibold d-inline-flex align-items-center gap-1"
                    >
                      <MapPin size={14} /> Deschide în Google Maps
                    </a>
                  </div>
                </div>
              </div>

              {/* Phone Card */}
              <div className="glass-panel p-4 border border-secondary border-opacity-50 rounded-4 hover-lift">
                <div className="d-flex align-items-start gap-3">
                  <div className="p-3 rounded-3 bg-warning bg-opacity-20 text-warning border border-warning border-opacity-30">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h5 className="fw-bold text-site-heading mb-1 font-heading">Telefon & WhatsApp</h5>
                    <p className="text-site-body font-body mb-2" style={{ fontSize: '0.9rem' }}>
                      Contactează-ne direct pentru informații rapide sau înscrieri.
                    </p>
                    <a 
                      href={`tel:${ENV.PHONE_RAW}`}
                      className="text-warning fw-bold fs-5 text-decoration-none d-block mb-1"
                    >
                      {ENV.PHONE}
                    </a>
                  </div>
                </div>
              </div>

              {/* Schedule Card */}
              <div className="glass-panel p-4 border border-secondary border-opacity-50 rounded-4 hover-lift">
                <div className="d-flex align-items-start gap-3">
                  <div className="p-3 rounded-3 bg-info bg-opacity-20 text-info border border-info border-opacity-30">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h5 className="fw-bold text-site-heading mb-1 font-heading">Program Înscrieri & Secretariat</h5>
                    <p className="text-site-body font-body mb-0" style={{ fontSize: '0.9rem' }}>
                      {ENV.WORKING_HOURS}
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="col-lg-7">
            <div className="glass-panel p-4 p-md-5 border border-secondary border-opacity-50 rounded-4 shadow-2xl h-100">
              
              <h4 className="fw-bold text-site-heading mb-2 font-heading d-flex align-items-center gap-2">
                <MessageSquare className="text-warning" size={22} /> Trimite-ne Un Mesaj
              </h4>
              <p className="text-site-muted mb-4" style={{ fontSize: '0.9rem' }}>
                Completează formularul de mai jos și un reprezentant te va contacta în cel mai scurt timp:
              </p>

              {submitted ? (
                <div className="alert alert-success p-4 rounded-3 text-center my-4">
                  <CheckCircle2 size={40} className="mb-2 text-success" />
                  <h5 className="fw-bold mb-1 text-site-heading">Mesajul Tău A Fost Trimis!</h5>
                  <p className="mb-0 text-gray-200 small">Îți mulțumim! Te vom contacta în maxim 24 de ore lucrătoare.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    
                    <div className="col-md-6">
                      <label className="form-label text-gray-300 small fw-semibold">Nume și Prenume *</label>
                      <input 
                        type="text"
                        required
                        placeholder="Numele tău complet"
                        className="form-control bg-dark text-white border-secondary p-2.5"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label text-gray-300 small fw-semibold">Număr Telefon *</label>
                      <input 
                        type="tel"
                        required
                        placeholder="07xx xxx xxx"
                        className="form-control bg-dark text-white border-secondary p-2.5"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label text-gray-300 small fw-semibold">Adresă Email</label>
                      <input 
                        type="email"
                        placeholder="email@domeniu.ro"
                        className="form-control bg-dark text-white border-secondary p-2.5"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label text-gray-300 small fw-semibold">Categoria Dorită</label>
                      <select 
                        className="form-select bg-dark text-white border-secondary p-2.5"
                        value={formData.category}
                        onChange={(e) => setFormData({...formData, category: e.target.value})}
                      >
                        <option value="cat-b">Categoria B (Autoturisme)</option>
                        <option value="cat-c">Categoria C (Camioane)</option>
                        <option value="cat-ce">Categoria C+E (Ansamblu)</option>
                        <option value="extra">Ore Suplimentare</option>
                        <option value="instructor-course">Curs Instructor Auto</option>
                      </select>
                    </div>

                    <div className="col-md-12">
                      <label className="form-label text-gray-300 small fw-semibold">Mesajul Tău sau Întrebări</label>
                      <textarea 
                        rows="4"
                        placeholder="Scrie-ne detalii despre disponibilitatea ta sau întrebări..."
                        className="form-control bg-dark text-white border-secondary p-2.5"
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                      ></textarea>
                    </div>

                    <div className="col-md-12 text-end">
                      <button 
                        type="submit"
                        className="btn btn-warning rounded-pill px-5 py-3 fw-bold d-inline-flex align-items-center gap-2 shadow hover-lift text-dark"
                      >
                        <Send size={18} />
                        <span>Trimite Mesajul</span>
                      </button>
                    </div>

                  </div>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
