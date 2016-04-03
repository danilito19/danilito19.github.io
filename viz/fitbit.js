function mungeHrData(d){
  //delete empty key
  delete d[''];
  //coerce hr into number
  d.hr = +d.hr;
  //transform date string into date literal
  d.time = new Date(d.time);
  return d;
}

function mungeStepsData(d){
  //delete empty key
  delete d[''];
  //coerce hr into number
  d.steps = +d.steps;
  //transform date string into date literal
  d.time = new Date(d.time);
  return d;
}

// d3.csv('../data/hr_data.csv', mungeHrData, function(err, hrData) {
d3.csv('../data/steps_data.csv', mungeStepsData, function(err, stepsData) {
  // hrData = hrData.slice(30000).filter(function(d) {return d.hr > 0;});

  var chartData = [
    {
      'key': 'Steps per Day',
      'bar': true,
      'values': stepsData.map(function(d) {
        return {
          x: d.time,
          y: d.steps
        }
      })
    }
  ];

  console.log('heres the data', chartData);


    var chart;
    nv.addGraph(function() {
        chart = nv.models.linePlusBarChart()
            .margin({top: 50, right: 60, bottom: 30, left: 100})
            .color(d3.scale.category10().range());
        chart.xAxis.tickFormat(function(d) {
                return d3.time.format('%x')(new Date(d))
            })
            .showMaxMin(false);
        chart.y1Axis.tickFormat(function(d) { return d3.format(',s')(d) + ' Steps' });
        chart.bars.forceY([0]).padData(false);
        chart.x2Axis.tickFormat(function(d) {
            return d3.time.format('%x')(new Date(d))
        }).showMaxMin(false);
        d3.select('#chart1 svg')
            .datum(chartData)
            .transition().duration(500).call(chart);
        nv.utils.windowResize(chart.update);
        chart.dispatch.on('stateChange', function(e) { nv.log('New State:', JSON.stringify(e)); });
        return chart;
    });
});
    