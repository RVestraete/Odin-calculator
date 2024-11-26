const display = document.querySelector('#display');
const numButtons = document.querySelectorAll(".num");
const operatorButtons = document.querySelectorAll(".operator");
const dotButton = document.querySelector('#dot');
const equalButton = document.querySelector('#equal');
const acButton = document.querySelector('#AC');
let operatorFlag = false;
let num2Flag = false;
let dotFlag = false;
let equalFlag = false;
let num2 = "";
let num1 = "";
let operator = "";

numButtons.forEach((button) => {
    button.addEventListener("click", () => {

        display.innerHTML += button.value;
        dotFlag = true;
        operatorFlag = true;

        if (num1 != ""){
            num2 += button.value;
            equalFlag = true;
        }
    })
})


operatorButtons.forEach((button) => {
    button.addEventListener("click", () => {
        if (operatorFlag && !num2Flag){
            // valStack.push(display.innerHTML);
            // valStack.push(button.value);
            num1 = display.innerHTML;
            operator = button.value;
            display.innerHTML += " " + button.value + " ";
            operatorFlag = false;
            dotFlag = false;
            num2Flag = true;
        }
    })
})

dotButton.addEventListener("click", () => {
    if (dotFlag){
        display.innerHTML += ".";
        dotFlag = false;
    }
})

equalButton.addEventListener("click",() => {
    if (equalFlag){

        let result = operate(num1,num2,operator).toFixed(6);
        display.innerHTML = result;
        num1 = num2;
        num2Flag = false;
        dotFlag = false;
        equalFlag = false;

    }

})

acButton.addEventListener("click",() => {
    init();
    display.innerHTML = "";
    num1 = "";

})



function add(num1,num2){
    return parseFloat(num1) + parseFloat(num2);
};

function subtract(num1,num2){
    return parseFloat(num1) - parseFloat(num2);
};

function multiply(num1,num2){
    return parseFloat(num1) * parseFloat(num2);
};

function divide(num1,num2){

    if (num2 == 0){
        return "No way"
    } else{
        return parseFloat(num1) / parseFloat(num2);
    }
};


function operate(num1,num2,operator){
    if (operator === "+"){
        return add(num1,num2);
    } else if (operator === "-"){
        return subtract(num1,num2);
    } else if (operator === "*"){
        return multiply(num1,num2);
    } else if (operator === "/"){
        return divide(num1,num2);
    }

};

function init (){
    num2Flag = false;
    operatorFlag = false;
    dotFlag = false;
    equalFlag = false; 
    num2 = "";
    operator = "";
};
