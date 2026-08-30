import './Transactions.css';
import { useState } from 'react';

function Transactions({ transactions, deleteTransaction }) {
  const [categoryFilter, setCategoryFilter] = useState('All');

  const categories = ['All', ...new Set(transactions.map((t) => t.category))];

  const filteredTransactions = categoryFilter === 'All'
    ? transactions
    : transactions.filter((t) => t.category === categoryFilter);
  return (
    <div className="transactions-page">
      <h1>Transactions</h1>
      <div className="filter-bar">
        <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>
      <table className="transactions-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.map((t) => (
            <tr key={t.id}>
              <td>{t.title}</td>
              <td>{t.category}</td>
              <td>
                <span className={`type-badge ${t.type}`}>{t.type}</span>
              </td>
              <td className={t.type === "income" ? "amount-income" : "amount-expense"}>
                {t.type === "income" ? "+" : "-"}₹{t.amount}
              </td>
              <td>{t.date}</td>
              <td>
                <button className="delete-btn" onClick={() => deleteTransaction(t.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Transactions;