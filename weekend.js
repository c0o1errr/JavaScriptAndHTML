function weekend(){
    let week = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    for (let i = 0; i<week.length; i++) {
        let day = week[i];
        if (day==="Sunday" || day==="Saturday") {
            console.log(day);
        }
   }
}

weekend();