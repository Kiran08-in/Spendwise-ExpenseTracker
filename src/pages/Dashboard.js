import { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import StatCard from '../components/StatCard';
import AddTransaction from '../components/AddTransaction';
import './Dashboard.css';
import Modal from '../components/Modal';

const COLORS = ["#a5b4fc", "#6366f1", "#93e8cf", "#f0997b", "#3b82f6", "#ec4899"];

function Dashboard({ transactions, addTransaction }) {
  const [formOpen, setFormOpen] = useState(false);
  const [formType, setFormType] = useState('expense');

  function openForm(type) {
    setFormType(type);
    setFormOpen(true);
  }

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpense;

  const stats = [
    { label: "Total Balance", value: balance },
    { label: "Total Income", value: totalIncome },
    { label: "Total Expense", value: totalExpense },
    { label: "Savings", value: balance },
  ];

  const expensesByCategory = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => {
      const existing = acc.find((item) => item.name === t.category);
      if (existing) {
        existing.value += t.amount;
      } else {
        acc.push({ name: t.category, value: t.amount });
      }
      return acc;
    }, []);

  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  return (
    <div className="dashboard-page">
      <div className="dashboard-page-header">
        <h1>Dashboard</h1>
        <p>Welcome back</p>
      </div>

      <div className="dashboard-stats">
        {stats.map((stat) => (
          <StatCard key={stat.label} label={stat.label} value={stat.value} />
        ))}
      </div>

      <div className="dashboard-mid-row">
        <div className="dashboard-chart-section">
          <h2>Expenses by category</h2>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={expensesByCategory}
                dataKey="value"
                nameKey="name"
                innerRadius={55}
                outerRadius={85}
                paddingAngle={3}
              >
                {expensesByCategory.map((entry, index) => (
                  <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <p className="chart-total">Total<br /><strong>₹{totalExpense.toLocaleString()}</strong></p>
        </div>

        <div className="dashboard-actions-section">
          <h2>Quick actions</h2>
          <button className="quick-btn red" onClick={() => openForm('expense')}>
            Add expense
          </button>
          <button className="quick-btn green" onClick={() => openForm('income')}>
            Add income
          </button>
        </div>
      </div>
      <div className="dashboard-recent-section">
        <h2>Recent transactions</h2>
        {recentTransactions.map((t) => (
          <div key={t.id} className="recent-row">
            <span>{t.title}</span>
            <span className={t.type === "income" ? "amount-income" : "amount-expense"}>
              {t.type === "income" ? "+" : "-"}₹{t.amount.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
      {formOpen && (
        <Modal onClose={() => setFormOpen(false)}>
          <h2>Add {formType === "income" ? "Income" : "Expense"}</h2>
          <AddTransaction
            addTransaction={addTransaction}
            defaultType={formType}
            onDone={() => setFormOpen(false)}
          />
        </Modal>
      )}
    </div>
  );
}

export default Dashboard;