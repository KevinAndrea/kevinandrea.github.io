// Make you edits in this file for the following:
// 1) initializeTime to set start and end times
// 2) addRows to add the events
// 3) setColors (optional) to change the category color manually
// 4) addTips (optional) to set event-level tooltips

// Sets up the Start and End times
function initializeTime() {
  parameters.set('startTime', doDate(2025,1,20,0,0));
  parameters.set('endTime',   doDate(2025,5,16,23,59));
}

// Add in each event in the timeline
function addRows(dataTable) {
  // Add the events here.  Format:  [ 'Category', 'Event', startDate, endDate ],
  dataTable.addRows([
    // Time Bar - do not edit this entry
    [ 'Time', parameters.get('timeText'), parameters.get('barTime'), parameters.get('barTime')],
//  [ 'Summer', 'Fall Semester', parameters.get('startTime'), parameters.get('endTime')],
    // Projects
    [ 'Projects', 'PA0', doDate(2025, 1, 28,10,00), doDate(2025, 2,11,23,59)],
    [ 'Projects', 'PA1-Part1', doDate(2025,2,24,17,00), doDate(2025,3,7,23,59)],
    [ 'Projects', 'PA1-Part2', doDate(2025,2,24,17,00), doDate(2025,3,28,23,59)],
    [ 'Projects', 'PA2-Part1', doDate(2025,4,1,10,00), doDate(2025,4,11,23,59)],
    [ 'Projects', 'PA2-Part2', doDate(2025,4,1,10,00), doDate(2025,5,5,23,59)],
    //
    [ 'Modules', 'M1', doDate(2025, 1, 22, 09,00), doDate(2025, 1, 22, 13,30)],
    [ 'Modules', 'M2', doDate(2025, 1, 27, 09,00), doDate(2025, 1, 29, 13,30)],
    [ 'Modules', 'M3', doDate(2025, 2,  3, 09,00), doDate(2025, 2, 10, 13,30)],
    [ 'Modules', 'M4', doDate(2025, 2, 12, 09,00), doDate(2025, 2, 24, 13,30)],
    [ 'Modules', 'M5', doDate(2025, 2, 26, 09,00), doDate(2025, 3, 24, 13,30)],
    [ 'Modules', 'M6', doDate(2025, 3, 26, 09,00), doDate(2025, 4,  2, 13,30)],
    [ 'Modules', 'M7', doDate(2025, 4,  7, 09,00), doDate(2025, 4, 21, 13,30)],
    [ 'Modules', 'M8', doDate(2025, 4, 23, 09,00), doDate(2025, 4, 28, 13,30)],
    [ 'Modules', 'M9', doDate(2025, 4, 30, 09,00), doDate(2025, 5,  5, 13,30)],
    // Homeworks
    addHW2( '1 (M2)', 2025,  1, 29),
    addHW( '2 (M3)', 2025,  2, 10, 0),
    [ 'Homeworks', '*H3 (M4)', doDate(2025, 2, 24, 14,0), doDate(2025, 3, 1, 23, 59)],
//    addHW( '3 (M4)', 2025,  2, 24, 0),
//    addHW( '4 (M5)', 2025,  3, 24, 0),
    [ 'Homeworks', 'H4 (M5)', doDate(2025, 3, 24, 15,0), doDate(2025, 4,  2, 23, 59)],
    [ 'Homeworks', 'H5 (M6)', doDate(2025, 4,  2, 17,0), doDate(2025, 4, 12, 23, 59)],
//    addHW2( '5 (M6)', 2025,  4,  2),
    addHW( '6 (M7)', 2025,  4, 21, 0),
    addHW( '7 (M8+9)', 2025,  4, 28, 1),
    // Exams
    [ 'Exams: Section 005', 'Test 1 (005)', doDate(2025,3,5,9,00),   doDate(2025,3,5,10,15)],
    [ 'Exams: Section 008', 'Test 1 (008)', doDate(2025,3,5,12,00),   doDate(2025,3,5,13,15)],
    [ 'Exams: Section 005', 'Test 2 (005)', doDate(2025,4,16,9,00),   doDate(2025,4,16,10,15)],
    [ 'Exams: Section 008', 'Test 2 (008)', doDate(2025,4,16,12,00),   doDate(2025,4,16,13,15)],
    [ 'Exams: Section 005', 'Final (005)', doDate(2025,5,12,7,30),   doDate(2025,5,12,10,15)],
    [ 'Exams: Section 008', 'Final (008)', doDate(2025,5,12,10,30),   doDate(2025,5,12,13,15)],
    // Special Dates 
      [ 'Special Dates',  'Add',          doDate(2025, 1,21, 0, 0), doDate(2025, 1,28,23,59) ],
      [ 'Special Dates',  'Drop (100%)',  doDate(2025, 1,29, 0, 0), doDate(2025, 2, 4,23,59) ],
      [ 'Special Dates',  'Drop (50%)',   doDate(2025, 2, 5, 0, 0), doDate(2025, 2,11,23,59) ],
      [ 'Special Dates',  'Withdraw',     doDate(2025, 2,12, 0, 0), doDate(2025, 2,25,23,59) ],
      [ 'Special Dates',  'Selective Withdrawal',     doDate(2025, 2,26, 0, 0), doDate(2025, 3,31,23,59) ],
      [ 'Special Dates',  'Reading Days', doDate(2025, 5, 6, 0, 0), doDate(2025, 5, 6,23,59) ],
      [ 'Special Dates',  'Finals Week',  doDate(2025, 5, 7, 0, 0), doDate(2025, 5,14,23,59) ],
    // Holidays
      [ 'Holidays', 'Spring Break',       doDate(2025, 3,10, 0, 0), doDate(2025, 3,16,23,59) ],
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

function addHW(num, year, month, day, offset) {
  var start = doDate(year, month, day, 15, 00);
  var end = doDate(year, month, day, 23, 59);
  end.setDate(end.getDate() + 6 + offset);
  return ['Homeworks', 'H' + num, start, end];
}

function addHWNG(num, year, month, day) {
  var start = doDate(year, month, day, 15, 00);
  var end = doDate(year, month, day, 23, 59);
  end.setDate(end.getDate() + 7);
  return ['Homeworks', '*H' + num, start, end];
}

function addHW2(num, year, month, day) {
  var start = doDate(year, month, day, 15, 00);
  var end = doDate(year, month, day, 23, 59);
  end.setDate(end.getDate() + 11);
  return ['Homeworks', 'H' + num, start, end];
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
