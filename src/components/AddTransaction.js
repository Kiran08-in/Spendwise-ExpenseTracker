import { useState } from 'react';
import './AddTransaction.css';

const categories = ["Food", "Transport", "Shopping", "Bills", "Entertainment", "Health", "Income", "Others"];

function AddTransaction({ addTransaction, onDone, defaultType }) {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState(defaultType || 'expense');
  const [category, setCategory] = useState(categories[0]);

  function handleSubmit(e) {
    e.preventDefault();
    addTransaction({
      title,
      amount: Number(amount),
      type,
      category,
      date: new Date().toISOString().split('T')[0],
    });
    setTitle('');
    setAmount('');
    onDone();
  }

  return (
    <form className="transaction-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        {categories.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </select>
      <button type="submit">Add</button>
    </form>
  );
}

export default AddTransaction;