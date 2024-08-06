const display = document.querySelector("#output")
const buttons = document.querySelectorAll("button")

let displayValue = ''
let expression = ''
let currentOperand = ''

/// Basic calc functions
function add(a, b){
    return a + b
}

function substract(a, b){
    return a - b
}

function multiply(a, b){
    return a * b
}

function divide(a, b){
    return a / b
}

/// Function that choose which function should be called when you press '+' || '-' || '*' || '/'
function operate(operator, num1, num2){
    let a = parseFloat(num1)
    let b = parseFloat(num2)

    switch (operator){
        case '+':
            return add(a, b)
        case '-':
            return substract(a, b)
        case '*':
            return multiply(a, b)
        case '/':
            return divide(a, b)
        default:
            return null
    }
}

///Function to calculate the entire expression
function calculateExpression(expr){
    const operators = expr.split(/[\d.]+/).filter(op => op !== '')
    const operands = expr.split(/[+\-*/÷]/).map(num => parseFloat(num))

    let result = operands[0]
    for(let i = 1; i < operands.length; i++){
        result = operate(operators[i-1], result, operands[i])
    }
    return result
}

///Function to handling button press
function handleButtonClick(event){
    const button = event.target
    const buttonValue = button.textContent

    if(!isNaN(buttonValue) || buttonValue === '.'){

        if(buttonValue === '.' && currentOperand.includes('.')){
            return 
        }

    currentOperand += buttonValue
    displayValue += buttonValue

}   else if(buttonValue === 'AC'){
        displayValue = ''
        expression = ''
        currentOperand = ''

}   else if(buttonValue === 'Del'){
        if(currentOperand.length > 0){
            currentOperand = currentOperand.slice(0, -1)
            displayValue = displayValue.slice(0, -1)
        } else {
            expression = expression.slice(0, -1)
            displayValue = displayValue.slice(0, -1)
        }
}   else if(buttonValue === '='){

        if(currentOperand !== ''){
            expression += currentOperand
        }
        displayValue = calculateExpression(expression).toString()
        expression = displayValue
        currentOperand = ''
}   else {
        if(currentOperand !== ''){
            expression += currentOperand
            currentOperand = ''
        }
    expression += buttonValue
    displayValue += buttonValue
}

    display.textContent = displayValue

}

///Function to handling key press
function handleKeyPress(event){
    const key = event.key

    if(!isNaN(key) || key === '.'){

        if(key === '.' && currentOperand.includes('.')){
            return
        }

        currentOperand += key
        displayValue += key
}   else if(key === 'Escape'){
        displayValue = ''
        expression = ''
        currentOperand = ''
}   else if(key === 'Backspace' && 'Delete'){

        if(currentOperand.length > 0){
            currentOperand = currentOperand.slice(0, -1)
            displayValue = displayValue.slice(0, -1)
    }   else {
            expression = expression.slice(0, -1)
            displayValue = displayValue.slice(0, -1)
    }
}   else if(key === 'Enter'){

        if(currentOperand !== ''){
            expression += currentOperand
        }
        displayValue = calculateExpression(expression).toString()
        expression = displayValue
        currentOperand = ''

}   else if(['+', '-', '*', '/'].includes(key)){

        if(currentOperand !== ''){
            expression += currentOperand
            currentOperand = ''
        }

        switch(key){
            case '+':
                expression += '+'
                break
            case '-':
                expression += '-'
                break
            case '*':
                expression += '*'
                break
            case '/':
                expression += '/'
                break
        }
        displayValue += key
}

    display.textContent = displayValue

}

//Adding events to buttons and keyboard
buttons.forEach(button => {
    button.addEventListener('click', handleButtonClick)
})

document.addEventListener('keydown', handleKeyPress)

///Dark theme switch
let darkModeEnabled = false
const darkModeBtn = document.getElementById("darkModeBtn")

darkModeBtn.addEventListener("click", () => {
    darkModeEnabled = !darkModeEnabled

    if(darkModeEnabled){
        enableDarkMode()
    } else {
        disableDarkMode()
    }
})

const enableDarkMode = () => {
    document.body.classList.add("darkMode")
}

const disableDarkMode = () => {
    document.body.classList.remove("darkMode")
}