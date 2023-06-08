function ratingList(page=null, isUpdate = false){
  TelegramAPI.sendChatAction(token,chat_id,"typing");
  usersData.sort(function(a,b){
    return b[tUsers.getCol(tUsers.rating_Title)] - a[tUsers.getCol(tUsers.rating_Title)];
  });
  let rating_list = "Рейтинг-лист игроков:\n(Данные на "+stringDate()+")\n";
  let N = 8;

  if(page == null){
    let ratingRow = findRowIn2dRange(usersData,tUsers.getCol(tUsers.id_Title), user_id);
    page = Math.ceil(ratingRow/N)-1;
  }
  else isUpdate = true;

  let totalPage = Math.ceil(usersData.length/N)-1;
  if(page>totalPage) page = 0;
  if(page<0) page = totalPage;
  // if(isUpdate && page==totalPage) return;

  let keyboard = {inline_keyboard: [[]]};
  for(let i=page*N+1; i < page*N+1+N; i++){
    if(i>=usersData.length) break;
    if(!usersData[i][1]) break;
    let user_link = userLink(usersData[i][tUsers.getCol(tUsers.nick_Title)], usersData[i][tUsers.getCol(tUsers.name_Title)])
    rating_list += i+". <b>"+ user_link +"</b> - "+ usersData[i][tUsers.getCol(tUsers.rating_Title)]+"\n";
    keyboard.inline_keyboard[0].push({text: i, callback_data: "user_"+usersData[i][tUsers.getCol(tUsers.id_Title)]});
  }

  keyboard.inline_keyboard.push(
      [
        {text: (page-1)<0?" ":"<",callback_data: (page-1)<0?"emptybtn":("ratingpage_"+(page-1))},
        {text: "Обновить 🔄",callback_data: "rating_refresh"},
        {text: (page+1)>totalPage?" ":">",callback_data: (page+1)>totalPage?"emptybtn":("ratingpage_"+(page+1))},
      ],
  );

  rating_list+="\nСтраница "+(page+1)+" из "+(totalPage+1);
  if(isUpdate){
    botEditMessage(chat_id, message_id, rating_list, keyboard, "HTML", true);
  }
  else{
    botSendMessage(chat_id, rating_list, keyboard, "HTML", true);
  }

}