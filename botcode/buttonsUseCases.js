function buttonsUseCases(data){

  if(data == "rating_list"){
    usersData.sort(function(a,b){
      return b[tUsers.getCol(tUsers.rating_Title)] - a[tUsers.getCol(tUsers.rating_Title)];
    });
    let rating_list = "Рейтинг-лист:\n";
    for(let i=1; i<10;i++){
      if(i>=usersData.length) break;
      if(!usersData[i][1]) break;
      let user_link = userLink(usersData[i][tUsers.getCol(tUsers.nick_Title)], usersData[i][tUsers.getCol(tUsers.name_Title)])
      rating_list += i+". <b>"+ user_link +"</b> - "+ usersData[i][tUsers.getCol(tUsers.rating_Title)]+"\n";
    }
    botSendMessage(chat_id, rating_list, null, "HTML", true);
  }
}