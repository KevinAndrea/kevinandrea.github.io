// Make you edits in this file for the following:
// 1) initializeTime to set start and end times
// 2) addRows to add the events
// 3) setColors (optional) to change the category color manually
// 4) addTips (optional) to set event-level tooltips

// Sets up the Start and End times
function initializeTime() {
  parameters.set('startTime', doDate(2025,8,25,0,0));
  parameters.set('endTime',   doDate(2025,12,20,23,59));
}

// Add in each event in the timeline
function addRows(dataTable) {
  // Add the events here.  Format:  [ 'Category', 'Event', startDate, endDate ],
  dataTable.addRows([
    // Time Bar - do not edit this entry
    [ 'Time', parameters.get('timeText'), parameters.get('barTime'), parameters.get('barTime')],
//  [ 'Summer', 'Fall Semester', parameters.get('startTime'), parameters.get('endTime')],
    // Exams
    [ 'Exams', 'Test 1', doDate(2025,10,21,16,30),   doDate(2025,10,21,17,45)],
    [ 'Exams', 'Test 2', doDate(2025,11,18,16,30),   doDate(2025,11,18,17,45)],
    [ 'Exams', 'Final', doDate(2025,12,16,16,30),   doDate(2025,12,16,19,15)],
    // Projects
    [ 'Projects', 'Project 1', doDate(2025, 9,22,10,00), doDate(2025,10,10,23,59)],
    [ 'Projects', 'Project 2', doDate(2025,10,13,18,00), doDate(2025,10,31,23,59)],
    [ 'Projects', 'Project 3', doDate(2025,11, 3,18,00), doDate(2025,12, 5,23,59)],
    // Homeworks
    addHW( 1, 2025,  9,  1),
    addHW( 2, 2025,  9,  8),
    addHW( 3, 2025,  9, 15),
    addHW( 4, 2025,  9, 22),
    addHW( 5, 2025,  9, 29),
    addHW( 6, 2025, 10,  6),
    addHW( 7, 2025, 10, 13),
    addHW( 8, 2025, 10, 20),
    addHW( 9, 2025, 10, 27),
    addHW(10, 2025, 11,  3),
    addHW(11, 2025, 11, 10),
    addHW(12, 2025, 11, 17),
    addHW(13, 2025, 11, 24),
    addHW(14, 2025, 12,  1),
    // Special Dates 
      [ 'Special Dates',  'Add',          doDate(2025, 8,25, 0, 0), doDate(2025, 9, 2,23,59) ],
      [ 'Special Dates',  'Drop (100%)',  doDate(2025, 9, 3, 0, 0), doDate(2025, 9, 8,23,59) ],
      [ 'Special Dates',  'Drop (50%)',   doDate(2025, 9, 9, 0, 0), doDate(2025, 9,16,23,59) ],
      [ 'Special Dates',  'Withdraw',     doDate(2025, 9,17, 0, 0), doDate(2025, 9,30,23,59) ],
      [ 'Special Dates',  'Reading Days', doDate(2025,12, 9, 0, 0), doDate(2025,12, 9,23,59) ],
      [ 'Special Dates',  'Finals Week',  doDate(2025,12,10, 0, 0), doDate(2025,12,17,23,59) ],
    // Holidays
      [ 'Holidays', 'Labor Day',          doDate(2025, 9, 1, 0, 0), doDate(2025, 9, 1,23,59) ],
      [ 'Holidays', 'Fall Break',         doDate(2025,10,13, 0, 0), doDate(2025,10,13,23,59) ],
      [ 'Holidays', 'Election Day',       doDate(2025,11, 4, 0, 0), doDate(2025,11, 4,23,59) ],
      [ 'Holidays', 'Thanksgiving',       doDate(2025,11,26, 0, 0), doDate(2025,11,30,23,59) ],
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
  addToolTip(dataTable, 'Test 1', 'First Unit Test', 'Covers OS Concepts, Processes, Threads, Signals, IO, Synchroniztion', 'The Test will be during your normal class time.');
  addToolTip(dataTable, 'Test 2', 'Second Unit Test', 'CPU Scheduling and Memory Management', 'The Test will be during your normal class time.');
  // Projects
  addToolTip(dataTable, 'Project 1', 'TBD', 'Topics: Basic C, Debugging, Testing');
  addToolTip(dataTable, 'Project 2', 'TBD', 'Topics: Function Design, Debugging, Testing');
  addToolTip(dataTable, 'Project 3', 'TBD', 'Topics: Program Design, Structured Data, Debugging, Testing');
  // Homeworks
  addToolTip(dataTable, 'H', 'Weekly Homework (Monday - Friday)', 'See the Schedule for Homework Topics');
  addToolTip(dataTable, '*Q', 'Weekend Homework (Friday - Sunday)', 'See the Schedule for Homework Topics');
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

function addHW(num, year, month, day) {
  var start = doDate(year, month, day,  6, 00);
  var end = doDate(year, month, day, 23, 59);
  end.setDate(end.getDate() + 4);
  return ['Homeworks', 'H' + num, start, end];
}
