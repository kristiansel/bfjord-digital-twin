import {Highcharts} from './highcharts';

/*
The purpose of this demo is to demonstrate how multiple charts on the same page
can be linked through DOM and Highcharts events and API methods. It takes a
standard Highcharts config with a small variation for each data set, and a
mouse/touch event handler to bind the charts together.
*/

/**
 * In order to synchronize tooltips and crosshairs, override the
 * built-in events with handlers defined on the parent element.
 */
const events = ['mousemove', 'touchmove', 'touchstart'];
events.forEach(eventType => {
  document.getElementById('container2')!.addEventListener(
    eventType,
    e => {
      let chart;
      let point;
      let i;
      let event;

      for (i = 0; i < Highcharts.charts.length; i = i + 1) {
        chart = Highcharts.charts[i];
        // Find coordinates within the chart
        event = (chart as any).pointer.normalize(e);
        // Get the hovered point
        point = (chart.series[0] as any).searchPoint(event, true);

        if (point) {
            point.highlight(e);
        }
      }
    }
  );
});

/**
 * Override the reset function, we don't need to hide the tooltips and
 * crosshairs.
 */
(Highcharts as any).Pointer.prototype.reset = () => {
  return undefined;
};

/**
 * Highlight a point by showing tooltip, setting hover state and draw crosshair
 */
(Highcharts as any).Point.prototype.highlight = function (event: any) {
  event = this.series.chart.pointer.normalize(event);
  this.onMouseOver(); // Show the hover marker
  this.series.chart.tooltip.refresh(this); // Show the tooltip
  this.series.chart.xAxis[0].drawCrosshair(event, this); // Show the crosshair
};

/**
 * Synchronize zooming through the setExtremes event handler.
 */
function syncExtremes(this: any, e: any) {
  const thisChart = (this as any).chart;

  if (e.trigger !== 'syncExtremes') { // Prevent feedback loop
    (Highcharts as any).each(Highcharts.charts, (chart: any) => {
      if (chart !== thisChart) {
        if (chart.xAxis[0].setExtremes) { // It is null while updating
          chart.xAxis[0].setExtremes(
            e.min,
            e.max,
            undefined,
            false,
            { trigger: 'syncExtremes' }
          );
        }
      }
    });
  }
}

// Get the data. The contents of the data file can be viewed at
fetch('assets/plotdata.json')
  .then(response => response.json())
  .then(activity => { 
    activity.datasets.forEach((dataset: any, i: number) => {

      // Add X values
      dataset.data = Highcharts.map(dataset.data, (val: any, j: number) => {
        return [activity.xData[j], val];
      });

      const chartDiv = document.createElement('div');
      chartDiv.className = 'chart';
      document.getElementById('container2')!.appendChild(chartDiv);

      Highcharts.chart(chartDiv, {
        chart: {
          marginLeft: 40, // Keep all charts left aligned
          spacingTop: 20,
          spacingBottom: 20,
          height: 200
        },
        title: {
          text: dataset.name,
          align: 'left',
          margin: 0,
          x: 30
        },
        credits: {
          enabled: false
        },
        legend: {
          enabled: false
        },
        xAxis: {
          crosshair: true,
          events: {
            setExtremes: syncExtremes
          },
          // labels: {
          //   format: '{value} km'
          // },
          type: 'datetime'
        },
        yAxis: {
          title: {
            text: null
          }
        },
        tooltip: {
          positioner(this: any) {
            return {
              // right aligned
              x: this.chart.chartWidth - this.label.width,
              y: 10 // align to title
            };
          },
          borderWidth: 0,
          backgroundColor: 'none',
          pointFormat: '{point.y}',
          headerFormat: '',
          shadow: false,
          style: {
            fontSize: '18px'
          },
          valueDecimals: dataset.valueDecimals
        },
        series: [{
          data: dataset.data,
          name: dataset.name,
          type: dataset.type,
          color: Highcharts.getOptions().colors[i],
          fillOpacity: 0.3,
          tooltip: {
            valueSuffix: ' ' + dataset.unit
          }
        }]
      });
    })
});