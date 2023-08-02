function localWeek(language) {
    const rusWeek = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресение"];
    const engWeek = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
       return language === 'russian' ? rusWeek:engWeek;
}