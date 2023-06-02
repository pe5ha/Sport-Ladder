function checkLadderReg(){
  if(user.role!="участник"){
    let keyboard = {
      keyboard: [
        [
          {text: "Отправить свой номер", request_contact: true},
        ]
      ],
      one_time_keyboard: true,
      resize_keyboard: true,
    };
    user.setUserCurrentAction(UserActions.input_phone);
    botSendMessage(chat_id, needReg, keyboard);
    return false;
  }

  return true;
}


function sendPlayerCard(){
  let keyboard = {
    inline_keyboard: [
      [
        {text: "Мои матчи",callback_data: "matches"},
        {text: "Рейтинг лист",callback_data: "rating_list"},
        {text: "Изменить профиль",callback_data: "profile_edit"}
      ],
      [
        {text: "Внести матч",callback_data: "add_match"},
      ]
    ]
  };
  botSendMessage(chat_id, buildPlayerCard(),keyboard,"HTML",true);
}

function buildPlayerCard(){
  let playerCard = "Профиль игрока: <b>"+userLink(user.nick, user.name)+"</b>\nРейтинг: <b>"+user.rating+"</b>"
  +"\nБио: "+user.bio;
  //todo: +Дата регистрации, +Ачивки Кнопки: список матчей

  return playerCard;
}



function userLink(nick, name){
  if(!nick) return name;
  let nickText = String(nick).replace("@","");
  return "<a href=\"https://t.me/"+nickText+"\">"+name+"</a>";    
}