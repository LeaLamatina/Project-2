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
  
}