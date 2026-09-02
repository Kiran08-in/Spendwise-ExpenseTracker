import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Income from './pages/Income';
import Expenses from './pages/Expenses';
import Categories from './pages/Categories';
import Reports from './pages/Reports';
import Budget from './pages/Budget';
import Setting from './pages/Setting';
import './App.css';

function App() {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('transactions');
    return saved ? JSON.parse(saved) : [
      { id: 1, title: "Salary", category: "Income", type: "income", amount: 50000, date: "2025-05-28" },
      { id: 2, title: "Starbucks Coffee", category: "Food", type: "expense", amount: 250, date: "2025-05-28" },
      { id: 3, title: "Uber Ride", category: "Transport", type: "expense", amount: 180, date: "2025-05-27" },
      { id: 4, title: "Amazon Shopping", category: "Shopping", type: "expense", amount: 1299, date: "2025-05-27" },
      { id: 5, title: "Electricity Bill", category: "Bills", type: "expense", amount: 1150, date: "2025-05-26" },
    ];
  });
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

useEffect(() => {
  document.body.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}, [theme]);

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  function addTransaction(newTransaction) {
    setTransactions([...transactions, { ...newTransaction, id: Date.now() }]);
  }

  function deleteTransaction(id) {
    setTransactions(transactions.filter((t) => t.id !== id));
  }

  return (
    <div className="app">
      <Navbar />
      <div className="body">
        <Sidebar />
        <main className="page">
          <Routes>
            <Route path="/" element={<Dashboard transactions={transactions} addTransaction={addTransaction} />} />
            <Route path="/income" element={<Income transactions={transactions} />} />
            <Route path="/income" element={<Income transactions={transactions} deleteTransaction={deleteTransaction} />} />
            <Route path="/expenses" element={<Expenses transactions={transactions} deleteTransaction={deleteTransaction} />} />
            <Route path="/categories" element={<Categories transactions={transactions} />} />
            <Route path="/reports" element={<Reports transactions={transactions} />} />
            <Route path="/budget" element={<Budget transactions={transactions} />} />
            <Route path="/setting" element={<Setting theme={theme} setTheme={setTheme} />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;