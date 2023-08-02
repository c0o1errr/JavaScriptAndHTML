/*let a = 10;
a += 1 + 2 + 3;   //a 16
console.log(a);
a -= "6";  // a 10
console.log(a);
a += "10"; // 1010
console.log(a);
alert(a); //1010  */


function checkAge(age) {
    return (age>18)  ? true: confirm('Return later, ok?');
}

console.log(checkAge(21));