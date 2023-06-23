
function confirmationTrigger(){
  usersData = tUsers.use().getRange(tUsers.allRange).getValues();
  let pendingMatches = tPendingMatches.use().getRange(tPendingMatches.allRange).getValues();

  let fromDate = new Date(); 
  fromDate.setDate(fromDate.getDate()-5); // дата которая была 5 суток назад

  for(i=pendingMatches.length-1; i>0; i--){
    if(!pendingMatches[i][0]) continue;
    if(pendingMatches[i][tPendingMatches.getCol(tPendingMatches.date_Title)] < fromDate){ // если этот матч был записан более 5 суток назад
      matchConfirmation(pendingMatches[i][0], pendingMatches);
    }
  }

}