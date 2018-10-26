// javascript app to connect to python app
function buildMetadata(sample) {
  var url = "/metadata/" + sample;

  d3.json(url).then(function(sampe){
    var sample_metadata = d3.select("#sample-metadata");
    sample_metadata.html("");
    Object.entries(sample).forEach(([key, value]) => {
      var row = sample_metadata.append("p");
      row.text(`${key}: ${value}`);
    });
  });
};

function buildCharts(sample) {
  var url = `/samples/$(sample)`;
  d3.json(url).then(function(data) {
    var xValues = data.bball_id;
    var yValues = data.sample_values;
    var tValues = data.bball_label;
    var mSize = data.sample_values;
    var mClrs = data.bball_id;

    var trace1 = {
      x: xValues,
      y: yValues,
      text: tValues,
      mode: 'markers',
      marker: {
        size: mSize,
        color: mClrs
      }
    };

    var data = [trace1];

    var layout = {
      xaxis: {title: "Baseball Team"}
    };
  
    Plotly.newPlot(`bubble`, data, layout);
  });
};

function init() {
  var selector = d3.select("#selDataset");
  d3.json("/teams").then((sampleTeams) => {
    sampleTeams.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    const firstSample = sampleTeams[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
};

function optionChanged(newSample) {
  buildCharts(newSample);
  buildMetadata(newSample);
};

init();