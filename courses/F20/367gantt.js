google.charts.load('current', {'packages':['gantt']});
google.charts.setOnLoadCallback(drawChart);

function daysToMilliseconds(days) {
  return days * 24 * 60 * 60 * 1000;
}

function drawChart() {

  var otherData = new google.visualization.DataTable();
  otherData.addColumn('string', 'Task ID');
  otherData.addColumn('string', 'Task Name');
  otherData.addColumn('string', 'Resource');
  otherData.addColumn('date', 'Start');
  otherData.addColumn('date', 'End');
  otherData.addColumn('number', 'Duration');
  otherData.addColumn('number', 'Percent Complete');
  otherData.addColumn('string', 'Dependencies');

  otherDate = cs367_addTasks(otherData);

  var dateRangeStart = otherData.getColumnRange(3);
  var dateRangeEnd = otherData.getColumnRange(4);

  var options = {
    width: 10000,
    height: 480,
    gantt: {
      criticalPathEnabled: false, // Critical path arrows will be the same as other arrows.
      arrow: {
        angle: 50,
        width: 1,
        color: 'white',
        radius: 2
      },
      labelStyle: {
        fontName: 'Open Sans',
        fontSize: 14,
        color: 'white'
      },
      barCornerRadius: 2,
      backgroundColor: {
        fill: 'transparent',
      },
      innerGridHorizLine: {
        stroke: '#ddd',
        strokeWidth: 0,
      },
      innerGridTrack: {
        fill: 'transparent'
      },
      innerGridDarkTrack: {
        fill: 'transparent'
      },
      percentEnabled: true, 
      percentStyle: {
        fill:  'black',
      },
      shadowEnabled: true,  
      shadowColor: 'white',
      shadowOffset: 2,
    }
  };

  var chart = new google.visualization.Gantt(document.getElementById('chart_div'));

  cs367_addTaskMarkers(chart, dateRangeStart, dateRangeEnd, options);

  chart.draw(otherData, options);
}
