'use strict';
// BANKIST APP
/////////////////////////////////////////////////
// Data
/////////////////////////////////////////////////

const account1 = {
  owner: 'Hagar Ragab',
  interestRate: 1.2, // %
  pin: 1111,

  movemetnsInfo: [
    {
      amount: 200,
      date: '2023-11-18T21:31:17.178Z',
    },
    {
      amount: 450,
      date: '2023-12-23T07:42:02.383Z',
    },
    {
      amount: -400,
      date: '2024-01-28T09:15:04.904Z',
    },
    {
      amount: 3000,
      date: '2024-04-06T10:17:24.185Z',
    },
    {
      amount: -650,
      date: '2024-09-07T14:11:59.604Z',
    },
    {
      amount: -130,
      date: '2024-09-08T17:01:17.194Z',
    },
    {
      amount: 70,
      date: '2024-09-10T23:36:17.929Z',
    },
    {
      amount: 1300,
      date: '2024-09-11T10:51:36.790Z',
    },
  ],

  currency: 'EGP',
  locale: 'en-EG',

  getMovsAmounts() {
    return this.movemetnsInfo.map(mov => mov.amount);
  },
};

const account2 = {
  owner: 'Emma Noah',
  interestRate: 1.5,
  pin: 2222,

  movemetnsInfo: [
    {
      amount: 5000,
      date: '2023-11-18T21:31:17.178Z',
    },
    {
      amount: 3400,
      date: '2023-12-23T07:42:02.383Z',
    },
    {
      amount: -150,
      date: '2024-01-28T09:15:04.904Z',
    },
    {
      amount: -790,
      date: '2024-04-06T10:17:24.185Z',
    },
    {
      amount: -3120,
      date: '2024-09-07T14:11:59.604Z',
    },
    {
      amount: -1000,
      date: '2024-09-08T17:01:17.194Z',
    },
    {
      amount: 850,
      date: '2024-09-10T23:36:17.929Z',
    },
    {
      amount: -30,
      date: '2024-09-11T10:51:36.790Z',
    },
  ],

  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account3 = {
  owner: 'Steven Thomas Williams',
  interestRate: 0.7,
  pin: 3333,

  movemetnsInfo: [
    {
      amount: 200,
      date: '2023-11-18T21:31:17.178Z',
    },
    {
      amount: -200,
      date: '2023-12-23T07:42:02.383Z',
    },
    {
      amount: 340,
      date: '2024-01-28T09:15:04.904Z',
    },
    {
      amount: -300,
      date: '2024-04-06T10:17:24.185Z',
    },
    {
      amount: -20,
      date: '2024-09-07T14:11:59.604Z',
    },
    {
      amount: 50,
      date: '2024-09-08T17:01:17.194Z',
    },
    {
      amount: 400,
      date: '2024-09-10T23:36:17.929Z',
    },
    {
      amount: -460,
      date: '2024-09-11T10:51:36.790Z',
    },
  ],

  currency: 'USD',
  locale: 'es-ES',
};

const account4 = {
  owner: 'Sarah Smith',
  interestRate: 1,
  pin: 4444,

  movemetnsInfo: [
    {
      amount: 430,
      date: '2023-11-18T21:31:17.178Z',
    },
    {
      amount: 1000,
      date: '2023-12-23T07:42:02.383Z',
    },
    {
      amount: 700,
      date: '2024-01-28T09:15:04.904Z',
    },
    {
      amount: 50,
      date: '2024-04-06T10:17:24.185Z',
    },
    {
      amount: 90,
      date: '2024-09-07T14:11:59.604Z',
    },
  ],

  currency: 'GBP',
  locale: 'en-UK',
};

let accounts = [account1, account2, account3, account4];
const movsAmountsArr = account1.getMovsAmounts;

/////////////////////////////////////////////////
// HTMLELEMENTS VARIABLES
/////////////////////////////////////////////////

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const errorMsg = document.querySelector('.error');
const overlay = document.querySelector('.overlay');
const modal = document.querySelector('.modal');
const modalText = document.querySelector('.modal__text');
const modalCloseIcon = document.querySelector('.modal__close');
const modalYesBtn = document.querySelector('.modal__decision--yes');
const modalNoBtn = document.querySelector('.modal__decision--no');
const modalOkBtn = document.querySelector('.modal__decision--ok');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

let currentAccount, timer, clock;

/////////////////////////////////////////////////
// DATE AND TIME
/////////////////////////////////////////////////

//? Handle movements dates
const calcDaysPassed = (date1, date2) => Math.abs(date2 - date1);

const handleMovsDates = function (date, locale) {
  const now = new Date();
  const daysPassed = Math.round(
    calcDaysPassed(new Date(date), now) / (1000 * 60 * 60 * 24)
  );

  if (daysPassed === 0) return 'today';
  if (daysPassed === 1) return 'yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;

  //* Display date by using internationalization Intl
  const options = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  };
  return new Intl.DateTimeFormat(locale, options).format(new Date(date));
};

//? Handle clock
const calcDateTime = function (account) {
  if (!account) return;

  //* Internationalization INTL
  const options = {
    day: '2-digit',
    year: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  };
  // const userDeviceLang = navigator.language;
  return Intl.DateTimeFormat(account.locale, options).format(new Date());
};

/////////////////////////////////////////////////
// CURRENCY
/////////////////////////////////////////////////

const formatCurrency = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    useGrouping: false,
    maximumFractionDigits: 2,
    currencyDisplay: 'narrowSymbol',
  }).format(value);
};

/////////////////////////////////////////////////
// SORT
/////////////////////////////////////////////////

//? Sort
let sorted = false;
btnSort.addEventListener('click', () => {
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
// MOVEMENTS
/////////////////////////////////////////////////

//? Display movements
const displayMovements = function (account, sorted = false) {
  containerMovements.innerHTML = '';

  const movs = sorted
    ? account.movemetnsInfo.slice().sort((a, b) => a.amount - b.amount)
    : account.movemetnsInfo;

  movs.forEach((mov, i) => {
    const movementDate = handleMovsDates(mov.date, account.locale);

    mov.movStatus ??= mov.amount > 0 ? 'deposit' : 'withdrawal';

    containerMovements.insertAdjacentHTML(
      'afterbegin',
      `
      <div class="movements__row">
        <div class="movements__type movements__type--${mov.movStatus}">${
        i + 1
      } ${mov.movStatus}</div>
        <div class="movements__date">${movementDate}</div>
        <div class="movements__value">${formatCurrency(
          mov.amount,
          account.locale,
          account.currency
        )}</div>
      </div>
      `
    );
  });
  Array.from(document.querySelectorAll('.movements__row')).forEach((row, i) => {
    if (i % 2 === 0) {
      row.style.backgroundColor = '#f3f3f3';
    }
  });
};

/////////////////////////////////////////////////
// BALANCE
/////////////////////////////////////////////////

//? Calc and display balance
const handleBalance = function (account) {
  // Calc balance
  account.balance = movsAmountsArr
    .call(account)
    .reduce((balance, mov) => (balance += mov), 0);

  // Display balance
  labelBalance.textContent = formatCurrency(
    account.balance,
    account.locale,
    account.currency
  );
};

/////////////////////////////////////////////////
// SUMMARY
/////////////////////////////////////////////////

//? Calc and display summary
const handleSummary = function (account) {
  // Calc IN
  const sumDeposits = movsAmountsArr
    .call(account)
    .filter(amount => amount > 0)
    .reduce((acc, cur) => acc + cur);
  // Display IN
  labelSumIn.textContent = `${formatCurrency(
    sumDeposits,
    account.locale,
    account.currency
  )}`;

  // Calc OUT
  const sumWithdrawals = movsAmountsArr
    .call(account)
    .filter(amount => amount < 0)
    .reduce((acc, cur) => acc + cur, 0);
  // Display OUT
  labelSumOut.textContent = `${formatCurrency(
    Math.abs(sumWithdrawals),
    account.locale,
    account.currency
  )}`;

  // Calc interest rate
  // on each deposit the bank add an interest rate
  const addRate = movsAmountsArr
    .call(account)
    .filter(amount => amount > 0)
    .map(deposit => (deposit * account.interestRate) / 100)
    .reduce((interest, cur) => interest + cur, 0);
  // Display interest rate
  labelSumInterest.textContent = `${formatCurrency(
    addRate,
    account.locale,
    account.currency
  )}`;
};

//? Update UI
const updateUI = function (account) {
  handleBalance(account);
  handleSummary(account);
  displayMovements(account);
};

///////////////////////////////////////////////////
// COUNTDOWN
///////////////////////////////////////////////////

const countdown = function () {
  let time = 300;

  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);

    if (time === 0) {
      clearInterval(timer);
      containerApp.style.opacity = '0';
      labelWelcome.textContent = 'Log in to get started';
    }

    labelTimer.textContent = `${min}:${sec}`;
    time--;
  };

  tick();
  timer = setInterval(tick, 1000);
  return timer;
};

const displayDateClock = function () {
  clock = setInterval(() => {
    labelDate.textContent = `${calcDateTime(currentAccount)}`;
  }, 1000);
};

///////////////////////////////////////////////////
// ERRORS
///////////////////////////////////////////////////

//! Show error message
const showErrorMsg = function (msg, className) {
  const element = document.querySelector(`.${className}`);
  element.style.opacity = '1';
  element.textContent = msg;
};

//! Hide error message
const hideErrorMsg = function (className) {
  document.querySelector(`.${className}`).style.opacity = '0';
};

///////////////////////////////////////////////////
// LOGIN
///////////////////////////////////////////////////

//? Login implementation
//! Calc username
accounts.forEach(acc => {
  acc.username = acc.owner
    .split(' ')
    .reduce((username, n) => (username += n[0]), '')
    .toLowerCase();
});

//! Find account
const findAccount = function (enteredName, enteredPin) {
  return accounts.find(acc => {
    return enteredPin
      ? acc.username === enteredName && acc.pin === enteredPin
      : acc.username === enteredName;
  });
};

//! login button handler event
const loginCallback = e => {
  e.preventDefault();

  //! Check credintials
  if (inputLoginUsername.value === '' || inputLoginPin.value === '') {
    showErrorMsg('Please add correct username and PIN', 'login__error');
  } else {
    //! Find account
    currentAccount = findAccount(
      inputLoginUsername.value,
      Number(inputLoginPin.value)
    );

    if (!currentAccount)
      return showErrorMsg('Wrong username or PIN :(', 'login__error');

    hideErrorMsg('login__error');
    //! Display welcome message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    //! Display date and time
    displayDateClock();

    //! Display UI
    containerApp.style.opacity = 1;
    //! Update UI
    updateUI(currentAccount);
    //! Reset inputs
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    //! Set coundown timer
    if (timer) clearInterval(timer);
    timer = countdown();
  }
};

btnLogin.addEventListener('click', loginCallback);

///////////////////////////////////////////////////
// Modal
///////////////////////////////////////////////////

//? Show Modal
const showModal = function (msg, noAction = false) {
  overlay.classList.remove('hidden');
  modal.classList.remove('hidden');
  modalText.textContent = msg;
  if (noAction) {
    modalOkBtn.classList.remove('hidden');
    modalNoBtn.classList.add('hidden');
    modalYesBtn.classList.add('hidden');
  } else {
    modalOkBtn.classList.add('hidden');
    modalNoBtn.classList.remove('hidden');
    modalYesBtn.classList.remove('hidden');
  }
};

//? Hide Modal
const hideModal = function () {
  overlay.classList.add('hidden');
  modal.classList.add('hidden');
  // Set clock
  clearInterval(clock);
  // Set coundown timer
  clearInterval(timer);
};

modalNoBtn.addEventListener('click', hideModal);
modalCloseIcon.addEventListener('click', hideModal);
overlay.addEventListener('click', hideModal);

/////////////////////////////////////////////////
// TRANSFER
/////////////////////////////////////////////////

//? Transfer implementation
btnTransfer.addEventListener('click', e => {
  e.preventDefault();

  //! Reset countdown timer
  clearInterval(timer);
  timer = countdown();

  let transferAmount = Number(inputTransferAmount.value);
  let transferTo = inputTransferTo.value;

  const warningMsg = 'Please enter correct data';
  const noMoneyMsg = 'Sorry, There is no enough money.';

  if (transferTo === '' || transferAmount === '') {
    showErrorMsg(warningMsg, 'transfer--error');
  } else {
    //! Catch recipient
    const recipient = findAccount(transferTo);
    if (
      recipient &&
      recipient !== currentAccount &&
      currentAccount.balance >= transferAmount &&
      transferAmount > 0
    ) {
      hideErrorMsg('transfer--error');
      const confirmationMsg = `You are almost to transfer ${formatCurrency(
        +transferAmount,
        currentAccount.locale,
        currentAccount.currency
      )} to ${recipient.owner}. Are you sure?`;
      showModal(confirmationMsg);

      modalYesBtn.onclick = function () {
        //! withdrawal - current account
        currentAccount.movemetnsInfo.push({
          amount: -transferAmount,
          date: new Date().toISOString(),
        });
        //! deposite - recipient
        recipient.movemetnsInfo.push({
          amount: transferAmount,
          date: new Date().toISOString(),
        });
        updateUI(currentAccount);
        hideModal();
      };

      // Clear inputs
      inputTransferTo.value = inputTransferAmount.value = '';
    } else if (currentAccount.balance < transferAmount) {
      showErrorMsg(noMoneyMsg, 'transfer--error');
    } else {
      showErrorMsg(warningMsg, 'transfer--error');
    }
  }
});

/////////////////////////////////////////////////
// LOAN
/////////////////////////////////////////////////

//? Request loan
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  //! Reset countdown timer
  clearInterval(timer);
  timer = countdown();

  const loanAmount = Math.floor(Number(inputLoanAmount.value));
  const warningMsg = 'Please enter valid amount';
  const confirmationMsg = `you're almost to take a loan with ${loanAmount} EUR. Are you sure?`;
  const sorryMsg = `Sorry 😢 you cannot take this loan. You must add a deposite in your account with at least 10% of the loan's amount.`;

  // Loan rule > user has any deposite with 10% of the loan's amount
  const isLoanAccepted = movsAmountsArr
    .call(currentAccount)
    .some(amount => amount >= loanAmount * 0.1);

  if (loanAmount && isLoanAccepted && loanAmount > 0) {
    showModal(confirmationMsg);

    modalYesBtn.onclick = function () {
      const newLength = currentAccount.movemetnsInfo.push({
        amount: loanAmount,
        date: new Date().toISOString(),
        movStatus: 'pending',
      });
      displayMovements(currentAccount);
      setTimeout(() => {
        currentAccount.movemetnsInfo[newLength - 1].movStatus = 'deposit';
        updateUI(currentAccount);
      }, 5000);
      hideModal();
    };

    inputLoanAmount.value = '';
    hideErrorMsg('loan--error');
  } else if (!isLoanAccepted) {
    showModal(sorryMsg);
    modalYesBtn.classList.add('hidden');
    hideErrorMsg('loan--error');
    inputLoanAmount.value = '';
    inputLoanAmount.blur();
  } else {
    showErrorMsg(warningMsg, 'loan--error');
  }
});

/////////////////////////////////////////////////
// CLOSE ACCOUNT
/////////////////////////////////////////////////

//? Close account
btnClose.addEventListener('click', e => {
  e.preventDefault();
  const warningMsg = 'Please enter correct username and PIN';
  const confirmationMsg = 'You are almost to close your account. Are you sure?';
  if (
    inputCloseUsername.value !== currentAccount.username ||
    Number(inputClosePin.value) !== currentAccount.pin
  )
    showErrorMsg(warningMsg, 'close--error');
  else {
    showModal(confirmationMsg);
    modalYesBtn.onclick = function () {
      accounts = accounts.filter(
        account => inputCloseUsername.value !== account.username
      );
      // Reset welcome message
      labelWelcome.textContent = 'Log in to get started';
      inputCloseUsername.value = inputClosePin.value = '';
      // Hide UI
      containerApp.style.opacity = '0';
      hideModal();
    };
  }
});
