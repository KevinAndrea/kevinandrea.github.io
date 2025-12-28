  google.charts.load("current", {'packages':["gantt"]});
  google.charts.setOnLoadCallback(drawChart);
  
  function daysToMilliseconds(days) {
          return days * 24 * 60 * 60 * 1000;
  }

  function ExtendCurrent(div, isInline){
    var len = 0;
    
    $('#'+div+' rect').each(function(index) {
      yVal = parseFloat($(this).attr('y'));
      xVal = parseFloat($(this).attr('x'));
      if ( xVal == 0 && yVal == 0 ) { 
        len = parseFloat($(this).attr('height')) 
      };
    });

    $('#'+div+' text:contains("Time")').css('font-size','11px').attr('fill','#A6373C').prev('rect').attr('height',len+'px').attr('width','3px').attr('y','0').attr('fill','#AA0000');
//
//    if (isInline != -1) {
//      if ( 0 == isInline )
        $('.google-visualization-tooltip').css('display','none');
//      else
//        $('.google-visualization-tooltip').css('display','inline');
//    }
  }

  function drawChart() {

      var data = new google.visualization.DataTable();
      data.addColumn('string', 'Task ID');
      data.addColumn('string', 'Task Name');
      data.addColumn('date', 'Start Date');
      data.addColumn('date', 'End Date');
      data.addColumn('number', 'Duration');
      data.addColumn('number', 'Percent Complete');
      data.addColumn('string', 'Dependencies');

      data.addRows([
        [ 'NOW [' + new Date() + ']', 'Time', 
          new Date(2023, 5, 20), new Date(), null, 100, null],
        ['Research', 'Find sources',
          new Date(2023, 5, 20), new Date(2023, 6, 5), null,  100,  null],
        ['Write', 'Write paper',
          new Date(2023, 5, 25), null, daysToMilliseconds(3), 25, ''],
        ['Cite', 'Create bibliography',
          new Date(2023, 5, 23), null, daysToMilliseconds(1), 20, ''],
        ['Complete', 'Hand in paper',
          new Date(2023, 5, 26), null, daysToMilliseconds(1), 0, 'Cite'],
        ['Outline', 'Outline paper',
          new Date(2023, 5, 21), null, daysToMilliseconds(1), 100, '']
      ]);

      var options = {
        height: 275,
//        chart_div: { colorByRowLabel: true },
        alternatingRowStyle: false
      };

      var chart = new google.visualization.Gantt(document.getElementById('chart_div'));

      chart.draw(data, options);
      ExtendCurrent('chart_div', -1);
      google.visualization.events.addListener(chart, 'onmouseover', function(obj) {
        ExtendCurrent('chart_div', obj.row);
      });
      google.visualization.events.addListener(chart, 'onmouseout', function(obj) {
        ExtendCurrent('chart_div', -1);
      });
    }

