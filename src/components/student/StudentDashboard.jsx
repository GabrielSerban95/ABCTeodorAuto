import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { getBookingsByStudentId } from '../../firebase/firestore';
import LoadingSpinner from '../shared/LoadingSpinner';

export default function StudentDashboard() {
  const { user, profile } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      if (!user) {
        setBookings([]);
        setLoading(false);
        return;
      }

      try {
        const data = await getBookingsByStudentId(user.uid, user.email);
        setBookings(data);
      } catch (err) {
        console.error('Eroare la preluarea programărilor:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user]);

  if (loading) {
    return <LoadingSpinner label="Se încarcă programările tale..." />;
  }

  return (
    <div className="container py-5">
      <div className="glass-panel p-4 p-md-5 mb-4">
        <h1 className="h3 fw-bold mb-3">Bun venit, {profile?.name || user?.displayName || 'elev'}!</h1>
        <p className="text-muted mb-0">Aici găsești programările tale și statusul fiecărei ore.</p>
      </div>

      {bookings.length === 0 ? (
        <div className="glass-panel p-4 p-md-5 text-center">
          <h2 className="h5 fw-bold mb-3">Nu ai programări înregistrate încă.</h2>
          <p className="text-muted mb-0">Programează o oră din pagina principală și verifică apoi aici starea rezervării.</p>
        </div>
      ) : (
        <div className="row g-3">
          {bookings.map((booking) => (
            <div className="col-md-6" key={booking.id}>
              <div className="glass-panel p-4 rounded-4 border border-secondary">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div>
                    <h3 className="h6 fw-bold text-white mb-1">{booking.categoryName}</h3>
                    <small className="text-site-muted">{booking.date} • {booking.time}</small>
                  </div>
                  <span className={`badge ${booking.status === 'confirmat' ? 'bg-success' : booking.status === 'in_asteptare' ? 'bg-warning text-dark' : 'bg-secondary'}`}>
                    {booking.status === 'confirmat' ? 'Confirmat' : booking.status === 'in_asteptare' ? 'În așteptare' : 'Altă stare'}
                  </span>
                </div>
                <div className="text-site-body" style={{ fontSize: '0.95rem' }}>
                  <p className="mb-2"><strong>Instructor:</strong> {booking.instructorName}</p>
                  <p className="mb-2"><strong>Telefon:</strong> {booking.studentPhone}</p>
                  <p className="mb-2"><strong>Email:</strong> {booking.studentEmail}</p>
                  <p className="mb-0"><strong>Locație:</strong> {booking.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
