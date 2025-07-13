const form = document.getElementById('expense-form');
const tableBody = document.querySelector('#expense-table tbody');
const totalDisplay = document.getElementById('total');

let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

function renderExpenses() {
  tableBody.innerHTML = '';
  let total = 0;

  expenses.forEach((expense, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${expense.description}</td>
      <td>${expense.amount}</td>
      <td>${expense.type === 'income' ? 'รายรับ' : 'รายจ่าย'}</td>
      <td><button onclick="deleteExpense(${index})">ลบ</button></td>
    `;
    tableBody.appendChild(row);

    total += expense.type === 'income' ? expense.amount : -expense.amount;
  });

  totalDisplay.textContent = `ยอดรวม: ${total}`;
}

function addExpense(event) {
  event.preventDefault();

  const description = document.getElementById('description').value;
  const amount = parseFloat(document.getElementById('amount').value);
  const type = document.getElementById('type').value;

  expenses.push({ description, amount, type });
  localStorage.setItem('expenses', JSON.stringify(expenses));

  form.reset();
  renderExpenses();
}

function deleteExpense(index) {
  expenses.splice(index, 1);
  localStorage.setItem('expenses', JSON.stringify(expenses));
  renderExpenses();
}

form.addEventListener('submit', addExpense);
renderExpenses();