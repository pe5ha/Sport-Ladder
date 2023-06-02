
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
