// Load the Google Charts
google.charts.load("current", {packages:["timeline"]});
google.charts.setOnLoadCallback(drawChart);

// Refreshes the chart when the window is resized
window.addEventListener('resize', refreshChart);
// Resets chart to window width on resize
function refreshChart() {
  setWidthMultiplier(1);
  drawChart();
}

// GLOBALS: 
const parameters = new Map();
parameters.set('width', getWindowWidth);  // Size of Active Chart
parameters.set('startTime', null);        // Beginning of Chart Period
parameters.set('endTime', null);          // End of Chart Period
parameters.set('barTime', null);          // Time Bar Time
parameters.set('timeText', null);         // Text for the Time Bar

// Set up overall chart options 
// (https://developers.google.com/chart/interactive/docs/gallery/timeline#configuration-options)
var chartOptions = {
  timeline: { colorByRowLabel: true },
  width: parameters.get('width'),
  // colors is the default (Google) list of 31 row colors.
  // Needs to be specified here to allow recoloring of any arbitrary row (recolor function)
  colors: ['#264c99', '#a52a0d', '#bf7200',
            '#0c7012', '#720072', '#007294',
            '#b72153', '#4c7f00', '#8a2222',
            '#244a6f', '#723372', '#197f72',
            '#7f7f0c', '#4c2699', '#ac5600',
            '#680505', '#4b0c4d', '#256d49',
            '#3f577c', '#2c2e81', '#895619',
            '#10a017', '#8a0e62', '#d30b79',
            '#754227', '#7e930e', '#1f5969',
            '#4c6914', '#8e7b0e', '#084219',
            '#57270c'
    ]
};

// Adds in two Zoom buttons (1x and 2x)
addZoomButtons();

// Gets the maximal inner size for the chart
function getWindowWidth() {
  return window.innerWidth - 30;
}

// Adds a 1x and 2x zoom button to the top of the page
function addZoomButtons() {
  const button_1x = document.createElement('button')
  const button_2x = document.createElement('button')

  button_1x.innerText = 'Zoom - Screen Width'
  button_1x.id = '1xZoom'
  button_2x.innerText = 'Zoom - 200%'
  button_2x.id = '2xZoom'

  // Resize Chart for Window (1x)
  button_1x.addEventListener('click', () => {
    setWidthMultiplier(1);
    drawChart();
  })

  // Resize Chart for 2x Window
  button_2x.addEventListener('click', () => {
    setWidthMultiplier(2);
    drawChart();
  })

  // Add Buttons to the Body
  document.body.appendChild(button_1x)
  document.body.appendChild(button_2x)
}

// Creates a new date with year, month (1 - 12), day, hour, and minute
// -- Basically calls Date with the proper month number (instead of 0-based)
function doDate(year, month, day, hour, minute) {
  date = new Date(year,month - 1,day,hour,minute);
  return date;
}

// Main function to render the chart to the window
function drawChart() {
  var container = document.getElementById('timeline');
  var chart = new google.visualization.Timeline(container);
  var dataTable = new google.visualization.DataTable();

  // Create the structure of the data
  dataTable.addColumn({ type: 'string', id: 'Term' });
  dataTable.addColumn({ type: 'string', id: 'Name' });
  dataTable.addColumn({ type: 'date', id: 'Start' });
  dataTable.addColumn({ type: 'date', id: 'End' });

  // Set up the Period's Time Span and Time Bar
  initializeTime();
  displayTime();

  // Read in the data from events.js
  addRows(dataTable);
  // Add in the toolTip Column (for manual additions as needed)
  dataTable.insertColumn(2, { type: 'string', role: 'tooltip', p: {html: true} });
  // Sets up custom colors (optional - set in events.js)
  setColors(dataTable);
  // Sets toolTips on Events (optional - set in events.js)
  addTips(dataTable);

  // Set rounded corners on the bar items
  var observer = new MutationObserver(setBorderRadius);
  addRoundedCorners(chart, observer)

  // Render the chart with the current options
  chart.draw(dataTable, chartOptions);

  // Extends the timeBar to cover all rows in the chart
  extendCurrent('timeline', -1);
  // - Fixes mouseover of timeBar to show the row entry tooltip when over a row
  google.visualization.events.addListener(chart, 'onmouseover', function(obj) {
      extendCurrent('timeline', obj.row);
      });
  // - Resets full extended timeBar when mouse out (default redraws it as a small |)
  google.visualization.events.addListener(chart, 'onmouseout', function(obj) {
      extendCurrent('timeline', -1);
      });
}

// Helper to format the TimeBar's Time text
function displayTime() {
  currentTime = new Date();
  // Case 1 (Before): Lock the Bar to the Timeline Start
  if(currentTime < parameters.get('startTime')) {
    parameters.set('barTime', parameters.get('startTime'));
    parameters.set('timeText', "TIME - Before Start Date");
  }
  // Case 2 (After): Lock the Bar to the Timeline End
  else if(currentTime > parameters.get('endTime')) {
    parameters.set('barTime', parameters.get('endTime'));
    parameters.set('timeText', "TIME - After End Date");
  }
  // Case 3 (During): Move the Bar along the Timeline
  else {
    parameters.set('barTime', currentTime);
    parameters.set('timeText', "TIME - " + currentTime.toLocaleString('en-US', { timeZone: 'EST' }));
  } 
}

// Add a tooltip to an Event (or an Event Series)
function addToolTip(dataTable, item, text, notes, customDuration = null) {
  // Find the row index containing the event item
  var index = -1;
  for (index = 0; index < dataTable.getNumberOfRows(); index++) {
    // Look for a partial match (eg. Final will match Final-001, Final-002, etc)
    if(dataTable.getValue(index, 1).includes(item)) {
      // Add the tooltip to all matching items in the events list
      addToolTipItem(dataTable, index, text, notes, customDuration);
    }
  }

  // If no such text, return.
  if(index == -1) {
    return;
  }
}

// Generates the *formatted* tooltip text on a single item
function addToolTipItem(dataTable, index, text, notes, customDuration) {
  // Establish data format for the Tooltip Ranges
  var formatDate = new google.visualization.DateFormat({pattern: 'MMM dd, hh:mm a'});

  // Set up the duration values for the toolTip
  var duration = Math.abs(dataTable.getValue(index, 4).getTime() - dataTable.getValue(index, 3).getTime()) / 1000;
  var days = Math.floor(duration / 86400);
  duration -= days * 86400;
  var hours = Math.floor(duration / 3600) % 24;
  duration -= hours * 3600;
  var minutes = Math.floor(duration / 60) % 60;

  // Generate toolTip
  var toolTip = '<div class="ggl-toolTip"><div>';
  toolTip += '<br><span style="margin-left: 5px;"><b>' + text + '&nbsp<br></b></span>';
  toolTip += '<hr>'
  toolTip += '</div><div>';
  toolTip += '<span style="margin-left: 5px; margin-right: 5px;"><b> Note: </b>' + notes + '</span><br>';

  // Generate the formatted date span
  toolTip += '<br><span style="margin-left: 5px; margin-right: 5px;"><b> Period: </b>';
  toolTip += formatDate.formatValue(dataTable.getValue(index, 3)) + ' - ';
  toolTip += formatDate.formatValue(dataTable.getValue(index, 4));
  toolTip += '</span></div><div>';
  if(customDuration != null) {
    toolTip += '<br><span style="margin-left: 5px; margin-right: 5px;"><b> ' + customDuration + '</b></span><br>';
  }
  else {
    toolTip += '<br><span style="margin-left: 5px;margin-right: 5px;"><b> Duration:&nbsp; </b></span>';
    toolTip += days + ' days ' + hours + ' hours ' + minutes + ' minutes ';
  }
  toolTip += '</div></div><br>';

  // Add the tooltip to the event on the chart
  dataTable.setValue(index, 2, toolTip);
}

// Recolors the chart 
function recolor(dataTable, category, color) {
  // Find the row index containing the category
  var index = -1;
  var categoryIndex = 0;
  var currentCategory = '';
  var oldCategory = dataTable.getValue(0, 0);
  for (index = 0; index < dataTable.getNumberOfRows(); index++) {
    // Get the new category name
    currentCategory = dataTable.getValue(index, 0);
    // If it's different than the last category name, increment the category index number
    if(currentCategory != oldCategory) {
      categoryIndex++;
      oldCategory = currentCategory;
    }

    // Look for a partial match (eg. Final will match Final-001, Final-002, etc)
    if(dataTable.getValue(index, 0).includes(category)) {
      // Add the color to all matching categores in the events list
      chartOptions['colors'][categoryIndex] = color;
    }
  }
}

// Sets up a mutation on the draw function to round the corners
function addRoundedCorners(chart, observer) {
  var container = document.getElementById('timeline');
  google.visualization.events.addListener(chart, 'ready', function () {
    setBorderRadius();
    observer.observe(container, {
      childList: true,
      subtree: true
    });
  });
}

// Configures the degree to which borders should be rounded
function setBorderRadius() {
  var container = document.getElementById('timeline');
  Array.prototype.forEach.call(container.getElementsByTagName('rect'), function (rect) {
    if (parseFloat(rect.getAttribute('x')) > 0) {
      rect.setAttribute('rx', 3);
      rect.setAttribute('ry', 3);
    }
  });
}

// Adjusts the chart width by screen-size multiplier
function setWidthMultiplier(multiplier) {
  parameters.set('width', getWindowWidth() * multiplier);
  chartOptions['width'] = parameters.get('width');
}

// Extends the timeBar down through all rows.
function extendCurrent(div, isInline){
  var len = 0;
  // Calculate the length based on the height of the chart
  $('#'+div+' rect').each(function(index) {
    yVal = parseFloat($(this).attr('y'));
    xVal = parseFloat($(this).attr('x'));
    if ( xVal == 0 && yVal == 0 ) { 
      len = parseFloat($(this).attr('height')) 
    }
  });

  // Apply the new height (all rows) to the | rectangle in the Time row
  // This adjusts the timeBar to cover the entire chart 
  $('#'+div+' text:contains("TIME")').css('font-size','11px').attr('fill','#A6373C').prev('rect').attr('height',len+'px').attr('width','3px').attr('y','0').attr('fill','#AA0000');

  // Only show the toolTips on non-Time event rows and if is in the chart
  if (isInline != -1) {
    // Suppress the toolTip entirely for the timeBar line
    if (isInline == 0)
      $('.google-visualization-tooltip').css('display','none');
    else
      $('.google-visualization-tooltip').css('display','inline');
  }
}

