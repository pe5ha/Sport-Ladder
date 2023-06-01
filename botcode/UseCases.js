
/**
 *   Bot use cases detecting (User Roles and Current actions)
 */
function useCases(){
  // start

  if(user.currentAction == UserActions.input_phone){
    if(contents.message.contact) {
      user.setUserPhone(contents.message.contact.phone_number);
      user.setUserCurrentAction(UserActions.input_bio);
      botSendMessage(chat_id, needBio);
      return;
    }
  }

  if(user.currentAction == UserActions.input_bio){
    user.setUserBio(text);
    user.setUserCurrentAction(UserActions.input_name);
    botSendMessage(chat_id, needName);
    return;
  }

  if(user.currentAction == UserActions.input_name){
    user.setUserName(text);
    user.setUserCurrentAction(UserActions.without_action);
    if(user.role != "участник"){
      user.setUserRole("участник");
      user.setRating(1000);
    }
    botSendMessage(chat_id, regDone);
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
    botSendMessage(chat_id, needBio);
  }
  else if (text == "/name") {
    user.setUserCurrentAction(UserActions.input_name);
    botSendMessage(chat_id, needName);
  }
  else gameRecord();
  
  

}

function startCommand(payload=null){
  if(user.isNewUser){ // если новый юзер
    // TODO новый юзер
    if(payload){ // реферал
      
    }

  }

  // deep link
  if(payload){ 

  }
  // просто /start
  else{
    sendPlayerCard();
  }
}



