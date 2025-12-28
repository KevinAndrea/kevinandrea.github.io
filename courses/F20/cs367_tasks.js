function cs367_addTasks(otherData) {
  otherData.addRows([
// Quizzes
    ['q1', 'Quiz 1',    'quizzes',  new Date(2022, 7, 7),   new Date(2022, 7, 9),   null, 100,  null],
    ['q2', 'Quiz 2',    'quizzes',  new Date(2022, 7, 14),  new Date(2022, 7, 16),  null, 14,   null],
    ['q3', 'Quiz 3',    'quizzes',  new Date(2022, 7, 21),  new Date(2022, 7, 23),  null, 0,    null],
// Projects
    ['p1', 'Project 1', 'projects', new Date(2022, 7, 10),  new Date(2022, 7, 18),  null, 23,   null],
// Weekly Prep
    ['w1', 'Week 1',    'week',     new Date(2022, 7, 1),   new Date(2022, 7, 7),   null, 95,   null],
    ['w2', 'Week 2',    'week',     new Date(2022, 7, 7),   new Date(2022, 7, 14),  null, 15,   null],
    ['w3', 'Week 3',    'week',     new Date(2022, 7, 14),  new Date(2022, 7, 21),  null, 0,    null],
// End of Semester
    ['test', 'Testing', 'developer',new Date(2022, 12, 1),   new Date(2022, 12, 10),  null, 20,   null]
  ]);

  return otherData;
}

function cs367_addTaskMarkers(chart, dateRangeStart, dateRangeEnd, options) {
  google.visualization.events.addListener(chart, 'ready', function () {
      var today = new Date();
      addMarker('Week 1', new Date(2022, 7, 10), '4', dateRangeStart, dateRangeEnd);
      addMarker('Week 1', new Date(2021, 7, 12), null, dateRangeStart, dateRangeEnd);
      addTimebar(today, dateRangeStart, dateRangeEnd, options);
  });
}
