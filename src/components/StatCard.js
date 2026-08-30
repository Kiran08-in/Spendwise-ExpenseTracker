import './StatCard.css';

function StatCard({ label, value }) {
  return (
    <div className="stat-card">
      <p className="stat-label">{label}</p>
      <p className="stat-value">₹{value.toLocaleString()}</p>
    </div>
  );
}

export default StatCard;