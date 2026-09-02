import { useState } from 'react';
import './Expenses.css';

function Expenses({ transactions, deleteTransaction }) {
  const [searchQuery, setSearchQuery] = useState('');

  const expenseTransactions = transactions
    .filter((t) => t.type === "expense")
    .filter((t) => t.title.toLowerCase().includes(searchQuery.toLowerCase()));

  const totalExpense = expenseTransactions.reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="expenses-page">
      <div className="page-header">
        <h1>Expenses</h1>
        <p>Total expenses: ₹{totalExpense.toLocaleString()}</p>
      </div>

      <input
        className="search-input"
        type="text"
        placeholder="Search expenses..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <table className="expenses-table">
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
          {expenseTransactions.map((t) => (
            <tr key={t.id}>
              <td>{t.title}</td>
              <td>{t.category}</td>
              <td className="amount-expense">-₹{t.amount.toLocaleString()}</td>
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

export default Expenses;