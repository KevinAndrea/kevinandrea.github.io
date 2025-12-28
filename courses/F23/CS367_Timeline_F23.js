  google.charts.load("current", {packages:["timeline"]});
  google.charts.setOnLoadCallback(drawChart);
  
  function ExtendCurrent(div, isInline){
    var len = 0;
    $('#'+div+' rect').each(function(index) {
      yVal = parseFloat($(this).attr('y'));
      xVal = parseFloat($(this).attr('x'));
      if ( xVal == 0 && yVal == 0 ) { len = parseFloat($(this).attr('height')) };
    });

    $('#'+div+' text:contains("TIME")').css('font-size','11px').attr('fill','#A6373C').prev('rect').attr('height',len+'px').attr('width','3px').attr('y','0').attr('fill','#AA0000');

    if (isInline != -1) {
      if ( 0 == isInline )
        $('.google-visualization-tooltip').css('display','none');
      else
        $('.google-visualization-tooltip').css('display','inline');
    }
  }

  function drawChart() {
    var container = document.getElementById('timeline');
    var chart = new google.visualization.Timeline(container);
    var dataTable = new google.visualization.DataTable();
    dataTable.addColumn({ type: 'string', id: 'Type' });
    dataTable.addColumn({ type: 'string', id: 'Name' });
//    dataTable.addColumn({ type: 'string', role: 'tooltip' });
    dataTable.addColumn({ type: 'date', id: 'Start' });
    dataTable.addColumn({ type: 'date', id: 'End' });
    timenow = new Date();
    starttime = new Date(2023,7,21,6,0);
    endtime = new Date(2023,11,15,23,59);
    if(timenow < starttime) {
      displaytime = starttime;
      timelabel = "TIME - Beginning of Semester: "
    }
    else if(timenow > endtime) {
      displaytime = endtime;
      timelabel = "TIME - End of Semester: "
    }
    else {
      displaytime = timenow;
      timelabel = "TIME - NOW: "
    }
    dataTable.addRows([
      [ 'Time', timelabel + '[' + displaytime + ']', displaytime, displaytime],
//      [ 'CS 367',  'CS 367',              new Date(2023,7,21,0,0),    new Date(2023,11,15,23,59) ],
      [ 'Exams-001', 'Final-001',         new Date(2023,11,7,7,30),   new Date(2023,11,7,10,10) ],
      [ 'Exams-003', 'Final-003',         new Date(2023,11,11,7,30),  new Date(2023,11,11,10,10) ],
      [ 'Exams-004', 'Final-004',         new Date(2023,11,7,10,30),  new Date(2023,11,7,13,10) ],
      [ 'Exams-005', 'Final-005',         new Date(2023,11,8,10,30),  new Date(2023,11,8,13,10) ],
      [ 'Exams-001', 'Midterm-001',       new Date(2023,9,19,9,0),    new Date(2023,9,19,10,15) ],
      [ 'Exams-003', 'Midterm-003',       new Date(2023,9,18,9,0),    new Date(2023,9,18,10,15) ],
      [ 'Exams-004', 'Midterm-004',       new Date(2023,9,19,12,00),  new Date(2023,9,19,13,15) ],
      [ 'Exams-005', 'Midterm-005',       new Date(2023,9,20,10,30),  new Date(2023,9,20,11,45) ],
      [ 'Projects', 'Project 1',          new Date(2023,7,25,18,0),   new Date(2023,8,8,23,59) ],
      [ 'Projects', 'Project 2',          new Date(2023,8,15,19,0),   new Date(2023,9,6,23,59) ],
      [ 'Projects', 'Project 3',          new Date(2023,9,10,18,0),   new Date(2023,10,10,23,59) ],
      [ 'Projects', 'Project 4',          new Date(2023,10,14,18,0),  new Date(2023,11,1,23,59) ],
      [ 'Quizzes',  '1',                  new Date(2023,7,29,6,0),    new Date(2023,7,31,23,59) ],
      [ 'Quizzes',  '2',                  new Date(2023,8,5,6,0),     new Date(2023,8,7,23,59) ],
      [ 'Quizzes',  '3',                  new Date(2023,8,12,6,0),    new Date(2023,8,14,23,59) ],
      [ 'Quizzes',  '4',                  new Date(2023,8,19,6,0),    new Date(2023,8,21,23,59) ],
      [ 'Quizzes',  '5',                  new Date(2023,8,26,6,0),    new Date(2023,8,28,23,59) ],
      [ 'Quizzes',  '6',                  new Date(2023,9,3,6,0),     new Date(2023,9,5,23,59) ],
      [ 'Quizzes',  '7',                  new Date(2023,9,10,6,0),    new Date(2023,9,12,23,59) ],
      [ 'Quizzes',  '8',                  new Date(2023,9,13,18,0),   new Date(2023,9,14,23,59) ],
      [ 'Quizzes',  '9',                  new Date(2023,9,24,6,0),    new Date(2023,9,26,23,59) ],
      [ 'Quizzes',  '10',                 new Date(2023,9,31,6,0),    new Date(2023,10,2,23,59) ],
      [ 'Quizzes',  '11',                 new Date(2023,10,7,6,0),    new Date(2023,10,9,23,59) ],
      [ 'Quizzes',  '12',                 new Date(2023,10,14,6,0),   new Date(2023,10,16,23,59) ],
      [ 'Quizzes',  '13',                 new Date(2023,10,28,6,0),   new Date(2023,10,30,23,59) ],
      [ 'Quizzes',  '14',                 new Date(2023,11,1,18,0),   new Date(2023,11,3,23,59) ],
      [ 'Recitations',  '1',              new Date(2023,7,25,8,30),   new Date(2023,7,25,16,20) ],
      [ 'Recitations',  '2',              new Date(2023,8,1,8,30),    new Date(2023,8,1,16,20) ],
      [ 'Recitations',  '3',              new Date(2023,8,8,8,30),    new Date(2023,8,8,16,20) ],
      [ 'Recitations',  '4',              new Date(2023,8,15,8,30),   new Date(2023,8,15,16,20) ],
      [ 'Recitations',  '5',              new Date(2023,8,22,8,30),   new Date(2023,8,22,16,20) ],
      [ 'Recitations',  '6',              new Date(2023,8,29,8,30),   new Date(2023,8,29,16,20) ],
      [ 'Recitations',  '7',              new Date(2023,9,6,8,30),    new Date(2023,9,6,16,20) ],
      [ 'Recitations',  '8',              new Date(2023,9,13,8,30),   new Date(2023,9,13,16,20) ],
      [ 'Recitations',  '9',              new Date(2023,9,20,8,30),   new Date(2023,9,20,16,20) ],
      [ 'Recitations',  '10',             new Date(2023,9,27,8,30),   new Date(2023,9,27,16,20) ],
      [ 'Recitations',  '11',             new Date(2023,10,3,8,30),   new Date(2023,10,3,16,20) ],
      [ 'Recitations',  '12',             new Date(2023,10,10,8,30),  new Date(2023,10,10,16,20) ],
      [ 'Recitations',  '13',             new Date(2023,10,17,8,30),  new Date(2023,10,17,16,20) ],
      [ 'Recitations',  '14',             new Date(2023,11,1,8,30),   new Date(2023,11,1,16,20) ],
      [ 'Special Dates',  'Add',          new Date(2023,7,21,6,0),    new Date(2023,7,28,23,59) ],
      [ 'Special Dates',  'Drop',         new Date(2023,7,29,6,0),    new Date(2023,8,12,23,59) ],
      [ 'Special Dates',  'Withdraw',     new Date(2023,8,13,6,0),    new Date(2023,8,26,23,59) ],
      [ 'Special Dates',  'Selective Withdrawal', new Date(2023,8,27,6,0),  new Date(2023,9,23,23,59) ],
      [ 'Special Dates',  'Reading Days', new Date(2023,11,4,6,0),    new Date(2023,11,5,23,59) ],
      [ 'Special Dates',  'Finals',       new Date(2023,11,6,7,30),   new Date(2023,11,13,23,59) ],
      [ 'Holidays', 'Labor Day',          new Date(2023,8,4,0,0),     new Date(2023,8,4,23,59) ],
      [ 'Holidays', 'Fall Break',         new Date(2023,9,9,0,0),     new Date(2023,9,9,23,59) ],
      [ 'Holidays', 'Thanksgiving',       new Date(2023,10,22,0,0),   new Date(2023,10,26,23,59) ]]);

    var options = {
      timeline: { colorByRowLabel: true },
//     backgroundColor: '#ffd'
//      alternatingRowStyle: false
    };
var formatDate = new google.visualization.DateFormat({
pattern: 'MMM dd, hh:mm a'
});
  dataTable.insertColumn(2, { type: 'string', role: 'tooltip', p: {html: true} });
  for (var i = 0; i < dataTable.getNumberOfRows(); i++) {
    var duration = Math.abs(dataTable.getValue(i, 4).getTime() - dataTable.getValue(i, 3).getTime()) / 1000;
    var days = Math.floor(duration / 86400);
    duration -= days * 86400;
    var hours = Math.floor(duration / 3600) % 24;
    duration -= hours * 3600;
    var minutes = Math.floor(duration / 60) % 60;

    var tooltip = '';
    tooltip += '<div class="ggl-tooltip"><div>';
    if(dataTable.getValue(i, 1) == "Withdraw")
      tooltip += '<span>' + "Unrestricted Withdrawal Period" + '</span>';
    else if(dataTable.getValue(i, 1) == "SW")
      tooltip += '<span>' + "Selective Withdrawal Period" + '</span>';
    else if(dataTable.getValue(i, 1) == "Labor Day")
      tooltip += '<span>' + "Labor Day (No Classes on Monday)" + '</span>';
    else if(dataTable.getValue(i, 1) == "Fall Break")
      tooltip += '<span>' + "Fall Break (No Classes on Monday)<br><b>Monday Classes will be held on Tuesday</b>" + '</span>';
    else if(dataTable.getValue(i, 1) == "Thanksgiving")
      tooltip += '<span>' + "Thanksgiving Break (No Classes Wed, Thurs, Fri)" + '</span>';
    else if(dataTable.getValue(i, 1) == "Add")
      tooltip += '<span>' + "Add Period (Deadline is End of Day)" + '</span>';
    else if(dataTable.getValue(i, 1) == "Drop")
      tooltip += '<span>' + "Drop Period (Deadline is End of Day)" + '</span>';
    else if(dataTable.getValue(i, 1) == "Project 1")
      tooltip += '<span>' + "Topics: C Review, Bitwise Operations" + '</span>';
    else if(dataTable.getValue(i, 1) == "Project 2")
      tooltip += '<span>' + "Topics: C, Floating Point, Bitwise Operations" + '</span>';
    else if(dataTable.getValue(i, 1) == "Project 3")
      tooltip += '<span>' + "Topics: C, Processes, Signals, Unix I/O" + '</span>';
    else if(dataTable.getValue(i, 1) == "Project 4")
      tooltip += '<span>' + "Topics: Assembly" + '</span>';
    else if(dataTable.getValue(i, 0) == "Quizzes")
      tooltip += '<span>' + "Quiz " + dataTable.getValue(i, 1) + '</span>';
    else if(dataTable.getValue(i, 0) == "Recitations")
      tooltip += '<span>' + "Recitation " + dataTable.getValue(i, 1) + '</span>';
    else if(dataTable.getValue(i, 1).includes("Midterm"))
      tooltip += '<span>' + "Midterm Exam" + '</span>';
    else if(dataTable.getValue(i, 1).includes("Final"))
      tooltip += '<span>' + "Comprehensive Exam (Beginning of Semester to Exam)" + '</span>';
    else
      tooltip += '<span>' + dataTable.getValue(i, 1) + '</span>';
    tooltip += '</div><div>';
    if(dataTable.getValue(i, 0) == "Quizzes")
      tooltip += '<div> Quiz Topics: Listed in the Course Schedule</div>';
    if(dataTable.getValue(i, 0) == "Recitations")
      tooltip += '<div> Recitation Topics: Listed in the Course Schedule</div>';
    tooltip += '<span>' + dataTable.getValue(i, 0) + ':&nbsp;</span>';
    tooltip += formatDate.formatValue(dataTable.getValue(i, 3)) + ' - ';
    tooltip += formatDate.formatValue(dataTable.getValue(i, 4));
    tooltip += '</div><div>';
    tooltip += '<span>Duration:&nbsp;</span>';
    tooltip += days + ' days ' + hours + ' hours ' + minutes + ' minutes ';
    tooltip += '</div></div>';
    dataTable.setValue(i, 2, tooltip);
  }

  var observer = new MutationObserver(setBorderRadius);
  google.visualization.events.addListener(chart, 'ready', function () {
    setBorderRadius();
    observer.observe(container, {
      childList: true,
      subtree: true
    });
  });

  function setBorderRadius() {
    Array.prototype.forEach.call(container.getElementsByTagName('rect'), function (rect) {
      if (parseFloat(rect.getAttribute('x')) > 0) {
        rect.setAttribute('rx', 3);
        rect.setAttribute('ry', 3);
      }
    });
  }

    chart.draw(dataTable, options);
    ExtendCurrent('timeline', -1);
    google.visualization.events.addListener(chart, 'onmouseover', function(obj) {
        ExtendCurrent('timeline', obj.row);
        });
    google.visualization.events.addListener(chart, 'onmouseout', function(obj) {
        ExtendCurrent('timeline', -1);
        });
  }
