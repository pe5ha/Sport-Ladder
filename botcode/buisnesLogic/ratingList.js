function ratingList(page=null, isUpdate = false){
  TelegramAPI.sendChatAction(token,chat_id,"typing");
  usersData = usersData.filter(u => u[tUsers.getCol(tUsers.role_Title)] == "участник");
  usersData.sort(function(a,b){
    return b[tUsers.getCol(tUsers.rating_Title)] - a[tUsers.getCol(tUsers.rating_Title)];
  });
  let rating_list = "Общий список участников Ладдера:\n<i>(Данные на "+stringDate()+")</i>\n\n";
  let N = 100; // 100 игроков в одном сообщении

  let j = 0;
  for(let i=0; i<usersData.length;i++){
    if(!usersData[i][1]) break;
    let user_link = userDeeplink(usersData[i][tUsers.getCol(tUsers.name_Title)], usersData[i][tUsers.getCol(tUsers.id_Title)])
    rating_list += (i+1)+". <b>"+ user_link +"</b> - "+ usersData[i][tUsers.getCol(tUsers.rating_Title)]+"\n";
    j++;
    if(j>=N){
      botSendMessage(chat_id, rating_list, null, "HTML", true);
      rating_list = "Общий список участников Ладдера:\n<i>(Данные на "+stringDate()+")</i>\n\n";
      j = 0;
    }
  }
  if(j>0){
    botSendMessage(chat_id, rating_list, null, "HTML", true);
  }
}


function ratingListActive(page=null, isUpdate = false){
  TelegramAPI.sendChatAction(token,chat_id,"typing");
  //usersData = usersData.filter(u => u[tUsers.getCol(tUsers.role_Title)] == "участник");
  usersData = usersData.filter(u => u[tUsers.getCol(tUsers.games_count_Title)] > 0);
  usersData.sort(function(a,b){
    return b[tUsers.getCol(tUsers.rating_Title)] - a[tUsers.getCol(tUsers.rating_Title)];
  });
  let rating_list = "<b>Активный рейтинг</b> Ладдера:\n<i>(Данные на "+stringDate()+")</i>\n\n";
  let N = 100; // 100 игроков в одном сообщении

  let j = 0;
  for(let i=0; i<usersData.length;i++){
    if(!usersData[i][1]) break;
    let user_link = userDeeplink(usersData[i][tUsers.getCol(tUsers.name_Title)], usersData[i][tUsers.getCol(tUsers.id_Title)])
    rating_list += (i+1)+". <b>"+ user_link +"</b> - "+ usersData[i][tUsers.getCol(tUsers.rating_Title)]+"\n";
    j++;
    if(j>=N){
      botSendMessage(chat_id, rating_list, null, "HTML", true);
      rating_list = "<b>Активный рейтинг</b> Ладдера:\n<i>(Данные на "+stringDate()+")</i>\n\n";
      j = 0;
    }
  }
  if(j>0){
    botSendMessage(chat_id, rating_list, null, "HTML", true);
  }
}




/**
 * 
 * @deprecated - old code
 */
function ratingList_Old(page=null, isUpdate = false){
  TelegramAPI.sendChatAction(token,chat_id,"typing");
  usersData.sort(function(a,b){
    return b[tUsers.getCol(tUsers.rating_Title)] - a[tUsers.getCol(tUsers.rating_Title)];
  });
  let rating_list = "Общий рейтинг участников Ладдера:\n<i>(Данные на "+stringDate()+")</i>\n\n";
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