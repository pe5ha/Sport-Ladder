function checkLadderReg(){
  if(user.role!="участник"){
    let keyboard = {
      keyboard: [
        [
          {text: "Отправить свой номер", request_contact: true},
        ]
      ],
      one_time_keyboard: true,
      resize_keyboard: true,
    };
    user.setUserCurrentAction(UserActions.input_phone);
    botSendMessage(chat_id, needReg, keyboard);
    return false;
  }

  return true;
}


function sendPlayerCard(){
  let keyboard = {
    inline_keyboard: [
      [
        {text: "Мои матчи",callback_data: "matches"},
        {text: "Рейтинг лист",callback_data: "rating_list"},
        {text: "Изменить профиль",callback_data: "profile_edit"}
      ],
      [
        {text: "Внести матч",callback_data: "add_match"},
      ]
    ]
  };
  botSendMessage(chat_id, buildPlayerSelfCard(),keyboard,"HTML",true);
}

function sendPlayerProfile(userId){
  botSendMessage(chat_id,buildPlayerCard(userId));
}

function buildPlayerSelfCard(){
  let playerCard = "Профиль игрока: <b>"+userLink(user.nick, user.name)+"</b>\nРейтинг: <b>"+user.rating+"</b>";
  if(user.achievements) playerCard+="\nАчивки: "+user.achievements;
  playerCard += "\nВсего игр: "+user.gamesCount+"\nБио: "+user.bio;
  return playerCard;
}

function buildPlayerCard(userId){
  let playerRow = findRowIn2dRange(usersData,tUsers.getCol(tUsers.id_Title),userId);
  let playerNick = usersData[playerRow][tUsers.getCol(tUsers.nick_Title)];
  let playerName = usersData[playerRow][tUsers.getCol(tUsers.name_Title)];
  let playerRating = usersData[playerRow][tUsers.getCol(tUsers.rating_Title)];
  let playerAchivs = usersData[playerRow][tUsers.getCol(tUsers.achievements_Title)];
  let playerGamesCount = usersData[playerRow][tUsers.getCol(tUsers.games_count_Title)];
  let playerBio = usersData[playerRow][tUsers.getCol(tUsers.bio_Title)];
  let playerCard = "Профиль игрока: <b>"+userLink(playerNick, playerName)+"</b>\nРейтинг: <b>"+playerRating+"</b>";
  if(playerAchivs) playerCard+="\nАчивки: "+playerAchivs;
  playerCard += "\nВсего игр: "+playerGamesCount+"\nБио: "+playerBio;
  return playerCard;
}

// function buildUserById(userId){
//   let userById = {
//     telegramID: null,
//     nick: null,
//     name: null,
//     currentAction: null,
//     role: null,
//     rowInTable: null,
//     isNewUser: null,
//     phone: null,
//     bio: null,
//     rating: null,
//     gamesCount: null,
//     achievements: null,
//   }
// }

function userLink(nick, name){
  if(!nick) return name;
  let nickText = String(nick).replace("@","");
  return "<a href=\"https://t.me/"+nickText+"\">"+name+"</a>";    
}