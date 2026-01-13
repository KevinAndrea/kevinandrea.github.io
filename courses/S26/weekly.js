  google.charts.load("current", {packages:["timeline"]});
  google.charts.setOnLoadCallback(drawChart);
  
  function drawChart() {
    var container = document.getElementById('timeline');
    var chart = new google.visualization.Timeline(container);
    var dataTable = new google.visualization.DataTable();
    dataTable.addColumn({ type: 'string', id: 'Room' });
    dataTable.addColumn({ type: 'string', id: 'Name' });
    dataTable.addColumn({ type: 'date', id: 'Start' });
    dataTable.addColumn({ type: 'date', id: 'End' });
    dataTable.addRows([
      [ 'Office Hours',  'Weekly Office Hours Schedules',   new Date(0,0,1,0,0),  new Date(0, 0, 5, 23, 59) ],
      [ 'Lectures',  '001',                                 new Date(0,0,1,9,0),  new Date(0, 0, 1, 10, 15) ],
      [ 'Lectures',  '001',                                 new Date(0,0,3,9,0),  new Date(0, 0, 3, 10, 15) ],
      [ 'Lectures',  '002',                                 new Date(0,0,1,15,0),  new Date(0, 0, 1, 16, 15) ],
      [ 'Lectures',  '002',                                 new Date(0,0,3,15,0),  new Date(0, 0, 3, 16, 15) ],
      [ 'Lectures',  '003',                                 new Date(0,0,2,13,30),  new Date(0, 0, 2, 14, 45) ],
      [ 'Lectures',  '003',                                 new Date(0,0,4,13,30),  new Date(0, 0, 4, 14, 45) ],
      [ 'GTA',  'Huayu',                                    new Date(0,0,1,10,30),  new Date(0, 0, 1, 12, 30) ],
      [ 'GTA',  'Runyu',                                    new Date(0,0,2,10,45),  new Date(0, 0, 2, 12, 45) ],
      [ 'GTA',  'Yixiao',                                   new Date(0,0,3,10,30),  new Date(0, 0, 3, 12, 30) ],
      [ 'GTA',  'Jingyuan',                                 new Date(0,0,5,14,30),  new Date(0, 0, 5, 16, 30) ],
      [ 'Prof. Andrea',  'Prof. Andrea',                    new Date(0,0,1,13,0),  new Date(0, 0, 1, 14, 0) ],
      [ 'Prof. Andrea',  'Prof. Andrea',                    new Date(0,0,2,15,00),  new Date(0, 0, 2, 16, 0) ]]);

    var options = {
      timeline: { colorByRowLabel: true },
      hAxis: { format: "hh:mm\nEEE" },
      alternatingRowStyle: false
    };
var formatDate = new google.visualization.DateFormat({
pattern: 'hh:mm a'
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
    }
