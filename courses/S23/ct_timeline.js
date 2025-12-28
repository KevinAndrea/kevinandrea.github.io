  google.charts.load("current", {packages:["timeline"]});
  google.charts.setOnLoadCallback(drawChart);
  
  function ExtendCurrent(div, isInline){
    var len = 0;
    $('#'+div+' rect').each(function(index) {
      yVal = parseFloat($(this).attr('y'));
      xVal = parseFloat($(this).attr('x'));
      if ( xVal == 0 && yVal == 0 ) { len = parseFloat($(this).attr('height')) };
    });

    $('#'+div+' text:contains("NOW")').css('font-size','11px').attr('fill','#A6373C').prev('rect').attr('height',len+'px').attr('width','3px').attr('y','0').attr('fill','#AA0000');

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
    dataTable.addRows([
      [ 'Time', 'NOW [' + new Date() + ']', new Date(), new Date()],
      [ 'CS 367 Summer',  'Summer',                 new Date(2023,4,22,0,0),   new Date(2023,7,20,23,59) ],
      [ 'Project 1', 'Project 1 - Scheduler',       new Date(2023,4,22,0,0),   new Date(2023,5,4,23,59) ],
      [ 'Project 2', 'Project 2 - Floating Point',  new Date(2023,5,5,0,0),    new Date(2023,5,25,23,59) ],
      [ 'Project 3', 'Project 3 - Task Manager',    new Date(2023,5,26,0,0),   new Date(2023,6,23,23,59) ],
      [ 'Project 4', 'Project 4 - Binary Bomb',     new Date(2023,6,24,0,0),   new Date(2023,7,13,23,59) ]]);

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
