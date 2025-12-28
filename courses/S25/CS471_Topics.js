      google.charts.load('current', {packages:["orgchart"]});
      google.charts.setOnLoadCallback(drawChart);

      function drawChart() {
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Name');
        data.addColumn('string', 'Manager');
        data.addColumn('string', 'ToolTip');

        // For each orgchart box, provide the name, manager, and tooltip to show.
        data.addRows([
          [{'v':'CS 471', 'f':'Mike<div style="color:red; font-style:italic">President</div>'},
           '', 'The President'],
          ['Module 1', 'CS 471', 'Bob Sponge'],
            ['OS Overview', 'Module 1',''],
            ['Syscalls', 'Module 1', ''],
            ['Interrupt Processing Sequence', 'Module 1', ''],
            ['NUMA', 'Module 1', ''],
            ['Coupled Systems' , 'Module 1', ''],
              ['Tightly Coupled', 'Coupled Systems', ''],
              ['Loosely Coupled', 'Coupled Systems', ''],
          ['Module 2', 'CS 471', '']
        ]);
        
          var index = -1;
  for (index = 0; index < data.getNumberOfRows(); index++) {
    // Look for a partial match (eg. Final will match Final-001, Final-002, etc)
    if(data.getValue(index, 0).includes("Carol")) {
      // Add the tooltip to all matching items in the events list
        data.setRowProperty(index, 'style', 'background-color:cyan;background-image:none;border: 1px solid black');      
    }
        if(data.getValue(index, 0).includes("Mike")) {
      // Add the tooltip to all matching items in the events list
        data.setRowProperty(index, 'style', 'background-color:lightgreen;background-image:none;border: 1px solid black');      
    }
            if(data.getValue(index, 0).includes("Jim")) {
      // Add the tooltip to all matching items in the events list
        data.setRowProperty(index, 'style', 'background-color:cyan;background-image:none;border: 1px solid black');      
    }
            if(data.getValue(index, 0).includes("Bob")) {
      // Add the tooltip to all matching items in the events list
        data.setRowProperty(index, 'style', 'background-color:cyan;background-image:none;border: 1px solid black');      
    }
  }


        // Create the chart.
        var doc = document.getElementById('chart_div');
        var chart = new google.visualization.OrgChart(doc);
        // Draw the chart, setting the allowHtml option to true for the tooltips.
        chart.draw(data, {'allowHtml':true});
      }
