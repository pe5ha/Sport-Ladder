
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

function matchForm(oppId, isFromDeepLink){
  if(oppId == chat_id){
    botSendMessage(chat_id,"Вы пытаетесь записать результат игры с самим собой, так нельзя 😅");
    return;
  }

  let opponentRow = findRowIn2dRange(usersData,tUsers.getCol(tUsers.id_Title),oppId);
  if(opponentRow == -1){
    botSendMessage(chat_id, "Ошибка. Игрок не найден.");
    return;
  }
  let opponentName = usersData[opponentRow][tUsers.getCol(tUsers.name_Title)];

  let match = {
    // matchId: message_id,
    // p1_id: user_id,
    // p2_id: oppId,
    p1_name: name,
    p2_name: opponentName,
    // result: matchRes,
    // gameDate: new Date(),
    // recordDate: new Date(),
    p1_rating: 0,
    p2_rating: 0,
  }
  
  let p1_user_row = user.rowInTable - 1;
  let p2_user_row = opponentRow;
  // let p2_user_row = findRowIn2dRange(usersData,tUsers.getCol(tUsers.id_Title),match.p2_id);
  match.p1_rating = usersData[p1_user_row][tUsers.getCol(tUsers.rating_Title)];
  match.p2_rating = usersData[p2_user_row][tUsers.getCol(tUsers.rating_Title)];
  

  let editMatchMes = "<b>"+ match.p1_name + "</b> ["+match.p1_rating + 
  "] vs <b>" + match.p2_name + "</b> ["+match.p2_rating+"]\n";
  editMatchMes+="Какой был результат матча?";

  let keyboard = {
    inline_keyboard: [
      [
        {text: "3-0",callback_data: "record_3-0_"+oppId},
        {text: "3-1",callback_data: "record_3-1_"+oppId},
        {text: "3-2",callback_data: "record_3-2_"+oppId},
        {text: "2-0",callback_data: "record_2-0_"+oppId},
        {text: "2-1",callback_data: "record_2-1_"+oppId},
      ],
      [ 
        {text: "0-3",callback_data: "record_0-3_"+oppId},
        {text: "1-3",callback_data: "record_1-3_"+oppId},
        {text: "2-3",callback_data: "record_2-3_"+oppId},
        {text: "0-2",callback_data: "record_0-2_"+oppId},
        {text: "1-2",callback_data: "record_1-2_"+oppId},
      ],
      [
        {text: "Отменить", callback_data: "cancel_"+oppId},
      ]
    ]
  };
  if(isFromDeepLink){
    botSendMessage(chat_id, editMatchMes, keyboard);
  }
  else{
    botEditMessage(chat_id,message_id,editMatchMes,keyboard);
  }
}