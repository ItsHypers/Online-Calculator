class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }

  clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  dot(number) {
    if (number === "." && this.currentOperand.includes(".")) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  operation(operation) {
    if (this.currentOperand === "") return;
    if (this.previousOperand !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "*":
        computation = prev * current;
        break;
      case "÷":
        computation = prev / current;
        break;
      case "/":
        computation = prev / current;
        break;
      case "**":
        computation = prev ** current;
        break;
      default:
        return;
    }
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = "";
  }
  display(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  minusplus() {
    let string = this.currentOperand;
    string = string.toString();
    console.log(string);
    if (string.includes("-")) {
      this.currentOperand = string.substring(1);
    } else {
      this.currentOperand = "-" + this.currentOperand;
    }
  }

  displayupdate() {
    this.currentOperandTextElement.innerText = this.display(
      this.currentOperand
    );
    if (this.operation != null) {
      this.previousOperandTextElement.innerText = `${this.display(
        this.previousOperand
      )} ${this.operation}`;
    } else {
      this.previousOperandTextElement.innerText = "";
    }
  }
}
const numberButtons = document.querySelectorAll(".number");
const operationButtons = document.querySelectorAll(".operator");
const equalsButton = document.querySelector(".equals");
const allClearButton = document.querySelector(".all-clear");
const previousOperandTextElement = document.querySelector(
  "[data-previous-operand]"
);
const currentOperandTextElement = document.querySelector(
  "[data-current-operand]"
);
const minusButton = document.querySelector(".minus");
const dotButton = document.querySelector(".dot");
const deleteButton = document.querySelector(".delete");

const calculator = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement
);

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.displayupdate();
  });
});

operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.operation(button.innerText);
    calculator.displayupdate();
  });
});
equalsButton.addEventListener("click", (button) => {
  calculator.compute();
  calculator.displayupdate();
});

minusButton.addEventListener("click", (button) => {
  calculator.minusplus();
  calculator.displayupdate();
});
dotButton.addEventListener("click", (button) => {
  calculator.dot(".");
  calculator.displayupdate();
});

allClearButton.addEventListener("click", (button) => {
  calculator.clear();
  calculator.displayupdate();
});
deleteButton.addEventListener("click", (button) => {
  calculator.delete();
  calculator.displayupdate();
});

document.addEventListener("keydown", function (event) {
  let patternForNumbers = /[0-9]/g;
  let patternForOperators = /[+\-*\/]/g;
  if (event.key.match(patternForNumbers)) {
    event.preventDefault();
    calculator.appendNumber(event.key);
    calculator.displayupdate();
  }
  if (event.key === ".") {
    event.preventDefault();
    calculator.appendNumber(event.key);
    calculator.displayupdate();
  }
  if (event.key.match(patternForOperators)) {
    event.preventDefault();
    calculator.operation(event.key);
    calculator.displayupdate();
  }
  if (event.key === "Enter" || event.key === "=") {
    event.preventDefault();
    calculator.compute();
    calculator.displayupdate();
  }
  if (event.key === "Backspace") {
    event.preventDefault();
    calculator.delete();
    calculator.displayupdate();
  }
  if (event.key == "Delete") {
    event.preventDefault();
    calculator.clear();
    calculator.displayupdate();
  }
  if (event.key == "x" || event.key == "*") {
    event.preventDefault();
    calculator.operation("*");
    calculator.displayupdate();
  }
  if (event.key == "%" || event.key == "÷") {
    event.preventDefault();
    calculator.operation("÷");
    calculator.displayupdate();
  }
  if (event.key == "-") {
    event.preventDefault();
    calculator.operation("-");
    calculator.displayupdate();
  }
  if (event.key == "+") {
    event.preventDefault();
    calculator.operation("+");
    calculator.displayupdate();
  }
  if (event.key == ".") {
    event.preventDefault();
    calculator.appendNumber(".");
    calculator.displayupdate();
  }
  if (event.key == "#") {
    event.preventDefault();
    calculator.minusplus();
    calculator.displayupdate();
  }
  if (event.key == ";") {
    event.preventDefault();
    calculator.operation("**");
    calculator.displayupdate();
  }
});
