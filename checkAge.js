function checkAge(age) {
    try {
        if(age < 16 || age > 120) {
            throw new UserAgeException("Неподходящий возраст");
        }

        if (typeof age != Number) {
            throw new UserAgeException ("Некорректные данные");
        }
        
        if (null) {
            throw new UserAgeException ("Некорректные данные");
        }
    } catch(e) {
         UserAgeException();
    }
}

function UserAgeException(message) {
    this.message = message;
}

console.log(checkAge(32));