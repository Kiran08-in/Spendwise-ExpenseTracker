import './Categories.css';

const COLORS = ["#f97316", "#3b82f6", "#ec4899", "#22c55e", "#a855f7", "#ef4444"];

function Categories({ transactions }) {
  const categoryTotals = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => {
      const existing = acc.find((item) => item.name === t.category);
      if (existing) {
        existing.total += t.amount;
        existing.count += 1;
      } else {
        acc.push({ name: t.category, total: t.amount, count: 1 });
      }
      return acc;
    }, []);

  return (
    <div className="categories-page">
      <div className="page-header">
        <h1>Categories</h1>
        <p>Spending breakdown by category</p>
      </div>

      <div className="categories-grid">
        {categoryTotals.map((cat, i) => (
          <div key={cat.name} className="category-card">
            <div className="category-icon" style={{ background: COLORS[i % COLORS.length] }}>
              {cat.name[0]}
            </div>
            <h3>{cat.name}</h3>
            <p className="category-total">₹{cat.total.toLocaleString()}</p>
            <p className="category-count">{cat.count} transaction{cat.count !== 1 ? 's' : ''}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Categories;