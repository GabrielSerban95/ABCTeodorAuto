import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { getBookingsByInstructorId, updateBookingStatus } from '../../firebase/firestore';
import LoadingSpinner from '../shared/LoadingSpinner';
import { Check, XCircle, Phone, Calendar, Clock, MapPin, ArrowLeft, LogOut } from 'lucide-react';
import { ROUTES } from '../../constants/routes';
import toast from 'react-hot-toast';

export default function InstructorDashboard() {
  const { user, profile, logout } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    if (!user) {
      setBookings([]);
      setLoading(false);
      return;
    }

    try {
      const data = await getBookingsByInstructorId(user.uid, user.email);
      setBookings(data);
    } catch (err) {
      console.error('Eroare la preluarea programărilor instructorului:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [user]);

  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      await updateBookingStatus(bookingId, newStatus);
      setBookings((prev) => prev.map((b) => (b.id === bookingId ? { ...b, status: newStatus } : b)));
      toast.success(newStatus === 'confirmat' ? 'Programare confirmată!' : 'Programare anulată.');
    } catch (err) {
      console.error('Eroare actualizare status:', err);
      toast.error('Nu s-a putut actualiza starea programării.');
    }
  };

  if (loading) {
    return <LoadingSpinner label="Se încarcă programările instructorului..." />;
  }

  return (
    <div className="container py-4 py-md-5" style={{ minHeight: '85vh' }}>
      {/* Top Navigation Bar */}
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
        <button
          className="btn btn-outline-light btn-sm rounded-pill px-3 py-1.5 d-flex align-items-center gap-1.5"
          onClick={() => navigate(ROUTES.HOME)}
        >
          <ArrowLeft size={16} />
          <span>Înapoi la Site</span>
        </button>

        <button
          className="btn btn-outline-danger btn-sm rounded-pill px-3 py-1.5 d-flex align-items-center gap-1.5"
          onClick={async () => {
            await logout();
            navigate(ROUTES.HOME);
          }}
        >
          <LogOut size={16} />
          <span>Deconectare</span>
        </button>
      </div>

      <div className="glass-panel p-4 p-md-5 mb-4 rounded-4 border border-secondary">
        <h1 className="h3 fw-bold mb-2">Portal Instructor</h1>
        <p className="text-muted mb-0">Bine ai venit, {profile?.name || user?.displayName || 'Instructor'}! Aici poți vedea orele tale și gestiona starea lor.</p>
      </div>

      {bookings.length === 0 ? (
        <div className="glass-panel p-4 p-md-5 text-center">
          <h2 className="h5 fw-bold mb-3">Nu există programări alocate acestui instructor.</h2>
          <p className="text-muted mb-0">Odată ce un elev realizează o programare, aceasta va apărea aici.</p>
        </div>
      ) : (
        <div className="row g-3">
          {bookings.map((booking) => (
            <div className="col-md-6" key={booking.id}>
              <div className="glass-panel p-4 rounded-4 border border-secondary d-flex flex-column justify-content-between h-100">
                <div>
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div>
                      <h3 className="h6 fw-bold text-white mb-1">{booking.categoryName}</h3>
                      <small className="text-site-muted d-flex align-items-center gap-1">
                        <Calendar size={13} /> {booking.date} • <Clock size={13} /> {booking.time}
                      </small>
                    </div>
                    <span className={`badge ${booking.status === 'confirmat' ? 'bg-success' : booking.status === 'in_asteptare' ? 'bg-warning text-dark' : 'bg-danger text-white'}`}>
                      {booking.status === 'confirmat' ? 'Confirmat' : booking.status === 'in_asteptare' ? 'În așteptare' : 'Anulat'}
                    </span>
                  </div>
                  <div className="text-site-body" style={{ fontSize: '0.95rem' }}>
                    <p className="mb-1"><strong>Elev:</strong> {booking.studentName}</p>
                    <p className="mb-1">
                      <strong>Telefon:</strong>{' '}
                      <a href={`tel:${booking.studentPhone}`} className="text-warning text-decoration-none">
                        <Phone size={13} className="me-1" />{booking.studentPhone}
                      </a>
                    </p>
                    {booking.studentEmail && <p className="mb-1"><strong>Email:</strong> {booking.studentEmail}</p>}
                    <p className="mb-2"><strong>Locație:</strong> <MapPin size={13} className="me-1" />{booking.location}</p>
                    {booking.notes && <p className="text-muted small fst-italic mb-0">"{booking.notes}"</p>}
                  </div>
                </div>

                <div className="d-flex gap-2 mt-3 pt-3 border-top border-secondary border-opacity-30">
                  {booking.status !== 'confirmat' && (
                    <button
                      className="btn btn-sm btn-success d-flex align-items-center gap-1 rounded-pill px-3"
                      onClick={() => handleStatusChange(booking.id, 'confirmat')}
                    >
                      <Check size={14} /> Confirmă
                    </button>
                  )}
                  {booking.status !== 'anulat' && (
                    <button
                      className="btn btn-sm btn-outline-danger d-flex align-items-center gap-1 rounded-pill px-3"
                      onClick={() => handleStatusChange(booking.id, 'anulat')}
                    >
                      <XCircle size={14} /> Anulează
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
