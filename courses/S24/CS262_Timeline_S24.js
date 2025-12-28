  google.charts.load("current", {packages:["timeline"]});
  google.charts.setOnLoadCallback(drawChart);
	window.addEventListener('resize', refreshChart);

  let chartwidth = window.innerWidth - 30;

  const button_1x = document.createElement('button')
  const button_2x = document.createElement('button')
  const button_3x = document.createElement('button')

  button_1x.innerText = 'Zoom - Screen Width'
  button_1x.id = '1xZoom'
  button_2x.innerText = 'Zoom - 200%'
  button_2x.id = '2xZoom'
  button_3x.innerText = 'Zoom - 300%'
  button_3x.id = '3xZoom'

  button_1x.addEventListener('click', () => {
    chartwidth = window.innerWidth - 30;
    drawChart();
  })

  button_2x.addEventListener('click', () => {
    chartwidth = window.innerWidth * 2;
    drawChart();
  })

  button_3x.addEventListener('click', () => {
    chartwidth = window.innerWidth * 3;
    drawChart();
  })

  document.body.appendChild(button_1x)
  document.body.appendChild(button_2x)
  document.body.appendChild(button_3x)

  function refreshChart() {
    chartwidth = window.innerWidth - 30;
    drawChart();
  }
  
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

  function doDate(year, month, day, hour, minute) {
    date = new Date(year,month - 1,day,hour,minute);
    return date;
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
    starttime = doDate(2024,1,15,0,0);
    endtime = doDate(2024,5,9,23,59);
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
      // Finals
      [ 'Exams-005', 'Final-005',         doDate(2024,5,6,13,30),  doDate(2024,5,6,16,15) ],
      // Midterms
      [ 'Exams-005', 'Midterm-005',       doDate(2024,2,28,15,00),  doDate(2024,2,28,16,15) ],
      // Projects
      [ 'Projects', 'Project 1',          doDate(2024,2,5,0,0),   doDate(2024,3,3,23,59) ],
      [ 'Projects', 'Project 2',          doDate(2024,3,11,0,0),  doDate(2024,3,31,23,59) ],
      [ 'Projects', 'Project 3',          doDate(2024,4,1,0,0),  doDate(2024,4,21,23,59) ],
      // Quizzes
      [ 'Quizzes',  '1',                  doDate(2024,1,30,6,0),    doDate(2024,2,1,23,59) ],
      [ 'Quizzes',  '2',                  doDate(2024,2,6,6,0),     doDate(2024,2,8,23,59) ],
      [ 'Quizzes',  '3',                  doDate(2024,2,13,6,0),    doDate(2024,2,15,23,59) ],
      [ 'Quizzes',  '4',                  doDate(2024,2,20,6,0),    doDate(2024,2,22,23,59) ],
      [ 'Quizzes',  '5',                  doDate(2024,3,19,6,0),   doDate(2024,3,21,23,59) ],
      [ 'Quizzes',  '6',                 doDate(2024,4,2,6,0),     doDate(2024,4,4,23,59) ],
      [ 'Quizzes',  '7',                 doDate(2024,4,16,6,0),    doDate(2024,4,18,23,59) ],
      [ 'Quizzes',  '8',                 doDate(2024,4,23,6,0),    doDate(2024,4,25,23,59) ],
      // Labs
      [ 'Labs',  '1',              doDate(2024,1,19,9,30),   doDate(2024,1,28,23,59) ],
      [ 'Labs',  '2',              doDate(2024,1,26,9,30),   doDate(2024,2,4,23,59) ],
      [ 'Labs',  '3',              doDate(2024,2,2,9,30),    doDate(2024,2,11,23,59) ],
      [ 'Labs',  '4',              doDate(2024,2,9,9,30),    doDate(2024,2,18,23,59) ],
      [ 'Labs',  '5',              doDate(2024,2,23,9,30),   doDate(2024,3,3,23,59) ],
      [ 'Labs',  '6',              doDate(2024,3,1,9,30),    doDate(2024,3,17,23,59) ],
      [ 'Labs',  '7',              doDate(2024,3,15,9,30),   doDate(2024,3,24,23,59) ],
      [ 'Labs',  '8',              doDate(2024,3,22,9,30),   doDate(2024,3,31,23,59) ],
      [ 'Labs',  '9',              doDate(2024,3,29,9,30),   doDate(2024,4,7,23,59) ],
      [ 'Labs',  '10',             doDate(2024,4,5,9,30),    doDate(2024,4,14,23,59) ],
      [ 'Labs',  '11',             doDate(2024,4,12,9,30),   doDate(2024,4,21,23,59) ],
      [ 'Special Dates',  'Add',          doDate(2024,1,16,6,0),    doDate(2024,1,23,23,59) ],
      [ 'Special Dates',  'Drop',         doDate(2024,1,24,6,0),    doDate(2024,1,30,23,59) ],
      [ 'Special Dates',  '50%',     doDate(2024,1,31,6,0),    doDate(2024,2,6,23,59) ],
      [ 'Special Dates',  'Withdrawal',     doDate(2024,2,7,6,0),     doDate(2024,2,20,23,59) ],
      [ 'Special Dates',  'Selective Withdrawal', doDate(2024,2,21,6,0),  doDate(2024,3,25,23,59) ],
      [ 'Special Dates',  'Reading Day',  doDate(2024,4,30,6,0),    doDate(2024,4,30,23,59) ],
      [ 'Special Dates',  'Finals',       doDate(2024,5,1,7,30),    doDate(2024,5,8,23,59) ],
      [ 'Holidays', 'Spring Break',       doDate(2024,3,4,0,0),     doDate(2024,3,8,23,59) ]]);

    var options = {
      timeline: { colorByRowLabel: true },
      width: chartwidth
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
    if(dataTable.getValue(i, 1) == "Withdrawal")
      tooltip += '<span>' + "Unrestricted Withdrawal Period" + '</span>';
    else if(dataTable.getValue(i, 1) == "Selective Withdrawal")
      tooltip += '<span>' + "Selective Withdrawal Period" + '</span>';
    else if(dataTable.getValue(i, 1) == "50%")
      tooltip += '<span>' + "Drop - 50% Tuition Refund" + '</span>';
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
    else if(dataTable.getValue(i, 0) == "Labs")
      tooltip += '<span>' + "Lab " + dataTable.getValue(i, 1) + '</span>';
    else if(dataTable.getValue(i, 1).includes("Midterm"))
      tooltip += '<span>' + "Midterm Exam" + '</span>';
    else if(dataTable.getValue(i, 1).includes("Final"))
      tooltip += '<span>' + "Comprehensive Exam (Beginning of Semester to Exam)" + '</span>';
    else
      tooltip += '<span>' + dataTable.getValue(i, 1) + '</span>';
    tooltip += '</div><div>';
    if(dataTable.getValue(i, 0) == "Quizzes")
      tooltip += '<div> Quiz Topics: Listed in the Course Schedule</div>';
    if(dataTable.getValue(i, 0) == "Labs")
      tooltip += '<div> Lab Topics: Listed in the Course Schedule</div>';
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
