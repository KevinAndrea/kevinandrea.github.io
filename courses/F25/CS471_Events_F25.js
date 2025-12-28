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
    // Projects
    [ 'Projects', 'PA0',       doDate(2025,  8, 29, 12,00), doDate(2025,  9, 12, 23,59)],
    [ 'Projects', 'PA1-Part1', doDate(2025,  9, 30, 17,00), doDate(2025, 10, 14, 23,59)],
    [ 'Projects', 'PA1-Part2', doDate(2025,  9, 30, 17,00), doDate(2025, 10, 31, 23,59)],
    [ 'Projects', 'PA2-Part1', doDate(2025, 11,  6, 16,00), doDate(2025, 11, 14, 23,59)],
    [ 'Projects', 'PA2-Part2', doDate(2025, 11,  6, 16,00), doDate(2025, 12,  5, 23,59)],
    //
    [ 'Modules', 'M1', doDate(2025,  8, 25, 15,00), doDate(2025,  8, 25, 16,15)],
    [ 'Modules', 'M2', doDate(2025,  8, 27, 15,00), doDate(2025,  9,  3, 16,15)],
    [ 'Modules', 'M3', doDate(2025,  9,  8, 15,00), doDate(2025,  9, 17, 16,15)],
    [ 'Modules', 'M4', doDate(2025,  9, 22, 15,00), doDate(2025, 10,  6, 16,15)],
    [ 'Modules', 'M5', doDate(2025, 10,  8, 15,00), doDate(2025, 10, 27, 16,15)],
    [ 'Modules', 'M6', doDate(2025, 10, 29, 15,00), doDate(2025, 11, 10, 16,15)],
    [ 'Modules', 'M7', doDate(2025, 11, 12, 15,00), doDate(2025, 11, 24, 15,45)],
    [ 'Modules', 'M8', doDate(2025, 11, 24, 15,45), doDate(2025, 12,  3, 15,45)],
    [ 'Modules', 'M9', doDate(2025, 12,  3, 15,45), doDate(2025, 12,  8, 16,15)],
    // Homeworks
    addHW_Wed( '1 (M2)', 2025,  9,  3, 4),
    addHW_Wed( '2 (M3)', 2025,  9, 17),
    addHW_Wed( '3 (M4)', 2025, 10,  7),
    addHW_Wed( '4 (M5)', 2025, 10, 29 ),
    addHW_Wed( '5 (M6)', 2025, 11,  5, 1),
    addHW_Wed( '6 (M7)', 2025, 12, 2, -3),
    [ 'Homeworks', '*H7 (M8+M9)', doDate(2025, 12, 8, 15,00), doDate(2025, 12, 12, 23, 59)],
    // Exams
    [ 'Exams', 'Test 1', doDate(2025, 10, 20, 15,00),   doDate(2025, 10, 20, 16,15)],
    [ 'Exams', 'Test 2', doDate(2025, 11, 19, 15,00),   doDate(2025, 11, 19, 16,15)],
    [ 'Exams', 'Final',  doDate(2025, 12, 15, 13,30),   doDate(2025, 12, 15, 16,15)],
    // Special Dates 
      [ 'Special Dates',  'Add',          doDate(2025, 8,25, 0, 0), doDate(2025, 9, 2,23,59) ],
      [ 'Special Dates',  'Drop (100%)',  doDate(2025, 9, 3, 0, 0), doDate(2025, 9, 8,23,59) ],
      [ 'Special Dates',  'Drop (50%)',   doDate(2025, 9, 9, 0, 0), doDate(2025, 9,16,23,59) ],
      [ 'Special Dates',  'Withdraw',     doDate(2025, 9,17, 0, 0), doDate(2025, 9,30,23,59) ],
      [ 'Special Dates',  'Selective Withdrawal', doDate(2025,10, 1,0,0), doDate(2025,10,27,23,59) ],
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
  addToolTip(dataTable, 'Project 1', 'StrawHat Scheduler', 'Topics: Basic C, Linked Lists, Structured Data, Bit Masking, Debugging, Testing');
  addToolTip(dataTable, 'Project 2', 'Floating Point Calculator', 'Topics: Function Design, Floating Point, Bit Masking, Debugging, Testing');
  addToolTip(dataTable, 'Project 3', 'Task Manager', 'Topics: Program Design, Structured Data, Processes, Signals, Unix I/O, Debugging, Testing');
  addToolTip;(dataTable, 'Project 4', 'Reverse Engineering', 'Topics: Assembly Programming and Debugging')
  // Homeworks
  addToolTip(dataTable, 'H', 'Weekly Homework (Due Sundays)', 'See the Schedule for Homework Topics');
  // Modules
  addToolTip(dataTable, 'M1', 'Module 1: Course Overview', 'See the Schedule for Detailed Topics');
  addToolTip(dataTable, 'M2', 'Module 2: OS Components/Syscalls', 'See the Schedule for Detailed Topics');
  addToolTip(dataTable, 'M3', 'Module 3: Processes/IPC', 'See the Schedule for Detailed Topics');
  addToolTip(dataTable, 'M4', 'Module 4: Synchronization', 'See the Schedule for Detailed Topics');
  addToolTip(dataTable, 'M5', 'Module 5: CPU Scheduling', 'See the Schedule for Detailed Topics');
  addToolTip(dataTable, 'M6', 'Module 6: Memory Management', 'See the Schedule for Detailed Topics');
  addToolTip(dataTable, 'M7', 'Module 7: Virtual Memory', 'See the Schedule for Detailed Topics');
  addToolTip(dataTable, 'M8', 'Module 8: File Systems', 'See the Schedule for Detailed Topics');
  addToolTip(dataTable, 'M9', 'Module 9: Security', 'See the Schedule for Detailed Topics');
  addToolTip(dataTable, 'M8+9', 'Modules 8-9: File Systems and Security', 'See the Schedule for Detailed Topics');
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

function addHW_Mon(num, year, month, day, offset) {
  var start = doDate(year, month, day, 15, 00);
  var end = doDate(year, month, day, 23, 59);
  end.setDate(end.getDate() + 6 + offset);
  return ['Homeworks', 'H' + num, start, end];
}

function addHW_Wed(num, year, month, day, offset = 0) {
  var start = doDate(year, month, day, 15, 00);
  var end = doDate(year, month, day, 23, 59);
  end.setDate(end.getDate() + 9 + offset);
  return ['Homeworks', 'H' + num, start, end];
}


function addHWNG(num, year, month, day) {
  var start = doDate(year, month, day, 15, 00);
  var end = doDate(year, month, day, 23, 59);
  end.setDate(end.getDate() + 7);
  return ['Homeworks', '*H' + num, start, end];
}

function addWeekendHomework(num, year, month, day) {
  var start = doDate(year, month, day, 18, 00);
  var end = doDate(year, month, day, 23, 59);
  end.setDate(end.getDate() + 2);
  return ['Homeworks', '*H' + num, start, end];
}

function addRecitation(num, year, month, day) {
  var start = doDate(year, month, day,  6, 00);
  var end = doDate(year, month, day, 18, 00);
  end.setDate(end.getDate());
  return ['Recitations', 'R' + num, start, end];
}
