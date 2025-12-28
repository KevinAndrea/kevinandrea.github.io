function cs367_addAssignments(otherData) {
  otherData.addRows([
// Start of Semester
    ['start', 'Welcome Back!', 'sem', new Date(2022, 00, 24), new Date(2022, 00, 24), null, 100, null],
// Quizzes
    ['q1', 'Quiz 1',        'quizzes',  new Date(2022, 01, 01),   new Date(2022, 01, 03),   null, 100,  null],
    ['q2', 'Quiz 2',        'quizzes',  new Date(2022, 01, 08),   new Date(2022, 01, 10),   null, 100,  null],
    ['q3', 'Quiz 2',        'quizzes',  new Date(2022, 01, 08),   new Date(2022, 01, 10),   null, 100,  null],
    ['q4', 'Quiz 2',        'quizzes',  new Date(2022, 01, 08),   new Date(2022, 01, 10),   null, 100,  null],
    ['q5', 'Quiz 2',        'quizzes',  new Date(2022, 01, 08),   new Date(2022, 01, 10),   null, 100,  null],
    ['q6', 'Quiz 2',        'quizzes',  new Date(2022, 01, 08),   new Date(2022, 01, 10),   null, 100,  null],
    ['q7', 'Quiz 2',        'quizzes',  new Date(2022, 01, 08),   new Date(2022, 01, 10),   null, 100,  null],
    ['q8', 'Quiz 2',        'quizzes',  new Date(2022, 01, 08),   new Date(2022, 01, 10),   null, 100,  null],
// Projects
//    ['p1', 'Project 1',     'projects', new Date(2021, 00, 26),   new Date(2021, 01, 12),   null, 100,  null],
// End of Semester
    ['eos', 'Finals Week',  'finals',   new Date(2022, 04, 11),   new Date(2022, 04, 17),   null, 100,  null]
  ]);

  return otherData;
}


function cs367_addAssignmentMarkers(chart, dateRangeStart, dateRangeEnd, options) {
  var container = document.getElementById('cs367_assignments');
  google.visualization.events.addListener(chart, 'ready', function () {
      var today = new Date();
      addMarker('Quiz 1',         new Date(2022, 01, 01), 'Q1',             dateRangeStart, dateRangeEnd, container);
      
//      addMarker('Week 1', new Date(2021, 0, 6), null, dateRangeStart, dateRangeEnd, container);
      addTimebar(today, dateRangeStart, dateRangeEnd, options, container);
  });
}
