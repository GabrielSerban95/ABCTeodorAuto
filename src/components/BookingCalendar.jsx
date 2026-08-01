import React, { useState } from 'react';
import { COURSES, INSTRUCTORS } from '../data/mockData';
import { ENV } from '../config/env';
import confetti from 'canvas-confetti';
import { Calendar as CalendarIcon, Clock, User, Phone, Mail, CheckCircle2, AlertCircle, ArrowRight, ShieldCheck, Ticket } from 'lucide-react';

export default function BookingCalendar({ preselectedCategory, onBookingCreated }) {
  const [step, setStep] = useState(1);
  const [categoryId, setCategoryId] = useState(preselectedCategory || 'cat-b');
  const [instructorId, setInstructorId] = useState('any');
  const [selectedDate, setSelectedDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [selectedTime, setSelectedTime] = useState('10:00 - 12:00');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    notes: ''
  });
  const [bookingConfirmed, setBookingConfirmed] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const availableTimeSlots = [
    '08:00 - 10:00',
    '10:00 - 12:00',
    '12:00 - 14:00',
    '14:00 - 16:00',
    '16:00 - 18:00',
    '18:00 - 20:00'
  ];

  const handleCreateBooking = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      setErrorMsg('Vă rugăm să completați Numele și Numărul de Telefon.');
      return;
    }

    const selectedCourseObj = COURSES.find(c => c.id === categoryId);
    const selectedInstructorObj = instructorId === 'any' 
      ? { id: 'inst-1', name: 'Teodor Popescu (Atribuit)' }
      : INSTRUCTORS.find(i => i.id === instructorId);

    const newBooking = {
      id: 'BK-' + Math.floor(1000 + Math.random() * 9000),
      studentName: formData.name,
      studentPhone: formData.phone,
      studentEmail: formData.email || 'Nespecificat',
      instructorId: selectedInstructorObj.id,
      instructorName: selectedInstructorObj.name,
      category: categoryId,
      categoryName: selectedCourseObj ? selectedCourseObj.title : 'Conducere Auto',
      date: selectedDate,
      time: selectedTime,
      location: 'Sediul ABC Teodor - Ploiești',
      status: 'in_asteptare',
      createdDate: new Date().toISOString(),
      notes: formData.notes || 'Programare creată online de client'
    };

    // Save to local storage
    const existing = JSON.parse(localStorage.getItem('abc_bookings') || '[]');
    const updated = [newBooking, ...existing];
    localStorage.setItem('abc_bookings', JSON.stringify(updated));

    setBookingConfirmed(newBooking);
    if (onBookingCreated) onBookingCreated(newBooking);

    // Confetti effect
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err) {
      console.log('Confetti trigger', err);
    }
  };

  return (
    <section id="programare" className="py-5 position-relative" style={{ backgroundColor: '#0b0f19' }}>
      <div className="container py-4">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-5">
          <span className="badge-custom badge-amber mb-2">
            <CalendarIcon size={14} /> Sistem Online de Programări Ore
          </span>
          <h2 className="display-6 fw-extrabold text-white font-heading">
            Programează Orele Tale de Conducere
          </h2>
          <p className="text-gray-400 mt-2" style={{ color: '#9ca3af' }}>
            Alege ziua, ora și instructorul preferat. Programarea ta va fi înregistrată instant în calendarul școlii.
          </p>
        </div>

        {/* Booking Card */}
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="glass-panel p-4 p-md-5 border border-secondary border-opacity-50 rounded-4 shadow-2xl">
              
              {!bookingConfirmed ? (
                <>
                  {/* Step Progress Bar */}
                  <div className="d-flex justify-content-between mb-4 border-bottom border-secondary border-opacity-40 pb-3" style={{ fontSize: '0.88rem' }}>
                    <div className={`d-flex align-items-center gap-2 ${step >= 1 ? 'text-warning fw-bold' : 'text-gray-400'}`}>
                      <span className="rounded-circle bg-warning text-dark fw-bold d-inline-flex align-items-center justify-content-center flex-shrink-0" style={{ width: '24px', height: '24px', fontSize: '0.8rem' }}>1</span>
                      <span className="booking-step-label">1. Categorie &amp; Instructor</span>
                    </div>
                    <div className={`d-flex align-items-center gap-2 ${step >= 2 ? 'text-warning fw-bold' : 'text-gray-400'}`}>
                      <span className={`rounded-circle ${step >= 2 ? 'bg-warning text-dark' : 'bg-secondary text-white'} fw-bold d-inline-flex align-items-center justify-content-center flex-shrink-0`} style={{ width: '24px', height: '24px', fontSize: '0.8rem' }}>2</span>
                      <span className="booking-step-label">2. Data &amp; Interval</span>
                    </div>
                    <div className={`d-flex align-items-center gap-2 ${step >= 3 ? 'text-warning fw-bold' : 'text-gray-400'}`}>
                      <span className={`rounded-circle ${step >= 3 ? 'bg-warning text-dark' : 'bg-secondary text-white'} fw-bold d-inline-flex align-items-center justify-content-center flex-shrink-0`} style={{ width: '24px', height: '24px', fontSize: '0.8rem' }}>3</span>
                      <span className="booking-step-label">3. Date Contact</span>
                    </div>
                  </div>

                  {errorMsg && (
                    <div className="alert alert-danger d-flex align-items-center gap-2 mb-4">
                      <AlertCircle size={18} />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  {/* STEP 1: Category & Instructor Selection */}
                  {step === 1 && (
                    <div>
                      <h5 className="fw-bold text-white mb-3 font-heading">Alege Categoria & Instructorul:</h5>
                      
                      <div className="mb-4">
                        <label className="form-label text-gray-300 small fw-semibold">Selectează Categoria Auto:</label>
                        <div className="row g-3">
                          {COURSES.map(c => (
                            <div className="col-md-6" key={c.id}>
                              <div 
                                className={`p-3 rounded-3 border cursor-pointer transition-all ${
                                  categoryId === c.id 
                                    ? 'border-warning bg-warning bg-opacity-10 text-white' 
                                    : 'border-secondary bg-dark bg-opacity-50 text-gray-300'
                                }`}
                                style={{ cursor: 'pointer' }}
                                onClick={() => setCategoryId(c.id)}
                              >
                                <div className="d-flex align-items-center justify-content-between mb-1">
                                  <span className="fw-bold">{c.title}</span>
                                  <span className="text-warning fw-bold">{c.price} RON</span>
                                </div>
                                <small className="text-gray-400 d-block">{c.duration} • {c.practiceHours}h practică</small>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mb-4">
                        <label className="form-label text-gray-300 small fw-semibold">Selectează Instructorul Dorit:</label>
                        <select 
                          className="form-select bg-dark text-white border-secondary rounded-3 p-2.5"
                          value={instructorId}
                          onChange={(e) => setInstructorId(e.target.value)}
                        >
                          <option value="any">⭐ Oricare instructor disponibil (Recomandat)</option>
                          {INSTRUCTORS.map(i => (
                            <option key={i.id} value={i.id}>
                              {i.name} - {i.role} ({i.passRate} rată promovabilitate)
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="d-flex justify-content-end">
                        <button 
                          className="btn btn-warning rounded-pill px-4 py-2 fw-bold d-flex align-items-center gap-2 text-dark"
                          onClick={() => setStep(2)}
                        >
                          <span>Pasul Următor (Data & Ora)</span>
                          <ArrowRight size={16} />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* STEP 2: Date & Time Slot Selection */}
                  {step === 2 && (
                    <div>
                      <h5 className="fw-bold text-white mb-3 font-heading">Alege Data și Ora de Conducere:</h5>

                      <div className="row g-4 mb-4">
                        <div className="col-md-6">
                          <label className="form-label text-gray-300 small fw-semibold">Selectează Data:</label>
                          <input 
                            type="date"
                            className="form-input form-control bg-dark text-white border-secondary rounded-3 p-2.5"
                            value={selectedDate}
                            min={new Date().toISOString().split('T')[0]}
                            onChange={(e) => setSelectedDate(e.target.value)}
                          />
                        </div>

                        <div className="col-md-6">
                          <label className="form-label text-gray-300 small fw-semibold">Selectează Intervalul Orar:</label>
                          <div className="row g-2">
                            {availableTimeSlots.map(slot => (
                              <div className="col-6" key={slot}>
                                <button
                                  type="button"
                                  className={`btn w-100 btn-sm rounded-3 py-2 ${
                                    selectedTime === slot 
                                      ? 'btn-warning text-dark fw-bold' 
                                      : 'btn-outline-secondary text-gray-300'
                                  }`}
                                  onClick={() => setSelectedTime(slot)}
                                >
                                  <Clock size={14} className="me-1" /> {slot}
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="d-flex justify-content-between">
                        <button 
                          className="btn btn-outline-secondary rounded-pill px-4 py-2 text-gray-300"
                          onClick={() => setStep(1)}
                        >
                          Înapoi
                        </button>
                        <button 
                          className="btn btn-warning rounded-pill px-4 py-2 fw-bold d-flex align-items-center gap-2 text-dark"
                          onClick={() => setStep(3)}
                        >
                          <span>Pasul Următor (Date Contact)</span>
                          <ArrowRight size={16} />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* STEP 3: Student Details & Final Confirmation */}
                  {step === 3 && (
                    <form onSubmit={handleCreateBooking}>
                      <h5 className="fw-bold text-white mb-3 font-heading">Datele Tale de Contact:</h5>

                      <div className="row g-3 mb-4">
                        <div className="col-md-6">
                          <label className="form-label text-gray-300 small fw-semibold">Nume și Prenume *</label>
                          <div className="input-group">
                            <span className="input-group-text bg-dark text-gray-400 border-secondary"><User size={18} /></span>
                            <input 
                              type="text"
                              required
                              placeholder="ex: Andrei Popescu"
                              className="form-control bg-dark text-white border-secondary"
                              value={formData.name}
                              onChange={(e) => setFormData({...formData, name: e.target.value})}
                            />
                          </div>
                        </div>

                        <div className="col-md-6">
                          <label className="form-label text-gray-300 small fw-semibold">Număr Telefon *</label>
                          <div className="input-group">
                            <span className="input-group-text bg-dark text-gray-400 border-secondary"><Phone size={18} /></span>
                            <input 
                              type="tel"
                              required
                              placeholder="ex: 0722 000 111"
                              className="form-control bg-dark text-white border-secondary"
                              value={formData.phone}
                              onChange={(e) => setFormData({...formData, phone: e.target.value})}
                            />
                          </div>
                        </div>

                        <div className="col-md-12">
                          <label className="form-label text-gray-300 small fw-semibold">Email (Opțional)</label>
                          <div className="input-group">
                            <span className="input-group-text bg-dark text-gray-400 border-secondary"><Mail size={18} /></span>
                            <input 
                              type="email"
                              placeholder="ex: andrei@email.com"
                              className="form-control bg-dark text-white border-secondary"
                              value={formData.email}
                              onChange={(e) => setFormData({...formData, email: e.target.value})}
                            />
                          </div>
                        </div>

                        <div className="col-md-12">
                          <label className="form-label text-gray-300 small fw-semibold">Observații / Preferințe Preluare</label>
                          <textarea 
                            rows="2"
                            placeholder="Mă poți prelua din zona Gară de Sud / Centru Ploiești..."
                            className="form-control bg-dark text-white border-secondary"
                            value={formData.notes}
                            onChange={(e) => setFormData({...formData, notes: e.target.value})}
                          ></textarea>
                        </div>
                      </div>

                      {/* Summary Box */}
                      <div className="p-3 rounded-3 bg-dark bg-opacity-75 border border-secondary mb-4">
                        <small className="text-warning fw-bold d-block mb-1">SUMAR PROGRAMARE:</small>
                        <div className="d-flex flex-wrap justify-content-between gap-2 text-white" style={{ fontSize: '0.9rem' }}>
                          <span><strong>Curs:</strong> {COURSES.find(c => c.id === categoryId)?.title}</span>
                          <span><strong>Data:</strong> {selectedDate}</span>
                          <span><strong>Ora:</strong> {selectedTime}</span>
                        </div>
                      </div>

                      <div className="d-flex justify-content-between">
                        <button 
                          type="button"
                          className="btn btn-outline-secondary rounded-pill px-4 py-2 text-gray-300"
                          onClick={() => setStep(2)}
                        >
                          Înapoi
                        </button>
                        <button 
                          type="submit"
                          className="btn btn-success bg-gradient-success rounded-pill px-5 py-2.5 fw-bold d-flex align-items-center gap-2 text-white shadow"
                        >
                          <CheckCircle2 size={18} />
                          <span>Finalizează Programarea</span>
                        </button>
                      </div>
                    </form>
                  )}
                </>
              ) : (
                /* CONFIRMATION TICKET SCREEN */
                <div className="text-center py-4">
                  <div className="d-inline-flex p-3 rounded-circle bg-success bg-opacity-20 text-success mb-3 border border-success">
                    <CheckCircle2 size={48} />
                  </div>

                  <h3 className="fw-extrabold text-white font-heading mb-1">
                    Programare Înregistrată cu Succes!
                  </h3>
                  <p className="text-gray-300 mb-4" style={{ color: '#d1d5db' }}>
                    Mulțumim, {bookingConfirmed.studentName}! Un instructor ABC Teodor te va contacta telefonic pentru confirmare.
                  </p>

                  <div className="p-4 rounded-4 bg-dark bg-opacity-80 border border-warning max-w-md mx-auto mb-4 text-start shadow">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <span className="badge bg-warning text-dark fw-bold px-2.5 py-1">TICHET #{bookingConfirmed.id}</span>
                      <small className="text-gray-400">Status: <span className="text-info fw-semibold">În Așteptare</span></small>
                    </div>
                    <div className="d-flex flex-column gap-2 text-gray-200" style={{ fontSize: '0.92rem' }}>
                      <div><strong>Elev:</strong> {bookingConfirmed.studentName}</div>
                      <div><strong>Telefon:</strong> {bookingConfirmed.studentPhone}</div>
                      <div><strong>Curs:</strong> {bookingConfirmed.categoryName}</div>
                      <div><strong>Instructor:</strong> {bookingConfirmed.instructorName}</div>
                      <div><strong>Data & Ora:</strong> {bookingConfirmed.date} ({bookingConfirmed.time})</div>
                      <div><strong>Locație:</strong> {bookingConfirmed.location}</div>
                    </div>
                  </div>

                  <div className="d-flex flex-wrap justify-content-center gap-3">
                    <button 
                      className="btn btn-warning rounded-pill px-4 py-2 fw-bold text-dark"
                      onClick={() => {
                        setBookingConfirmed(null);
                        setStep(1);
                        setFormData({ name: '', phone: '', email: '', notes: '' });
                      }}
                    >
                      Face o altă programare
                    </button>

                    <a 
                      href={`tel:${ENV.PHONE_RAW}`}
                      className="btn btn-outline-light rounded-pill px-4 py-2 fw-semibold"
                    >
                      <Phone size={16} className="text-warning me-1" /> Contactează Secretariatul
                    </a>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
