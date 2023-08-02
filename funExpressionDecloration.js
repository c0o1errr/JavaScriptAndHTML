//  Объявление функция (function declaration)
function sayHello(name){
    const greeting = `Hello, ${name}`;
    console.log(greeting);
}
sayHello('Nick');


// Функциональное выражение (function expression)
const sayHi1 = function() {
    console.log('Hi')
};

const sayHi = () => console.log('Hi');
sayHi();

function square (n){
   let result = n * n;
   console.log(result);
}

const square = (n) => n * n;
