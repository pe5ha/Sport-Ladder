

let doNotLogDebug = false;
let doNotLogBotSending = false;
let doNotLog = false;
let errorMessagesChat = PropertiesService.getScriptProperties().getProperty('ERRORS_CHAT');

let BotName = PropertiesService.getScriptProperties().getProperty('BOT_USERNAME');


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
