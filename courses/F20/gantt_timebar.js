  function addTimebar(markerDate, dateRangeStart, dateRangeEnd, options) {
    var chartElements;
    var markerLabel;
    var markerLine;
    var markerSpan;
    var svg;
    var timeline;
    var timelineUnit;
    var timelineWidth;
    var timespan;

    var formatDate = new google.visualization.DateFormat({
      pattern: 'MMM dd (hh:mm aa)'
    });

    var container = document.getElementById('chart_div');

    timeline = null;
    svg = null;
    markerLabel = null;
    chartElements = container.getElementsByTagName('svg');
    if (chartElements.length > 0) {
      svg = chartElements[0];
    }
    chartElements = container.getElementsByTagName('rect');
    if (chartElements.length > 0) {
      timeline = chartElements[0];
    }
    chartElements = container.getElementsByTagName('path');
    bboxmin = chartElements[0].getBBox().x;
    for(i = 0; i < chartElements.length; i++) {
      if(chartElements[i].getBBox().x < bboxmin) {
        bboxmin = chartElements[i].getBBox().x;
      }
    }
    chartElements = container.getElementsByTagName('text');
    if (chartElements.length > 0) {
      markerLabel = chartElements[0].cloneNode(true);
    }
    if ((svg === null) || (timeline === null) || (markerLabel === null) ||
        (markerDate.getTime() < dateRangeStart.min.getTime()) ||
        (markerDate.getTime() > dateRangeEnd.max.getTime())) {
      return;
    }

    // calculate placement
    timelineWidth = parseFloat(timeline.getAttribute('width'));
    timespan = dateRangeEnd.max.getTime() - dateRangeStart.min.getTime();
    timelineUnit = (timelineWidth - bboxmin) / timespan;
    markerSpan = markerDate.getTime() - dateRangeStart.min.getTime();

    // add label
    markerLabel.setAttribute('fill', '#e91e63');
    markerLabel.setAttribute('y', 10);//options.height);
    markerLabel.setAttribute('x', (bboxmin + (timelineUnit * markerSpan)-58));
    var now = new Date();

    markerLabel.textContent = formatDate.formatValue(now);
    svg.appendChild(markerLabel);

    // add line
    markerLine = timeline.cloneNode(true);
    markerLine.setAttribute('y', 10);
    markerLine.setAttribute('x', (bboxmin + (timelineUnit * markerSpan)));
    markerLine.setAttribute('height', options.height);
    markerLine.setAttribute('width', 1);
    markerLine.setAttribute('stroke', 'none');
    markerLine.setAttribute('stroke-width', '0');
    markerLine.setAttribute('fill', '#e91e63');
    svg.appendChild(markerLine);
  }
