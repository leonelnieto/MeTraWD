//Function to append to tables
function tabbleAppend(id,url){
  fetch(url).then(function(response){
    return response.json();
  }).then(function(j){
    var tbody ='';
    for(var x=0;x<j.length;x++){
      if(Number(j[x].visits) >= 100){
        tbody += '<tr><td><a href="'+j[x].dataset_link+'" target="new">'+j[x].name+'</a></td>';
        tbody += '<td>'+j[x].visits+'</td>';
        tbody += '<td>'+j[x].downloads+'</td>';
        tbody += '<td>'+j[x].owner+'</td>';
        tbody += '<td>'+dateTransform(j[x].creation_date)+'</td>';
        tbody += '<td>'+dateTransform(j[x].last_update_date_data)+'</td>';
        tbody += '</tr>';
      }
    }
    $("#"+id).append(tbody);
    // Call the dataTables jQuery plugin
    $(document).ready(function() {
      $('.table').DataTable();
    });
  });
}
function dateTransform(str){
    var datize = new Date(str);
    datize = datize.toDateString();
    return datize;
}
//All Datasets
function tabbleAppendAll(id,url){
  fetch(url).then(function(response){
    return response.json();
  }).then(function(j){
    var tbody ='';
    for(var x=0;x<j.length;x++){
      tbody += '<tr><td><a href="'+j[x].dataset_link+'" target="new">'+j[x].name+'</a></td>';
      tbody += '<td>'+j[x].visits+'</td>';
      tbody += '<td>'+j[x].downloads+'</td>';
      tbody += '<td>'+j[x].owner+'</td>';
      tbody += '<td>'+dateTransform(j[x].creation_date)+'</td>';
      tbody += '<td>'+dateTransform(j[x].last_update_date_data)+'</td>';
      tbody += '</tr>';
    }
    $("#"+id).append(tbody);
    // Call the dataTables jQuery plugin
    $(document).ready(function() {
      $('.table').DataTable();
    });
  });
}
function dateTransform(str){
    var datize = new Date(str);
    datize = datize.toDateString();
    return datize;
}
//Datasets Updated Yesterday
function tabbleAppendYesterday(id,url){
  fetch(url).then(function(response){
    return response.json();
  }).then(function(j){
    var tbody ='';
    for(var x=0;x<j.length;x++){
      if(dateCheck(j[x]["last_update_date_data"],2)){
        tbody += '<tr><td><a href="'+j[x].dataset_link+'" target="new">'+j[x].name+'</a></td>';
        tbody += '<td>'+j[x].visits+'</td>';
        tbody += '<td>'+j[x].downloads+'</td>';
        tbody += '<td>'+j[x].owner+'</td>';
        tbody += '<td>'+dateTransform(j[x].creation_date)+'</td>';
        tbody += '<td>'+dateTransform(j[x].last_update_date_data)+'</td>';
        tbody += '</tr>';
      }
    }
    $("#"+id).append(tbody);
    // Call the dataTables jQuery plugin
    $(document).ready(function() {
      $('.table').DataTable();
    });
  });
}
//Datasets Updated in the last 7 days
function tabbleAppendWeek(id,url){
  fetch(url).then(function(response){
    return response.json();
  }).then(function(j){
    var tbody ='';
    for(var x=0;x<j.length;x++){
      if(dateCheck(j[x]["last_update_date_data"],7)){
        tbody += '<tr><td><a href="'+j[x].dataset_link+'" target="new">'+j[x].name+'</a></td>';
        tbody += '<td>'+j[x].visits+'</td>';
        tbody += '<td>'+j[x].downloads+'</td>';
        tbody += '<td>'+j[x].owner+'</td>';
        tbody += '<td>'+dateTransform(j[x].creation_date)+'</td>';
        tbody += '<td>'+dateTransform(j[x].last_update_date_data)+'</td>';
        tbody += '</tr>';
      }
    }
    $("#"+id).append(tbody);
    // Call the dataTables jQuery plugin
    $(document).ready(function() {
      $('.table').DataTable();
    });
  });
}
//Datasets Updated in the last 30 days
function tabbleAppendMonth(id,url){
  fetch(url).then(function(response){
    return response.json();
  }).then(function(j){
    var tbody ='';
    for(var x=0;x<j.length;x++){
      if(dateCheck(j[x]["last_update_date_data"],30)){
        tbody += '<tr><td><a href="'+j[x].dataset_link+'" target="new">'+j[x].name+'</a></td>';
        tbody += '<td>'+j[x].visits+'</td>';
        tbody += '<td>'+j[x].downloads+'</td>';
        tbody += '<td>'+j[x].owner+'</td>';
        tbody += '<td>'+dateTransform(j[x].creation_date)+'</td>';
        tbody += '<td>'+dateTransform(j[x].last_update_date_data)+'</td>';
        tbody += '</tr>';
      }
    }
    $("#"+id).append(tbody);
    // Call the dataTables jQuery plugin
    $(document).ready(function() {
      $('.table').DataTable();
    });
  });
}
//Datasets Updated in the last 30 days
function tabbleAppendNever(id,url){
  fetch(url).then(function(response){
    return response.json();
  }).then(function(j){
    var tbody ='';
    for(var x=0;x<j.length;x++){
      if(j[x]["last_update_date_data"] === j[x]["creation_date"]){
        tbody += '<tr><td><a href="'+j[x].dataset_link+'" target="new">'+j[x].name+'</a></td>';
        tbody += '<td>'+j[x].visits+'</td>';
        tbody += '<td>'+j[x].downloads+'</td>';
        tbody += '<td>'+j[x].owner+'</td>';
        tbody += '<td>'+dateTransform(j[x].creation_date)+'</td>';
        tbody += '<td>'+dateTransform(j[x].last_update_date_data)+'</td>';
        tbody += '</tr>';
      }
    }
    $("#"+id).append(tbody);
    // Call the dataTables jQuery plugin
    $(document).ready(function() {
      $('.table').DataTable();
    });
  });
}
//Date Transform FUnction
function dateTransform(str){
    var datize = new Date(str);
    datize = datize.toDateString();
    return datize;
}
//Date check Function
function dateCheck(str,interval){
	//str is the data to check
	//interal is the number of day back from today to check
	//function return true of false
	var today = new Date();
	today.setHours(0,0,0);
	today.setDate(today.getDate()-interval);
	var date = new Date(str);
	if(date >= today) {
    return true;
	}else{
    return false;
	}
}
