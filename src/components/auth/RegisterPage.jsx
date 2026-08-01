import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerWithEmailAndPassword } from '../../firebase/auth';
import { createStudentProfile, createUserProfile } from '../../firebase/firestore';
import { ROLES } from '../../constants/roles';
import { ROUTES } from '../../constants/routes';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const { user } = await registerWithEmailAndPassword(email, password);
      await createUserProfile(user, ROLES.STUDENT);
      await createStudentProfile(user, { name });
      navigate(ROUTES.DASHBOARD);
    } catch (err) {
      setError(err.message || 'Înregistrarea a eșuat.');
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center px-3 py-5">
      <div className="glass-panel p-4 p-md-5 w-100" style={{ maxWidth: 480 }}>
        <h1 className="h3 fw-bold mb-2">Creare cont</h1>
        <p className="text-muted mb-4">Creează un cont elev pentru a accesa dashboard-ul și programările tale.</p>
        {error ? <div className="alert alert-danger">{error}</div> : null}

        <form onSubmit={handleRegister} className="d-grid gap-3">
          <div>
            <label className="form-label">Nume complet</label>
            <input className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div>
            <label className="form-label">Email</label>
            <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div>
            <label className="form-label">Parolă</label>
            <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} minLength="6" required />
          </div>
          <button className="btn btn-primary" type="submit">Creează cont</button>
        </form>

        <p className="mt-4 mb-0 text-muted">
          Ai deja cont? <Link to={ROUTES.LOGIN} className="text-primary">Autentifică-te</Link>
        </p>
      </div>
    </div>
  );
}
