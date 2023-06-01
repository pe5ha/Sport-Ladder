

function matchEditResult(matchId, matchResult){
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
  let match = {
    matchId: matchId,
    p1_id: pendingMatches[i][tPendingMatches.getCol(tPendingMatches.id_p1_Title)],
    p2_id: pendingMatches[i][tPendingMatches.getCol(tPendingMatches.id_p2_Title)],
    p1_name: pendingMatches[i][tPendingMatches.getCol(tPendingMatches.name_p1_Title)],
    p2_name: pendingMatches[i][tPendingMatches.getCol(tPendingMatches.name_p2_Title)],
    result: matchResult,
    gameDate: pendingMatches[i][tPendingMatches.getCol(tPendingMatches.date_Title)],
    recordDate: pendingMatches[i][tPendingMatches.getCol(tPendingMatches.record_date_Title)],
    p1_rating: pendingMatches[i][tPendingMatches.getCol(tPendingMatches.p1_rating_Title)],
    p2_rating: pendingMatches[i][tPendingMatches.getCol(tPendingMatches.p2_rating_Title)],
  }


  botEditMessage(chat_id,message_id,buildPrematchCard(match));
  botSendMessage(chat_id, "Матч сохранен. Ожидается подтверждение соперником.");
  let confirmKeyboard = {
    inline_keyboard: [
      [
        {text: "Подтвердить",callback_data: "confirm_"+match.matchId},
        {text: "Редактировать",callback_data: "change_"+match.matchId},
      ]
    ]
  };
  botSendMessage(chat_id==match.p1_id?match.p2_id:match.p1_id,buildPrematchCard(match),confirmKeyboard);
  tPendingMatches.use().getRange(row,tPendingMatches.getCol(tPendingMatches.result_Title)+1).setValue("'"+matchResult);
}

function matchEdit(matchId){
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
  let match = {
    matchId: matchId,
    // p1_id: pendingMatches[i][tPendingMatches.getCol(tPendingMatches.id_p1_Title)],
    // p2_id: pendingMatches[i][tPendingMatches.getCol(tPendingMatches.id_p2_Title)],
    p1_name: pendingMatches[i][tPendingMatches.getCol(tPendingMatches.name_p1_Title)],
    p2_name: pendingMatches[i][tPendingMatches.getCol(tPendingMatches.name_p2_Title)],
    // result: pendingMatches[i][tPendingMatches.getCol(tPendingMatches.result_Title)],
    // gameDate: pendingMatches[i][tPendingMatches.getCol(tPendingMatches.date_Title)],
    // recordDate: pendingMatches[i][tPendingMatches.getCol(tPendingMatches.record_date_Title)],
    p1_rating: pendingMatches[i][tPendingMatches.getCol(tPendingMatches.p1_rating_Title)],
    p2_rating: pendingMatches[i][tPendingMatches.getCol(tPendingMatches.p2_rating_Title)],
    // p1_rating_change: 0,
    // p2_rating_change: 0,
  }


  let editMatchMes = "<b>"+ match.p1_name + "</b> ["+match.p1_rating + 
  "] vs <b>" + match.p2_name + "</b> ["+match.p2_rating+"]\n";
  editMatchMes+="Какой результат матча правильный?";

  let keyboard = {
    inline_keyboard: [
      [
        {text: "3-0",callback_data: "edit_3-0_"+match.matchId},
        {text: "3-1",callback_data: "edit_3-1_"+match.matchId},
        {text: "3-2",callback_data: "edit_3-2_"+match.matchId},
        {text: "2-0",callback_data: "edit_2-0_"+match.matchId},
        {text: "2-1",callback_data: "edit_2-1_"+match.matchId},
      ],
      [ 
        {text: "0-3",callback_data: "edit_0-3_"+match.matchId},
        {text: "1-3",callback_data: "edit_1-3_"+match.matchId},
        {text: "2-3",callback_data: "edit_2-3_"+match.matchId},
        {text: "0-2",callback_data: "edit_0-2_"+match.matchId},
        {text: "1-2",callback_data: "edit_1-2_"+match.matchId},
      ]
    ]
  };
  botEditMessage(chat_id,message_id,editMatchMes,keyboard);

}

function sendUserMatches(){
  let matches = tMatches.use().getRange(tMatches.allRange).getValues();

  let matchList = "Последние 10 сыгранных матчей:\n\n";
  let k = 0;
  for(let i=1;i<matches.length;i++){
    if(matches[i][tMatches.getCol(tMatches.id_p1_Title)] == user_id
    || matches[i][tMatches.getCol(tMatches.id_p2_Title)] == user_id){
      let match = {
        matchId: matches[i][tMatches.getCol(tMatches.id_Title)],
        p1_id: matches[i][tMatches.getCol(tMatches.id_p1_Title)],
        p2_id: matches[i][tMatches.getCol(tMatches.id_p2_Title)],
        p1_name: matches[i][tMatches.getCol(tMatches.name_p1_Title)],
        p2_name: matches[i][tMatches.getCol(tMatches.name_p2_Title)],
        result: matches[i][tMatches.getCol(tMatches.result_Title)],
        gameDate: matches[i][tMatches.getCol(tMatches.date_Title)],
        recordDate: matches[i][tMatches.getCol(tMatches.record_date_Title)],
        p1_rating: matches[i][tMatches.getCol(tMatches.p1_rating_Title)],
        p2_rating: matches[i][tMatches.getCol(tMatches.p2_rating_Title)],
        p1_rating_change: matches[i][tMatches.getCol(tMatches.rating_change_p1_Title)],
        p2_rating_change: matches[i][tMatches.getCol(tMatches.rating_change_p2_Title)],
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
    p1_rating: 0,
    p2_rating: 0,
  }
  let p1_user_row = findRowIn2dRange(usersData,tUsers.getCol(tUsers.id_Title),match.p1_id);
  let p2_user_row = findRowIn2dRange(usersData,tUsers.getCol(tUsers.id_Title),match.p2_id);
  match.p1_rating = usersData[p1_user_row][tUsers.getCol(tUsers.rating_Title)];
  match.p2_rating = usersData[p2_user_row][tUsers.getCol(tUsers.rating_Title)];
  

  tPendingMatches.use().getRange(2,1,1,tPendingMatches.getColumnsOrder().length).setValues([
    [match.matchId, match.p1_id, match.p2_id, match.p1_name, match.p2_name,
      match.p1_rating, match.p2_rating, "'"+match.result, true, false, match.gameDate, match.recordDate]]);

  
  botSendMessage(chat_id, buildPrematchCard(match));
  botSendMessage(chat_id, "Матч сохранен. Ожидается подтверждение соперником.");
  let confirmKeyboard = {
    inline_keyboard: [
      [
        {text: "Подтвердить",callback_data: "confirm_"+match.matchId},
        {text: "Редактировать",callback_data: "change_"+match.matchId},
      ]
    ]
  };
  botSendMessage(oppId, buildPrematchCard(match),confirmKeyboard);
}


function buildPrematchCard(match){
  let matchCard = "<b>"+ match.p1_name + "</b> ["+match.p1_rating + 
  "] vs <b>" + match.p2_name + "</b> ["+match.p2_rating+"]\n";
  matchCard += "Результат: <b>" + match.result + "</b>\nДата: " + stringDate(match.gameDate, true);
  return matchCard;
}

function buildMatchCard(match){
  let p1_oldRating = match.p1_rating - match.p1_rating_change;
  let p2_oldRating = match.p2_rating - match.p2_rating_change;
  let matchCard = "<b>"+ match.p1_name + "</b> ["+p1_oldRating+"->"+match.p1_rating+"("+(match.p1_rating_change<0?"":"+") + match.p1_rating_change + 
  ")] vs <b>" + match.p2_name + "</b> ["+p2_oldRating+"->"+match.p2_rating+"("+(match.p2_rating_change<0?"":"+") + match.p2_rating_change + ")]\n";
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

  

  

  let match = {
    matchId: matchId,
    p1_id: pendingMatches[i][tPendingMatches.getCol(tPendingMatches.id_p1_Title)],
    p2_id: pendingMatches[i][tPendingMatches.getCol(tPendingMatches.id_p2_Title)],
    p1_name: pendingMatches[i][tPendingMatches.getCol(tPendingMatches.name_p1_Title)],
    p2_name: pendingMatches[i][tPendingMatches.getCol(tPendingMatches.name_p2_Title)],
    result: pendingMatches[i][tPendingMatches.getCol(tPendingMatches.result_Title)],
    gameDate: pendingMatches[i][tPendingMatches.getCol(tPendingMatches.date_Title)],
    recordDate: pendingMatches[i][tPendingMatches.getCol(tPendingMatches.record_date_Title)],
    p1_rating: pendingMatches[i][tPendingMatches.getCol(tPendingMatches.p1_rating_Title)],
    p2_rating: pendingMatches[i][tPendingMatches.getCol(tPendingMatches.p2_rating_Title)],
    p1_rating_change: 0,
    p2_rating_change: 0,
  }

  processRatingChange(match);

  match.p1_rating+=match.p1_rating_change;
  match.p2_rating+=match.p2_rating_change;

  // save match
  tMatches.use().insertRowBefore(2);
  tMatches.use().getRange(2,1,1,tMatches.getColumnsOrder().length).setValues([
    [match.matchId,match.p1_id,match.p2_id,match.p1_name,match.p2_name,"'"+match.result,match.p1_rating,match.p2_rating,
    match.p1_rating_change,match.p2_rating_change,match.gameDate,match.recordDate]]);

  let p1_user_row = findRowIn2dRange(usersData,tUsers.getCol(tUsers.id_Title),match.p1_id);
  let p2_user_row = findRowIn2dRange(usersData,tUsers.getCol(tUsers.id_Title),match.p2_id);
  tUsers.use().getRange(p1_user_row+1,tUsers.getCol(tUsers.rating_Title)+1).setValue(match.p1_rating);
  tUsers.use().getRange(p2_user_row+1,tUsers.getCol(tUsers.rating_Title)+1).setValue(match.p2_rating);

  tPendingMatches.use().deleteRow(row);
  
  botSendMessage(chat_id==match.p1_id?match.p2_id:match.p1_id,buildMatchCard(match)+ "\n\n<b>Матч подтверждён.</b>");
  botEditMessage(chat_id, message_id, buildMatchCard(match)+ "\n\n<b>Матч подтверждён.</b>");
}

/**
 * 
 * @param {Match} match // как сделать чтоб свойсвтва объекта видны были?
 */
function processRatingChange(match){
  let winner = whoWinner(match.result);
  if (winner == 1){
    [match.p1_rating_change, match.p2_rating_change] = ratingChangeAlg(match.p1_rating, match.p2_rating);
  }
  else{
    [match.p2_rating_change, match.p1_rating_change] = ratingChangeAlg(match.p2_rating, match.p1_rating);
  }
}

function ratingChangeAlg(winner_rating, loser_rating){
  if(winner_rating >= loser_rating){
    let diff = winner_rating - loser_rating;
    if(diff == 0) return [5,-5];
    if(diff == 1) return [6,-6];
    if(diff <= 4) return [4,-4];
    if(diff <= 5) return [5,-5];
    if(diff <= 10) return [4,-4];
    if(diff <= 20) return [3,-3];
    if(diff <= 25) return [2,-2];
    if(diff <= 31) return [1,-1];
    else return [0,0];
  }
  else {
    let diff = loser_rating - winner_rating;
    if(diff <= 5) return [5,-5];
    if(diff <= 10) return [6,-6];
    if(diff <= 15) return [7,-7];
    if(diff <= 20) return [7,-8];
    if(diff <= 25) return [8,-9];
    if(diff <= 30) return [8,-10];
    if(diff <= 35) return [9,-10];
    if(diff <= 40) return [9,-10];
    if(diff <= 45) return [10,-10];
    if(diff <= 50) return [11,-10];
    if(diff <= 55) return [12,-10];
    if(diff <= 60) return [16,-10];
    if(diff <= 65) return [24,-10];
    if(diff <= 70) return [28,-10];
    if(diff <= 75) return [33.5,-10];
    if(diff <= 80) return [39,-10];
    if(diff <= 85) return [40,-10];
    if(diff <= 90) return [44,-10];
    if(diff <= 95) return [48,-10];
    if(diff <= 100) return [49,-10];
    else return [50,-10];
  }

}




/**
 * 
 * @param {*} p1 
 * @param {*} p2 
 * @param {String} res 
 * @returns 
 */
function whoWinner(res){
  if(res == "ret1"){
    return 2;
  }
  if(res == "ret2"){
    return 1;
  }
  let score1 = res.split("-")[0];
  let score2 = res.split("-")[1];
  if(score1>score2) return 1;
  if(score1<score2) return 2;
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
        {text: "Рейтинг лист",callback_data: "rating_list"},
        {text: "Изменить профиль",callback_data: "profile_edit"}
      ],
      [
        {text: "Внести матч",callback_data: "add_match"},
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