let result = 0;
function yearSales() {
    const monthSales = [25, 30, 25, 50, 50, 40, 15, 20, 20];
    monthSales.splice(0, 0, 10, 20);
    monthSales.push(30);
    for(let i = 0; i < monthSales.length; i++){
        result+=monthSales[i];
    }
    console.log(result);
};

yearSales();