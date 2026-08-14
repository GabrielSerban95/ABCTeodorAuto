import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { getAllBookings, getAllUsers, updateBookingStatus } from '../../firebase/firestore';
import LoadingSpinner from '../shared/LoadingSpinner';
import { Check, XCircle, Search, Calendar, Phone, Mail, User, Clock, ArrowLeft, LogOut } from 'lucide-react';
import { ROUTES } from '../../constants/routes';
import toast from 'react-hot-toast';

export default function AdminDashboard() {
  const { user, profile, logout } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const fetchData = async () => {
    try {
      const [allBookings, allUsers] = await Promise.all([getAllBookings(), getAllUsers()]);
      setBookings(allBookings);
      setUsers(allUsers);
    } catch (err) {
      console.error('Eroare la preluarea datelor admin:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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

  const filteredBookings = bookings.filter((b) => {
    const matchesFilter = statusFilter === 'all' || b.status === statusFilter;
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      !term ||
      b.studentName?.toLowerCase().includes(term) ||
      b.studentPhone?.includes(term) ||
      b.instructorName?.toLowerCase().includes(term) ||
      b.categoryName?.toLowerCase().includes(term);
    return matchesFilter && matchesSearch;
  });

  if (loading) {
    return <LoadingSpinner label="Se încarcă informațiile de administrare..." />;
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
        <h1 className="h3 fw-bold mb-2">Panou Administrare</h1>
        <p className="text-muted mb-4">Bine ai venit, {profile?.name || user?.displayName || 'Admin'}! Aici poți gestiona toți utilizatorii și programările școlii.</p>

        {/* Stats Row */}
        <div className="row g-3 mb-4">
          <div className="col-md-4">
            <div className="glass-panel p-4 rounded-4 border border-secondary text-center">
              <h2 className="display-6 fw-bold text-warning mb-1">{bookings.length}</h2>
              <p className="text-muted mb-0">Programări totale</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="glass-panel p-4 rounded-4 border border-secondary text-center">
              <h2 className="display-6 fw-bold text-info mb-1">{users.length}</h2>
              <p className="text-muted mb-0">Utilizatori înregistrați</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="glass-panel p-4 rounded-4 border border-secondary text-center">
              <h2 className="display-6 fw-bold text-success mb-1">
                {bookings.filter((b) => b.status === 'confirmat').length}
              </h2>
              <p className="text-muted mb-0">Programări confirmate</p>
            </div>
          </div>
        </div>

        {/* Bookings Management Table */}
        <div className="mt-5">
          <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-3">
            <h4 className="fw-bold text-white mb-0">Toate Programările</h4>
            
            <div className="d-flex flex-wrap align-items-center gap-2">
              <div className="input-group input-group-sm" style={{ maxWidth: 240 }}>
                <span className="input-group-text bg-dark border-secondary text-muted"><Search size={14} /></span>
                <input
                  type="text"
                  className="form-control bg-dark text-white border-secondary"
                  placeholder="Caută elev, tel, instructor..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <select
                className="form-select form-select-sm bg-dark text-white border-secondary"
                style={{ width: 'auto' }}
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">Toate stările</option>
                <option value="in_asteptare">În așteptare</option>
                <option value="confirmat">Confirmate</option>
                <option value="anulat">Anulate</option>
              </select>
            </div>
          </div>

          {filteredBookings.length === 0 ? (
            <div className="p-4 text-center text-muted border border-secondary border-opacity-30 rounded-3">
              Nu a fost găsită nicio programare.
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-dark table-hover align-middle rounded-3 overflow-hidden">
                <thead className="table-secondary text-dark">
                  <tr>
                    <th>Elev</th>
                    <th>Telefon</th>
                    <th>Categorie</th>
                    <th>Instructor</th>
                    <th>Data & Ora</th>
                    <th>Stare</th>
                    <th className="text-end">Acțiuni</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBookings.map((b) => (
                    <tr key={b.id}>
                      <td className="fw-semibold text-white">{b.studentName}</td>
                      <td>
                        <a href={`tel:${b.studentPhone}`} className="text-warning text-decoration-none small">
                          {b.studentPhone}
                        </a>
                      </td>
                      <td><span className="badge bg-primary bg-opacity-30 text-info">{b.categoryName}</span></td>
                      <td className="small text-muted">{b.instructorName}</td>
                      <td className="small">
                        {b.date} <span className="text-muted">({b.time})</span>
                      </td>
                      <td>
                        <span className={`badge ${b.status === 'confirmat' ? 'bg-success' : b.status === 'in_asteptare' ? 'bg-warning text-dark' : 'bg-danger'}`}>
                          {b.status === 'confirmat' ? 'Confirmat' : b.status === 'in_asteptare' ? 'În așteptare' : 'Anulat'}
                        </span>
                      </td>
                      <td className="text-end">
                        <div className="d-inline-flex gap-1">
                          {b.status !== 'confirmat' && (
                            <button
                              className="btn btn-sm btn-outline-success p-1 px-2"
                              title="Confirmă"
                              onClick={() => handleStatusChange(b.id, 'confirmat')}
                            >
                              <Check size={14} />
                            </button>
                          )}
                          {b.status !== 'anulat' && (
                            <button
                              className="btn btn-sm btn-outline-danger p-1 px-2"
                              title="Anulează"
                              onClick={() => handleStatusChange(b.id, 'anulat')}
                            >
                              <XCircle size={14} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
