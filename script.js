document.addEventListener('DOMContentLoaded', () => {
  loadTransactions();

  const addTransactionButton = document.getElementById('addTransactionButton');
  addTransactionButton.addEventListener('click', addTransaction);
});

function addTransaction() {
  const description = document.getElementById('description').value;
  const amount = parseFloat(document.getElementById('amount').value);
  const transactionList = document.getElementById('transactionList');

  if (description && !isNaN(amount)) {
      const transaction = { description, amount };
      saveTransaction(transaction);

      const li = document.createElement('li');
      li.textContent = `${transaction.description}: ${amount >= 0 ? '+' : ''}$${transaction.amount}`;
      transactionList.appendChild(li);

      updateBalance();

      document.getElementById('description').value = '';
      document.getElementById('amount').value = '';
  } else {
      alert('Please enter both description and a valid amount.');
  }
}

function saveTransaction(transaction) {
  try {
      const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
      transactions.push(transaction);
      localStorage.setItem('transactions', JSON.stringify(transactions));
  } catch (error) {
      console.error('Error saving transaction:', error);
  }
}

function loadTransactions() {
  try {
      const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
      const transactionList = document.getElementById('transactionList');

      transactions.forEach(transaction => {
          const li = document.createElement('li');
          li.textContent = `${transaction.description}: ${transaction.amount >= 0 ? '+' : ''}$${transaction.amount}`;
          transactionList.appendChild(li);
      });

      updateBalance();
  } catch (error) {
      console.error('Error loading transactions:', error);
  }
}

function updateBalance() {
  try {
      const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
      const income = transactions
          .filter(transaction => transaction.amount > 0)
          .reduce((sum, transaction) => sum + transaction.amount, 0);
      const expense = transactions
          .filter(transaction => transaction.amount < 0)
          .reduce((sum, transaction) => sum + transaction.amount, 0);
      const balance = income + expense;

      document.getElementById('income').textContent = `Income: $${income.toFixed(2)}`;
      document.getElementById('expense').textContent = `Expense: $${Math.abs(expense).toFixed(2)}`;
      document.getElementById('balance').textContent = `Balance: $${balance.toFixed(2)}`;
  } catch (error) {
      console.error('Error updating balance:', error);
  }
}