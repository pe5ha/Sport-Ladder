// версия 1


let contents;
// bot service variables
let chat_id;
let user_id;
let name;
let nick;
let date;
let message_id;
let text = "";
let data;
let textToSend;
let language_code;

// users data arrays gets from Users sheet
let usersData = []; 

// let token = process.env.BOT_TOKEN;
let token = PropertiesService.getScriptProperties().getProperty('BOT_TOKEN');
let activeSheet = SpreadsheetApp.getActive();
let SpreadsheetID;
if(activeSheet)
  SpreadsheetID = activeSheet.getId();
if(!SpreadsheetID)
  SpreadsheetID = PropertiesService.getScriptProperties().getProperty('SPREADSHEET_ID');


// google tables service variables
let table = SpreadsheetApp.openById(SpreadsheetID);
