function arraySwap() {
    let first = ["First", "Second","Third"];
    first[2] = 3;
    alert(first);
    
    let second = [1, 2, 3];
    let third = first.concat(second);
    alert(third);
    }
    arraySwap();
    
    function Person(name, salary) {
    this.name = name;
    this.salary = salary;
    }
    
    var Nikolay = new Person("Nikolay", 10000);
    var Ivan = new Person("Ivan", 15000);
    var Fedor = new Person("Fedor", 20000);
    alert(Nikolay.name + " " + Nikolay.salary);
    alert(Ivan.name + " "+ Ivan.salary);
    alert(Fedor.name + " " + Fedor.salary);