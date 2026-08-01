import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { getAllBookings, getAllUsers } from '../../firebase/firestore';
import LoadingSpinner from '../shared/LoadingSpinner';

export default function AdminDashboard() {
  const { user, profile } = useAuth();
  const [loading, setLoading] = useState(true);
  const [bookingCount, setBookingCount] = useState(0);
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [bookings, users] = await Promise.all([getAllBookings(), getAllUsers()]);
        setBookingCount(bookings.length);
        setUserCount(users.length);
      } catch (err) {
        console.error('Eroare la preluarea datelor admin:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCounts();
  }, []);

  if (loading) {
    return <LoadingSpinner label="Se încarcă informațiile de administrare..." />;
  }

  return (
    <div className="container py-5">
      <div className="glass-panel p-4 p-md-5 mb-4">
        <h1 className="h3 fw-bold mb-3">Panou administrare</h1>
        <p className="text-muted mb-3">Bine ai venit, {profile?.name || user?.displayName || 'admin'}! Aici vei gestiona utilizatorii și programările.</p>

        <div className="row g-3">
          <div className="col-md-4">
            <div className="glass-panel p-4 rounded-4 border border-secondary text-center">
              <h2 className="display-6 fw-bold text-warning mb-1">{bookingCount}</h2>
              <p className="text-muted mb-0">Programări totale</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="glass-panel p-4 rounded-4 border border-secondary text-center">
              <h2 className="display-6 fw-bold text-info mb-1">{userCount}</h2>
              <p className="text-muted mb-0">Utilizatori înregistrați</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="glass-panel p-4 rounded-4 border border-secondary text-center">
              <h2 className="display-6 fw-bold text-white mb-1">{profile?.role || 'admin'}</h2>
              <p className="text-muted mb-0">Rolul tău în aplicație</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
