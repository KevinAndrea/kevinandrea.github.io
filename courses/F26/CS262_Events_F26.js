// Make you edits in this file for the following:
// 1) initializeTime to set start and end times
// 2) addRows to add the events
// 3) setColors (optional) to change the category color manually
// 4) addTips (optional) to set event-level tooltips

// Sets up the Start and End times
function initializeTime() {
  parameters.set('startTime', doDate(2026,8,24,0,0));
  parameters.set('endTime',   doDate(2026,12,17,23,59));
}

// Add in each event in the timeline
function addRows(dataTable) {
  // Add the events here.  Format:  [ 'Category', 'Event', startDate, endDate ],
  dataTable.addRows([
// Time Bar - do not edit this entry
    [ 'Time', parameters.get('timeText'), parameters.get('barTime'), parameters.get('barTime')],
// Exams
    [ 'Exams', 'Midterms Period',               doDate(2026, 10, 07, 00, 00), doDate(2026, 10, 08, 23, 59)],
    [ 'Exams', 'Finals Week',                   doDate(2026, 12, 09, 00, 00), doDate(2026, 12, 16, 23, 59)],
// Projects
    [ 'Projects', 'Project 1',                  doDate(2026, 09, 15, 18, 00), doDate(2026, 10, 02, 23, 59)],
    [ 'Projects', 'Project 2',                  doDate(2026, 10, 13, 18, 00), doDate(2026, 11, 06, 23, 59)],
    [ 'Projects', 'Project 3',                  doDate(2026, 11, 10, 18, 00), doDate(2026, 12, 04, 23, 59)],
// Quizzes
    [ 'Quiz (In-Class)', 'Q1',                  doDate(2026, 09, 01, 00, 00), doDate(2026, 09, 01, 23, 59)],
    [ 'Quiz (In-Class)', 'Q2',                  doDate(2026, 09, 16, 00, 00), doDate(2026, 09, 16, 23, 59)],
    [ 'Quiz (In-Class)', 'Q3',                  doDate(2026, 09, 30, 00, 00), doDate(2026, 09, 30, 23, 59)],
    [ 'Quiz (In-Class)', 'Q4',                  doDate(2026, 10, 20, 00, 00), doDate(2026, 10, 20, 23, 59)],
    [ 'Quiz (In-Class)', 'Q5',                  doDate(2026, 11, 03, 00, 00), doDate(2026, 11, 03, 23, 59)],
    [ 'Quiz (In-Class)', 'Q6',                  doDate(2026, 11, 17, 00, 00), doDate(2026, 11, 17, 23, 59)],
  ]);

    // Labs
   addLab( dataTable, 01, 2026, 08, 27),
   addLab( dataTable, 02, 2026, 09, 03),
   addLab( dataTable, 03, 2026, 09, 10),
   addLab( dataTable, 04, 2026, 09, 17),
   addLab( dataTable, 05, 2026, 09, 24),
   addLab( dataTable, 06, 2026, 10, 01),
   addLab( dataTable, 07, 2026, 10, 08),
   addLab( dataTable, 08, 2026, 10, 15),
   addLab( dataTable, 09, 2026, 10, 22),
   addLab( dataTable, 10, 2026, 10, 29),
   addLab( dataTable, 11, 2026, 11, 05),
   addLab( dataTable, 12, 2026, 11, 12),
   addLab( dataTable, 13, 2026, 11, 19, -2),
   addLab( dataTable, 14, 2026, 12, 03),
   dataTable.addRows([
    // Special Dates 
      [ 'Special Dates', 'Add',                 doDate(2026, 08, 24, 00, 00), doDate(2026, 08, 31, 23, 59)],
      [ 'Special Dates', 'Drop (100%)',         doDate(2026, 09, 01, 00, 00), doDate(2026, 09, 08, 23, 59)],
      [ 'Special Dates', 'Drop (50%)',          doDate(2026, 09, 09, 00, 00), doDate(2026, 09, 15, 23, 59)],
      [ 'Special Dates', 'Withdraw',            doDate(2026, 09, 16, 00, 00), doDate(2026, 09, 29, 23, 59)],
      [ 'Special Dates', 'Selective Withdrawal',doDate(2026, 09, 30, 00, 00), doDate(2026, 10, 26, 23, 59)],
      [ 'Special Dates', 'Reading Days',        doDate(2026, 12, 08, 00, 00), doDate(2026, 12, 08, 23, 59)],
      [ 'Special Dates', 'Finals Week',         doDate(2026, 12, 09, 00, 00), doDate(2026, 12, 16, 23, 59)],
    // Holidays
      [ 'Holidays', 'Labor Day',                doDate(2026, 09, 07, 00, 00), doDate(2026, 09, 07, 23, 59)],
      [ 'Holidays', 'Fall Break',               doDate(2026, 10, 12, 00, 00), doDate(2026, 10, 12, 23, 59)],
      [ 'Holidays', 'Election Day',             doDate(2026, 11, 03, 00, 00), doDate(2026, 11, 03, 23, 59)],
      [ 'Holidays', 'Thanksgiving Break',       doDate(2026, 11, 25, 00, 00), doDate(2026, 11, 29, 23, 59)],
  ]);

}

// Add calls to recolor to set categories to certain colors.
// Category may be a substring.  (eg. 'Exams' will apply to 'Exams-001', 'Exams-002', etc)
function setColors(dataTable) {
  // Add the optional colors here.  Format: recolor(dataTable, 'category', 'color')
  // Color may be a color (eg. 'blue') or a hexcode (eg. '#0000FF')
  // Lighter colors work better with the internal system that recolors fonts.
  // - There's no direct way to change font color on the bars because of that.
  recolor(dataTable, 'Exams', '0099AA');
}

// Add calls to add a tooltip to events.
// Event can be a substring.  (eg. 'Final' will apply tip to 'Final-001', 'Final-002', etc.)
function addTips(dataTable) {
  // Add the optional tooltips here.  Format: addToolTip(dataTable, 'Event', 'Text', 'Notes')
  // Exams
  addToolTip(dataTable, 'Final', 'Course Final Exam', 'Final Exams are Comprehensive!', 'See the Schedule below for Dates and Times...');
  addToolTip(dataTable, 'Test 1', 'First Unit Test', 'Covers Data Rep, Bitwise, Integers, Floating Point, Processes, Signals, and Unix I/O', 'The Test will be during your normal class time.');
  addToolTip(dataTable, 'Test 2', 'Second Unit Test', 'Covers Assembly Programming', 'The Test will be during your normal class time.');
  // Projects
  addToolTip(dataTable, 'Project 1', 'Pending', 'Topics: Basic C, Control Flow, Functions, Basic I/O, Debugging, Testing');
  addToolTip(dataTable, 'Project 2', 'Pending', 'Topics: I/O, Strings, Pointers, Arrays, Debugging, Testing');
  addToolTip(dataTable, 'Project 3', 'Pending', 'Topics: Structs, Linked Lists, File I/O, Debugging, Testing');
  addToolTip(dataTable, 'Project 4', 'Reverse Engineering', 'Topics: Assembly Programming and Debugging')
  // Quizzes
  addToolTip(dataTable, 'Q', 'In-Class Quiz', 'See the Schedule for Quiz Topics');
  addToolTip(dataTable, '*Q', 'Weekend Quiz (Friday - Sunday)', 'See the Schedule for Quiz Topics');
  // Labs
  addToolTip(dataTable, 'L', 'Weekly Lab (In-Lab Assignment)', 'See the Schedule for Lab Topics', 'Attend during your Scheduled Lab Location and Time');
  addToolTip(dataTable, 'H', 'Weekly Lab Homework', 'See the Schedule for Lab Topics that will be used in this Programming Assignment', 'Practical Application of the Lab Topics');
  // Special Dates
  addToolTip(dataTable, 'Add', 'Course Add Period', 'Add Courses during this Period');
  addToolTip(dataTable, 'Drop (100%)', 'Course Drop Period', 'Drop Courses during this Period for 100% Refund');
  addToolTip(dataTable, 'Drop (50%)', 'Course Drop Period', 'Drop Courses during this Period for 50% Refund');
  addToolTip(dataTable, 'Withdraw', 'Course Unrestricted Withdraw Period', 'Withdraw Courses during this Period (No Refund, W on Transcript)');
  addToolTip(dataTable, 'Selective Withdraw', 'Course Selective Withdraw Period', 'Uses one of your 3 Selective Withdrawals for the Degree.<br>Selectively Withdraw Courses during this Period (No Refund, W on Transcript)');
  addToolTip(dataTable, 'Reading Days', 'Reading Days: Self-Study Time', 'No Work to Prepare for Finals');
  // Holidays
  addToolTip(dataTable, 'Labor Day', 'Labor Day Holiday', 'No Classes on Monday.<br>  (Tuesday - Friday are Normal Classes)');
  addToolTip(dataTable, 'Fall Break', 'Fall Break Holiday', 'No Classes on Monday.<br>  (Tuesday - Friday are Normal Classes)');
  addToolTip(dataTable, 'Spring Break', 'Spring Break Holiday', 'No Classes this Week.<br>  (Monday - Friday are No Classes)');
  addToolTip(dataTable, 'Election Day', 'Election Day Holiday', 'No Classes on Tuesday.<br>  (Monday and Wednesday - Friday are Normal Classes)');
  addToolTip(dataTable, 'Thanksgiving', 'Thanksgiving Holiday', 'No Classes on Wednesday - Sunday.<br>  (Monday and Tuesday are Normal Classes)');
}

function addQuiz(num, year, month, day) {
  var start = doDate(year, month, day,  6, 00);
  var end = doDate(year, month, day, 23, 59);
  end.setDate(end.getDate() + 2);
  return ['Quizzes', 'Q' + num, start, end];
}

function addWeekendQuiz(num, year, month, day) {
  var start = doDate(year, month, day, 18, 00);
  var end = doDate(year, month, day, 23, 59);
  end.setDate(end.getDate() + 2);
  return ['Quizzes', '*Q' + num, start, end];
}

function addLab(dataTable, num, year, month, day, adjustment = 0) {
  var start = doDate(year, month, day,  6, 00);
  var workstart = doDate(year, month, day + 1,  6, 00);
  var labend = doDate(year, month, day + 1, 18, 00);
  var workend = doDate(year, month, day + 5 + adjustment, 18, 00);
  labend.setDate(labend.getDate());
  workend.setDate(workend.getDate());
  dataTable.addRows([
      ['Labs', 'L' + num, start, labend],
      ['Assignment', 'H' + num + ' Assignment', workstart, workend]
  ]);
  return;
}
