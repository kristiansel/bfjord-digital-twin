import {Highcharts} from './highcharts';

fetch('assets/usdeur.json')
  .then(data => data.json())
  .then((data: Array<[number, number]>) => {
    let dataCounter = 0;
    const seriesData = data.map(d => 5*d[1]);
    
    Highcharts.chart('container', {
      chart: {
        type: 'spline',
        animation: Highcharts.svg, // don't animate in old IE
        marginRight: 10,
        height: 250,
        events: {
          load(this: any) {
            // set up the updating of the chart each second
            const series = this.series[0];
            setInterval(() => {
              const x = (new Date()).getTime(); // current time
              // const y = Math.random(); // TODO: Add from actual series
              if (dataCounter < seriesData.length) {
                dataCounter = dataCounter + 1;
              } else {
                dataCounter = 0;
              }
              const i = dataCounter;
              const y = seriesData[i];

              series.addPoint([x, y], true, true);
            }, 1000);
          }
        }
      },
      time: {
        useUTC: false
      },
      title: {
        text: ''
      },
      xAxis: {
        type: 'datetime',
        tickPixelInterval: 150
      },
      yAxis: {
        title: {
          text: 'Wind speed (m/s)'
        },
        plotLines: [{
          value: 0,
          width: 1,
          color: '#808080'
        }]
      },
      tooltip: {
        headerFormat: '<b>{series.name}</b><br/>',
        pointFormat: '{point.x:%Y-%m-%d %H:%M:%S}<br/>{point.y:.2f}'
      },
      legend: {
        enabled: false
      },
      exporting: {
        enabled: false
      },
      series: [{
        name: 'Wind speed',
        // data: seriesData
        data: (() => {
          // generate an array of random data
          const myData = [];
          const time = (new Date()).getTime();
    
          for (let i = -19; i <= 0; i += 1) {
            myData.push({
              x: time + i * 1000,
              y: Math.random()
            });
          }
          return myData;
        })()
      }]
    }); // Highcharts.chart
  });