// Make you edits in this file for the following:
// 1) initializeTime to set start and end times
// 2) addRows to add the events
// 3) setColors (optional) to change the category color manually
// 4) addTips (optional) to set event-level tooltips

// Sets up the Start and End times
function initializeTime() {
  parameters.set('startTime', doDate(2024,8,26,0,0));
  parameters.set('endTime',   doDate(2024,12,20,23,59));
}

// Add in each event in the timeline
function addRows(dataTable) {
  // Add the events here.  Format:  [ 'Category', 'Event', startDate, endDate ],
  dataTable.addRows([
    // Time Bar - do not edit this entry
    [ 'Time', parameters.get('timeText'), parameters.get('barTime'), parameters.get('barTime')],
//  [ 'Summer', 'Fall Semester', parameters.get('startTime'), parameters.get('endTime')],
    // Exams
    [ 'Exams', 'Test 1', doDate(2024,10,8,9,00),   doDate(2024,10,8,16,15)],
    [ 'Exams', 'Test 2', doDate(2024,11,12,9,00),   doDate(2024,11,12,16,15)],
    [ 'Exams', 'Finals Week', doDate(2024,12,11,0,00),   doDate(2024,12,18,23,59)],
    // Projects
    [ 'Projects', 'Project 1', doDate(2024, 8,29,18,00), doDate(2024, 9,13,23,59)],
    [ 'Projects', 'Project 2', doDate(2024, 9,19,19,00), doDate(2024,10,11,23,59)],
    [ 'Projects', 'Project 3', doDate(2024,10,17,18,00), doDate(2024,11,15,23,59)],
    [ 'Projects', 'Project 4', doDate(2024,11,19,18,00), doDate(2024,12, 6,23,59)],
    // Quizzes
    addQuiz( 1, 2024,  9,  3),
    addQuiz( 2, 2024,  9, 10),
    addQuiz( 3, 2024,  9, 17),
    addQuiz( 4, 2024,  9, 24),
    addQuiz( 5, 2024, 10,  1),
    addWeekendQuiz( 6, 2024, 10,  4),
    addQuiz( 7, 2024, 10, 15),
    addQuiz( 8, 2024, 10, 22),
    addQuiz( 9, 2024, 10, 29),
    addQuiz(10, 2024, 11,  5),
    addWeekendQuiz(11, 2024, 11,  8),
    addQuiz(12, 2024, 11, 19),
    addQuiz(14, 2024, 12,  3),
    addWeekendQuiz(15, 2024, 12,  6),
    // Recitations
    addRecitation( 1, 2024,  8, 30),
    addRecitation( 2, 2024,  9,  6),
    addRecitation( 3, 2024,  9, 13),
    addRecitation( 4, 2024,  9, 20),
    addRecitation( 5, 2024,  9, 27),
    addRecitation( 6, 2024, 10,  4),
    addRecitation( 7, 2024, 10, 11),
    addRecitation( 8, 2024, 10, 18),
    addRecitation( 9, 2024, 10, 25),
    addRecitation(10, 2024, 11,  1),
    addRecitation(11, 2024, 11,  8),
    addRecitation(12, 2024, 11, 15),
    addRecitation(13, 2024, 11, 22),
    addRecitation(14, 2024, 12,  6),
    // Special Dates 
      [ 'Special Dates',  'Add',          doDate(2024, 8,26, 0, 0), doDate(2024, 9, 3,23,59) ],
      [ 'Special Dates',  'Drop (100%)',  doDate(2024, 9, 4, 0, 0), doDate(2024, 9, 9,23,59) ],
      [ 'Special Dates',  'Drop (50%)',   doDate(2024, 9,10, 0, 0), doDate(2024, 9,17,23,59) ],
      [ 'Special Dates',  'Withdraw',     doDate(2024, 9,18, 0, 0), doDate(2024,10, 1,23,59) ],
      [ 'Special Dates',  'Selective Withdrawal', doDate(2024,10, 2,0,0), doDate(2024,10,28,23,59) ],
      [ 'Special Dates',  'Reading Days', doDate(2024,12,10, 0, 0), doDate(2024,12,10,23,59) ],
      [ 'Special Dates',  'Finals Week',  doDate(2024,12,11, 0, 0), doDate(2024,12,18,23,59) ],
    // Holidays
      [ 'Holidays', 'Labor Day',          doDate(2024, 9, 2, 0, 0), doDate(2024, 9, 2,23,59) ],
      [ 'Holidays', 'Fall Break',         doDate(2024,10,14, 0, 0), doDate(2024,10,14,23,59) ],
      [ 'Holidays', 'Election Day',       doDate(2024,11, 5, 0, 0), doDate(2024,11, 5,23,59) ],
      [ 'Holidays', 'Thanksgiving',       doDate(2024,11,27, 0, 0), doDate(2024,12, 1,23,59) ],
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
  addToolTip(dataTable, 'Final', 'Course Final Exam', 'Final Exams are Comprehensive!', 'Pending Dates and Times...');
  addToolTip(dataTable, 'Test 1', 'First Unit Test', 'Covers Data Rep, Bitwise, Integers, Floating Point, Processes, Signals, and Unix I/O', 'The Test will be during your normal class time.');
  addToolTip(dataTable, 'Test 2', 'Second Unit Test', 'Covers Assembly Programming', 'The Test will be during your normal class time.');
  // Projects
  addToolTip(dataTable, 'Project 1', 'StrawHat Scheduler', 'Topics: Basic C, Linked Lists, Structured Data, Bit Masking, Debugging, Testing');
  addToolTip(dataTable, 'Project 2', 'Floating Point Calculator', 'Topics: Function Design, Floating Point, Bit Masking, Debugging, Testing');
  addToolTip(dataTable, 'Project 3', 'Task Manager', 'Topics: Program Design, Structured Data, Processes, Signals, Unix I/O, Debugging, Testing');
  addToolTip;(dataTable, 'Project 4', 'Reverse Engineering', 'Topics: Assembly Programming and Debugging')
  // Quizzes
  addToolTip(dataTable, 'Q', 'Weekly Quiz (Tuesday - Thursday)', 'See the Schedule for Quiz Topics');
  addToolTip(dataTable, '*Q', 'Weekend Quiz (Friday - Sunday)', 'See the Schedule for Quiz Topics');
  // Recitations
  addToolTip(dataTable, 'R', 'Weekly Recitation (Fridays)', 'See the Schedule for Recitation Topics', 'Attend during your Scheduled Recitation Location and Time');
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

function addRecitation(num, year, month, day) {
  var start = doDate(year, month, day,  6, 00);
  var end = doDate(year, month, day, 18, 00);
  end.setDate(end.getDate());
  return ['Recitations', 'R' + num, start, end];
}
