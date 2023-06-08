



function gameRecord(oppId, matchRes){
  let opponentRow = findRowIn2dRange(usersData,tUsers.getCol(tUsers.id_Title),oppId);
  if(opponentRow == -1){
    botSendMessage(chat_id, "Ошибка. Игрок не найден.");
    return;
  }

  let opponentName = usersData[opponentRow][tUsers.getCol(tUsers.name_Title)];

  tPendingMatches.use().insertRowBefore(2);

  let match = {
    matchId: message_id,
    p1_id: user_id,
    p2_id: oppId,
    p1_name: name,
    p2_name: opponentName,
    result: matchRes,
    gameDate: new Date(),
    recordDate: new Date(),
    p1_rating: 0,
    p2_rating: 0,
  }
  let p1_user_row = user.rowInTable - 1;
  // let p1_user_row = findRowIn2dRange(usersData,tUsers.getCol(tUsers.id_Title),match.p1_id);
  let p2_user_row = opponentRow;
  // let p2_user_row = findRowIn2dRange(usersData,tUsers.getCol(tUsers.id_Title),match.p2_id);
  match.p1_rating = usersData[p1_user_row][tUsers.getCol(tUsers.rating_Title)];
  match.p2_rating = usersData[p2_user_row][tUsers.getCol(tUsers.rating_Title)];
  

  tPendingMatches.use().getRange(2,1,1,tPendingMatches.getColumnsOrder().length).setValues([
    [match.matchId, match.p1_id, match.p2_id, match.p1_name, match.p2_name,
      match.p1_rating, match.p2_rating, "'"+match.result, true, false, match.gameDate, match.recordDate]]);

  
  botEditMessage(chat_id, message_id, buildPrematchCard(match));
  botSendMessage(chat_id, "Матч сохранен. Ожидается подтверждение соперником.");
  let confirmKeyboard = {
    inline_keyboard: [
      [
        {text: "Подтвердить ✅",callback_data: "confirm_"+match.matchId},
        {text: "Редактировать ✏️",callback_data: "change_"+match.matchId},
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
