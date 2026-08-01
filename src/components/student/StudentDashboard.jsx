import { useAuth } from '../../hooks/useAuth';
import { ROUTES } from '../../constants/routes';

export default function StudentDashboard() {
  const { user, profile } = useAuth();

  return (
    <div className="container py-5">
      <div className="glass-panel p-4 p-md-5">
        <h1 className="h3 fw-bold mb-3">Bun venit, {profile?.name || user?.displayName || 'elev'}!</h1>
        <p className="text-muted mb-0">Acesta este dashboard-ul elevului. În curând vei vedea aici programările tale și starea lor.</p>
      </div>
    </div>
  );
}
