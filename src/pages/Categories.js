import './Categories.css';

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
        {categoryTotals.map((cat) => (
          <div key={cat.name} className="category-card">
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