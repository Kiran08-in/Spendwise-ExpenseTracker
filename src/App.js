import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
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
            <Route path="/transactions" element={<Transactions transactions={transactions} deleteTransaction={deleteTransaction} />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;