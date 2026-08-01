import { useAuth } from '../../hooks/useAuth';

export default function InstructorDashboard() {
  const { user, profile } = useAuth();

  return (
    <div className="container py-5">
      <div className="glass-panel p-4 p-md-5">
        <h1 className="h3 fw-bold mb-3">Portal instructor</h1>
        <p className="text-muted mb-0">Bine ai venit, {profile?.name || user?.displayName || 'instructor'}! În curând vei putea gestiona calendarul și elevii.</p>
      </div>
    </div>
  );
}
