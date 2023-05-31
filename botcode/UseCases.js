
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
    user.setUserCurrentAction(UserActions.without_action);
    user.setUserRole("участник");
    user.setRating(1000);
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
  // else if (text == "/ladderreg") {
  //   ladderReg();
  // }
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



