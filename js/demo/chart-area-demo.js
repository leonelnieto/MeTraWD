// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#292b2c';

// Area Chart Example
var ctx = document.getElementById("myAreaChart").getContext("2d");
var gradientFill = ctx.createLinearGradient(500, 0, 100, 0);
gradientFill.addColorStop(0, "rgba(128, 182, 244, 0.6)");
gradientFill.addColorStop(1, "rgba(244, 144, 128, 0.6)");
var dataDomain = "https://dashboard.udot.utah.gov/resource/eqzg-rhke.json";
var dataQuery = "?$select=count(u_id),date_extract_y(creation_date)%20as%20year,date_extract_m(creation_date)%20as%20month"
dataQuery += "&$where=type=%22dataset%22%20and%20publication_stage=%22published%22&$group=year,month&$order=month&$having=year=2018";
var url =dataDomain+dataQuery;
fetch(url).then(function(response){
  return response.json();
}).then(function(j){
  var months = [];
  for(var x = 0; x < j.length; x++){
    if(Number(j[x].month) < 10){
        months.push("0"+j[x].month+"-"+j[x].year);
    }else{
        months.push(j[x].month+"-"+j[x].year);
    }
  }
  var data = [];
  for(var x = 0; x < j.length; x++){
    data.push(j[x].count_u_id);
  }
  var myLineChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: months,
        datasets: [{
          label: "Datasets",
          lineTension: 0.3,
          backgroundColor: gradientFill,
          borderColor: gradientFill,
          pointRadius: 5,
          pointBackgroundColor: gradientFill,
          pointBorderColor: gradientFill,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: gradientFill,
          pointHitRadius: 50,
          pointBorderWidth: 2,
          data: data,
        }],
      },
      options: {
        scales: {
          xAxes: [{
            time: {
              unit: 'date'
            },
            gridLines: {
              display: false
            },
            ticks: {
              maxTicksLimit: 7
            }
          }],
          yAxes: [{
            gridLines: {
              color: "rgba(0, 0, 0, .125)",
            }
          }],
        },
        legend: {
          display: false
        }
      }
    });
});
// Pie Charts// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#292b2c';

// Pie Chart Example
var ctx1 = document.getElementById("myPieChart").getContext("2d");
dataQuery = "?$select=category,count(u_id)%20as%20datasets";
dataQuery += "&$where=type=%22dataset%22%20and%20publication_stage=%22published%22%20and%20update_interval";
dataQuery +="%20is%20not%20null&$group=category&$order=datasets%20desc";
var colors = ["#488f31","#709d42","#92ac57","#b2bb6e","#ceca88","#e8daa4","#ffecc2","#f7d3a2","#f1b986","#ec9d6f","#e6805f","#de6155","#d43d51"]
fetch(dataDomain+dataQuery).then(function(response){
  return response.json();
}).then(function(j){
  var cats = [];
  for(var x = 0; x < j.length; x++){
    cats.push(j[x].category);
  }
  var data = [];
  for(var x = 0; x < j.length; x++){
    data.push(j[x].datasets);
  }
  var myPieChart = new Chart(ctx1, {
    type: 'pie',
    data: {
      labels: cats,
      datasets: [{
        data: data,
        backgroundColor: colors,
      }],
    },
    options: {
      legend:{
        display:false
      }
    }
  });
});
