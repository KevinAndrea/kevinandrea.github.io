function cs367_addTasks(otherData) {
  otherData.addRows([
// Term Start
    ['ts', 'Semester Prep',     'start',    new Date(),               new Date(2021, 00, 24), null, 100,  null],  
// Weekly Content
    ['w1', 'Week 1 Prep',       'week',     new Date(2021, 00, 23),   new Date(2021, 00, 24), null, 030,  null],
    ['w2', 'Week 2 Prep',       'week',     new Date(2021, 00, 30),   new Date(2021, 00, 31), null, 000,  null],
    ['w3', 'Week 3 Prep',       'week',     new Date(2021, 01, 06),   new Date(2021, 01, 07), null, 000,  null],
// Projects
    ['p1', 'Project 1 Grading', 'projects', new Date(2021, 01, 12),   new Date(2021, 01, 19), null, 000,  null],
// End of Semester
    ['eos', 'Finals Week',  'finals',       new Date(2021, 04, 03),   new Date(2021, 04, 10), null, 100,  null]
  ]);
  return otherData;
}


function cs367_addTaskMarkers(chart, dateRangeStart, dateRangeEnd, options) {
  var container = document.getElementById('cs367_tasks');
  google.visualization.events.addListener(chart, 'ready', function () {
      var today = new Date();
      console.log(container);
      addMarker('Semester Prep',      new Date(),             'Sem Prep',     dateRangeStart, dateRangeEnd, container);
      addMarker('Project 1 Grading',  new Date(2021, 1, 12),  'P1: Grading',  dateRangeStart, dateRangeEnd, container);
      addMarker('Week 1 Prep',        new Date(2021, 0, 23),  'W1: Prep',     dateRangeStart, dateRangeEnd, container);
      addMarker('Week 2 Prep',        new Date(2021, 0, 30),  'W2: Prep',     dateRangeStart, dateRangeEnd, container);
      addMarker('Week 3 Prep',        new Date(2021, 1, 06),  'W3: Prep',     dateRangeStart, dateRangeEnd, container);
      addTimebar(today, dateRangeStart, dateRangeEnd, options, container);
  });
}
