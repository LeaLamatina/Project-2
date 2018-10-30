 function buildPanel1(team) {

  // @TODO: Complete the following function that builds the metadata panel
  // Create the url for team info
  var team_url_1 = "./baseballteam/" + team;
  //console.log(team_url_1)
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
  //console.log("load team stat")
  var team_url = "./baseballstat/teamstat.json";
  //console.log(team_url);
  
  d3.select('#radarplot').html('');
  
  // clear any existing team info
  d3.json(team_url).then(function(json){
    team = json['Tm'];
    //console.log(team);
    var team_1_idx = team.indexOf(team1);
    //console.log(team_1_idx);
    var team_2_idx = team.indexOf(team2);
    //console.log(team_2_idx);
    
    var Bat_BA_arr = json['Bat_BA'];
    var Bat_OBP_arr = json['Bat_OBP'];
    var Bat_SLG_arr = json['BatSLG'];
    var Bat_OPS_arr = json['Bat_OPS'];

    var Bat_BA_range = [Math.min(...Bat_BA_arr), Math.max(...Bat_BA_arr)];
    var Bat_OBP_range = [Math.min(...Bat_OBP_arr), Math.max(...Bat_OBP_arr)];
    var Bat_SLG_range = [Math.min(...Bat_SLG_arr), Math.max(...Bat_SLG_arr)];
    var Bat_OPS_range = [Math.min(...Bat_OPS_arr), Math.max(...Bat_OPS_arr)];
    //console.log(Bat_BA_range);
    //console.log(Bat_OBP_range);
    //console.log(Bat_SLG_range);
    //console.log(Bat_OPS_range);

    var team_1_data = [
                  (json['Bat_BA'][team_1_idx] - Bat_BA_range[0])/(Bat_BA_range[1] - Bat_BA_range[0])*100, 
                  (json['Bat_OBP'][team_1_idx] - Bat_OBP_range[0])/(Bat_OBP_range[1] - Bat_OBP_range[0])*100, 
                  (json['BatSLG'][team_1_idx] - Bat_SLG_range[0])/(Bat_SLG_range[1] - Bat_SLG_range[0])*100, 
                  (json['Bat_OPS'][team_1_idx] - Bat_OPS_range[0])/(Bat_OPS_range[1] - Bat_OPS_range[0])*100
                ];
    //console.log(team_1_data);
    var team_2_data = [
                  (json['Bat_BA'][team_2_idx] - Bat_BA_range[0])/(Bat_BA_range[1] - Bat_BA_range[0])*100, 
                  (json['Bat_OBP'][team_2_idx] - Bat_OBP_range[0])/(Bat_OBP_range[1] - Bat_OBP_range[0])*100, 
                  (json['BatSLG'][team_2_idx] - Bat_SLG_range[0])/(Bat_SLG_range[1] - Bat_SLG_range[0])*100, 
                  (json['Bat_OPS'][team_2_idx] - Bat_OPS_range[0])/(Bat_OPS_range[1] - Bat_OPS_range[0])*100
    ];
    //console.log(team_2_data);

  
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
    batter = json;
    
  });
}

// bulid plot for batter
function build3Dscatterplot(){
  // Create the url for team stat
  //console.log("load batter stat")
  var batter_url = "./baseballstat/batterstat.json";
  //console.log(batter_url);
  
  d3.select('#scatterplot').html('');
  // clear any existing team info
  d3.json(batter_url).then(function(json){

    //console.log(json);
    var x = json['RBI'];
    var y = json['HR'];
    var z = json['H'];
    var Team = json['Tm'];
    var player = json['Player'];

    //console.log(x);
    //console.log(y);
    //console.log(z);
    //console.log(Team); 

    
    // plot.ly make 3D scatter plot
    var data = [
      {
      x: x, 
      y: y, 
      z: z,
      mode: 'markers',
      hoverinfo: 'text',
      hovertext: player,
      transforms: [{
        type: 'groupby',
        groups: Team,
      }],
      marker: {
                size: 8,
                line: {
                  color: 'rgb(204, 204, 204)',
                  width: 0.1 
                },
                opacity: 0.6
      },
      type: 'scatter3d'
    }];

    var layout = {
      scene:{
        xaxis: {title: 'RBI'},
        yaxis: {title: 'HR'},
        zaxis: {title: 'H'},
      },

      margin: {
      l: 0,
      r: 0,
      b: 0,
      t: 0
    }};

    Plotly.newPlot('scatterplot', data, layout);
    

  });
}
//function that generates index for teammate
function getAllIndexes(arr, val) {
  var indexes = [], i = -1;
  while ((i = arr.indexOf(val, i+1)) != -1){
      indexes.push(i);
  }
  return indexes;
}
//function for selecting multiple player by their team
function extractAllIndexes(arr, idxs) {
  var results = [];
  for(var i = 0; i < idxs.length; i++){
    results.push(arr[idxs[i]]);

  }
  return results;
}

function build3Dscatterplotteam(team1, team2){
  // Create the url for team stat
  //console.log("load batter stat")
  var batter_url = "./baseballstat/batterstat.json";
  //console.log(batter_url);
  
  d3.select('#scatterplot').html('');
  // clear any existing team info
  d3.json(batter_url).then(function(json){

    //console.log(json);

    team = json['Tm'];
    
    //console.log(team);
    var team_1_idx = getAllIndexes(team, team1);
    //console.log(team_1_idx);
    var team_2_idx = getAllIndexes(team, team2);
    //console.log(team_2_idx);

    var x_1 = extractAllIndexes(json['RBI'], team_1_idx);
    var y_1 = extractAllIndexes(json['HR'], team_1_idx);
    var z_1 = extractAllIndexes(json['H'], team_1_idx);
    var player_1 = extractAllIndexes(json['Player'], team_1_idx);
    
    var x_2 = extractAllIndexes(json['RBI'], team_2_idx);
    var y_2 = extractAllIndexes(json['HR'], team_2_idx);
    var z_2 = extractAllIndexes(json['H'], team_2_idx);
    var player_2 = extractAllIndexes(json['Player'], team_2_idx);
    
    //console.log(x_1);
    //console.log(x_2);

    // plot.ly make 3D scatter plot
    var team_1_batter_data = {
      name: team1,
      x: x_1, 
      y: y_1, 
      z: z_1,
      mode: 'markers',
      hoverinfo: 'text',
      hovertext: player_1,  
      marker: {
                size: 8,
                line: {
                  color: 'rgb(204, 204, 204)',
                  width: 0.1 
                },
                opacity: 0.6
      },
      type: 'scatter3d'
    };

    var team_2_batter_data = {
      name: team2, 
      x: x_2, 
      y: y_2, 
      z: z_2,
      mode: 'markers',
      hoverinfo: 'text',
      hovertext: player_2,
      marker: {
                color: 'rgb(127, 127, 127)',
                size: 8,
                line: {
                  color: 'rgb(204, 204, 204)',
                  width: 0.1 
                },
                opacity: 0.6
      },
      type: 'scatter3d'
    };

    var data = [team_1_batter_data, team_2_batter_data];

    var layout = {
      scene:{
        xaxis: {title: 'RBI'},
        yaxis: {title: 'HR'},
        zaxis: {title: 'H'},
      },

      margin: {
      l: 0,
      r: 0,
      b: 0,
      t: 0
    }};

    Plotly.newPlot('scatterplot', data, layout);
    

  });
}

// function for standardDeviation
function standardDeviation(values){
  var avg = average(values);
  
  var squareDiffs = values.map(function(value){
    var diff = value - avg;
    var sqrDiff = diff * diff;
    return sqrDiff;
  });
  
  var avgSquareDiff = average(squareDiffs);

  var stdDev = Math.sqrt(avgSquareDiff);
  return stdDev;
}

function average(data){
  var sum = data.reduce(function(sum, value){
    return sum + value;
  }, 0);

  var avg = sum / data.length;
  return avg;
}
function arraymuliply(array1, array2){
  var results = [];
  for (i = 0; i< array1.length; i ++){
    results.push(array1[i]* array2[i]);
  }
  return results;
}
function arraydivide(array1, array2){
  var results = [];
  for (i = 0; i< array1.length; i ++){
    results.push(array1[i]/array2[i]);
  }
  return results;
}

// bulid plot for batter
function buildbarplot(team1, team2){
  // Create the url for team stat
  console.log("load batter stat")
  var pitcher_url = "./baseballstat/pitcherstat.json";
  console.log(pitcher_url);
  
  d3.select('#barplot').html('');

  // clear any existing team info
  d3.json(pitcher_url).then(function(json){
    console.log('start barplot')
    
    var start_p = [];
    var not_start_p = [];
    json['GS'].map((value, index) => {
      if (value > 0){
        start_p.push(index);
      } else {
        not_start_p.push(index);
      }
    });
    console.log(start_p);
    console.log(not_start_p);

    team = json['Tm'];
    var team_1_idx = getAllIndexes(team, team1);
    console.log(team_1_idx);
    var team_2_idx = getAllIndexes(team, team2);
    console.log(team_2_idx);
    
    let team_1_start_p = start_p.filter(v => team_1_idx.includes(v));
    let team_1_not_start_p = not_start_p.filter(v => team_1_idx.includes(v));
    let team_2_start_p = start_p.filter(v => team_2_idx.includes(v));
    let team_2_not_start_p = not_start_p.filter(v => team_2_idx.includes(v));

    var t1_sp_ERA = extractAllIndexes(json['ERA'], team_1_start_p);
    var t1_nsp_ERA = extractAllIndexes(json['ERA'], team_1_not_start_p);
    var t2_sp_ERA = extractAllIndexes(json['ERA'], team_2_start_p);
    var t2_nsp_ERA = extractAllIndexes(json['ERA'], team_2_not_start_p);
    
    console.log(t1_sp_ERA);
    console.log(t1_nsp_ERA);
    console.log(t2_sp_ERA);
    console.log(t2_nsp_ERA);
    
    t1_sp_ERA_mean = average(t1_sp_ERA);
    t1_nsp_ERA_mean = average(t1_nsp_ERA);
    t2_sp_ERA_mean = average(t2_sp_ERA);
    t2_nsp_ERA_mean = average(t2_nsp_ERA);

    console.log(t1_sp_ERA_mean);
    console.log(t1_nsp_ERA_mean);
    console.log(t2_sp_ERA_mean);
    console.log(t2_nsp_ERA_mean);

    t1_sp_ERA_sem = standardDeviation(t1_sp_ERA) / Math.sqrt(t1_sp_ERA.length);
    t1_nsp_ERA_sem = standardDeviation(t1_nsp_ERA) / Math.sqrt(t1_nsp_ERA.length);
    t2_sp_ERA_sem = standardDeviation(t2_sp_ERA) / Math.sqrt(t2_sp_ERA.length);
    t2_nsp_ERA_sem = standardDeviation(t2_nsp_ERA) / Math.sqrt(t2_nsp_ERA.length);

    console.log(t1_sp_ERA_sem);
    console.log(t1_nsp_ERA_sem);
    console.log(t2_sp_ERA_sem);
    console.log(t2_nsp_ERA_sem);

    // plot.ly make bar plot
    var trace1 = {
      x: ['Starting Pitcher', 'Relief Pitcher'],
      y: [t1_sp_ERA_mean, t1_nsp_ERA_mean],
      name: team1,
      error_y: {
        type: 'data',
        array: [t1_sp_ERA_sem, t1_nsp_ERA_sem],
        visible: true
      },
      type: 'bar'
    };
    var trace2 = {
      x: ['Starting Pitcher', 'Relief Pitcher'],
      y: [t2_sp_ERA_mean, t2_nsp_ERA_mean],
      name: team2,
      error_y: {
        type: 'data',
        array: [t2_sp_ERA_sem, t2_nsp_ERA_sem],
        visible: true
      },
      type: 'bar'
    };
    var data = [trace1, trace2];
    var layout = {barmode: 'group'};
    Plotly.newPlot('barplot', data, layout);

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
    build3Dscatterplot();
    buildbarplot(FirstTeam, SecondTeam);
    
  }); 
  
}

function optionChanged_1(newTeam) {
  // Fetch new data each time a new sample is selected
  showedteamnames[0] = newTeam;
  buildPanel1(showedteamnames[0]);
  buildradarplot(showedteamnames[0], showedteamnames[1]);
  build3Dscatterplotteam(showedteamnames[0], showedteamnames[1]);
  buildbarplot(showedteamnames[0], showedteamnames[1]);
}

function optionChanged_2(newTeam) {
  // Fetch new data each time a new sample is selected
  showedteamnames[1] = newTeam;
  buildPanel2(showedteamnames[1]);
  buildradarplot(showedteamnames[0], showedteamnames[1]);
  build3Dscatterplotteam(showedteamnames[0], showedteamnames[1]);
  buildbarplot(showedteamnames[0], showedteamnames[1]);
}

function scatterplotreset(){
  build3Dscatterplot();
}

// Initialize the dashboard
init();