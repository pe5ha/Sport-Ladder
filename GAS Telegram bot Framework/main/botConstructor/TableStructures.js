

// Matches sheet structure
let tMatches = {
  sheetName: "Матчи",
  id_Title: "матч id",
  id_p1_Title: "id 1",
  id_p2_Title: "id 2",
  name_p1_Title: "игрок 1",
  name_p2_Title: "игрок 2",
  result_Title: "результат",
  p1_rating_Title: "рейт. 1",
  p2_rating_Title: "рейт. 2",
  rating_change_p1_Title: "изм. рейт. 1",
  rating_change_p2_Title: "изм. рейт. 2",
  date_Title: "дата матча",
  record_date_Title: "дата записи",
  allRange: "A:L",
  getColumnsOrder(){
    return [
      this.id_Title,
      this.id_p1_Title,
      this.id_p2_Title,
      this.name_p1_Title,
      this.name_p2_Title,
      this.result_Title,
      this.p1_rating_Title,
      this.p2_rating_Title,
      this.rating_change_p1_Title,
      this.rating_change_p2_Title,
      this.date_Title,
      this.record_date_Title,
    ];
  },
  getCol(columnTitle){
    return this.getColumnsOrder().indexOf(columnTitle);
  },
  use(){
    if(table.getSheetByName(this.sheetName) == null) { // если такого листа нет
      table.insertSheet(this.sheetName); // то такой лист создаётся
      let style = SpreadsheetApp.newTextStyle().setBold(true).setItalic(true).build();
      this.use().getRange(1,1,1,this.getColumnsOrder().length).setValues([this.getColumnsOrder()]).setTextStyle(style).setHorizontalAlignment("center");
      this.use().deleteRows(3,998);
    }
    return table.getSheetByName(this.sheetName);
  }
}


// Matches sheet structure
let tPendingMatches = {
  sheetName: "Матчи (ожидают)",
  id_Title: "матч id",
  id_p1_Title: "id 1",
  id_p2_Title: "id 2",
  name_p1_Title: "игрок 1",
  name_p2_Title: "игрок 2",
  p1_rating_Title: "рейт. 1",
  p2_rating_Title: "рейт. 2",
  result_Title: "результат",
  p1_confirmed_Title: "подтвердил 1",
  p2_confirmed_Title: "подтвердил 2",
  date_Title: "дата матча",
  record_date_Title: "дата записи",
  allRange: "A:L",
  getColumnsOrder(){
    return [
      this.id_Title,
      this.id_p1_Title,
      this.id_p2_Title,
      this.name_p1_Title,
      this.name_p2_Title,
      this.p1_rating_Title,
      this.p2_rating_Title,
      this.result_Title,
      this.p1_confirmed_Title,
      this.p2_confirmed_Title,
      this.date_Title,
      this.record_date_Title,
    ];
  },
  getCol(columnTitle){
    return this.getColumnsOrder().indexOf(columnTitle);
  },
  use(){
    if(table.getSheetByName(this.sheetName) == null) { // если такого листа нет
      table.insertSheet(this.sheetName); // то такой лист создаётся
      let style = SpreadsheetApp.newTextStyle().setBold(true).setItalic(true).build();
      this.use().getRange(1,1,1,this.getColumnsOrder().length).setValues([this.getColumnsOrder()]).setTextStyle(style).setHorizontalAlignment("center");
      this.use().deleteRows(3,998);
    }
    return table.getSheetByName(this.sheetName);
  }
}


// Users sheet structure
let tUsers = {
  sheetName: "Users",
  reg_date_Title: "дата регистрации",
  id_Title: "id",
  nick_Title: "ник",
  name_Title: "имя",
  language_code_Title: "язык",
  current_action_Title: "текущее действие",
  role_Title: "роль",
  phone_Title: "номер",
  bio_Title: "о себе",
  rating_Title: "рейтинг",
  last_game_Title: "Дата последней игры",
  games_count_Title: "Всего игр в ладдере",
  achievements_Title: "Ачивки",
  allRange: "A:N",
  getColumnsOrder(){
    return [
      this.reg_date_Title,	
      this.id_Title,	
      this.nick_Title,	
      this.name_Title,	
      this.language_code_Title,
      this.current_action_Title, 
      this.role_Title,
      this.phone_Title,
      this.bio_Title,
      this.rating_Title,
      this.last_game_Title,
      this.games_count_Title,
      this.achievements_Title,
    ];
  },
  getCol(columnTitle){
    return this.getColumnsOrder().indexOf(columnTitle);
  },
  use(){
    return table.getSheetByName(this.sheetName);
  }
}

// Logs sheet structure
let LogSheet = {
  SheetName: "Log",
  time_Title: "время",
  id_Title: "id",
  nick_Title: "ник",
  name_Title: "имя",
  message_id_Title: "message id",
  action_Title: "действие",
  what_was_sent_Title: "что прислал",
  bot_answer_Title: "ответ бота",
  getColumnsOrder(){
    return [this.time_Title,	this.id_Title,	this.nick_Title,	this.name_Title,	this.message_id_Title, this.action_Title,this.what_was_sent_Title,this.bot_answer_Title];
  },
  getCol(columnTitle){
    return this.getColumnsOrder().indexOf(columnTitle);
  }
}

// Debug sheet structure
let DebugSheet = {
  SheetName: "Debug",
}
