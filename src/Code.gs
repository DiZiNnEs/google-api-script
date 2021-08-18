const getAllCalendarsId = () => {
  const allCalendars = CalendarApp.getAllCalendars();

  const names = [];

  for(let i = 0; i < allCalendars.length; i++){
    names.push(allCalendars[i].getId());
  }
  return names;
};


const getAllCalendarNames = () => {
  const events = CalendarApp.getAllCalendars();

  let names = [];

  for(let i = 0; i < events.length; i++){
    names.push(events[i].getTitle());
  }
  return names;
};


const getFiveUpcomingEventsByCalendarId = () => {
  const calendarIds = getAllCalendarsId();
  const today = new Date();
  const fiveHoursFromNow = new Date(today.getTime() + (5 * 60 * 60 * 1000));
  const eventsFromCalendars = [];
  const calendarNames = [];

  if (calendarIds === undefined) {}
  else {
    for(let i = 0; i < calendarIds.length; i++){
      let calendar = CalendarApp.getCalendarById(calendarIds[i]).getEvents(today, fiveHoursFromNow);
      calendarNames.push(CalendarApp.getCalendarById(calendarIds[i]).getName())
      if (calendar.length == 0) {}
      else {
        for (let j = 0; j < calendar.length; j++) {
          let event = calendar[j].getTitle();
          eventsFromCalendars.push(event);
        }
      }
    }
  }

  return {events: eventsFromCalendars, names: calendarNames};
}


const createUI = () => {
  const ui = SpreadsheetApp.getUi();

  const emailCurrentUser = Session.getActiveUser().getEmail();

  const createDropdown = ui.createMenu('Мероприятия');
  createDropdown.addItem(emailCurrentUser, 'showSidebar');
  createDropdown.addToUi();
}

const showSidebar = () => {
  const html = HtmlService.createHtmlOutputFromFile('Page')
    .setTitle('Мероприятия');

  const UI = SpreadsheetApp.getUi();
  UI.showSidebar(html);
}


const onOpen = () => {
  createUI();
}




