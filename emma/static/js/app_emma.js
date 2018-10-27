// function buildteamdata(team) {

//   // @TODO: Complete the following function that builds the metadata panel
//   // Create the url for metadata
//   const team_url = "./baseball/" + team;

//   // Use `.html("") to clear any existing metadata
//   d3.select('#panel-two').html('');
//   d3.select('#panel-one').html('');
//   // Use d3 to select the panel with id of `#teaminfo`
//   console.log(team_url)
  
//   // Use `d3.json` to fetch the metadata for a sample
//   d3.json(team_url).then(function(data) {
//     console.log(data);
//     console.log(data['Tm']);
    
//     teamdata1 = d3.select("#teaminfo");
    
//     // Use `Object.entries` to add each key and value pair to the panel
//     // Hint: Inside the loop, you will need to use d3 to append new
//     // tags for each key-value in the metadata.
//     Object.entries(data).forEach(([key, value]) => {
//       var cell = teamdata.append("p");
//       cell.text(key + ": " + value);
//     });

//   });
// }  
function buildPanel1(team) {

  // @TODO: Complete the following function that builds the metadata panel
  // Create the url for metadata
  const team_url = "./baseball/" + team;

  // Use `.html("") to clear any existing metadata
  d3.select('#panel-one').html('');
  
  // Use d3 to select the panel with id of `#teaminfo`
  console.log(team_url)
  
  // Use `d3.json` to fetch the metadata for a sample
  d3.json(team_url).then(function(data) {
    console.log(data);
    console.log(data['Tm']);
    
    teamdata = d3.select("#panel-one");
    
  
    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(data).forEach(([key, value]) => {
      //var cell = teamdata.append("p");
      teamdata.append("p").text(key + ": " + value);
      
    });

  });

  
  
}

  
  
  
  
  
  function buildPanel2(team) {

    // @TODO: Complete the following function that builds the metadata panel
    // Create the url for metadata
    const team_url = "./baseball/" + team;

    // Use `.html("") to clear any existing metadata
    
    d3.select('#panel-two').html('');
    // Use d3 to select the panel with id of `#teaminfo`
    console.log(team_url)
    
    // Use `d3.json` to fetch the metadata for a sample
    d3.json(team_url).then(function(data) {
      console.log(data);
      console.log(data['Tm']);
      

      teamdata = d3.select("#panel-two");
    
      // Use `Object.entries` to add each key and value pair to the panel
      // Hint: Inside the loop, you will need to use d3 to append new
      // tags for each key-value in the metadata.
      Object.entries(data).forEach(([key, value]) => {
        //var cell = teamdata.append("p");

        teamdata.append("p").text(key + ": " + value);
      });

    });

    
    
  }

/*



 
    
    y = []
    z = []
    var split = top10.map(function (k) {
      y.push(k[0]);
      z.push(k[1]);
    });
    console.log(y);
    console.log(z);

    // @TODO: Build a Pie Chart
    var data_pie = [{
      values: z,
      labels: y,
      type: "pie"
    }];

    Plotly.newPlot("pie", data_pie);

    // @TODO: Build a Bubble Chart using the sample data
    var data_bubble = [{
      x: data['otu_ids'],
      y: data['sample_values'],
      mode: 'markers',
      marker: {
        color: data['otu_ids'],
        size: data['sample_values'],
      }
    }];

    var layout = {
      title: 'Bubble Plot',
      showlegend: false,
    };

    Plotly.newPlot("bubble", data_bubble, layout);
  });

  console.log('end chart');

  const meta_url = "./metadata/" + sample;
  d3.json(meta_url).then(function(data) { 

    var data_WFREQ = data['WFREQ'];
    console.log("data_WFREQ");
    console.log(data_WFREQ);
    // @TODO: Build a Gauge Chart using the sample data

    // Enter a speed between 0 and 180
    var level = data_WFREQ*180/9;

    // Trig to calc meter point
    var degrees = 180 - level,
       radius = .5;
    var radians = degrees * Math.PI / 180;
    var x = radius * Math.cos(radians);
    var y = radius * Math.sin(radians);

    // Path: may have to change to create a better triangle
    var mainPath = 'M -.0 -0.025 L .0 0.025 L ',
        pathX = String(x),
        space = ' ',
        pathY = String(y),
        pathEnd = ' Z';
    var path = mainPath.concat(pathX,space,pathY,pathEnd);

    var data_gauge = [{ type: 'scatter',
    x: [0], y:[0],
    marker: {size: 28, color:'850000'},
    showlegend: false,
    name: 'speed',
    text: level,
    hoverinfo: 'text+name'},
    { values: [50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50],
    rotation: 90,
    text: ['8-9', '7-8', '6-7', '5-6', '4-5', '3-4', '2-3', '1-2', '0-1'],
    textinfo: 'text',
    textposition:'inside',
    marker: {colors:['rgba(14, 127, 0, .5)', 'rgba(41, 141, 28, .5)',
                          'rgba(68, 155, 57, .5)', 'rgba(94, 170, 85, .5)',
                          'rgba(121, 184, 113, .5)', 'rgba(148, 198, 142, .5)',
                          'rgba(175, 212, 170, .5)', 'rgba(201, 226, 198, .5)',
                          'rgba(228, 241, 227, .5)','rgba(255, 255, 255, 0)']},
    labels: ['8-9', '7-8', '6-7', '5-6', '4-5', '3-4', '2-3', '1-2', '0-1', ''],
    hoverinfo: 'label',
    hole: .5,
    type: 'pie',
    showlegend: false
    }];
    var layout = {
      shapes:[{
          type: 'path',
          path: path,
          fillcolor: '850000',
          line: {
            color: '850000'
          }
        }],
      title: '<b>Belly Button Washing Frequency</b> <br>Scrubs Per Week',
      height: 500,
      width: 500,
      xaxis: {zeroline:false, showticklabels:false,
                 showgrid: false, range: [-1, 1]},
      yaxis: {zeroline:false, showticklabels:false,
                 showgrid: false, range: [-1, 1]}
    };
    
    Plotly.newPlot('gauge', data_gauge, layout);
  });

  
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
}

*/

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.selectAll("#selDataset1");
  
  // Use the list of sample names to populate the select options

  console.log(selector);
  d3.json("/teams").then((teamNames) => {
    teamNames.forEach((team) => {
      selector
        .append("option")
        .text(team)
        .property("value", team);
    });
  
    // Use the first sample from the list to build the initial plots
    const firstTeam = teamNames[0];
    const SecondTeam = teamNames[1];
    console.log(firstTeam);
    //buildCharts(firstTeam);
    buildPanel1(firstTeam);
    buildPanel2(SecondTeam);
  });
}

function optionChanged(newTeam) {
  console.log(newTeam);
  
  // Fetch new data each time a new sample is selected
  // buildCharts(newTeam);
  buildPanel1(newTeam);
  buildPanel2(newTeam);
}



// Initialize the dashboard
init();