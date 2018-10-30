 function buildPanel1(team) {

  // @TODO: Complete the following function that builds the metadata panel
  // Create the url for team info
  var team_url_1 = "./baseballteam/" + team;
  console.log(team_url_1)
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

function buildradarplot(team1, team2){
  // Create the url for team stat
  console.log("load team stat")
  var team_url = "./baseballstat/teamstat.json";
  console.log(team_url);
  
  d3.select('#radarplot').html('');
  
  // clear any existing team info
  d3.json(team_url).then(function(json){
    team = json['Tm'];
    console.log(team);
    var team_1_idx = team.indexOf(team1);
    console.log(team_1_idx);
    var team_2_idx = team.indexOf(team2);
    console.log(team_2_idx);
    
    var Bat_BA_arr = json['Bat_BA'];
    var Bat_OBP_arr = json['Bat_OBP'];
    var Bat_SLG_arr = json['BatSLG'];
    var Bat_OPS_arr = json['Bat_OPS'];

    var Bat_BA_range = [Math.min(...Bat_BA_arr), Math.max(...Bat_BA_arr)];
    var Bat_OBP_range = [Math.min(...Bat_OBP_arr), Math.max(...Bat_OBP_arr)];
    var Bat_SLG_range = [Math.min(...Bat_SLG_arr), Math.max(...Bat_SLG_arr)];
    var Bat_OPS_range = [Math.min(...Bat_OPS_arr), Math.max(...Bat_OPS_arr)];
    console.log(Bat_BA_range);
    console.log(Bat_OBP_range);
    console.log(Bat_SLG_range);
    console.log(Bat_OPS_range);

    var team_1_data = [
                  (json['Bat_BA'][team_1_idx] - Bat_BA_range[0])/(Bat_BA_range[1] - Bat_BA_range[0])*100, 
                  (json['Bat_OBP'][team_1_idx] - Bat_OBP_range[0])/(Bat_OBP_range[1] - Bat_OBP_range[0])*100, 
                  (json['BatSLG'][team_1_idx] - Bat_SLG_range[0])/(Bat_SLG_range[1] - Bat_SLG_range[0])*100, 
                  (json['Bat_OPS'][team_1_idx] - Bat_OPS_range[0])/(Bat_OPS_range[1] - Bat_OPS_range[0])*100
                ];
    console.log(team_1_data);
    var team_2_data = [
                  (json['Bat_BA'][team_2_idx] - Bat_BA_range[0])/(Bat_BA_range[1] - Bat_BA_range[0])*100, 
                  (json['Bat_OBP'][team_2_idx] - Bat_OBP_range[0])/(Bat_OBP_range[1] - Bat_OBP_range[0])*100, 
                  (json['BatSLG'][team_2_idx] - Bat_SLG_range[0])/(Bat_SLG_range[1] - Bat_SLG_range[0])*100, 
                  (json['Bat_OPS'][team_2_idx] - Bat_OPS_range[0])/(Bat_OPS_range[1] - Bat_OPS_range[0])*100
    ];
    console.log(team_2_data);

  
    var data = [
      {
      type: 'scatterpolar',
      r: team_1_data,
      theta: ['Batting Average','On-base Percentage','Slugging Average', 'On-base + Slugging', 'Batting Average'],
      fill: 'toself',
      name: json['whole_name'][team_1_idx]
      },
      {
      type: 'scatterpolar',
      r: team_2_data,
      theta: ['Batting Average','On-base Percentage','Slugging Average', 'On-base + Slugging', 'Batting Average'],
      fill: 'toself',
      name: json['whole_name'][team_2_idx]
      }
    ]
    
    var layout = {
      polar: {
        radialaxis: {
          visible: true,
          range: [0, 100]
        }
      }
    }
    
    Plotly.newPlot("radarplot", data, layout)
    
    
  });
}

// bulid plot for batter
function buildbatterplot(){
  // Create the url for team stat
  console.log("load team stat")
  var team_url = "./baseballstat/batterstat.json";
  console.log(team_url);
  
  //d3.select('#radarplot').html('');
  
  // clear any existing team info
  d3.json(team_url).then(function(json){
    console.log(json)
    
  });
}


// bulid plot for batter
function buildpitcherplot(){
  // Create the url for team stat
  console.log("load team stat")
  var team_url = "./baseballstat/pitcherstat.json";
  console.log(team_url);
  
  //d3.select('#radarplot').html('');
  
  // clear any existing team info
  d3.json(team_url).then(function(json){
    console.log(json)
    team 
  });
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
    buildradarplot(FirstTeam, SecondTeam);
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