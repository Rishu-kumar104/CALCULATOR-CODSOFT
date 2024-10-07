const display = document.getElementById('display');
const buttons = document.querySelectorAll('button');

let currentInput = '';
let previousInput = '';
let operator = '';

function clear() {
    currentInput = '';
    previousInput = '';
    operator = '';
    display.textContent = '0';
}

function appendNumber(number) {
    currentInput += number;
    if (operator === '') {
        display.textContent = currentInput;  // Show only current input if no operator is present
    } else {
        display.textContent = previousInput + ' ' + operator + ' ' + currentInput;  // Show the full equation
    }
}

function appendOperator(op) {
    if (currentInput !== '') {
        if (previousInput === '') {
            previousInput = currentInput;  // Store the first operand
        } else {
            calculate();  // If an operator already exists, calculate before setting a new operator
        }
        operator = op;
        currentInput = '';
        display.textContent = previousInput + ' ' + operator;  // Display the first operand and operator
    }
}

function calculate() {
    if (previousInput !== '' && currentInput !== '' && operator !== '') {
        let result;
        switch (operator) {
            case '+':
                result = parseFloat(previousInput) + parseFloat(currentInput);
                break;
            case '-':
                result = parseFloat(previousInput) - parseFloat(currentInput);
                break;
            case '*':
                result = parseFloat(previousInput) * parseFloat(currentInput);
                break;
        }
        display.textContent = result.toString();
        currentInput = result.toString();
        previousInput = '';
        operator = '';
    }
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        if (button.classList.contains('number')) {
            appendNumber(button.textContent);
        } else if (button.classList.contains('operator')) {
            appendOperator(button.textContent);
        } else if (button.classList.contains('equal')) {
            calculate();
        } else if (button.classList.contains('clear')) {
            clear();
        } else if (button.classList.contains('decimal')) {
            if (!currentInput.includes('.')) {
                currentInput += '.';
                if (operator === '') {
                    display.textContent = currentInput;
                } else {
                    display.textContent = previousInput + ' ' + operator + ' ' + currentInput;
                }
            }
        }
    });
});
