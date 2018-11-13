(function($) {
  "use strict"; // Start of use strict

  // Toggle the side navigation
  $("#sidebarToggle").on('click',function(e) {
    e.preventDefault();
    $("body").toggleClass("sidebar-toggled");
    $(".sidebar").toggleClass("toggled");
  });

  // Prevent the content wrapper from scrolling when the fixed side navigation hovered over
  $('body.fixed-nav .sidebar').on('mousewheel DOMMouseScroll wheel', function(e) {
    if ($(window).width() > 768) {
      var e0 = e.originalEvent,
        delta = e0.wheelDelta || -e0.detail;
      this.scrollTop += (delta < 0 ? 1 : -1) * 30;
      e.preventDefault();
    }
  });

  // Scroll to top button appear
  $(document).on('scroll',function() {
    var scrollDistance = $(this).scrollTop();
    if (scrollDistance > 100) {
      $('.scroll-to-top').fadeIn();
    } else {
      $('.scroll-to-top').fadeOut();
    }
  });

  // Smooth scrolling using jQuery easing
  $(document).on('click', 'a.scroll-to-top', function(event) {
    var $anchor = $(this);
    $('html, body').stop().animate({
      scrollTop: ($($anchor.attr('href')).offset().top)
    }, 1000, 'easeInOutExpo');
    event.preventDefault();
  });

})(jQuery); // End of use strict

//Function to get data and write results to document objects
function fetchWrite(url){
	fetch(url).then(function(response) {
	// Convert to JSON
	return response.json();
	}).then(function(j) {
		animiateValue("datasets",0,j.length,3000);
		var ud;
		var ctr = 0;
		//Write sets updated yesterday
    for(var i = 0; i < j.length; i++) {
      if(dateCheck(j[i]["last_update_date_data"],2)){
        ctr += 1;
      }
    }
		animiateValue("yesterday",0,ctr,3000);
    //reset counter
    ctr = 0;
    for(var i = 0; i < j.length; i++) {
      if(dateCheck(j[i]["last_update_date_data"],7)){
        ctr += 1;
      }
    }
    animiateValue("week",0,ctr,3000);
    //reset counter
    ctr = 0;
    for(var i = 0; i < j.length; i++) {
      if(dateCheck(j[i]["last_update_date_data"],30)){
        ctr += 1;
      }
    }
    animiateValue("month",0,ctr,3000);
    // Now Write number that has not been Updated, of course first reset crt
    crt = 0;
    for(var i = 0; i < j.length; i++) {
      if(j[i]["last_update_date_data"] === j[i]["creation_date"]){
        ctr += 1;
      }
    }
    animiateValue("neva",0,ctr,3000);
    //Now for Metadata
    for(var i = 0; i < j.length; i++) {
      mdComplete(j[i]["u_id"]);
    }
	});
}
//Function to check metadata completeness
function mdComplete(uid){
  var flag = 0;
  //Define Meatadata fields
  var ownershipMD = ["Data Owner","Data Steward","Data Source System","UDOT Division or Team"];
  var accuracyMD = ["Update Interval","Update Method","Update Description","Data Timeframe","Spatial Coverage","Data Processing Summary"];
  //fetch the dataset json
  fetch("https://dashboard.udot.utah.gov/api/views/metadata/v1/"+uid).then(function(response){
    return response.json();
  }).then(function(data){
    //iterate checking each metadata field
    var object = '';
    var value = '';
    var flag = 0;
    if(data.customFields === null){
      object = document.getElementById('none');
      value = Number(object.innerHTML);
      value += 1;
      object.innerHTML = value;
    }
    for(var i = 0; i < ownershipMD.length;i++){
      if(data.customFields["Ownership"][ownershipMD[i]] != undefined){
        flag += 1;
      }
    }
    for(var i = 0; i < accuracyMD.length;i++){
      if(data.customFields["Accuracy & Consistency"][accuracyMD[i]] != undefined){
        flag += 1;
      }
    }
    if(flag == ((ownershipMD.length)+(accuracyMD.length))){
      object = document.getElementById('docu');
      value = Number(object.innerHTML);
      value += 1;
      object.innerHTML = value;
    } else {
      object = document.getElementById('incom');
      value = Number(object.innerHTML);
      value += 1;
      object.innerHTML = value;
    }

  });
}
//Function checks if date falls in date range
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
// Function to animate counter and write into document
function animiateValue(id, start, end, duration){
	var range = end - start;
	var current = start;
	var increment = end > start ? 1: -1;
	var stepTime = Math.abs(Math.floor(duration / range));
	var obj = document.getElementById(id);
	var timer = setInterval(function(){
		current += increment;
		obj.innerHTML = current;
		if(current == end) {
			clearInterval(timer);
		}
	}, stepTime);
}
