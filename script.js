const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');
const btnIncome = document.getElementById('btn-income');
const btnExpense = document.getElementById('btn-expense');

let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
let transactionType = 'income';

btnIncome.addEventListener('click', () => {
    transactionType = 'income';
    btnIncome.classList.add('active');
    btnExpense.classList.remove('active');
});

btnExpense.addEventListener('click', () => {
    transactionType = 'expense';
    btnIncome.classList.remove('active');
    btnExpense.classList.add('active');
});

function addTransaction(e) {
    e.preventDefault();

    if (text.value.trim() === '' || amount.value.trim() === '') {
        alert('Por favor, preencha ambos os campos.');
        return;
    }

    const transaction = {
        id: generateID(),
        text: text.value,
        amount: transactionType === 'income' ? +amount.value : -amount.value
    };

    transactions.push(transaction);
    addTransactionDOM(transaction);
    updateValues();
    updateLocalStorage();
    text.value = '';
    amount.value = '';
    transactionType = 'income';
    btnIncome.classList.add('active');
    btnExpense.classList.remove('active');
}

function generateID() {
    return Math.floor(Math.random() * 1000000);
}

function addTransactionDOM(transaction) {
    const sign = transaction.amount < 0 ? '-' : '+';
    const item = document.createElement('li');

    item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');
    item.innerHTML = `
        ${transaction.text} <span>${sign}R$ ${Math.abs(transaction.amount).toFixed(2)}</span>
        <button class="delete-btn" onclick="removeTransaction(${transaction.id})">EXCLUIR</button>
    `;

    list.appendChild(item);
}

function updateValues() {
    const amounts = transactions.map(transaction => transaction.amount);
    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
    const income = amounts
        .filter(item => item > 0)
        .reduce((acc, item) => (acc += item), 0)
        .toFixed(2);
    const expense = (amounts
        .filter(item => item < 0)
        .reduce((acc, item) => (acc += item), 0) * -1)
        .toFixed(2);

    balance.innerText = `R$ ${total}`;
    money_plus.innerText = `R$ ${income}`;
    money_minus.innerText = `R$ ${expense}`;
}

function removeTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);
    updateLocalStorage();
    init();
}

function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

function init() {
    list.innerHTML = '';
    transactions.forEach(addTransactionDOM);
    updateValues();
}

form.addEventListener('submit', addTransaction);

init();


document.getElementById('showDivButton').addEventListener('click', function() {
    const hiddenDiv = document.getElementById('hiddenDiv');
    if (hiddenDiv.classList.contains('hidden')) {
        hiddenDiv.classList.remove('hidden');
        setTimeout(() => {
            hiddenDiv.classList.add('visible');
        }, 10);
    }
});

function mostrarContainer() {
    var container = document.querySelector('.container');
    var button = document.querySelector('button');
    container.classList.remove('hidden');
    container.classList.add('fade-in');
    setTimeout(() => container.classList.add('show'), 10);
    button.style.display = 'none';
}

function ocultarContainer() {
    var container = document.querySelector('.container');
    var button = document.querySelector('button');
    container.classList.remove('show');
    container.classList.add('fade-in');
    setTimeout(() => container.classList.add('hidden'), 10);
    aparecerBotton()
}

function aparecerBotton() {
    var container = document.querySelector('.btn_div1');
    var button = document.querySelector('button');
    container.classList.add('show');
    container.classList.add('fade-in');
    setTimeout(() => container.classList.add('show'), 10); 
    button.style.display = 'block';
}