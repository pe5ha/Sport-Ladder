function checkLadderReg(){
  if(user.role!="участник"){
    // let keyboard = {
    //   keyboard: [
    //     [
    //       {text: "Отправить свой номер", request_contact: true},
    //     ]
    //   ],
    //   one_time_keyboard: true,
    //   resize_keyboard: true,
    // };
    user.setUserCurrentAction(UserActions.input_name);
    botSendMessage(chat_id, needReg);
    return false;
  }

  return true;
}


function sendPlayerCard(){
  let keyboard = {
    inline_keyboard: [
      [
        {text: "🏆 ОБЩИЙ РЕЙТИНГ (+ внести матч)",callback_data: "rating_list"},
      ],
      [ 
        {text: "👀 Мои матчи",callback_data: "matches_"+user_id},
        {text: "💪 Мой профиль",callback_data: "profile_edit"}
      ],
      // [
      //   {text: "Внести матч ✏️",callback_data: "add_match"},
      // ]
    ]
  };
  botSendMessage(chat_id, buildPlayerSelfCard(),keyboard,"HTML",true);
}

function sendPlayerProfile(userId, isUpdate = false){
  let keyboard = {
    inline_keyboard: [
      [
        {text: "👉 Внести результат матча",callback_data: "matchvs_"+userId},
      ],
      [
        {text: "👀 Список матчей",callback_data: "matches_"+userId},
      ]
    ]
  };
  if(userId == chat_id) keyboard = null;
  if(isUpdate){
    botEditMessage(chat_id, message_id,buildPlayerCard(userId),keyboard,"HTML",true);
  }
  else{
    botSendMessage(chat_id,buildPlayerCard(userId),keyboard,"HTML",true);
  }
}

function buildPlayerSelfCard(){
  let playerNick = user.nick;
  let playerName = user.name;
  let playerRating = user.rating;
  let playerGamesCount = user.gamesCount;
  let playerBio = user.bio;
  let playerAchivs = user.achievements;
  let playerCard = "<b>Главное меню Ладдера 🪜</b>\n<i>powered by SportyHQ (ex.SquashMatrix)</i>\n\n<b>"+userLinkById(playerName, user_id)+"</b> ";
  playerCard += "\nМой рейтинг: <b>"+playerRating+"</b> (очков)";
  playerCard += "\nМной сыграно: <b>"+playerGamesCount+"</b> (матчей)";
  playerCard += "\n\nО себе: "+playerBio;
  if(playerAchivs) playerCard += "\n\nДостижения:\n"+playerAchivs;
  return playerCard;
}

function buildPlayerCard(userId){
  let playerRow = findRowIn2dRange(usersData,tUsers.getCol(tUsers.id_Title),userId);
  let playerNick = usersData[playerRow][tUsers.getCol(tUsers.nick_Title)];
  let playerName = usersData[playerRow][tUsers.getCol(tUsers.name_Title)];
  let playerRating = usersData[playerRow][tUsers.getCol(tUsers.rating_Title)];
  let playerAchivs = usersData[playerRow][tUsers.getCol(tUsers.achievements_Title)];
  let playerGamesCount = usersData[playerRow][tUsers.getCol(tUsers.games_count_Title)] || 0;
  let playerBio = usersData[playerRow][tUsers.getCol(tUsers.bio_Title)];
  let playerCard = "<b>Профиль игрока</b>\n\n<b>"+userLinkById(playerName, userId)+"</b> ";
  playerCard += "\nРейтинг: <b>"+playerRating+"</b> (очков)";
  playerCard += "\nСыграно: <b>"+playerGamesCount+"</b> (матчей)";
  playerCard += "\n\nОб игроке:\n"+playerBio;
  if(playerAchivs) playerCard += "\n\nДостижения:\n"+playerAchivs;
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
function userLinkById(name, id){
  return "<a href=\"tg://user?id="+id+"\">"+name+"</a>";    
}
function userDeeplink(name, id){
  return "<a href=\"https://t.me/"+BotName+"?start="+id+"\">"+name+"</a>";    
}