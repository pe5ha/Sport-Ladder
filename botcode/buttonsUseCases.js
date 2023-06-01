function buttonsUseCases(data){

  if(data == "rating_list"){
    usersData.sort(function(a,b){
      return b[tUsers.getCol(tUsers.rating_Title)] - a[tUsers.getCol(tUsers.rating_Title)];
    });
    let rating_list = "Рейтинг-лист игроков:\n";
    for(let i=1; i<10;i++){
      if(i>=usersData.length) break;
      if(!usersData[i][1]) break;
      let user_link = userLink(usersData[i][tUsers.getCol(tUsers.nick_Title)], usersData[i][tUsers.getCol(tUsers.name_Title)])
      rating_list += i+". <b>"+ user_link +"</b> - "+ usersData[i][tUsers.getCol(tUsers.rating_Title)]+"\n";
    }
    botSendMessage(chat_id, rating_list, null, "HTML", true);
  }
  else if(data == "matches"){
    sendUserMatches();
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
}