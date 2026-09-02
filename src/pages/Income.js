import { useState } from 'react';
import './Income.css';

function Income({ transactions, deleteTransaction }) {
  const [searchQuery, setSearchQuery] = useState('');

  const incomeTransactions = transactions
    .filter((t) => t.type === "income")
    .filter((t) => t.title.toLowerCase().includes(searchQuery.toLowerCase()));

  const totalIncome = incomeTransactions.reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="income-page">
      <div className="page-header">
        <h1>Income</h1>
        <p>Total income: ₹{totalIncome.toLocaleString()}</p>
      </div>

      <input
        className="search-input"
        type="text"
        placeholder="Search income..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <table className="income-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {incomeTransactions.map((t) => (
            <tr key={t.id}>
              <td>{t.title}</td>
              <td>{t.category}</td>
              <td className="amount-income">+₹{t.amount.toLocaleString()}</td>
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

export default Income;