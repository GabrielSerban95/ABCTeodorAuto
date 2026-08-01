import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { loginWithEmailAndPassword, loginWithGoogle } from '../../firebase/auth';
import { useAuth } from '../../hooks/useAuth';
import { ROUTES, ROLE_DEFAULT_ROUTE } from '../../constants/routes';

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, role, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const from = location.state?.from?.pathname;

  useEffect(() => {
    if (!loading && user) {
      const destination = from || ROLE_DEFAULT_ROUTE[role] || ROUTES.DASHBOARD;
      navigate(destination, { replace: true });
    }
  }, [loading, user, role, navigate, from]);

  const handleEmailLogin = async (event) => {
    event.preventDefault();
    setError('');

    try {
      await loginWithEmailAndPassword(email, password);
    } catch (err) {
      setError(err.message || 'Autentificarea a eșuat.');
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    try {
      await loginWithGoogle();
    } catch (err) {
      setError(err.message || 'Autentificarea Google a eșuat.');
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center px-3 py-5">
      <div className="glass-panel p-4 p-md-5 w-100" style={{ maxWidth: 480 }}>
        <h1 className="h3 fw-bold mb-2">Autentificare</h1>
        <p className="text-muted mb-4">Intră în cont pentru a gestiona programările și portalul instructorilor.</p>
        {error ? <div className="alert alert-danger">{error}</div> : null}

        <form onSubmit={handleEmailLogin} className="d-grid gap-3">
          <div>
            <label className="form-label">Email</label>
            <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div>
            <label className="form-label">Parolă</label>
            <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button className="btn btn-primary" type="submit">Conectează-te</button>
        </form>

        <div className="d-flex align-items-center my-4">
          <div className="flex-grow-1 border-top" />
          <span className="px-3 text-muted small">sau</span>
          <div className="flex-grow-1 border-top" />
        </div>

        <button className="btn btn-outline-light w-100" onClick={handleGoogleLogin}>Continuă cu Google</button>

        <p className="mt-4 mb-0 text-muted">
          Nu ai cont? <Link to={ROUTES.REGISTER} className="text-primary">Creează unul</Link>
        </p>
      </div>
    </div>
  );
}
