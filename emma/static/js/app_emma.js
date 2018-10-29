 
function buildPanel1(team) {

  // @TODO: Complete the following function that builds the metadata panel
  // Create the url for team info
  var team_url_1 = "./baseballteam/" + team;

  // Use `.html("") to clear any existing team info
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

};  



function buildPanel2(team) {

    // @TODO: Complete the following function that builds the metadata panel
    // Create the url for metadata
    var team_url_2 = "./baseballteam/" + team;

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

function packagedata(team1, team2){
  buildradarplot(team1, team2);
}

function buildradarplot(team1, team2){
  // Create the url for team stat
  console.log("load team stat")
  var team_url_1 = "./baseballstat/" + team1 + ".json";
  var team_url_2 = "./baseballstat/" + team2 + ".json";
  console.log(team_url_1);
  console.log(team_url_2);
  // clear any existing team info
  test = d3.json(team_url_1, function(json){
    console.log(json);
  });
  /*d3.json(team_url_1).then(function(data){
    obj = JSON.parse(data);
  });*/
  console.log(test);
}




function buildCharts(sample) {
  // Create the url for sample data
  const sample_url = "./samples/" + sample;  
  console.log(sample_url);
}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.selectAll("#selDataset1");
  
  // Use the list of sample names to populate the select options
  showedteamnames = [];
  //console.log(selector);
  d3.json("/teams").then((teamNames) => {
    
    teamNames.forEach((team) => {
      selector
        .append("option")
        .text(team)
        .property("value", team);
    });
    console.log(teamNames);
    // Use the first sample from the list to build the initial plots
    var FirstTeam = teamNames[0];
    showedteamnames.push(FirstTeam);
    var SecondTeam = teamNames[1];
    showedteamnames.push(SecondTeam);

    //buildCharts(FirstTeam);
    buildPanel1(FirstTeam);
    buildPanel2(SecondTeam);
    packagedata(FirstTeam, SecondTeam);
    //console.log('in init FirstTeam');
    //console.log(showedteamnames);
    //console.log('in init SecondTeam');
    //console.log(showedteamnames);
    
  }); 
  
}

function optionChanged_1(newTeam) {
  // Fetch new data each time a new sample is selected
  showedteamnames[0] = newTeam;
  buildPanel1(showedteamnames[0]);
  buildradarplot(showedteamnames[0], showedteamnames[1]);
}

function optionChanged_2(newTeam) {
  // Fetch new data each time a new sample is selected
  showedteamnames[1] = newTeam;
  buildPanel2(showedteamnames[1]);
  buildradarplot(showedteamnames[0], showedteamnames[1]);
}

// Initialize the dashboard
init();