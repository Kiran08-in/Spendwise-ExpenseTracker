import { useState } from 'react';
import StatCard from '../components/StatCard';
import './Expenses.css';

function Expenses({ transactions, deleteTransaction }) {
  const [searchQuery, setSearchQuery] = useState('');

  const expenseTransactions = transactions
    .filter((t) => t.type === "expense")
    .filter((t) => t.title.toLowerCase().includes(searchQuery.toLowerCase()));

  const totalExpense = expenseTransactions.reduce((sum, t) => sum + t.amount, 0);

  const thisMonth = new Date().toISOString().slice(0, 7);
  const thisMonthTotal = expenseTransactions
    .filter((t) => t.date.startsWith(thisMonth))
    .reduce((sum, t) => sum + t.amount, 0);

  const highest = expenseTransactions.reduce(
    (max, t) => (t.amount > (max?.amount || 0) ? t : max), null
  );

  const stats = [
    { label: "Total Expenses", value: totalExpense },
    { label: "This Month", value: thisMonthTotal },
    { label: "Highest Expense", value: highest?.amount || 0 },
    { label: "Total Transactions", value: expenseTransactions.length },
  ];

  return (
    <div className="expenses-page">
      <div className="page-header">
        <h1>Expenses</h1>
        <p>Track all your expenses</p>
      </div>

      <div className="expenses-stats">
        {stats.map((s) => (
          <StatCard key={s.label} label={s.label} value={s.value} />
        ))}
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