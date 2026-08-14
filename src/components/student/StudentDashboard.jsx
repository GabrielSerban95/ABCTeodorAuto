import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { getBookingsByStudentId, getStudentProfile, createBooking } from '../../firebase/firestore';
import { COURSES, INSTRUCTORS } from '../../data/mockData';
import { ROUTES } from '../../constants/routes';
import { ENV } from '../../config/env';
import LoadingSpinner from '../shared/LoadingSpinner';
import confetti from 'canvas-confetti';
import toast from 'react-hot-toast';
import {
  Calendar,
  Clock,
  Phone,
  MapPin,
  ArrowLeft,
  LogOut,
  PlusCircle,
  CheckCircle,
  AlertCircle,
  User,
  Car,
  Award,
  ShieldCheck,
  CalendarDays,
  KeyRound,
  Settings,
  Lock,
  Star,
  Info,
  Check,
} from 'lucide-react';

export default function StudentDashboard() {
  const { user, profile, logout } = useAuth();
  const navigate = useNavigate();

  const [studentData, setStudentData] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('bookings'); // 'bookings' | 'new-booking' | 'settings'

  // Booking Form State (No price, no category selection needed)
  const [bookingDate, setBookingDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [bookingTime, setBookingTime] = useState('10:00 - 12:00');
  const [bookingLocation, setBookingLocation] = useState('Sediul ABC Teodor - Ploiești');
  const [bookingNotes, setBookingNotes] = useState('');
  const [submittingBooking, setSubmittingBooking] = useState(false);
  const [bookingSuccessMsg, setBookingSuccessMsg] = useState('');

  const availableTimeSlots = [
    '08:00 - 10:00',
    '10:00 - 12:00',
    '12:00 - 14:00',
    '14:00 - 16:00',
    '16:00 - 18:00',
    '18:00 - 20:00',
  ];

  const fetchDashboardData = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      const [bookingsData, studentDoc] = await Promise.all([
        getBookingsByStudentId(user.uid, user.email),
        getStudentProfile(user.uid),
      ]);

      setBookings(bookingsData);
      setStudentData(studentDoc);
    } catch (err) {
      console.error('Eroare la încărcarea datelor elevului:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [user]);

  // Find enrolled category and instructor details
  const enrolledCategoryKey = studentData?.enrolledCategory || 'cat-b';
  const enrolledCourseObj = COURSES.find((c) => c.id === enrolledCategoryKey) || COURSES[0];

  const assignedInstructorId =
    studentData?.assignedInstructorId || profile?.assignedInstructorId || 'inst-1';
  const assignedInstructorName =
    studentData?.assignedInstructorName || profile?.assignedInstructorName || 'Teodor Popescu';

  const instructorDetails =
    INSTRUCTORS.find((i) => i.id === assignedInstructorId) ||
    INSTRUCTORS.find((i) => i.name.toLowerCase().includes(assignedInstructorName.toLowerCase())) ||
    INSTRUCTORS[0];

  const handleCreateStudentBooking = async (e) => {
    e.preventDefault();
    setBookingSuccessMsg('');

    const bookingPayload = {
      studentId: user.uid,
      studentName: profile?.name || user.displayName || user.email?.split('@')[0] || 'Elev',
      studentPhone: profile?.phone || studentData?.phone || '0722 000 000',
      studentEmail: user.email,
      instructorId: instructorDetails.id,
      instructorName: instructorDetails.name,
      category: enrolledCategoryKey,
      categoryName: enrolledCourseObj ? enrolledCourseObj.title : 'Conducere Auto',
      date: bookingDate,
      time: bookingTime,
      location: bookingLocation.trim() || 'Sediul ABC Teodor - Ploiești',
      status: 'in_asteptare',
      notes: bookingNotes.trim() || 'Ședință practică programată din portal',
    };

    setSubmittingBooking(true);

    try {
      const created = await createBooking(bookingPayload);
      setBookings((prev) => [created, ...prev]);
      setBookingSuccessMsg(`Ședința din ${bookingDate} (${bookingTime}) a fost programată cu succes!`);
      toast.success('Ședință programată cu succes!');

      try {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 },
        });
      } catch (cErr) {
        console.log(cErr);
      }

      // Switch to bookings tab after short delay
      setTimeout(() => {
        setActiveTab('bookings');
        setBookingNotes('');
      }, 1400);
    } catch (err) {
      console.error('Eroare creare programare elev:', err);
      toast.error('Nu s-a putut salva programarea. Încercați din nou.');
    } finally {
      setSubmittingBooking(false);
    }
  };

  if (loading) {
    return <LoadingSpinner label="Se încarcă portalul tău de elev..." />;
  }

  return (
    <div className="container py-4 py-md-5" style={{ minHeight: '85vh' }}>
      
      {/* Top Header & Navigation Bar */}
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
        <button
          className="btn btn-outline-light btn-sm rounded-pill px-3 py-2 d-flex align-items-center gap-2"
          onClick={() => navigate(ROUTES.HOME)}
        >
          <ArrowLeft size={16} />
          <span>Înapoi la Site</span>
        </button>

        <div className="d-flex align-items-center gap-2">
          <span className="badge-custom d-none d-sm-inline-flex align-items-center gap-1.5" style={{ fontSize: '0.8rem' }}>
            <ShieldCheck size={14} className="text-info" />
            <span>Cont Cursant Activ</span>
          </span>

          <button
            className="btn btn-outline-danger btn-sm rounded-pill px-3 py-2 d-flex align-items-center gap-2"
            onClick={async () => {
              await logout();
              navigate(ROUTES.HOME);
            }}
          >
            <LogOut size={16} />
            <span>Deconectare</span>
          </button>
        </div>
      </div>

      {/* Main Student Banner & Assigned Instructor Grid */}
      <div className="row g-4 mb-4">
        
        {/* Student Profile Card */}
        <div className="col-lg-7">
          <div className="glass-panel p-4 p-md-5 rounded-4 h-100 d-flex flex-column justify-content-between">
            <div>
              <span className="badge-custom badge-amber mb-3 d-inline-flex align-items-center gap-1.5">
                <User size={13} /> Profil Cursant ABC Teodor
              </span>

              <h1 className="h3 fw-bold text-white mb-1 font-heading">
                Bun venit, {profile?.name || user?.displayName || user?.email?.split('@')[0]}! 👋
              </h1>

              <p className="text-muted small mb-4">
                Email: <span className="text-white">{user?.email}</span>
                {studentData?.phone && (
                  <> • Telefon: <span className="text-white">{studentData.phone}</span></>
                )}
              </p>

              {/* Read-Only Stats Row */}
              <div className="row g-2 pt-1">
                <div className="col-sm-4">
                  <div className="p-3 rounded-3 bg-dark bg-opacity-70 border border-secondary border-opacity-40 h-100">
                    <small className="text-muted d-block text-uppercase fw-semibold" style={{ fontSize: '0.7rem' }}>
                      CATEGORIE ÎNSCRIERE
                    </small>
                    <span className="fw-bold text-warning small d-block mt-1">
                      {enrolledCourseObj?.title || 'Categoria B'}
                    </span>
                  </div>
                </div>

                <div className="col-sm-4">
                  <div className="p-3 rounded-3 bg-dark bg-opacity-70 border border-secondary border-opacity-40 h-100">
                    <small className="text-muted d-block text-uppercase fw-semibold" style={{ fontSize: '0.7rem' }}>
                      COD ÎNSCRIERE
                    </small>
                    <span className="fw-bold text-info small d-flex align-items-center gap-1 mt-1">
                      <KeyRound size={13} /> {studentData?.instructorCode || profile?.teacherCode || 'VALIDAT'}
                    </span>
                  </div>
                </div>

                <div className="col-sm-4">
                  <div className="p-3 rounded-3 bg-dark bg-opacity-70 border border-secondary border-opacity-40 h-100">
                    <small className="text-muted d-block text-uppercase fw-semibold" style={{ fontSize: '0.7rem' }}>
                      TOTAL ȘEDINȚE
                    </small>
                    <span className="fw-bold text-success small d-block mt-1">
                      {bookings.length} {bookings.length === 1 ? 'oră' : 'ore'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Action footer */}
            <div className="mt-4 pt-3 border-top border-secondary border-opacity-30 d-flex flex-wrap align-items-center justify-content-between gap-2">
              <span className="text-muted small">Dorești să programezi o nouă ședință pe traseu?</span>
              <button
                className="btn btn-warning btn-sm rounded-pill px-3 py-2 fw-bold text-dark d-flex align-items-center gap-1.5 shadow"
                onClick={() => setActiveTab('new-booking')}
              >
                <PlusCircle size={15} />
                <span>Programează o Oră Nouă</span>
              </button>
            </div>
          </div>
        </div>

        {/* Assigned Instructor Card */}
        <div className="col-lg-5">
          <div className="glass-panel p-4 rounded-4 h-100 d-flex flex-column justify-content-between" style={{ borderColor: 'rgba(245, 158, 11, 0.3)' }}>
            <div>
              {/* Instructor Header Badge */}
              <div className="d-flex align-items-center justify-content-between mb-3">
                <span className="badge-custom badge-amber" style={{ fontSize: '0.75rem', padding: '0.25rem 0.75rem' }}>
                  <Star size={13} className="text-warning fill-warning" />
                  <span>Instructorul Tău Desemnat</span>
                </span>

                <span className="text-success small fw-semibold d-inline-flex align-items-center gap-1">
                  <Award size={14} /> {instructorDetails.passRate} Promovare
                </span>
              </div>

              {/* Instructor Bio Line */}
              <div className="d-flex align-items-center gap-3 mb-3">
                <img
                  src={instructorDetails.avatar}
                  alt={instructorDetails.name}
                  className="rounded-circle border border-warning shadow-sm flex-shrink-0"
                  style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                />
                <div>
                  <h3 className="h5 fw-bold text-white mb-0 font-heading">{instructorDetails.name}</h3>
                  <small className="text-warning fw-semibold d-block">{instructorDetails.role}</small>
                  <span className="text-muted small">{instructorDetails.experience}</span>
                </div>
              </div>

              {/* Details Box */}
              <div className="p-3 rounded-3 bg-dark bg-opacity-80 border border-secondary border-opacity-40 mb-3" style={{ fontSize: '0.86rem' }}>
                <div className="mb-2 d-flex align-items-center gap-2 text-gray-200">
                  <Car size={15} className="text-warning flex-shrink-0" />
                  <span><strong>Mașină școală:</strong> {instructorDetails.car}</span>
                </div>
                <div className="d-flex align-items-center gap-2 text-gray-200">
                  <Phone size={15} className="text-success flex-shrink-0" />
                  <span>
                    <strong>Telefon direct:</strong>{' '}
                    <a
                      href={`tel:${instructorDetails.phone.replace(/\s+/g, '')}`}
                      className="text-warning text-decoration-none fw-bold hover-text-warning"
                    >
                      {instructorDetails.phone}
                    </a>
                  </span>
                </div>
              </div>
            </div>

            <small className="text-muted fst-italic" style={{ fontSize: '0.82rem', lineHeight: '1.4' }}>
              „{instructorDetails.bio}”
            </small>
          </div>
        </div>

      </div>

      {/* Tabs Navigation */}
      <div className="d-flex flex-wrap align-items-center gap-2 mb-4 border-bottom border-secondary border-opacity-40 pb-3">
        <button
          className={`btn rounded-pill px-4 py-2 fw-semibold d-flex align-items-center gap-2 ${
            activeTab === 'bookings'
              ? 'btn-warning text-dark shadow'
              : 'btn-outline-secondary text-gray-300'
          }`}
          onClick={() => setActiveTab('bookings')}
        >
          <CalendarDays size={16} />
          <span>Ședințele Mele ({bookings.length})</span>
        </button>

        <button
          className={`btn rounded-pill px-4 py-2 fw-semibold d-flex align-items-center gap-2 ${
            activeTab === 'new-booking'
              ? 'btn-warning text-dark shadow'
              : 'btn-outline-secondary text-gray-300'
          }`}
          onClick={() => setActiveTab('new-booking')}
        >
          <PlusCircle size={16} />
          <span>Programează o Ședință Nouă</span>
        </button>

        <button
          className={`btn rounded-pill px-4 py-2 fw-semibold d-flex align-items-center gap-2 ${
            activeTab === 'settings'
              ? 'btn-warning text-dark shadow'
              : 'btn-outline-secondary text-gray-300'
          }`}
          onClick={() => setActiveTab('settings')}
        >
          <Settings size={16} />
          <span>Detalii Cont &amp; Școlarizare</span>
        </button>
      </div>

      {/* TAB 1: LIST OF BOOKINGS */}
      {activeTab === 'bookings' && (
        <div>
          {bookings.length === 0 ? (
            <div className="glass-panel p-5 text-center rounded-4 border border-secondary border-opacity-40">
              <div className="d-inline-flex p-3 rounded-circle bg-warning bg-opacity-10 text-warning mb-3">
                <Calendar size={40} />
              </div>
              <h2 className="h5 fw-bold text-white mb-2">Nu ai nicio ședință programată încă.</h2>
              <p className="text-muted mb-4 max-w-md mx-auto" style={{ maxWidth: 460, margin: '0 auto' }}>
                Poți rezerva prima ta oră practică de conducere cu instructorul tău, <strong>{instructorDetails.name}</strong>, direct din acest portal.
              </p>
              <button
                className="btn btn-warning rounded-pill px-4 py-2.5 fw-bold text-dark shadow"
                onClick={() => setActiveTab('new-booking')}
              >
                Programează Prima Ședință
              </button>
            </div>
          ) : (
            <div className="row g-3">
              {bookings.map((booking) => (
                <div className="col-md-6" key={booking.id}>
                  <div className="glass-panel p-4 rounded-4 border border-secondary h-100 d-flex flex-column justify-content-between hover-lift">
                    <div>
                      <div className="d-flex justify-content-between align-items-start mb-3">
                        <div>
                          <h3 className="h6 fw-bold text-white mb-1">{booking.categoryName}</h3>
                          <small className="text-site-muted d-flex align-items-center gap-1">
                            <Calendar size={13} /> {booking.date} • <Clock size={13} /> {booking.time}
                          </small>
                        </div>
                        <span
                          className={`badge ${
                            booking.status === 'confirmat'
                              ? 'bg-success'
                              : booking.status === 'in_asteptare'
                              ? 'bg-warning text-dark'
                              : 'bg-danger text-white'
                          }`}
                        >
                          {booking.status === 'confirmat'
                            ? '✓ Confirmat'
                            : booking.status === 'in_asteptare'
                            ? '⏳ În așteptare'
                            : '✕ Anulat'}
                        </span>
                      </div>

                      <div className="text-site-body" style={{ fontSize: '0.92rem' }}>
                        <p className="mb-1">
                          <strong>Instructor alocat:</strong> {booking.instructorName}
                        </p>
                        <p className="mb-1">
                          <strong>Locație preluare:</strong> <MapPin size={13} className="me-1" />
                          {booking.location}
                        </p>
                        {booking.notes && (
                          <p className="text-muted small fst-italic mt-2 mb-0">"{booking.notes}"</p>
                        )}
                      </div>
                    </div>

                    <div className="pt-3 mt-3 border-top border-secondary border-opacity-30 d-flex align-items-center justify-content-between">
                      <small className="text-muted">Tichet #{booking.id}</small>
                      {booking.status === 'confirmat' ? (
                        <small className="text-success fw-semibold d-flex align-items-center gap-1">
                          <CheckCircle size={14} /> Confirmat de instructor
                        </small>
                      ) : (
                        <small className="text-warning fw-semibold d-flex align-items-center gap-1">
                          <Clock size={14} /> Așteaptă confirmarea
                        </small>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: CLEAN STUDENT BOOKING FORM (NO PRICE, FIXED CATEGORY) */}
      {activeTab === 'new-booking' && (
        <div className="glass-panel p-4 p-md-5 rounded-4 border border-secondary shadow-2xl" style={{ maxWidth: '780px', margin: '0 auto' }}>
          
          <div className="mb-4">
            <span className="badge-custom badge-amber mb-2 d-inline-flex align-items-center gap-1">
              <Calendar size={13} /> Rezervare Ședință Practică
            </span>
            <h2 className="h4 fw-bold text-white font-heading mb-1">
              Alege Data și Ora Următoarei Ședințe
            </h2>
            <p className="text-muted small mb-0">
              Ședința va fi înregistrată automat pentru <strong>{enrolledCourseObj?.title}</strong> cu instructorul tău:{' '}
              <strong className="text-warning">{instructorDetails.name}</strong>.
            </p>
          </div>

          {bookingSuccessMsg && (
            <div className="alert alert-success d-flex align-items-center gap-2 mb-4 p-3 rounded-3">
              <CheckCircle size={18} />
              <span>{bookingSuccessMsg}</span>
            </div>
          )}

          <form onSubmit={handleCreateStudentBooking} className="d-grid gap-4">
            
            {/* Locked Info Pill */}
            <div className="p-3 rounded-3 bg-dark bg-opacity-70 border border-secondary border-opacity-40 d-flex flex-wrap align-items-center justify-content-between gap-2">
              <div className="d-flex align-items-center gap-2">
                <Car size={16} className="text-warning" />
                <span className="text-gray-200 small">
                  <strong>Categorie Curs:</strong> {enrolledCourseObj?.title}
                </span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <User size={16} className="text-info" />
                <span className="text-gray-200 small">
                  <strong>Instructor Titular:</strong> {instructorDetails.name}
                </span>
              </div>
            </div>

            {/* Date & Time Slot */}
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label text-gray-300 small fw-semibold">Data Ședinței *</label>
                <div className="input-group">
                  <span className="input-group-text bg-dark border-secondary text-muted"><Calendar size={16} /></span>
                  <input
                    type="date"
                    className="form-control bg-dark text-white border-secondary"
                    value={bookingDate}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setBookingDate(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="col-md-6">
                <label className="form-label text-gray-300 small fw-semibold">Interval Orar *</label>
                <select
                  className="form-select bg-dark text-white border-secondary"
                  value={bookingTime}
                  onChange={(e) => setBookingTime(e.target.value)}
                  required
                >
                  {availableTimeSlots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Pickup Location */}
            <div>
              <label className="form-label text-gray-300 small fw-semibold">Punct de Preluare / Locație Întâlnire *</label>
              <div className="input-group">
                <span className="input-group-text bg-dark border-secondary text-muted"><MapPin size={16} /></span>
                <input
                  type="text"
                  className="form-control bg-dark text-white border-secondary"
                  placeholder="ex: Sediul ABC Teodor / Gară de Sud Ploiești / Domiciliu..."
                  value={bookingLocation}
                  onChange={(e) => setBookingLocation(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Notes for Instructor */}
            <div>
              <label className="form-label text-gray-300 small fw-semibold">Observații / Preferințe pentru Instructor (Opțional):</label>
              <textarea
                rows="2"
                className="form-control bg-dark text-white border-secondary"
                placeholder="ex: Vreau să exersăm parcarea laterală, pornirea din rampă sau traseul de examen..."
                value={bookingNotes}
                onChange={(e) => setBookingNotes(e.target.value)}
              ></textarea>
            </div>

            {/* Summary Box */}
            <div className="p-3 rounded-3 bg-dark bg-opacity-90 border border-warning border-opacity-30">
              <small className="text-warning fw-bold d-block mb-1.5" style={{ fontSize: '0.75rem' }}>SUMAR ȘEDINȚĂ:</small>
              <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 small text-gray-200">
                <div>
                  <strong>Instructor:</strong> <span className="text-warning">{instructorDetails.name}</span>
                </div>
                <div>
                  <strong>Data &amp; Ora:</strong> {bookingDate} ({bookingTime})
                </div>
                <div>
                  <strong>Locație:</strong> {bookingLocation || 'Sediul ABC Teodor'}
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-between align-items-center pt-2">
              <button
                type="button"
                className="btn btn-outline-secondary rounded-pill px-4 py-2 text-gray-300"
                onClick={() => setActiveTab('bookings')}
              >
                Anulează
              </button>

              <button
                type="submit"
                disabled={submittingBooking}
                className="btn btn-warning bg-gradient-warning text-dark fw-bold rounded-pill px-5 py-2.5 shadow"
              >
                {submittingBooking ? 'Se înregistrează...' : 'Confirmă Programarea'}
              </button>
            </div>

          </form>

        </div>
      )}

      {/* TAB 3: ACCOUNT & ENROLLMENT SETTINGS (READ-ONLY) */}
      {activeTab === 'settings' && (
        <div className="glass-panel p-4 p-md-5 rounded-4 border border-secondary shadow-2xl" style={{ maxWidth: '800px', margin: '0 auto' }}>
          
          <div className="d-flex align-items-center justify-content-between mb-4 border-bottom border-secondary border-opacity-40 pb-3">
            <div>
              <h2 className="h4 fw-bold text-white font-heading mb-1">
                Detalii Cont &amp; Dosar Școlarizare
              </h2>
              <p className="text-muted small mb-0">
                Informații oficiale privind înscrierea ta la Școala Auto ABC Teodor.
              </p>
            </div>

            <span className="badge bg-secondary text-white border border-secondary px-3 py-1.5 rounded-pill small d-flex align-items-center gap-1">
              <Lock size={12} /> Date Securizate
            </span>
          </div>

          <div className="row g-3 mb-4">
            
            {/* Categorie Curs */}
            <div className="col-md-6">
              <div className="p-3 rounded-3 bg-dark bg-opacity-70 border border-secondary border-opacity-40">
                <small className="text-muted d-block text-uppercase fw-semibold" style={{ fontSize: '0.72rem' }}>
                  CATEGORIE PERMIS ÎNSCRISĂ
                </small>
                <span className="fw-bold text-warning d-block mt-1">
                  {enrolledCourseObj?.title || 'Categoria B (Autoturisme)'}
                </span>
                <small className="text-muted mt-1 d-block" style={{ fontSize: '0.75rem' }}>
                  🔒 Ne-editabil • Stabilit prin contractul de școlarizare
                </small>
              </div>
            </div>

            {/* Instructor Titular */}
            <div className="col-md-6">
              <div className="p-3 rounded-3 bg-dark bg-opacity-70 border border-secondary border-opacity-40">
                <small className="text-muted d-block text-uppercase fw-semibold" style={{ fontSize: '0.72rem' }}>
                  INSTRUCTOR TITULAR ALOCAT
                </small>
                <span className="fw-bold text-white d-block mt-1">
                  {instructorDetails.name} ({instructorDetails.role})
                </span>
                <small className="text-muted mt-1 d-block" style={{ fontSize: '0.75rem' }}>
                  Tel: {instructorDetails.phone}
                </small>
              </div>
            </div>

            {/* Nume Cursant */}
            <div className="col-md-6">
              <div className="p-3 rounded-3 bg-dark bg-opacity-70 border border-secondary border-opacity-40">
                <small className="text-muted d-block text-uppercase fw-semibold" style={{ fontSize: '0.72rem' }}>
                  NUME ȘI PRENUME CURSANT
                </small>
                <span className="fw-bold text-white d-block mt-1">
                  {profile?.name || user?.displayName || 'Cursant Înscris'}
                </span>
              </div>
            </div>

            {/* Email */}
            <div className="col-md-6">
              <div className="p-3 rounded-3 bg-dark bg-opacity-70 border border-secondary border-opacity-40">
                <small className="text-muted d-block text-uppercase fw-semibold" style={{ fontSize: '0.72rem' }}>
                  ADRESĂ DE EMAIL
                </small>
                <span className="fw-bold text-white d-block mt-1">
                  {user?.email}
                </span>
              </div>
            </div>

            {/* Telefon */}
            <div className="col-md-6">
              <div className="p-3 rounded-3 bg-dark bg-opacity-70 border border-secondary border-opacity-40">
                <small className="text-muted d-block text-uppercase fw-semibold" style={{ fontSize: '0.72rem' }}>
                  NUMĂR DE TELEFON
                </small>
                <span className="fw-bold text-white d-block mt-1">
                  {studentData?.phone || profile?.phone || 'Nespecificat'}
                </span>
              </div>
            </div>

            {/* Cod Înscriere */}
            <div className="col-md-6">
              <div className="p-3 rounded-3 bg-dark bg-opacity-70 border border-secondary border-opacity-40">
                <small className="text-muted d-block text-uppercase fw-semibold" style={{ fontSize: '0.72rem' }}>
                  COD ÎNSCRIERE SECRETARIAT
                </small>
                <span className="fw-bold text-info d-block mt-1">
                  {studentData?.instructorCode || profile?.teacherCode || 'VALIDAT'}
                </span>
              </div>
            </div>

          </div>

          {/* Info Notice */}
          <div className="p-3 rounded-3 bg-dark bg-opacity-90 border border-info border-opacity-30 d-flex align-items-start gap-2.5">
            <Info size={18} className="text-info flex-shrink-0 mt-0.5" />
            <p className="text-muted small mb-0" style={{ lineHeight: '1.5' }}>
              Pentru modificarea categoriei de permis, schimbarea instructorului titular sau actualizarea datelor din dosar, vă rugăm să contactați secretariatul la numărul{' '}
              <a href={`tel:${ENV.PHONE_RAW}`} className="text-warning text-decoration-none fw-semibold">
                {ENV.PHONE}
              </a>{' '}
              sau la sediul din {ENV.ADDRESS}.
            </p>
          </div>

        </div>
      )}

    </div>
  );
}
