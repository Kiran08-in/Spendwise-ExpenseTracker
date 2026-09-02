import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';
import './Reports.css';

const COLORS = ["#a5b4fc", "#6366f1", "#f0997b", "#93e8cf", "#3b82f6", "#ec4899"];

function Reports({ transactions }) {
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const savings = totalIncome - totalExpense;
  const savingsRate = totalIncome > 0 ? ((savings / totalIncome) * 100).toFixed(1) : 0;

  const expensesByCategory = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => {
      const existing = acc.find((item) => item.name === t.category);
      if (existing) existing.value += t.amount;
      else acc.push({ name: t.category, value: t.amount });
      return acc;
    }, []);

  const monthlyData = transactions.reduce((acc, t) => {
    const month = new Date(t.date).toLocaleString('default', { month: 'short' });
    let entry = acc.find((m) => m.month === month);
    if (!entry) {
      entry = { month, income: 0, expense: 0 };
      acc.push(entry);
    }
    if (t.type === "income") entry.income += t.amount;
    else entry.expense += t.amount;
    return acc;
  }, []);

  const dailySpending = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => {
      let entry = acc.find((d) => d.date === t.date);
      if (!entry) {
        entry = { date: t.date, amount: 0 };
        acc.push(entry);
      }
      entry.amount += t.amount;
      return acc;
    }, [])
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="reports-page">
      <div className="page-header">
        <h1>Reports</h1>
        <p>Analyze your financial reports</p>
      </div>

      <div className="reports-row">
        <div className="report-card">
          <h2>Expenses by category</h2>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={expensesByCategory} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80} paddingAngle={3}>
                {expensesByCategory.map((entry, i) => (
                  <Cell key={entry.name} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend layout="vertical" align="right" verticalAlign="middle" />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="report-card">
          <h2>Monthly income vs expense</h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="income" fill="#16a34a" />
              <Bar dataKey="expense" fill="#dc2626" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="reports-row">
        <div className="report-card wide">
          <h2>Spending trend</h2>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={dailySpending}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="amount" stroke="#6366f1" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="report-card summary-card">
          <h2>Summary</h2>
          <div className="summary-row"><span>Total Income</span><strong>₹{totalIncome.toLocaleString()}</strong></div>
          <div className="summary-row"><span>Total Expense</span><strong>₹{totalExpense.toLocaleString()}</strong></div>
          <div className="summary-row"><span>Savings</span><strong>₹{savings.toLocaleString()}</strong></div>
          <div className="summary-row"><span>Savings Rate</span><strong>{savingsRate}%</strong></div>
        </div>
      </div>
    </div>
  );
}

export default Reports;