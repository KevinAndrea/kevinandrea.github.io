function addMarker(markerRow, markerDate, markerText, dateRangeStart, dateRangeEnd) {
    var baseline;
    var baselineBounds;
    var chartElements;
    var marker;
    var markerSpan;
    var rowLabel;
    var svg;
    var svgNS;
    var gantt;
    var ganttUnit;
    var ganttWidth;
    var timespan;
    var xCoord;
    var yCoord;
    var container = document.getElementById('chart_div');

    // initialize chart elements
    baseline = null;
    gantt = null;
    rowLabel = null;
    svg = null;
    svgNS = null;
    chartElements = container.getElementsByTagName('svg');
    if (chartElements.length > 0) {
      svg = chartElements[0];
      svgNS = svg.namespaceURI;
    }
    chartElements = container.getElementsByTagName('rect');
    if (chartElements.length > 0) {
      gantt = chartElements[0];
    }
    chartElements = container.getElementsByTagName('path');
    if (chartElements.length > 0) {
      Array.prototype.forEach.call(chartElements, function(path) {
        if ((baseline === null) && (path.getAttribute('fill') !== 'none')) {
          baseline = path;
        }
      });
    }
    chartElements = container.getElementsByTagName('text');
    if (chartElements.length > 0) {
      Array.prototype.forEach.call(chartElements, function(label) {
        if (label.textContent === markerRow) {
          rowLabel = label;
        }
      });
    }
    if ((svg === null) || (gantt === null) || (baseline === null) || (rowLabel === null) ||
        (markerDate.getTime() < dateRangeStart.min.getTime()) ||
        (markerDate.getTime() > dateRangeEnd.max.getTime())) {
      return;
    }

    // calculate placement
    ganttWidth = parseFloat(gantt.getAttribute('width'));
    baselineBounds = baseline.getBBox();
    timespan = dateRangeEnd.max.getTime() - dateRangeStart.min.getTime();
    ganttUnit = (ganttWidth - baselineBounds.x) / timespan;
    markerSpan = markerDate.getTime() - dateRangeStart.min.getTime();
    xCoord = (baselineBounds.x + (ganttUnit * markerSpan) - 4);
    yCoord = parseFloat(rowLabel.getAttribute('y'));

    // add marker
    if(markerText == null) {
      marker = document.createElementNS(svgNS, 'polygon');
      marker.setAttribute('fill', 'transparent');
      marker.setAttribute('stroke', '#ffeb3b');
      marker.setAttribute('stroke-width', '3');
      marker.setAttribute('points', xCoord + ',' + (yCoord - 10) + ' ' + (xCoord - 5) + ',' + yCoord + ' ' + (xCoord + 5) + ',' + yCoord);
    }
    else {
      var marker = document.createElementNS("http://www.w3.org/2000/svg", "text");
      var text = document.createTextNode(markerText);
      marker.setAttribute('x', xCoord);
      marker.setAttribute('y', yCoord);
      marker.setAttribute('fill', 'yellow');
      marker.appendChild(text);
    }

    svg.insertBefore(marker, rowLabel.parentNode);
  }
