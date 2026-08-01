import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { getBookingsByInstructorId } from '../../firebase/firestore';
import LoadingSpinner from '../shared/LoadingSpinner';

export default function InstructorDashboard() {
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
        const data = await getBookingsByInstructorId(user.uid);
        setBookings(data);
      } catch (err) {
        console.error('Eroare la preluarea programărilor instructorului:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user]);

  if (loading) {
    return <LoadingSpinner label="Se încarcă programările instructorului..." />;
  }

  return (
    <div className="container py-5">
      <div className="glass-panel p-4 p-md-5 mb-4">
        <h1 className="h3 fw-bold mb-3">Portal instructor</h1>
        <p className="text-muted mb-0">Bine ai venit, {profile?.name || user?.displayName || 'instructor'}! Aici poți vedea orele tale și starea lor.</p>
      </div>

      {bookings.length === 0 ? (
        <div className="glass-panel p-4 p-md-5 text-center">
          <h2 className="h5 fw-bold mb-3">Nu există programări alocate acestui instructor.</h2>
          <p className="text-muted mb-0">Odată ce un elev te selectează pentru o oră, programarea va apărea aici.</p>
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
                  <p className="mb-2"><strong>Elev:</strong> {booking.studentName}</p>
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
