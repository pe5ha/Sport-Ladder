
/**
 *   Bot use cases detecting (User Roles and Current actions)
 */
function useCases(){
  // start

  // if(user.currentAction == UserActions.input_phone){
  //   if(contents.message.contact) {
  //     user.setUserPhone(contents.message.contact.phone_number);
  //     user.setUserCurrentAction(UserActions.input_name);
  //     botSendMessage(chat_id, needName);
  //     return;
  //   }
  // }
  

  // Новый код без вызова биографии
  if(user.currentAction == UserActions.input_name){
    if(text == "/start") user.setUserName(name);
    else {
      text = text
         .replace(/&/g, "")
         .replace(/</g, "")
         .replace(/>/g, "")
         .replace(/"/g, "");
      if(!text) text = name;
      user.setUserName(text);
    }
    //user.setUserCurrentAction(UserActions.input_bio);
    user.setUserCurrentAction(UserActions.without_action);
    user.setUserBio("-");
    user.setRating(1000);
    //botSendMessage(chat_id, needBio);
    if(user.role != "участник"){
      user.setUserRole("участник");
    }
    botSendMessage(chat_id, regDone);
    sendPlayerCard();
    return;
  }



  /* Старый код обязательного вызова биографии
  if(user.currentAction == UserActions.input_name){
    if(text == "/start") user.setUserName(name);
    else {
      text = text
         .replace(/&/g, "")
         .replace(/</g, "")
         .replace(/>/g, "")
         .replace(/"/g, "");
      if(!text) text = name;
      user.setUserName(text);
    }
    user.setUserCurrentAction(UserActions.input_bio);
    user.setRating(1000);
    botSendMessage(chat_id, needBio);
    return;
  }

*/

  if(user.currentAction == UserActions.input_bio){
    if(text == "/start") user.setUserBio("-");
    else {
      text = text
         .replace(/&/g, "")
         .replace(/</g, "")
         .replace(/>/g, "")
         .replace(/"/g, "");
      user.setUserBio(text)
    };
    user.setUserCurrentAction(UserActions.without_action);
    if(user.role != "участник"){
      user.setUserRole("участник");
    }
    botSendMessage(chat_id, "Информация обновлена.");
    sendPlayerCard();
    return;
  }


  if(!checkLadderReg()) return;

  else if (text.startsWith("/start ")) { 
    let payload = text.split(" ")[1];
    startCommand(payload);
  }
  else if (text == "/start") {
    startCommand();
  }
  else if (text == "/bio") {
    user.setUserCurrentAction(UserActions.input_bio);
    botSendMessage(chat_id, needBioLong);
  }
  else if (text == "/name") {
    user.setUserCurrentAction(UserActions.input_name);
    botSendMessage(chat_id, needName);
  }
  // else gameRecord();
  
  

}

function startCommand(payload=null){
  if(user.isNewUser){ // если новый юзер
    // TODO новый юзер
    if(payload){ // реферал
      
    }

  }

  // deep link
  if(payload){ 
    let userId = parseInt(payload);
    sendPlayerProfile(userId);
  }
  // просто /start
  else{
    sendPlayerCard();
  }
}



