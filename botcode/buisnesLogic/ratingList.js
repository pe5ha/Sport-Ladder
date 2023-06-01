function ratingList(page=null){
  usersData.sort(function(a,b){
    return b[tUsers.getCol(tUsers.rating_Title)] - a[tUsers.getCol(tUsers.rating_Title)];
  });
  let rating_list = "Рейтинг-лист игроков:\n";
  let N = 20;
  let isUpdate = true;

  if(page == null){
    isUpdate = false;
    let ratingRow = findRowIn2dRange(usersData,tUsers.getCol(tUsers.id_Title), user_id);
    page = Math.ceil(ratingRow/N)-1;
  }

  let totalPage = Math.ceil(usersData.length/N)-1;
  if(page>totalPage) page = 0;
  if(page<0) page = totalPage;
  // if(isUpdate && page==totalPage) return;

  for(let i=page*N+1; i < page*N+1+N; i++){
    if(i>=usersData.length) break;
    if(!usersData[i][1]) break;
    let user_link = userLink(usersData[i][tUsers.getCol(tUsers.nick_Title)], usersData[i][tUsers.getCol(tUsers.name_Title)])
    rating_list += i+". <b>"+ user_link +"</b> - "+ usersData[i][tUsers.getCol(tUsers.rating_Title)]+"\n";
  }

  let keyboard = {
    inline_keyboard: [
      [
        {text: (page-1)<0?" ":"<",callback_data: (page-1)<0?"emptybtn":("ratingpage_"+(page-1))},
        {text: (page+1)>totalPage?" ":">",callback_data: (page+1)>totalPage?"emptybtn":("ratingpage_"+(page+1))},
      ],
    ]
  };

  rating_list+="\nСтраница "+(page+1)+" из "+(totalPage+1);
  if(isUpdate){
    botEditMessage(chat_id, message_id, rating_list, keyboard, "HTML", true);
  }
  else{
    botSendMessage(chat_id, rating_list, keyboard, "HTML", true);
  }

}