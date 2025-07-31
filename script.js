const inputBill = document.querySelector("#bill");
const inputPeople = document.querySelector("#people");
const inputCustom = document.querySelector(".input-custom");

const buttonGroup = document.querySelector(".btn-group");
const buttons = document.querySelectorAll(".btn");
const btnReset = document.querySelector(".btn-reset");

const tipEl = document.querySelector(".amount-tip");
const totalEl = document.querySelector(".amount-total");

const billErrorText = inputBill
  .closest(".input-group")
  .querySelector(".error-text");

const peopleErrorText = inputPeople
  .closest(".input-group")
  .querySelector(".error-text");

let billValue = 0;
let numberOfPeople = 0;
let currentTipRate;

// CALCULATE TIP:
inputBill.addEventListener("input", (e) => {
  billValue = +e.target.value;
  inputValidate(inputBill, billErrorText);
  calculateTip();
});

inputPeople.addEventListener("input", (e) => {
  numberOfPeople = +e.target.value;
  inputValidate(inputPeople, peopleErrorText, true);
  calculateTip();
});

buttonGroup.addEventListener("click", (e) => {
  if (!e.target.classList.contains("btn")) return;

  const selectedButtonValue = e.target.textContent;
  currentTipRate = Number.parseFloat(selectedButtonValue) / 100;

  buttons.forEach((btn) => btn.classList.remove("btn-selected"));
  e.target.classList.add("btn-selected");

  calculateTip();
});

inputCustom.addEventListener("click", () => {
  buttons.forEach((btn) => btn.classList.remove("btn-selected"));
});

inputCustom.addEventListener("input", (e) => {
  const customTip = Number.parseFloat(e.target.value);

  inputCustom.classList.remove("input-valid", "input-invalid");

  if (!isNaN(customTip) && customTip >= 0 && customTip <= 100) {
    currentTipRate = customTip / 100;
    inputCustom.classList.add("input-valid");
  } else if (inputCustom.value === "") {
    inputCustom.classList.add("input-valid");
  } else {
    currentTipRate = undefined;
    inputCustom.classList.add("input-invalid");
  }

  calculateTip();
});

function isValidInput(inputEl) {
  return inputEl.classList.contains("input-valid");
}

function calculateTip() {
  const validBill = isValidInput(inputBill);
  const validPeople = isValidInput(inputPeople);

  if (
    validBill &&
    validPeople &&
    typeof currentTipRate === "number" &&
    !Number.isNaN(currentTipRate)
  ) {
    const totalTip = billValue * currentTipRate;
    const tipPerPerson = totalTip / numberOfPeople;
    const totalPerPerson = (billValue + totalTip) / numberOfPeople;

    btnReset.classList.remove("reset-empty");
    btnReset.classList.add("reset-active");

    tipEl.textContent = `$${tipPerPerson.toFixed(2)}`;
    totalEl.textContent = `$${totalPerPerson.toFixed(2)}`;
  } else {
    tipEl.textContent = "$0.00";
    totalEl.textContent = "$0.00";
  }
}

// ERROR HANDLING:
function inputValidate(inputEl, errorEl = false, isPeople = false) {
  const value = +inputEl.value;

  inputEl.classList.remove("input-valid", "input-invalid");
  errorEl.textContent = "";

  const isEmpty = inputEl.value.trim() === "";
  const isNegative = value < 0;
  const isZero = value === 0;
  const isNotInteger = isPeople && !Number.isInteger(value);
  const isNotCustom = value < 0 && value > 100;

  if (isEmpty || isNegative || isZero || isNotInteger) {
    inputEl.classList.add("input-invalid");

    if (isEmpty) {
      errorEl.textContent = "Please type a number";
    } else if (isNegative) {
      errorEl.textContent = "Can't be negative";
    } else if (isZero) {
      errorEl.textContent = "Can't be zero";
    } else if (isNotInteger) {
      errorEl.textContent = "Must be a whole number";
    }
  } else {
    inputEl.classList.add("input-valid");
  }
}

inputBill.addEventListener("blur", () => {
  inputValidate(inputBill, billErrorText);
});

inputPeople.addEventListener("blur", () => {
  inputValidate(inputPeople, peopleErrorText, true);
});

// RESET BUTTON:
btnReset.addEventListener("click", () => {
  console.log("clicked");
  inputBill.value = "";
  inputPeople.value = "";
  inputCustom.value = "";

  buttons.forEach((btn) => btn.classList.remove("btn-selected"));
  btnReset.classList.remove("reset-active");
  btnReset.classList.add("reset-empty");

  tipEl.textContent = "$0.00";
  totalEl.textContent = "$0.00";
});

// CUSTOM BUTTON
inputCustom.addEventListener("input", () => {
  buttons.forEach((btn) => btn.classList.remove("btn-selected"));
});
