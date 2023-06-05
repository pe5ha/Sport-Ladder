// версия 1

let user = {
  telegramID: null,
  nick: null,
  name: null,
  currentAction: null,
  role: null,
  rowInTable: null,
  isNewUser: null,
  phone: null,
  bio: null,
  rating: null,
  gamesCount: null,
  achievements: null,
  setUserRole(newRole){
    tUsers.use().getRange(this.rowInTable,tUsers.getCol(tUsers.role_Title)+1).setValue(newRole);
    this.role = newRole;
  },
  setUserPhone(newPhone){
    tUsers.use().getRange(this.rowInTable,tUsers.getCol(tUsers.phone_Title)+1).setValue(newPhone);
    this.phone = newPhone;
  },
  setUserBio(newBio){
    tUsers.use().getRange(this.rowInTable,tUsers.getCol(tUsers.bio_Title)+1).setValue(newBio);
    this.bio = newBio;
  },
  setUserName(newName){
    tUsers.use().getRange(this.rowInTable,tUsers.getCol(tUsers.name_Title)+1).setValue(newName);
    this.name = newName;
  },
  setRating(newRating){
    tUsers.use().getRange(this.rowInTable,tUsers.getCol(tUsers.rating_Title)+1).setValue(newRating);
    this.rating = newRating;
  },
  setUserCurrentAction(currentAction){
    tUsers.use().getRange(this.rowInTable, tUsers.getCol(tUsers.current_action_Title)+1).setValue(currentAction);
  },
  setGamesCount(newGamesCount){
    tUsers.use().getRange(this.rowInTable,tUsers.getCol(tUsers.games_count_Title)+1).setValue(newGamesCount);
    this.gamesCount = newGamesCount;
  },
};

function makeUser(rowInTable, telegramID,nick,name,currentAction=null,role=null,tariff=null,isNewUser=false){
  user.telegramID= telegramID;
  user.nick= nick;
  user.name= name;
  user.currentAction= currentAction;
  user.role= role;
  user.rowInTable= rowInTable;
  user.isNewUser= isNewUser;
  user.tariff= tariff;
  return user;
}


/**
 * 
 * @deprecated - is need fix
 */
function getUseridByUsername(username) {
  let idlist = tUsers.use().getRange('D:D').getValues();
  // idlist = idlist.flat(); // делает 2д массив одномерным
  for (let i = 0; i < idlist.length; i++) {
    for (let j = 0; j < idlist[i].length; j++) {
      if (idlist[i][j].toLowerCase() === username.toLowerCase()) {
        let row = i + 1;
        return tUsers.use().getRange(row, 2).getValue();
      }
    }
  }
  return null;
}


function setUserRole(user,role){
  tUsers.use().getRange(user.rowInTable, tUsers.getCol(tUsers.role_Title)+1).setValue(role);
  user.role=role;
}

function setUserCurrentAction(user,currentAction){
  tUsers.use().getRange(user.rowInTable, tUsers.getCol(tUsers.current_action_Title)+1).setValue(currentAction);
}


function setUserLanguage(user,language_code){
  user.language_code = language_code;
  tUsers.use().getRange(user.rowInTable, tUsers.getCol(tUsers.language_code)+1).setValue(language_code);
}
