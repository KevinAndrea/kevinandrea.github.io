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
    dataTable.addColumn({ type: 'string', id: 'Room' });
    dataTable.addColumn({ type: 'string', id: 'Name' });
    dataTable.addColumn({ type: 'date', id: 'Start' });
    dataTable.addColumn({ type: 'date', id: 'End' });
    timenow = new Date();
    starttime = new Date(2023,0,30,0,0);
    endtime = new Date(2023,4,17,23,59);
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
      [ 'CS 367',  'CS 367',              new Date(2023,0,23,0,0),    new Date(2023,4,19,23,59) ],
      [ 'Exams-001', 'Final-001',         new Date(2023,4,15,7,30),   new Date(2023,4,15,10,15) ],
      [ 'Exams-002', 'Final-002',         new Date(2023,4,15,13,30),  new Date(2023,4,15,16,15) ],
      [ 'Exams-003', 'Final-003',         new Date(2023,4,16,13,30),  new Date(2023,4,16,16,15) ],
      [ 'Exams-001', 'Midterm-001',       new Date(2023,2,8,9,0),     new Date(2023,2,8,10,15) ],
      [ 'Exams-002', 'Midterm-002',       new Date(2023,2,8,15,0),    new Date(2023,2,8,16,15) ],
      [ 'Exams-003', 'Midterm-003',       new Date(2023,2,9,13,30),   new Date(2023,2,9,14,45) ],
      [ 'Projects', 'Project 1',          new Date(2023,0,28,18,0),   new Date(2023,1,10,23,59) ],
      [ 'Projects', 'Project 2',          new Date(2023,1,15,6,0),    new Date(2023,2,3,23,59) ],
      [ 'Projects', 'Project 3',          new Date(2023,2,21,6,0),    new Date(2023,3,14,23,59) ],
      [ 'Projects', 'Project 4',          new Date(2023,3,18,18,0),   new Date(2023,4,5,23,59) ],
      [ 'Quizzes',  '1',                  new Date(2023,0,31,6,0),    new Date(2023,1,2,23,59) ],
      [ 'Quizzes',  '2',                  new Date(2023,1,7,6,0),     new Date(2023,1,9,23,59) ],
      [ 'Quizzes',  '3',                  new Date(2023,1,14,6,0),    new Date(2023,1,16,23,59) ],
      [ 'Quizzes',  '4',                  new Date(2023,1,21,6,0),    new Date(2023,1,23,23,59) ],
      [ 'Quizzes',  '5',                  new Date(2023,1,28,6,0),    new Date(2023,2,2,23,59) ],
      [ 'Quizzes',  '6',                  new Date(2023,2,3,6,0),     new Date(2023,2,5,23,59) ],
      [ 'Quizzes',  '7',                  new Date(2023,2,21,6,0),    new Date(2023,2,23,23,59) ],
      [ 'Quizzes',  '8',                  new Date(2023,2,28,6,0),    new Date(2023,2,30,23,59) ],
      [ 'Quizzes',  '9',                  new Date(2023,3,4,6,0),     new Date(2023,3,6,23,59) ],
      [ 'Quizzes',  '10',                 new Date(2023,3,11,6,0),    new Date(2023,3,13,23,59) ],
      [ 'Quizzes',  '11',                 new Date(2023,3,18,6,0),    new Date(2023,3,20,23,59) ],
      [ 'Quizzes',  '12',                 new Date(2023,3,25,6,0),    new Date(2023,3,27,23,59) ],
      [ 'Quizzes',  '13',                 new Date(2023,4,2,6,0),     new Date(2023,4,4,23,59) ],
      [ 'Quizzes',  '14',                 new Date(2023,4,5,6,0),     new Date(2023,4,7,23,59) ],
      [ 'Recitations',  '1',              new Date(2023,0,27,8,30),   new Date(2023,0,27,16,20) ],
      [ 'Recitations',  '2',              new Date(2023,1,3,8,30),    new Date(2023,1,3,16,20) ],
      [ 'Recitations',  '3',              new Date(2023,1,10,8,30),   new Date(2023,1,10,16,20) ],
      [ 'Recitations',  '4',              new Date(2023,1,17,8,30),   new Date(2023,1,17,16,20) ],
      [ 'Recitations',  '5',              new Date(2023,1,24,8,30),   new Date(2023,1,24,16,20) ],
      [ 'Recitations',  '6',              new Date(2023,2,3,8,30),    new Date(2023,2,3,16,20) ],
      [ 'Recitations',  '7',              new Date(2023,2,10,8,30),   new Date(2023,2,10,16,20) ],
      [ 'Recitations',  '8',              new Date(2023,2,24,8,30),   new Date(2023,2,24,16,20) ],
      [ 'Recitations',  '9',              new Date(2023,2,31,8,30),   new Date(2023,2,31,16,20) ],
      [ 'Recitations',  '10',             new Date(2023,3,7,8,30),    new Date(2023,3,7,16,20) ],
      [ 'Recitations',  '11',             new Date(2023,3,14,8,30),   new Date(2023,3,14,16,20) ],
      [ 'Recitations',  '12',             new Date(2023,3,21,8,30),   new Date(2023,3,21,16,20) ],
      [ 'Recitations',  '13',             new Date(2023,3,28,8,30),   new Date(2023,3,28,16,20) ],
      [ 'Recitations',  '14',             new Date(2023,4,5,8,30),    new Date(2023,4,5,16,20) ],
      [ 'Special Dates',  'Add',          new Date(2023,0,30,0,0),    new Date(2023,0,30,23,59) ],
      [ 'Special Dates',  'Drop',         new Date(2023,1,6,0,0),     new Date(2023,1,6,23,59) ],
      [ 'Special Dates',  'Withdraw',     new Date(2023,1,14,0,0),    new Date(2023,1,27,23,0) ],
      [ 'Special Dates',  'Selective Withdrawal',           new Date(2023,1,28,0,0),    new Date(2023,3,3,23,59) ],
      [ 'Special Dates', 'Sp.Break',      new Date(2023,2,13,0,0),    new Date(2023,2,19,23,59) ],
      [ 'Special Dates',  'Reading Days', new Date(2023,4,8,0,0),     new Date(2023,4,9,23,59) ],
      [ 'Special Dates',  'Finals',       new Date(2023,4,10,7,30),   new Date(2023,4,17,23,59) ]]);

    var options = {
      timeline: { colorByRowLabel: true },
      alternatingRowStyle: false
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
    else if(dataTable.getValue(i, 1) == "Sp.Break")
      tooltip += '<span>' + "Spring Break (No Classes)" + '</span>';
    else if(dataTable.getValue(i, 1) == "Add")
      tooltip += '<span>' + "Add Deadline (End of Day)" + '</span>';
    else if(dataTable.getValue(i, 1) == "Drop")
      tooltip += '<span>' + "Drop Deadline (End of Day)" + '</span>';
    else
      tooltip += '<span>' + dataTable.getValue(i, 1) + '</span>';
    tooltip += '</div><div>';
    tooltip += '<span>' + dataTable.getValue(i, 0) + ':&nbsp;</span>';
    tooltip += formatDate.formatValue(dataTable.getValue(i, 3)) + ' - ';
    tooltip += formatDate.formatValue(dataTable.getValue(i, 4));
    tooltip += '</div><div>';
    tooltip += '<span>Duration:&nbsp;</span>';
    tooltip += days + ' days ' + hours + ' hours ' + minutes + ' minutes ';
    tooltip += '</div></div>';
    dataTable.setValue(i, 2, tooltip);
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
