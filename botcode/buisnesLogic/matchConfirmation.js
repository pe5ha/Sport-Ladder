
function buildMatchCard(match){
  let p1_oldRating = match.p1_rating - match.p1_rating_change;
  let p2_oldRating = match.p2_rating - match.p2_rating_change;
  let matchCard = "<b>"+ match.p1_name + "</b> ["+p1_oldRating+"->"+match.p1_rating+"("+(match.p1_rating_change<0?"":"+") + match.p1_rating_change + 
  ")] vs <b>" + match.p2_name + "</b> ["+p2_oldRating+"->"+match.p2_rating+"("+(match.p2_rating_change<0?"":"+") + match.p2_rating_change + ")]\n";
  matchCard += "Результат: <b>" + match.result + "</b> Дата: " + stringDate(match.gameDate, true);
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
  let p1_gamesCount = (parseInt(usersData[p1_user_row][tUsers.getCol(tUsers.games_count_Title)]) || 0) + 1;
  let p2_gamesCount = (parseInt(usersData[p2_user_row][tUsers.getCol(tUsers.games_count_Title)]) || 0) + 1;
  tUsers.use().getRange(p1_user_row+1,tUsers.getCol(tUsers.rating_Title)+1, 1, 3).setValues([[match.p1_rating, stringDate(), p1_gamesCount]]);
  tUsers.use().getRange(p2_user_row+1,tUsers.getCol(tUsers.rating_Title)+1, 1, 3).setValues([[match.p2_rating, stringDate(), p2_gamesCount]]);

  tPendingMatches.use().deleteRow(row);
  
  botSendMessage(chat_id==match.p1_id?match.p2_id:match.p1_id,buildMatchCard(match)+ "\n\n<b>Матч подтверждён.</b>");
  botEditMessage(chat_id, message_id, buildMatchCard(match)+ "\n\n<b>Матч подтверждён.</b>");
}

/**
 * 
 * @param {Match} match // как чтобы свойсвтва объекта видны были
 */
function processRatingChange(match){
  let winner = whoWinner(match.result);
  if (winner == 1){
    [match.p1_rating_change, match.p2_rating_change] = ratingChangeAlg(match.p1_rating, match.p2_rating, match.result);
  }
  else{
    [match.p2_rating_change, match.p1_rating_change] = ratingChangeAlg(match.p2_rating, match.p1_rating, match.result);
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
  let score1 = parseInt(res.split("-")[0]);
  let score2 = parseInt(res.split("-")[1]);
  if(score1>score2) return 1;
  if(score1<score2) return 2;
}