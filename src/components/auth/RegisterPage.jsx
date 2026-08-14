import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { registerWithEmailAndPassword, getFriendlyAuthErrorMessage } from '../../firebase/auth';
import { createStudentProfile, createUserProfile, resolveInstructorFromCode } from '../../firebase/firestore';
import { useAuth } from '../../hooks/useAuth';
import { ROLES } from '../../constants/roles';
import { ROUTES, ROLE_DEFAULT_ROUTE } from '../../constants/routes';
import { ENV } from '../../config/env';
import { ShieldCheck, User, Phone, Mail, Lock, KeyRound, Eye, EyeOff, AlertCircle, CheckCircle2, ArrowLeft } from 'lucide-react';

export default function RegisterPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, role, loading } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    teacherCode: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const from = location.state?.from?.pathname;

  useEffect(() => {
    if (!loading && user) {
      const destination = from || ROLE_DEFAULT_ROUTE[role] || ROUTES.DASHBOARD;
      navigate(destination, { replace: true });
    }
  }, [loading, user, role, navigate, from]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    setError('');

    // 1. Validare Nume
    if (!formData.name.trim() || formData.name.trim().length < 3) {
      setError('Vă rugăm să introduceți numele și prenumele complet.');
      return;
    }

    // 2. Validare Telefon
    const cleanPhone = formData.phone.replace(/\s+/g, '');
    if (!/^0[0-9]{9}$/.test(cleanPhone)) {
      setError('Numărul de telefon trebuie să fie un număr valid din România (ex: 0722123456).');
      return;
    }

    // 3. Validare Parolă
    if (formData.password.length < 6) {
      setError('Parola trebuie să aibă cel puțin 6 caractere.');
      return;
    }

    // 4. Validare Rescriere / Confirmare Parolă
    if (formData.password !== formData.confirmPassword) {
      setError('Parolele introduse nu coincid. Vă rugăm să rescrieți parola cu atenție.');
      return;
    }

    // 5. Validare Dinamică Cod Profesor / Înscriere
    setSubmitting(true);
    const codeResult = await resolveInstructorFromCode(formData.teacherCode);

    if (!codeResult.isValid) {
      setError(codeResult.message);
      setSubmitting(false);
      return;
    }

    try {
      const { user: registeredUser } = await registerWithEmailAndPassword(
        formData.email.trim(),
        formData.password,
        formData.name.trim()
      );

      await createUserProfile(registeredUser, ROLES.STUDENT, {
        name: formData.name.trim(),
        phone: cleanPhone,
        teacherCode: codeResult.code,
        assignedInstructorId: codeResult.instructorId,
        assignedInstructorName: codeResult.instructorName,
      });

      await createStudentProfile(registeredUser, {
        name: formData.name.trim(),
        phone: cleanPhone,
        teacherCode: codeResult.code,
        assignedInstructorId: codeResult.instructorId,
        assignedInstructorName: codeResult.instructorName,
        instructorPhone: codeResult.instructorPhone || '',
        instructorCar: codeResult.instructorCar || '',
      });
    } catch (err) {
      setError(getFriendlyAuthErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center px-3 py-5 position-relative" style={{ backgroundColor: '#090d16' }}>
      
      {/* Back to Home Button */}
      <div className="position-absolute top-0 start-0 m-4">
        <button
          className="btn btn-outline-light btn-sm rounded-pill px-3 py-1.5 d-flex align-items-center gap-1.5"
          onClick={() => navigate(ROUTES.HOME)}
        >
          <ArrowLeft size={16} />
          <span>Înapoi la Site</span>
        </button>
      </div>

      <div className="glass-panel p-4 p-md-5 w-100 rounded-4 border border-secondary shadow-2xl mt-4" style={{ maxWidth: 540 }}>
        
        {/* Header */}
        <div className="text-center mb-4">
          <span className="badge-custom badge-amber mb-2 d-inline-flex align-items-center gap-1.5">
            <ShieldCheck size={14} /> Înscriere Securizată Elevi
          </span>
          <h1 className="h3 fw-bold text-white mb-2 font-heading">Creare Cont Elev</h1>
          <p className="text-muted small mb-0">
            Accesul în platforma de programări este rezervat exclusiv elevilor înscriși la Școala Auto ABC Teodor.
          </p>
        </div>

        {error && (
          <div className="alert alert-danger d-flex align-items-start gap-2 mb-4 p-3 rounded-3" style={{ fontSize: '0.9rem' }}>
            <AlertCircle size={18} className="flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleRegister} className="d-grid gap-3">
          
          {/* Nume Complet */}
          <div>
            <label className="form-label text-gray-300 small fw-semibold">Nume și Prenume *</label>
            <div className="input-group">
              <span className="input-group-text bg-dark border-secondary text-muted"><User size={16} /></span>
              <input
                type="text"
                name="name"
                className="form-control bg-dark text-white border-secondary"
                placeholder="ex: Andrei Popescu"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Telefon */}
          <div>
            <label className="form-label text-gray-300 small fw-semibold">Număr de Telefon *</label>
            <div className="input-group">
              <span className="input-group-text bg-dark border-secondary text-muted"><Phone size={16} /></span>
              <input
                type="tel"
                name="phone"
                className="form-control bg-dark text-white border-secondary"
                placeholder="ex: 0722 000 111"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            <small className="text-muted" style={{ fontSize: '0.75rem' }}>Utilizat de instructor pentru confirmarea orelor</small>
          </div>

          {/* Email */}
          <div>
            <label className="form-label text-gray-300 small fw-semibold">Adresă de Email *</label>
            <div className="input-group">
              <span className="input-group-text bg-dark border-secondary text-muted"><Mail size={16} /></span>
              <input
                type="email"
                name="email"
                className="form-control bg-dark text-white border-secondary"
                placeholder="ex: andrei@email.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Parolă */}
          <div>
            <label className="form-label text-gray-300 small fw-semibold">Parolă * (minim 6 caractere)</label>
            <div className="input-group">
              <span className="input-group-text bg-dark border-secondary text-muted"><Lock size={16} /></span>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                className="form-control bg-dark text-white border-secondary"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                minLength={6}
                required
              />
              <button
                type="button"
                className="btn btn-outline-secondary border-secondary text-muted"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Rescriere / Confirmare Parolă */}
          <div>
            <label className="form-label text-gray-300 small fw-semibold">Rescrie Parola (Confirmare) *</label>
            <div className="input-group">
              <span className="input-group-text bg-dark border-secondary text-muted"><Lock size={16} /></span>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                className="form-control bg-dark text-white border-secondary"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                minLength={6}
                required
              />
              <button
                type="button"
                className="btn btn-outline-secondary border-secondary text-muted"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                tabIndex={-1}
              >
                {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {formData.password && formData.confirmPassword && (
              <small className={formData.password === formData.confirmPassword ? 'text-success' : 'text-danger'} style={{ fontSize: '0.78rem' }}>
                {formData.password === formData.confirmPassword ? '✓ Parolele coincid' : '✕ Parolele nu coincid'}
              </small>
            )}
          </div>

          {/* Cod Profesor / Înscriere */}
          <div className="p-3 rounded-3 bg-dark bg-opacity-70 border border-warning border-opacity-40">
            <label className="form-label text-warning small fw-bold d-flex align-items-center gap-1.5 mb-1">
              <KeyRound size={15} /> Cod Înscriere Elev / Cod Profesor *
            </label>
            <input
              type="text"
              name="teacherCode"
              className="form-control bg-dark text-white border-warning text-uppercase fw-bold letter-spacing-1"
              placeholder="ex: ABC2026 sau codul primit de la instructor"
              value={formData.teacherCode}
              onChange={handleChange}
              required
            />
            <small className="text-muted d-block mt-1" style={{ fontSize: '0.75rem' }}>
              🔒 Codul de siguranță este eliberat de profesorul tău auto sau secretariatul școlii.
            </small>
          </div>

          <button
            className="btn btn-warning bg-gradient-warning text-dark fw-bold rounded-pill py-2.5 mt-2 shadow"
            type="submit"
            disabled={submitting}
          >
            {submitting ? 'Se creează contul...' : 'Creează Cont Elev'}
          </button>
        </form>

        <p className="mt-4 mb-0 text-center text-muted small">
          Ai deja cont? <Link to={ROUTES.LOGIN} className="text-warning fw-semibold text-decoration-none">Autentifică-te aici</Link>
        </p>
      </div>
    </div>
  );
}
