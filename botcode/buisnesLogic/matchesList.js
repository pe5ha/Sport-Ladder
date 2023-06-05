
function sendUserMatches(page=null){
  TelegramAPI.sendChatAction(token,chat_id,"typing");
  let matches = tMatches.use().getRange(tMatches.allRange).getValues();
  matches = matches.filter(m => m[tMatches.getCol(tMatches.id_p1_Title)] == user_id || m[tMatches.getCol(tMatches.id_p2_Title)] == user_id);

  let N = 10;
  let isUpdate = true;
  let totalPage = Math.ceil(matches.length/N)-1;

  if(page == null){
    isUpdate = false;
    page = 0;
  }
  let matchList = "Сыгранные матчи:\n\n";
  for(let i=page*N;i < page*N+N;i++){
    if(i>=matches.length) break;
    if(!matches[i][0]) break;
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
  }
  matchList+="\nСтраница "+(page+1)+" из "+(totalPage+1);
  let keyboard = {
    inline_keyboard: [
      [
        {text: (page-1)<0?" ":"<",callback_data: (page-1)<0?"emptybtn":("matchespage_"+(page-1))},
        {text: (page+1)>totalPage?" ":">",callback_data: (page+1)>totalPage?"emptybtn":("matchespage_"+(page+1))},
      ],
    ]
  };
  if(isUpdate){
    botEditMessage(chat_id, message_id, matchList, keyboard, "HTML", true);
  }
  else{
    botSendMessage(chat_id, matchList, keyboard, "HTML", true);
  }
}