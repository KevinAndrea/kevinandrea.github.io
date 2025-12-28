function cs367_addAssignments(otherData) {
  otherData.addRows([
// Term Start
    ['ts', 'Semester Prep', 'start',    new Date(),               new Date(2021, 00, 24),   null, 100,  null],  
    ['w1', 'Week 1 Prep',   'week',     new Date(2021, 00, 23),   new Date(2021, 00, 24),   null, 100,  null],
// Quizzes
    ['q1', 'Quiz 1',        'quizzes',  new Date(2021, 01, 02),   new Date(2021, 01, 04),   null, 100,  null],
    ['q2', 'Quiz 2',        'quizzes',  new Date(2021, 01, 09),   new Date(2021, 01, 11),   null, 100,  null],
    ['q3', 'Quiz 3',        'quizzes',  new Date(2021, 01, 16),   new Date(2021, 01, 18),   null, 100,  null],
// Projects
    ['p1', 'Project 1',     'projects', new Date(2021, 00, 26),   new Date(2021, 01, 12),   null, 100,  null],
// End of Semester
    ['eos', 'Finals Week',  'finals',   new Date(2021, 04, 03),   new Date(2021, 04, 10),   null, 100,  null]
  ]);

  return otherData;
}


function cs367_addAssignmentMarkers(chart, dateRangeStart, dateRangeEnd, options) {
  var container = document.getElementById('cs367_assignments');
  google.visualization.events.addListener(chart, 'ready', function () {
      var today = new Date();
      addMarker('Semester Prep',  new Date(),             'Sem Prep',       dateRangeStart, dateRangeEnd, container);
      addMarker('Week 1 Prep',    new Date(2021, 00, 23), 'W1: Prep',       dateRangeStart, dateRangeEnd, container);
      addMarker('Project 1',      new Date(2021, 00, 26), 'P1',             dateRangeStart, dateRangeEnd, container);
      addMarker('Project 1',      new Date(2021, 00, 28), ':Read',          dateRangeStart, dateRangeEnd, container);
      addMarker('Project 1',      new Date(2021, 01, 03), ':Linked Lists',  dateRangeStart, dateRangeEnd, container);
      addMarker('Project 1',      new Date(2021, 01, 10), ':Testing',       dateRangeStart, dateRangeEnd, container);
      addMarker('Quiz 1',         new Date(2021, 01, 02), 'Q1',             dateRangeStart, dateRangeEnd, container);
      addMarker('Quiz 2',         new Date(2021, 01, 09), 'Q2',             dateRangeStart, dateRangeEnd, container);
      addMarker('Quiz 3',         new Date(2021, 01, 16), 'Q3',             dateRangeStart, dateRangeEnd, container);
      
//      addMarker('Week 1', new Date(2021, 0, 6), null, dateRangeStart, dateRangeEnd, container);
      addTimebar(today, dateRangeStart, dateRangeEnd, options, container);
  });
}
