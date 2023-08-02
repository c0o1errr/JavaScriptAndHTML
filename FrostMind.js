function sortSales(shopNumbers, shopSales){
    if (shopNumbers.length != shopSales.length) {
        console.log("Corrupted Data");
        return;
    } else if (shopNumbers.length == 0 || shopSales.length == 0) {
        console.log("Empty Data");
        return;
    } else {
        for(let i = 1; i<shopSales.length; i++){
            for (let j = 0; j < shopSales.length; j++) {
                if(shopSales[j] > shopSales[j+1]){
                    let max = shopSales[j];
                    let min = shopNumbers[j];
                    shopSales[j] = shopSales[j+1];
                    shopNumbers[j] = shopNumbers[j+1];
                    shopSales[j+1] = max;
                    shopNumbers[j+1] = min;
                }
            }
            console.log(shopSales[i]);
            console.log(shopNumbers[i]);
        }
    }
}

const country = ["Thailand", "Vietnam", "China", "Malaysia", "Japan", "Korea", "Laos"];
const sales = [5.35, 6.87, 21.25, 8.47, 0, 4.21, 3.98];

sortSales(country, sales);