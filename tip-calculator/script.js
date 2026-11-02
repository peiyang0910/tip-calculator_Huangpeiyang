const form = document.getElementById("tip-form");
const billInput = document.getElementById("bill");
const tipSelect = document.getElementById("tip");
const peopleInput = document.getElementById("people");
const errorEl = document.getElementById("error");
const resultsEl = document.getElementById("results");
const tipAmountEl = document.getElementById("tip-amount");
const totalAmountEl = document.getElementById("total-amount");
const perPersonEl = document.getElementById("per-person");

function formatMoney(value) {
  return `$${value.toFixed(2)}`;
}

function showError(message) {
  errorEl.textContent = message;
  errorEl.hidden = false;
  resultsEl.hidden = true;
}

function hideError() {
  errorEl.textContent = "";
  errorEl.hidden = true;
}

function parseBill(raw) {
  const value = raw.trim();
  if (value === "") {
    return { error: "Please enter a bill amount." };
  }

  const amount = Number(value);
  if (!Number.isFinite(amount)) {
    return { error: "Please enter a valid number for the bill amount." };
  }
  if (amount < 0) {
    return { error: "Bill amount cannot be negative." };
  }

  return { value: amount };
}

function parsePeople(raw) {
  const value = raw.trim();
  if (value === "") {
    return { error: "Please enter the number of people." };
  }

  if (!/^\d+$/.test(value)) {
    return { error: "Number of people must be a whole number." };
  }

  const people = Number(value);
  if (!Number.isFinite(people)) {
    return { error: "Please enter a valid number of people." };
  }
  if (people <= 0) {
    return { error: "Number of people must be at least 1." };
  }

  return { value: people };
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const billResult = parseBill(billInput.value);
  if (billResult.error) {
    showError(billResult.error);
    return;
  }

  const peopleResult = parsePeople(peopleInput.value);
  if (peopleResult.error) {
    showError(peopleResult.error);
    return;
  }

  const tipRate = Number(tipSelect.value) / 100;
  const tipAmount = billResult.value * tipRate;
  const total = billResult.value + tipAmount;
  const perPerson = total / peopleResult.value;

  if (![tipAmount, total, perPerson].every(Number.isFinite)) {
    showError("Unable to calculate. Please check your inputs and try again.");
    return;
  }

  hideError();
  tipAmountEl.textContent = formatMoney(tipAmount);
  totalAmountEl.textContent = formatMoney(total);
  perPersonEl.textContent = formatMoney(perPerson);
  resultsEl.hidden = false;
});
