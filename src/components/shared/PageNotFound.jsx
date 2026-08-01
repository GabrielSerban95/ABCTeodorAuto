export default function PageNotFound() {
  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center px-3 py-5">
      <div className="glass-panel p-5 text-center" style={{ maxWidth: 520 }}>
        <h1 className="display-5 fw-bold mb-3">404</h1>
        <p className="text-muted mb-0">Pagina pe care o cauți nu există sau a fost mutată.</p>
      </div>
    </div>
  );
}
