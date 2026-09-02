import { useState } from 'react';
import './Budget.css';

const COLORS = ["#f97316", "#3b82f6", "#ec4899", "#22c55e", "#a855f7", "#ef4444"];

function Budget({ transactions }) {
  const [budgets, setBudgets] = useState({});

  const categoryTotals = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});

  function setBudget(category, value) {
    setBudgets({ ...budgets, [category]: Number(value) });
  }

  const categories = Object.keys(categoryTotals);

  const totalSpent = Object.values(categoryTotals).reduce((sum, v) => sum + v, 0);
  const totalBudget = Object.values(budgets).reduce((sum, v) => sum + v, 0);
  const overallPercent = totalBudget > 0 ? Math.min((totalSpent / totalBudget) * 100, 100) : 0;

  return (
    <div className="budget-page">
      <div className="page-header">
        <h1>Budget</h1>
        <p>Set and track your budget</p>
      </div>

      <div className="budget-grid">
        {categories.map((cat, i) => {
          const spent = categoryTotals[cat];
          const budget = budgets[cat] || 0;
          const percent = budget > 0 ? Math.min((spent / budget) * 100, 100) : 0;
          const color = COLORS[i % COLORS.length];

          return (
            <div key={cat} className="budget-card">
              <div className="budget-card-top">
                <div className="budget-icon" style={{ background: color }}>
                  {cat[0]}
                </div>
                <h3>{cat}</h3>
              </div>
              <input
                type="number"
                placeholder="Set budget"
                value={budgets[cat] || ''}
                onChange={(e) => setBudget(cat, e.target.value)}
              />
              <p className="budget-spent">
                ₹{spent.toLocaleString()} <span>of ₹{budget.toLocaleString()}</span>
              </p>
              <div className="budget-bar">
                <div
                  className="budget-bar-fill"
                  style={{ width: `${percent}%`, background: color }}
                />
              </div>
              <p className="budget-percent">{percent.toFixed(0)}%</p>
            </div>
          );
        })}
      </div>

      {totalBudget > 0 && (
        <div className="budget-summary">
          <p>
            You have spent ₹{totalSpent.toLocaleString()} of ₹{totalBudget.toLocaleString()} budget this month.
          </p>
          <strong>{overallPercent.toFixed(0)}%</strong>
        </div>
      )}
    </div>
  );
}

export default Budget;