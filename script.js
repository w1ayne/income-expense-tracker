document.addEventListener('DOMContentLoaded', () => {
    loadTransactions();
    document.getElementById('addTransactionButton').addEventListener('click', addTransaction);
  });
  
  function generateId() {
    return Date.now(); // ใช้ timestamp เป็น id
  }
  
  function addTransaction() {
    const description = document.getElementById('description').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const type = document.getElementById('typeSelector').value;
  
    if (description && !isNaN(amount)) {
        const signedAmount = type === 'income' ? amount : -amount;
        const transaction = { id: generateId(), description, amount: signedAmount };
        saveTransaction(transaction);
        appendTransactionToDOM(transaction);
        updateBalance();
        document.getElementById('description').value = '';
        document.getElementById('amount').value = '';
    } else {
        alert('Please enter both description and a valid amount.');
    }
  }
  
  function saveTransaction(transaction) {
    const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    transactions.push(transaction);
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }
  
  function loadTransactions() {
    const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    transactions.forEach(transaction => {
      appendTransactionToDOM(transaction);
    });
    updateBalance();
  }
  
  /**function appendTransactionToDOM(transaction) {
    const li = document.createElement('li');
    li.innerHTML = `
      ${transaction.description}: ${transaction.amount >= 0 ? '+' : ''}$${Math.abs(transaction.amount)}
      <button onclick="deleteTransaction(${transaction.id})" style="margin-left:10px; color: red;">ลบ</button>
    `;
    document.getElementById('transactionList').appendChild(li);
  }**/
  function appendTransactionToDOM(transaction) {
    const li = document.createElement('li');
    li.classList.add(transaction.amount < 0 ? 'expense' : 'income');
  
    li.innerHTML = `
      ${transaction.description}: ${transaction.amount >= 0 ? '+' : ''}$${Math.abs(transaction.amount)}
      <button onclick="deleteTransaction(${transaction.id})">🗑️</button>
    `;
    document.getElementById('transactionList').appendChild(li);
  }
  
  
  function deleteTransaction(id) {
    let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    transactions = transactions.filter(t => t.id !== id);
    localStorage.setItem('transactions', JSON.stringify(transactions));
    document.getElementById('transactionList').innerHTML = '';
    loadTransactions();
  }
  
  function updateBalance() {
    const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    const income = transactions
        .filter(t => t.amount > 0)
        .reduce((sum, t) => sum + t.amount, 0);
    const expense = transactions
        .filter(t => t.amount < 0)
        .reduce((sum, t) => sum + t.amount, 0);
    const balance = income + expense;
  
    document.getElementById('income').textContent = `Income: $${income.toFixed(2)}`;
    document.getElementById('expense').textContent = `Expense: $${Math.abs(expense).toFixed(2)}`;
    document.getElementById('balance').textContent = `Balance: $${balance.toFixed(2)}`;
  }
  