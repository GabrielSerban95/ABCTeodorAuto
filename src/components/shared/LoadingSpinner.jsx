export default function LoadingSpinner({ label = 'Se încarcă...' }) {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center py-5 text-center">
      <div className="spinner-border text-primary" role="status" aria-label="loading" />
      <p className="mt-3 mb-0 text-muted">{label}</p>
    </div>
  );
}
