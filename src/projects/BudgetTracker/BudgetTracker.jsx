import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faChartPie, faMoneyBill } from '@fortawesome/free-solid-svg-icons';
import { v4 as uuidv4 } from 'uuid';
import HeaderProject from '../../components/layouts/ProjectHeader';
import Footer from '../../components/layouts/Footer';
import './BudgetTracker.css';

const BudgetTracker = () => {
  const [transactions, setTransactions] = useState(() => {
    const savedTransactions = localStorage.getItem('budgetTransactions');
    return savedTransactions ? JSON.parse(savedTransactions) : [];
  });
  
  const [categories] = useState([
    'Food', 'Transportation', 'Housing', 'Utilities', 
    'Entertainment', 'Healthcare', 'Shopping', 'Other'
  ]);
  
  const [newTransaction, setNewTransaction] = useState({
    description: '',
    amount: '',
    type: 'expense',
    category: 'Food',
    date: new Date().toISOString().split('T')[0]
  });

  const [editingId, setEditingId] = useState(null);
  const [filter, setFilter] = useState('all');
  const [dateRange, setDateRange] = useState('month');

  useEffect(() => {
    localStorage.setItem('budgetTransactions', JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (e) => {
    e.preventDefault();
    if (!newTransaction.description || !newTransaction.amount) return;

    const transaction = {
      id: uuidv4(),
      ...newTransaction,
      amount: parseFloat(newTransaction.amount),
      timestamp: new Date().toISOString()
    };

    if (editingId) {
      setTransactions(transactions.map(t => 
        t.id === editingId ? transaction : t
      ));
      setEditingId(null);
    } else {
      setTransactions([transaction, ...transactions]);
    }

    setNewTransaction({
      description: '',
      amount: '',
      type: 'expense',
      category: 'Food',
      date: new Date().toISOString().split('T')[0]
    });
  };

  const editTransaction = (transaction) => {
    setEditingId(transaction.id);
    setNewTransaction({
      description: transaction.description,
      amount: transaction.amount.toString(),
      type: transaction.type,
      category: transaction.category,
      date: transaction.date
    });
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  const calculateBalance = () => {
    return transactions.reduce((acc, curr) => {
      return curr.type === 'income' 
        ? acc + curr.amount 
        : acc - curr.amount;
    }, 0);
  };

  const calculateCategoryTotals = () => {
    return transactions
      .filter(t => t.type === 'expense')
      .reduce((acc, curr) => {
        acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
        return acc;
      }, {});
  };

  const filterTransactions = () => {
    let filtered = [...transactions];

    if (filter !== 'all') {
      filtered = filtered.filter(t => t.type === filter);
    }

    if (dateRange === 'month') {
      const now = new Date();
      const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
      filtered = filtered.filter(t => new Date(t.date) >= monthStart);
    } else if (dateRange === 'week') {
      const now = new Date();
      const weekStart = new Date(now.setDate(now.getDate() - now.getDay()));
      filtered = filtered.filter(t => new Date(t.date) >= weekStart);
    }

    return filtered;
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="app">
      <HeaderProject 
        title="Budget Tracker" 
        description="Track your income and expenses with detailed analytics"
      />
      <main className="budget-main">
        <div className="budget-container">
          <div className="budget-header">
            <div className="balance-card">
              <h2>Current Balance</h2>
              <p className={`balance ${calculateBalance() >= 0 ? 'positive' : 'negative'}`}>
                {formatCurrency(calculateBalance())}
              </p>
            </div>
            <div className="quick-stats">
              <div className="stat-card income">
                <FontAwesomeIcon icon={faMoneyBill} />
                <div className="stat-content">
                  <h3>Income</h3>
                  <p>{formatCurrency(
                    transactions
                      .filter(t => t.type === 'income')
                      .reduce((acc, curr) => acc + curr.amount, 0)
                  )}</p>
                </div>
              </div>
              <div className="stat-card expenses">
                <FontAwesomeIcon icon={faChartPie} />
                <div className="stat-content">
                  <h3>Expenses</h3>
                  <p>{formatCurrency(
                    transactions
                      .filter(t => t.type === 'expense')
                      .reduce((acc, curr) => acc + curr.amount, 0)
                  )}</p>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={addTransaction} className="transaction-form">
            <input
              type="text"
              value={newTransaction.description}
              onChange={(e) => setNewTransaction({
                ...newTransaction,
                description: e.target.value
              })}
              placeholder="Description"
              className="form-input"
            />
            <input
              type="number"
              value={newTransaction.amount}
              onChange={(e) => setNewTransaction({
                ...newTransaction,
                amount: e.target.value
              })}
              placeholder="Amount"
              step="0.01"
              className="form-input"
            />
            <select
              value={newTransaction.type}
              onChange={(e) => setNewTransaction({
                ...newTransaction,
                type: e.target.value
              })}
              className="form-select"
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
            <select
              value={newTransaction.category}
              onChange={(e) => setNewTransaction({
                ...newTransaction,
                category: e.target.value
              })}
              className="form-select"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <input
              type="date" 
              value={newTransaction.date}
              onChange={(e) => setNewTransaction({
                ...newTransaction,
                date: e.target.value
              })}
              className="form-input"
            />
            <button type="submit" className="form-button">
              {editingId ? 'Update' : 'Add'} Transaction
            </button>
          </form>

          <div className="filters">
            <div className="filter-group">
              <button
                className={`filter-button ${filter === 'all' ? 'active' : ''}`}
                onClick={() => setFilter('all')}
              >
                All
              </button>
              <button
                className={`filter-button ${filter === 'income' ? 'active' : ''}`}
                onClick={() => setFilter('income')}
              >
                Income
              </button>
              <button
                className={`filter-button ${filter === 'expense' ? 'active' : ''}`}
                onClick={() => setFilter('expense')}
              >
                Expenses
              </button>
            </div>
            <div className="filter-group">
              <button
                className={`filter-button ${dateRange === 'all' ? 'active' : ''}`}
                onClick={() => setDateRange('all')}
              >
                All Time
              </button>
              <button
                className={`filter-button ${dateRange === 'month' ? 'active' : ''}`}
                onClick={() => setDateRange('month')}
              >
                This Month
              </button>
              <button
                className={`filter-button ${dateRange === 'week' ? 'active' : ''}`}
                onClick={() => setDateRange('week')}
              >
                This Week
              </button>
            </div>
          </div>

          <div className="transactions-list">
            {filterTransactions().map(transaction => (
              <div
                key={transaction.id}
                className={`transaction-item ${transaction.type}`}
              >
                <div className="transaction-info">
                  <h3>{transaction.description}</h3>
                  <p className="transaction-category">{transaction.category}</p>
                  <p className="transaction-date">{transaction.date}</p>
                </div>
                <div className="transaction-amount">
                  <p className={transaction.type}>
                    {transaction.type === 'income' ? '+' : '-'}
                    {formatCurrency(transaction.amount)}
                  </p>
                  <div className="transaction-actions">
                    <button
                      onClick={() => editTransaction(transaction)}
                      className="action-button edit"
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button
                      onClick={() => deleteTransaction(transaction.id)}
                      className="action-button delete"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {transactions.length > 0 && (
            <div className="category-summary">
              <h3>Expense Categories</h3>
              <div className="category-grid">
                {Object.entries(calculateCategoryTotals()).map(([category, amount]) => (
                  <div key={category} className="category-item">
                    <h4>{category}</h4>
                    <p>{formatCurrency(amount)}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BudgetTracker;