function Employee (name, money) {
    this.name = name;
    this.money = money;
}

function summary() {
    var Oleg = new Employee("Oleg", 30000);
    var Evgenu = new Employee("Evgenu", 25000);
    var Ksenia = new Employee("Ksenia", 40000);
    var Alex = new Employee("Alex", 40000);
    let result = Oleg.money + Evgenu.money + Ksenia.money + Alex.money;
    console.log(result);
}

summary();