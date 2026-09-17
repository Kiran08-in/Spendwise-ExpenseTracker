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
  const [transactions, setTransactions] = useState([]);
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

useEffect(() => {
  document.body.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}, [theme]);
useEffect(() => {
  fetch('http://127.0.0.1:8000/transactions')
    .then(response => response.json())
    .then(data => setTransactions(data));
}, []);

async function addTransaction(newTransaction) {
  const response = await fetch('http://127.0.0.1:8000/transactions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newTransaction)
  });
  const savedTransaction = await response.json();
  setTransactions([...transactions, savedTransaction]);
}

  async function deleteTransaction(id) {
  await fetch(`http://127.0.0.1:8000/transactions/${id}`, {
    method: 'DELETE'
  });
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