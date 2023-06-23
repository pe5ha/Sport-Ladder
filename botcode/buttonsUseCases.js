function buttonsUseCases(data){

  if(data == "rating_list"){
    ratingList();
  }
  else if(data == "rating_list_active"){
    ratingListActive();
  }
  else if(data == "rating_refresh"){
    ratingList(null, true);
  }
  else if(data == "add_match"){
    botSendMessage(chat_id,addMatchInfo);
  }
  else if(data == "profile_edit"){
    botSendMessage(chat_id,profileEditInfo);
  }
  else if(String(data).startsWith("confirm")){
    let matchId = String(data).split("_")[1];
    matchConfirmation(matchId);
  }
  else if(String(data).startsWith("change")){
    let matchId = String(data).split("_")[1];
    matchEdit(matchId);
  }
  else if(String(data).startsWith("edit")){
    let matchId = String(data).split("_")[2];
    let matchResult = String(data).split("_")[1];
    matchEditResult(matchId, matchResult);
  }
  else if(String(data).startsWith("ratingpage")){
    let page = parseInt(String(data).split("_")[1]);
    ratingList(page);
  }
  else if(String(data).startsWith("user")){
    let userId = parseInt(String(data).split("_")[1]);
    sendPlayerProfile(userId);
  }
  else if(String(data).startsWith("matchvs")){
    let oppId = parseInt(String(data).split("_")[1]);
    matchForm(oppId, false);
  }
  else if(String(data).startsWith("record")){
    let oppId = String(data).split("_")[2];
    let matchResult = String(data).split("_")[1];
    gameRecord(oppId, matchResult);
  }
  else if(String(data).startsWith("cancel")){
    let userId = parseInt(String(data).split("_")[1]);
    sendPlayerProfile(userId, true);
  }
  else if(String(data).startsWith("matches_")){
    let userId = parseInt(String(data).split("_")[1]);
    sendUserMatches(userId);
  }
  
}