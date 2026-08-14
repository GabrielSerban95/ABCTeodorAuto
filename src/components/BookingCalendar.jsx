import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { COURSES, INSTRUCTORS } from '../data/mockData';
import { ENV } from '../config/env';
import { useAuth } from '../hooks/useAuth';
import { createBooking } from '../firebase/firestore';
import { ROUTES } from '../constants/routes';
import confetti from 'canvas-confetti';
import {
  Calendar as CalendarIcon,
  Clock,
  User,
  Phone,
  Mail,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  Ticket,
  Lock,
  LogIn,
  UserPlus,
  LayoutDashboard,
} from 'lucide-react';

export default function BookingCalendar({ preselectedCategory, onBookingCreated }) {
  const navigate = useNavigate();
  const { user, profile, isAuthenticated } = useAuth();

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
    notes: '',
  });
  const [bookingConfirmed, setBookingConfirmed] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Auto-fill student data from authenticated account
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: prev.name || profile?.name || user.displayName || '',
        email: prev.email || user.email || '',
        phone: prev.phone || profile?.phone || '',
      }));
    }
  }, [user, profile]);

  // Update category when prop changes
  useEffect(() => {
    if (preselectedCategory) {
      setCategoryId(preselectedCategory);
    }
  }, [preselectedCategory]);

  const availableTimeSlots = [
    '08:00 - 10:00',
    '10:00 - 12:00',
    '12:00 - 14:00',
    '14:00 - 16:00',
    '16:00 - 18:00',
    '18:00 - 20:00',
  ];

  const handleCreateBooking = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!isAuthenticated) {
      setErrorMsg('Trebuie să fii conectat în contul de elev pentru a finaliza programarea.');
      return;
    }

    if (!formData.name.trim() || !formData.phone.trim()) {
      setErrorMsg('Vă rugăm să completați Numele și Numărul de Telefon.');
      return;
    }

    const selectedCourseObj = COURSES.find((c) => c.id === categoryId);
    const selectedInstructorObj =
      instructorId === 'any'
        ? INSTRUCTORS[0]
          ? { id: INSTRUCTORS[0].id, name: `${INSTRUCTORS[0].name} (Atribuit)` }
          : { id: 'inst-1', name: 'Teodor Popescu (Atribuit)' }
        : INSTRUCTORS.find((i) => i.id === instructorId) || { id: 'inst-1', name: 'Instructor ABC' };

    const bookingPayload = {
      studentId: user?.uid || null,
      studentName: formData.name.trim(),
      studentPhone: formData.phone.trim(),
      studentEmail: formData.email.trim() || user?.email || 'Nespecificat',
      instructorId: selectedInstructorObj.id,
      instructorName: selectedInstructorObj.name,
      category: categoryId,
      categoryName: selectedCourseObj ? selectedCourseObj.title : 'Conducere Auto',
      date: selectedDate,
      time: selectedTime,
      location: 'Sediul ABC Teodor - Ploiești',
      status: 'in_asteptare',
      notes: formData.notes?.trim() || 'Programare creată online de elev',
    };

    setSubmitting(true);

    try {
      const createdBooking = await createBooking(bookingPayload);
      setBookingConfirmed(createdBooking);
      if (onBookingCreated) onBookingCreated(createdBooking);

      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (err) {
        console.log('Confetti trigger', err);
      }
    } catch (err) {
      console.error('Booking create error:', err);
      setErrorMsg('A apărut o eroare la crearea programării. Verificați conexiunea și încercați din nou.');
    } finally {
      setSubmitting(false);
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
          <h2 className="display-6 fw-extrabold text-site-heading font-heading">
            Programează Orele Tale de Conducere
          </h2>
          <p className="text-site-muted mt-2">
            Alege ziua, ora și instructorul preferat. Programarea ta va fi înregistrată instant în calendarul școlii.
          </p>
        </div>

        {/* Booking Card Container */}
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="glass-panel p-4 p-md-5 border border-secondary border-opacity-50 rounded-4 shadow-2xl">
              
              {/* IF USER IS NOT LOGGED IN: SHOW SECURE STUDENT LOCK GATE */}
              {!isAuthenticated ? (
                <div className="text-center py-4 py-md-5">
                  <div className="d-inline-flex p-3 rounded-circle bg-warning bg-opacity-15 text-warning mb-3 border border-warning border-opacity-30 shadow-sm">
                    <Lock size={44} />
                  </div>

                  <span className="badge bg-warning bg-opacity-20 text-warning border border-warning border-opacity-30 d-block mx-auto mb-2" style={{ width: 'fit-content' }}>
                    🔒 Acces Rezervat Elevilor Înscriși
                  </span>

                  <h3 className="h4 fw-extrabold text-white font-heading mb-3">
                    Autentifică-te pentru a programa ore de conducere
                  </h3>

                  <p className="text-muted mb-4 max-w-lg mx-auto" style={{ maxWidth: 580, margin: '0 auto', fontSize: '0.95rem' }}>
                    Pentru a garanta siguranța calendarului și alocarea corectă a instructorilor, programările online sunt active exclusiv pentru elevii școlii auto. Conectează-te în contul tău sau creează un cont folosind <strong>codul de înscriere</strong> primit de la profesor.
                  </p>

                  <div className="d-flex flex-wrap justify-content-center gap-3 mb-4">
                    <button
                      onClick={() => navigate(ROUTES.LOGIN)}
                      className="btn btn-warning rounded-pill px-4 py-2.5 fw-bold text-dark d-flex align-items-center gap-2 shadow"
                    >
                      <LogIn size={18} />
                      <span>Autentificare Elev</span>
                    </button>

                    <button
                      onClick={() => navigate(ROUTES.REGISTER)}
                      className="btn btn-outline-light rounded-pill px-4 py-2.5 fw-semibold d-flex align-items-center gap-2"
                    >
                      <UserPlus size={18} />
                      <span>Înregistrare cu Cod Elev</span>
                    </button>
                  </div>

                  <div className="pt-3 border-top border-secondary border-opacity-30">
                    <small className="text-muted">
                      Ești elev nou și nu ai primit încă un cod de înscriere? Contactează secretariatul la{' '}
                      <a href={`tel:${ENV.PHONE_RAW}`} className="text-warning text-decoration-none fw-semibold">
                        <Phone size={13} className="d-inline me-1" />{ENV.PHONE}
                      </a>
                    </small>
                  </div>
                </div>
              ) : !bookingConfirmed ? (
                /* IF LOGGED IN: SHOW 3-STEP BOOKING WIZARD */
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
                      <span className="booking-step-label">3. Confirmare Date</span>
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
                      <h5 className="fw-bold text-site-heading mb-3 font-heading">Alege Categoria &amp; Instructorul:</h5>
                      
                      <div className="mb-4">
                        <label className="form-label text-gray-300 small fw-semibold">Selectează Categoria Auto:</label>
                        <div className="row g-3">
                          {COURSES.map((c) => (
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
                          {INSTRUCTORS.map((i) => (
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
                          <span>Pasul Următor (Data &amp; Ora)</span>
                          <ArrowRight size={16} />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* STEP 2: Date & Time Slot Selection */}
                  {step === 2 && (
                    <div>
                      <h5 className="fw-bold text-site-heading mb-3 font-heading">Alege Data și Ora de Conducere:</h5>

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
                            {availableTimeSlots.map((slot) => (
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
                          <span>Pasul Următor (Confirmare Date)</span>
                          <ArrowRight size={16} />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* STEP 3: Student Details & Final Confirmation */}
                  {step === 3 && (
                    <form onSubmit={handleCreateBooking}>
                      <div className="d-flex align-items-center justify-content-between mb-3">
                        <h5 className="fw-bold text-site-heading font-heading mb-0">Datele Tale de Elev:</h5>
                        <span className="badge bg-success bg-opacity-20 text-success border border-success border-opacity-30 small">
                          ✓ Cont Autentificat: {user?.email}
                        </span>
                      </div>

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
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            />
                          </div>
                        </div>

                        <div className="col-md-12">
                          <label className="form-label text-gray-300 small fw-semibold">Adresă de Email</label>
                          <div className="input-group">
                            <span className="input-group-text bg-dark text-gray-400 border-secondary"><Mail size={18} /></span>
                            <input 
                              type="email"
                              placeholder="ex: andrei@email.com"
                              className="form-control bg-dark text-white border-secondary"
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                          ></textarea>
                        </div>
                      </div>

                      {/* Summary Box */}
                      <div className="p-3 rounded-3 bg-dark bg-opacity-75 border border-secondary mb-4">
                        <small className="text-warning fw-bold d-block mb-1">SUMAR PROGRAMARE:</small>
                        <div className="d-flex flex-wrap justify-content-between gap-2 text-white" style={{ fontSize: '0.9rem' }}>
                          <span><strong>Curs:</strong> {COURSES.find((c) => c.id === categoryId)?.title}</span>
                          <span><strong>Data:</strong> {selectedDate}</span>
                          <span><strong>Ora:</strong> {selectedTime}</span>
                          <span>
                            <strong>Instructor:</strong>{' '}
                            {instructorId === 'any'
                              ? 'Oricare disponibil'
                              : INSTRUCTORS.find((i) => i.id === instructorId)?.name}
                          </span>
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
                          disabled={submitting}
                          className="btn btn-success bg-gradient-success rounded-pill px-5 py-2.5 fw-bold d-flex align-items-center gap-2 text-white shadow"
                        >
                          <CheckCircle2 size={18} />
                          <span>{submitting ? 'Se înregistrează...' : 'Finalizează Programarea'}</span>
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

                  <h3 className="fw-extrabold text-site-heading font-heading mb-1">
                    Programare Înregistrată cu Succes!
                  </h3>
                  <p className="text-gray-300 mb-4" style={{ color: '#d1d5db' }}>
                    Mulțumim, {bookingConfirmed.studentName}! Programarea ta a fost salvată și este vizibilă în contul tău de elev.
                  </p>

                  <div className="p-4 rounded-4 bg-dark bg-opacity-80 border border-warning max-w-md mx-auto mb-4 text-start shadow" style={{ maxWidth: 460, margin: '0 auto' }}>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <span className="badge bg-warning text-dark fw-bold px-2.5 py-1">TICHET #{bookingConfirmed.id}</span>
                      <small className="text-gray-400">Status: <span className="text-info fw-semibold">În Așteptare</span></small>
                    </div>
                    <div className="d-flex flex-column gap-2 text-gray-200" style={{ fontSize: '0.92rem' }}>
                      <div><strong>Elev:</strong> {bookingConfirmed.studentName}</div>
                      <div><strong>Telefon:</strong> {bookingConfirmed.studentPhone}</div>
                      <div><strong>Curs:</strong> {bookingConfirmed.categoryName}</div>
                      <div><strong>Instructor:</strong> {bookingConfirmed.instructorName}</div>
                      <div><strong>Data &amp; Ora:</strong> {bookingConfirmed.date} ({bookingConfirmed.time})</div>
                      <div><strong>Locație:</strong> {bookingConfirmed.location}</div>
                    </div>
                  </div>

                  <div className="d-flex flex-wrap justify-content-center gap-3">
                    <button 
                      className="btn btn-warning rounded-pill px-4 py-2.5 fw-bold text-dark d-flex align-items-center gap-2 shadow"
                      onClick={() => navigate(ROUTES.DASHBOARD)}
                    >
                      <LayoutDashboard size={18} />
                      <span>Vezi în Contul Meu</span>
                    </button>

                    <button 
                      className="btn btn-outline-light rounded-pill px-4 py-2.5 fw-semibold"
                      onClick={() => {
                        setBookingConfirmed(null);
                        setStep(1);
                      }}
                    >
                      Face o altă programare
                    </button>
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
