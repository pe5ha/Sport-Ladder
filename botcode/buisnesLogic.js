

function sendUserMatches(){
  let matches = tMatches.use().getRange(tMatches.allRange).getValues();

  let matchList = "";
  let k = 0;
  for(let i=1;i<matches.length;i++){
    if(matches[i][tMatches.getCol(tMatches.id_p1_Title)] == user_id
    || matches[i][tMatches.getCol(tMatches.id_p2_Title)] == user_id){
      let match = {
        matchId: matches[i][tPendingMatches.getCol(tPendingMatches.id_Title)],
        p1_id: matches[i][tPendingMatches.getCol(tPendingMatches.id_p1_Title)],
        p2_id: matches[i][tPendingMatches.getCol(tPendingMatches.id_p2_Title)],
        p1_name: matches[i][tPendingMatches.getCol(tPendingMatches.name_p1_Title)],
        p2_name: matches[i][tPendingMatches.getCol(tPendingMatches.name_p2_Title)],
        result: matches[i][tPendingMatches.getCol(tPendingMatches.result_Title)],
        gameDate: matches[i][tPendingMatches.getCol(tPendingMatches.date_Title)],
        recordDate: matches[i][tPendingMatches.getCol(tPendingMatches.record_date_Title)],
      }
      matchList+= buildMatchCard(match)+"\n\n";
      k++;
      if(k>=10) break;
    }
  }


  botSendMessage(chat_id, matchList);
}

function gameRecord(){
  let opponentName = text.split("\n")[0];
  let gameResult = text.split("\n")[1];
  let oppId = findOpponentByName(opponentName);
  if(!oppId) {
    botSendMessage(chat_id, "Ошибка. Игрок с таким именем в базе не найден: "+ opponentName);
    return;
  }
  if(!checkGameResult(gameResult)){
    botSendMessage(chat_id, "Ошибка. Неккоректный формат результата игры.");
    return;
  }


  tPendingMatches.use().insertRowBefore(2);

  let match = {
    matchId: message_id,
    p1_id: user_id,
    p2_id: oppId,
    p1_name: name,
    p2_name: opponentName,
    result: gameResult,
    gameDate: new Date(),
    recordDate: new Date(),
  }

  tPendingMatches.use().getRange(2,1,1,tPendingMatches.getColumnsOrder().length).setValues([
    [match.matchId, match.p1_id, match.p2_id, match.p1_name, match.p2_name, "'"+match.result, true, false, match.gameDate, match.recordDate]]);

  botSendMessage(chat_id, "Матч сохранен. Ожидается подтверждение соперником.");

  let keyboard = {
    inline_keyboard: [
      [
        {text: "Подтвердить",callback_data: "confirm_"+match.matchId},
        {text: "Редактировать",callback_data: "change_"+match.matchId},
      ]
    ]
  };
  botSendMessage(oppId, buildMatchCard(match),keyboard);
}


function buildMatchCard(match){
  let matchCard = "<b>"+ match.p1_name + "</b> vs <b>" + match.p2_name + "</b>\n";
  matchCard += "Результат: <b>" + match.result + "</b>\nДата: " + stringDate(match.gameDate, true);
  return matchCard;
}


function matchConfirmation(matchId){

  let pendingMatches = tPendingMatches.use().getRange(tPendingMatches.allRange).getValues();
  let row = -1;
  let i;
  for(i=1; i<pendingMatches.length;i++){
    if(pendingMatches[i][tPendingMatches.getCol(tPendingMatches.id_Title)] == matchId){
      row = i+1;
      break;
    }
  }
  if(row == -1) {
    botSendMessage(chat_id,"Ошибка: матч не найден");
    return;
  }

  // save match
  tMatches.use().insertRowBefore(2);


  let match = {
    matchId: matchId,
    p1_id: pendingMatches[i][tPendingMatches.getCol(tPendingMatches.id_p1_Title)],
    p2_id: pendingMatches[i][tPendingMatches.getCol(tPendingMatches.id_p2_Title)],
    p1_name: pendingMatches[i][tPendingMatches.getCol(tPendingMatches.name_p1_Title)],
    p2_name: pendingMatches[i][tPendingMatches.getCol(tPendingMatches.name_p2_Title)],
    result: pendingMatches[i][tPendingMatches.getCol(tPendingMatches.result_Title)],
    gameDate: pendingMatches[i][tPendingMatches.getCol(tPendingMatches.date_Title)],
    recordDate: pendingMatches[i][tPendingMatches.getCol(tPendingMatches.record_date_Title)],
  }

  tMatches.use().getRange(2,1,1,tMatches.getColumnsOrder().length).setValues([
    [match.matchId,match.p1_id,match.p2_id,match.p1_name,match.p2_name,"'"+match.result,0,0,match.gameDate,match.recordDate]]);

  tPendingMatches.use().deleteRow(row);
  
  botSendMessage(match.p1_id,buildMatchCard(match)+ "\n\n<b>Матч подтверждён.</b>");
  botEditMessage(chat_id, message_id, buildMatchCard(match)+ "\n\n<b>Матч подтверждён.</b>");
}

function findOpponentByName(oppName){
  for(let i=0; i<usersData.length;i++){
    let someName = String(usersData[i][tUsers.getCol(tUsers.name_Title)]);
    someName = someName.trim().toLocaleLowerCase();
    oppName = oppName.trim().toLocaleLowerCase();
    if(someName == oppName){
      return usersData[i][tUsers.getCol(tUsers.id_Title)];
    }
  }
  return false;
}

function checkGameResult(gr){
  if(gr == "3-0" || gr=="3-1"|| gr=="3-2"|| gr=="2-3"|| gr=="1-3"|| gr=="0-3"|| gr=="2-0"|| gr=="2-1"|| gr=="1-2"|| gr=="0-2"|| gr=="ret1"|| gr=="ret2"){
    return true;
  }
  return false;
}


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
        {text: "Рейтинг лист",callback_data: "rating_list"}
      ]
    ]
  };
  botSendMessage(chat_id, buildPlayerCard(),keyboard,"HTML",true);
}

function buildPlayerCard(){
  let playerCard = "Профиль игрока: <b>"+userLink(user.nick, user.name)+"</b>\nРейтинг: <b>"+user.rating+"</b>"
  +"\nБио: "+user.bio;
  //todo: +Дата регистрации, +Ачивки Кнопки: список матчей
  //todo: изменение Номера, Био, Имени.

  return playerCard;
}


//todo: вывод рейтинг-листа игроков.
//todo: ввод результата. подтверждение результата. список сыгранных

function userLink(nick, name){
  if(!nick) return name;
  let nickText = String(nick).replace("@","");
  return "<a href=\"https://t.me/"+nickText+"\">"+name+"</a>";    
}