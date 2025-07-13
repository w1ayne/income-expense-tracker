document.addEventListener('DOMContentLoaded', () => {
  loadTransactions();

  const addTransactionButton = document.getElementById('addTransactionButton');
  addTransactionButton.addEventListener('click', addTransaction);
});

function addTransaction() {
  const description = document.getElementById('description').value;
  const amount = document.getElementById('amount').value;
  const transactionList = document.getElementById('transactionList');

  if (description && amount) {
      const transaction = { description, amount: parseFloat(amount) };
      saveTransaction(transaction);

      const li = document.createElement('li');
      li.textContent = `${transaction.description}: $${transaction.amount}`;
      transactionList.appendChild(li);

      document.getElementById('description').value = '';
      document.getElementById('amount').value = '';
  } else {
      alert('Please enter both description and amount.');
  }
}

function saveTransaction(transaction) {
  try {
      const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
      transactions.push(transaction);
      localStorage.setItem('transactions', JSON.stringify(transactions));
      console.log('Transaction saved:', transaction);
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
          li.textContent = `${transaction.description}: $${transaction.amount}`;
          transactionList.appendChild(li);
      });

      console.log('Transactions loaded:', transactions);
  } catch (error) {
      console.error('Error loading transactions:', error);
  }
}