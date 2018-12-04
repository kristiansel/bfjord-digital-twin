import './syncplots';

// tslint:disable:all
const Highcharts: any = require('highcharts');

fetch('assets/usdeur.json')
  .then(data => data.json())
  .then((data: Array<[number, number]>) => {
    const a = Highcharts.Color(Highcharts.getOptions().colors![0]) as any
    let endColorStr: string = '';
    if (a.setOpacity) {
      const b = a.setOpacity(0);
      if (b.get) { endColorStr = b.get('rgba'); }
    }
    Highcharts.chart('container', {
      chart: {
        zoomType: 'x'
      },
      title: {
        text: 'Bridge oscillation frequency'
      },
      subtitle: {
        text: document.ontouchstart === undefined ?
          'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
      },
      xAxis: {
        type: 'datetime'
      },
      yAxis: {
        title: {
          text: 'Frequency'
        }
      },
      legend: {
        enabled: false
      },
      plotOptions: {
        area: {
          fillColor: {
            linearGradient: {
              x1: 0,
              y1: 0,
              x2: 0,
              y2: 1
            },
            stops: [
              [0, Highcharts.getOptions().colors![0]],
              [1, endColorStr]
            ]
          },
          marker: {
            radius: 2
          },
          lineWidth: 1,
          states: {
            hover: {
              lineWidth: 1
            }
          },
          threshold: null
        }
      },

      series: [{
        type: 'area',
        name: 'Oscillation',
        data
      }]
    });
  })
