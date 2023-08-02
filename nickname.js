
function checkNickname(nickname){
    return /[1-9]/.test(nickname);
};


function clearNicknames(nicknames) {
    const realNicknames = [];
      for (let i = 0; i < nicknames.length; i++) {
        if(checkNickname(nickNames[i]) === false){
            realNicknames.push( nickNames[i]);
        } else {
            nickNames.splice(i,1);
            i--;
        }
      }
      console.log(realNicknames);
      return realNicknames;
  }

let nickNames = ["John1", "Tyler", "UserName", "Bot123", "Siri1", "Alexa", "Alex", "admin", "admin2"];
clearNicknames(nickNames);
