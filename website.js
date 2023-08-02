function browserCheck() {
    switch(browser){
        case IE:
            alert('IE не поддерживает функции данного сайта');
            break;
        case Chrome:
            alert('Добро пожаловать!');
            break;
        case FireFox:
            alert('Добро пожаловать!');
            break;
        case Safari:
            alert('Добро пожаловать!');
            break;
        case Opera:
            alert('Добро пожаловать!');
            break; 
        default:
            alert('Некоторые функции сайта не поддерживаются в данном браузере');
    }
}

