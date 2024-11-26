const display = document.querySelector('#display');
const numButtons = document.querySelectorAll(".num");
const operatorButtons = document.querySelectorAll(".operator");
const dotButton = document.querySelector('#dot');
const equalButton = document.querySelector('#equal');
const acButton = document.querySelector('#AC');
const plusMinus = document.querySelector('#plus-minus');
const erase =  document.querySelector('#erase');

let operatorFlag = false;
let num2Flag = false;
let dotFlag = false;
let equalFlag = false;
let resultFlag = false;
let minusFlag = false;

let num2 = "";
let num1 = "";
let operator = "";

numButtons.forEach((button) => {
    button.addEventListener("click", () => {

        if(!resultFlag){
            display.innerHTML += button.value;
            dotFlag = true;
            operatorFlag = true;

            if (num2Flag){
                num2 += button.value;
                equalFlag = true;
            }
        }
    })
})


operatorButtons.forEach((button) => {
    button.addEventListener("click", () => {
        if (operatorFlag && !num2Flag){
            num1 = display.innerHTML;
            operator = button.value;
            display.innerHTML += " " + button.value + " ";
            operatorFlag = false;
            dotFlag = false;
            num2Flag = true;
            resultFlag = false;
        }
    })
})

dotButton.addEventListener("click", () => {
    if (dotFlag){
        display.innerHTML += ".";
        dotFlag = false;
        if (num2Flag){num2 += "."};
    }
})

equalButton.addEventListener("click",() => {
    if (equalFlag){

        let result = operate(num1,num2,operator);
        if (typeof result == "string") { 
            display.innerHTML = result 
        } else{
            display.innerHTML = Math.round(result * 1e5) / 1e5;
            num1 = num2;
        }
        num2Flag = false;
        dotFlag = false;
        equalFlag = false;
        resultFlag = true;
        num2 = "";
        operator = "";

    }

})

acButton.addEventListener("click",() => {
    init();
    display.innerHTML = "";
    num1 = "";

})

plusMinus.addEventListener("click", () => {
    if (!num2Flag && operatorFlag){
        if (!minusFlag){
            display.innerHTML = "-" + display.innerHTML;
            minusFlag = true;
        }
        else {
            display.innerHTML = display.innerHTML.slice(1);
            minusFlag = false;
        }
    }
})


// Can only erase the first number => to be updated
erase.addEventListener("click", () => {

    if (!num2Flag && !resultFlag){
        let popElem = display.innerHTML[-1];
        display.innerHTML = display.innerHTML.slice(0,-1);

        if (popElem === "."){dotFlag = true;}
    }
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
    resultFlag = false;
    num2 = "";
    operator = "";
};
