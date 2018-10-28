 
function buildPanel1(team) {

  // @TODO: Complete the following function that builds the metadata panel
  // Create the url for metadata
  var team_url_1 = "./baseball/" + team;

  // Use `.html("") to clear any existing metadata
  d3.select('#panel-one').html('');
  

  // Use `d3.json` to fetch the metadata for a sample
  d3.json(team_url_1).then(function(data) {
    //console.log(data);
    //console.log(data['Tm']);
    
    var teamdata1 = d3.select("#panel-one");
    
  
    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(data).forEach(([key, value]) => {
      //var cell = teamdata.append("p");
      teamdata1.append("p").text(key + ": " + value);      
    });
  });
}

  
function buildPanel2(team) {

    // @TODO: Complete the following function that builds the metadata panel
    // Create the url for metadata
    var team_url_2 = "./baseball/" + team;

    // Use `.html("") to clear any existing metadata
    
    d3.select('#panel-two').html('');
    // Use d3 to select the panel with id of `#teaminfo`
    // console.log('team2')
    // console.log(team)
    // console.log(team_url)
    
    // Use `d3.json` to fetch the metadata for a sample
    d3.json(team_url_2).then(function(data) {
      //console.log(data);
      //console.log(data['Tm']);
      

      var teamdata2 = d3.select("#panel-two");
    
      // Use `Object.entries` to add each key and value pair to the panel
      // Hint: Inside the loop, you will need to use d3 to append new
      // tags for each key-value in the metadata.
      Object.entries(data).forEach(([key, value]) => {
        //var cell = teamdata.append("p");

        teamdata2.append("p").text(key + ": " + value);
      });

    });

    
    
  }



function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.selectAll("#selDataset1");
  
  // Use the list of sample names to populate the select options

  //console.log(selector);
  d3.json("/teams").then((teamNames) => {
    teamNames.forEach((team) => {
      selector
        .append("option")
        .text(team)
        .property("value", team);
    });
  
    // Use the first sample from the list to build the initial plots
    var firstTeam = teamNames[0];
    var SecondTeam = teamNames[1];
    
    console.log('in init firstTeam');
    console.log(firstTeam);
    console.log('in init SecondTeam');
    console.log(SecondTeam);
    
    //buildCharts(firstTeam);
    buildPanel1(firstTeam);
    buildPanel2(SecondTeam);
  });
}

function optionChanged_1(newTeam) {
  // Fetch new data each time a new sample is selected
  // buildCharts(newTeam);
  buildPanel1(newTeam);
}

function optionChanged_2(newTeam) {
  // Fetch new data each time a new sample is selected
  // buildCharts(newTeam);
  buildPanel2(newTeam);
}



// Initialize the dashboard
init();
