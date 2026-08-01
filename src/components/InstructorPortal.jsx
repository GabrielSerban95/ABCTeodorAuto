import React, { useState, useEffect } from 'react';
import { INSTRUCTORS, INITIAL_BOOKINGS } from '../data/mockData';
import { ENV } from '../config/env';
import { UserCheck, Calendar, Clock, CheckCircle, XCircle, Phone, Shield, Search, Filter, AlertCircle, LogOut, ChevronRight, Check } from 'lucide-react';

export default function InstructorPortal() {
  const [selectedInstructor, setSelectedInstructor] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('abc_bookings') || '[]');
    const combined = [...saved, ...INITIAL_BOOKINGS];
    setBookings(combined);
  }, []);

  const handleLogin = (inst) => {
    setSelectedInstructor(inst);
  };

  const handleStatusChange = (bookingId, newStatus) => {
    const updated = bookings.map(b => {
      if (b.id === bookingId) {
        return { ...b, status: newStatus };
      }
      return b;
    });
    setBookings(updated);
    localStorage.setItem('abc_bookings', JSON.stringify(updated.filter(b => b.id.startsWith('BK-') && !INITIAL_BOOKINGS.some(ib => ib.id === b.id))));
  };

  const instructorBookings = selectedInstructor 
    ? bookings.filter(b => b.instructorId === selectedInstructor.id || b.instructorName.includes(selectedInstructor.name.split(' ')[0]))
    : bookings;

  const filteredBookings = instructorBookings.filter(b => {
    const matchesStatus = statusFilter === 'all' || b.status === statusFilter;
    const matchesSearch = b.studentName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          b.studentPhone.includes(searchTerm) ||
                          b.categoryName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div id="portal-instructori" className="py-5 min-vh-100 position-relative" style={{ backgroundColor: '#090d16', paddingTop: '130px' }}>
      <div className="container py-4 mt-2">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-5 pt-3">
          <span className="badge-custom badge-amber mb-3 d-inline-flex align-items-center gap-1">
            <Shield size={14} /> {ENV.INSTRUCTOR_PORTAL_TITLE}
          </span>
          <h2 className="display-6 fw-extrabold text-white font-heading mt-2">
            Management Programări & Cadre Didactice
          </h2>
          <p className="text-gray-400 mt-2" style={{ color: '#9ca3af', maxWidth: '650px', margin: '0 auto' }}>
            Spațiu securizat dedicat instructorilor auto pentru vizualizarea orelor de conducere, gestiunea elevilor și confirmarea programărilor.
          </p>
        </div>

        {/* LOGIN SCREEN IF NOT LOGGED IN */}
        {!selectedInstructor ? (
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="glass-panel p-4 p-md-5 border border-secondary border-opacity-50 rounded-4 shadow-2xl">
                
                <h4 className="fw-bold text-white mb-3 text-center font-heading">
                  Autentificare Instructor Auto
                </h4>
                <p className="text-gray-300 text-center mb-4" style={{ fontSize: '0.9rem' }}>
                  Selectează profilul tău de instructor pentru acces rapid la agenda zilnică de ore de conducere:
                </p>

                {/* Quick Selection Buttons */}
                <div className="row g-3 mb-4">
                  {INSTRUCTORS.map(inst => (
                    <div className="col-md-6" key={inst.id}>
                      <div 
                        className="p-3 rounded-3 border border-secondary bg-dark bg-opacity-60 hover-lift cursor-pointer d-flex align-items-center gap-3"
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleLogin(inst)}
                      >
                        <img 
                          src={inst.avatar} 
                          alt={inst.name} 
                          width="54" 
                          height="54" 
                          className="rounded-circle object-fit-cover border border-warning flex-shrink-0" 
                        />
                        <div>
                          <h6 className="fw-bold text-white mb-0">{inst.name}</h6>
                          <small className="text-warning d-block">{inst.role}</small>
                          <small className="text-gray-400" style={{ fontSize: '0.75rem' }}>🚘 {inst.car}</small>
                        </div>
                        <ChevronRight size={20} className="text-gray-400 ms-auto" />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-3 rounded-3 bg-primary bg-opacity-15 border border-primary border-opacity-30 text-center">
                  <small className="text-gray-300">
                    🔒 Sistem securizat. Datele elevilor sunt vizibile doar instructorilor alocați.
                  </small>
                </div>

              </div>
            </div>
          </div>
        ) : (
          /* INSTRUCTOR DASHBOARD VIEW */
          <div>
            {/* Top Bar for Logged-in Teacher */}
            <div className="glass-panel p-3 p-md-4 border border-secondary rounded-4 mb-4 d-flex flex-wrap align-items-center justify-content-between gap-3">
              <div className="d-flex align-items-center gap-3">
                <img 
                  src={selectedInstructor.avatar} 
                  alt={selectedInstructor.name} 
                  width="60" 
                  height="60" 
                  className="rounded-circle border border-2 border-warning flex-shrink-0"
                />
                <div>
                  <div className="d-flex align-items-center gap-2">
                    <h4 className="fw-bold text-white mb-0 font-heading">{selectedInstructor.name}</h4>
                    <span className="badge bg-success text-white" style={{ fontSize: '0.75rem' }}>Activ pe traseu</span>
                  </div>
                  <small className="text-warning">{selectedInstructor.role} • {selectedInstructor.car}</small>
                </div>
              </div>

              <div className="d-flex align-items-center gap-2">
                <button 
                  className="btn btn-outline-danger btn-sm rounded-pill px-3 py-2 d-flex align-items-center gap-1"
                  onClick={() => setSelectedInstructor(null)}
                >
                  <LogOut size={16} /> Deconectare Profil
                </button>
              </div>
            </div>

            {/* Dashboard Stats */}
            <div className="row g-3 mb-4">
              <div className="col-md-4">
                <div className="glass-panel p-3 border border-secondary rounded-3 text-center">
                  <span className="text-gray-400 d-block small">Total Ore Programate</span>
                  <h3 className="fw-extrabold text-warning mb-0 font-heading">{instructorBookings.length} Ședințe</h3>
                </div>
              </div>
              <div className="col-md-4">
                <div className="glass-panel p-3 border border-secondary rounded-3 text-center">
                  <span className="text-gray-400 d-block small">Programări În Așteptare</span>
                  <h3 className="fw-extrabold text-info mb-0 font-heading">
                    {instructorBookings.filter(b => b.status === 'in_asteptare').length} Elevi
                  </h3>
                </div>
              </div>
              <div className="col-md-4">
                <div className="glass-panel p-3 border border-secondary rounded-3 text-center">
                  <span className="text-gray-400 d-block small">Ședințe Confirmate</span>
                  <h3 className="fw-extrabold text-success mb-0 font-heading">
                    {instructorBookings.filter(b => b.status === 'confirmat').length} Confirmate
                  </h3>
                </div>
              </div>
            </div>

            {/* Filters Bar */}
            <div className="glass-panel p-3 border border-secondary rounded-4 mb-4 d-flex flex-wrap align-items-center justify-content-between gap-3">
              
              {/* Search */}
              <div className="input-group" style={{ maxWidth: '300px' }}>
                <span className="input-group-text bg-dark border-secondary text-gray-400"><Search size={16} /></span>
                <input 
                  type="text"
                  className="form-control bg-dark text-white border-secondary form-control-sm"
                  placeholder="Caută elev sau număr telefon..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Status Filter */}
              <div className="d-flex align-items-center gap-2">
                <Filter size={16} className="text-gray-400" />
                <button 
                  className={`btn btn-sm rounded-pill ${statusFilter === 'all' ? 'btn-primary' : 'btn-outline-secondary text-gray-300'}`}
                  onClick={() => setStatusFilter('all')}
                >
                  Toate
                </button>
                <button 
                  className={`btn btn-sm rounded-pill ${statusFilter === 'in_asteptare' ? 'btn-warning text-dark' : 'btn-outline-secondary text-gray-300'}`}
                  onClick={() => setStatusFilter('in_asteptare')}
                >
                  În Așteptare
                </button>
                <button 
                  className={`btn btn-sm rounded-pill ${statusFilter === 'confirmat' ? 'btn-success' : 'btn-outline-secondary text-gray-300'}`}
                  onClick={() => setStatusFilter('confirmat')}
                >
                  Confirmate
                </button>
              </div>

            </div>

            {/* Bookings List Table / Cards */}
            {filteredBookings.length === 0 ? (
              <div className="glass-panel p-5 text-center border border-secondary rounded-4">
                <AlertCircle size={40} className="text-gray-400 mb-2" />
                <h5 className="text-white fw-bold">Nu există nicio programare înregistrată.</h5>
                <p className="text-gray-400 small">Elevii pot efectua programări din secțiunea principală a site-ului.</p>
              </div>
            ) : (
              <div className="row g-3">
                {filteredBookings.map((b) => (
                  <div className="col-12" key={b.id}>
                    <div className="glass-panel p-4 border border-secondary border-opacity-50 rounded-4 hover-lift">
                      <div className="row align-items-center gy-3">
                        
                        {/* Student Details */}
                        <div className="col-lg-4">
                          <div className="d-flex align-items-center gap-3">
                            <div className="p-3 rounded-circle bg-dark border border-warning text-warning fw-bold flex-shrink-0">
                              {b.studentName.charAt(0)}
                            </div>
                            <div>
                              <h5 className="fw-bold text-white mb-0">{b.studentName}</h5>
                              <span className="badge bg-primary bg-opacity-20 text-info border border-info border-opacity-30 me-2" style={{ fontSize: '0.75rem' }}>
                                {b.categoryName}
                              </span>
                              <small className="text-gray-400 d-block mt-1">
                                <Phone size={13} className="text-warning me-1" />
                                <a href={`tel:${b.studentPhone}`} className="text-warning text-decoration-none">{b.studentPhone}</a>
                              </small>
                            </div>
                          </div>
                        </div>

                        {/* Date & Time */}
                        <div className="col-lg-3">
                          <div className="text-gray-300" style={{ fontSize: '0.9rem' }}>
                            <div className="d-flex align-items-center gap-1 mb-1">
                              <Calendar size={15} className="text-warning" />
                              <span className="fw-semibold">{b.date}</span>
                            </div>
                            <div className="d-flex align-items-center gap-1 text-gray-400" style={{ fontSize: '0.85rem' }}>
                              <Clock size={15} className="text-info" />
                              <span>{b.time}</span>
                            </div>
                          </div>
                        </div>

                        {/* Status & Notes */}
                        <div className="col-lg-3">
                          <div>
                            <span className={`badge px-2.5 py-1 mb-2 ${
                              b.status === 'confirmat' 
                                ? 'bg-success text-white' 
                                : b.status === 'in_asteptare' 
                                ? 'bg-warning text-dark' 
                                : 'bg-danger text-white'
                            }`}>
                              {b.status === 'confirmat' ? '✓ Confirmată' : b.status === 'in_asteptare' ? '⏳ În așteptare' : '✕ Anulată'}
                            </span>
                            
                            <p className="text-gray-400 mb-0 font-italic" style={{ fontSize: '0.82rem' }}>
                              "{b.notes || 'Fără observații speciale'}"
                            </p>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="col-lg-2 text-lg-end">
                          <div className="d-flex flex-wrap gap-2 justify-content-lg-end">
                            {b.status !== 'confirmat' && (
                              <button 
                                className="btn btn-success btn-sm rounded-pill d-flex align-items-center gap-1"
                                onClick={() => handleStatusChange(b.id, 'confirmat')}
                              >
                                <Check size={14} /> Confirmă
                              </button>
                            )}

                            {b.status !== 'anulat' && (
                              <button 
                                className="btn btn-outline-danger btn-sm rounded-pill d-flex align-items-center gap-1"
                                onClick={() => handleStatusChange(b.id, 'anulat')}
                              >
                                <XCircle size={14} /> Anulează
                              </button>
                            )}
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}
