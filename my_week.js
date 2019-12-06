const apikey = "";

var currentFilter = "OFF";

function hideTasks(filterType){
	$(".column-title > div > span").not(":contains('" + filterType + "')").each(function(i){$(this).parents().eq(5).hide();});

	/* Notification
	try{
		$(".section-type-container").notify("Non-TC Tasks Hidden", {position: "right"});
	}catch(err){
		console.log(err.message);
	}
	*/

	currentFilter = filterType;

	$('#injected-toggle').text("[Filter by Status: " + filterType + "]");
	$('#injected-toggle').css("background-color", "rgb(221, 255, 221)");
}

function unhideTasks(filterType){
	$(".column-title > div > span").not(":contains('" + filterType + "')").each(function(i){$(this).parents().eq(5).show();});

	/* Notification
	try{
		$(".section-type-container").notify("Non-TC Tasks Shown", {position: "right"});
	}catch(err){
		console.log(err.message);
	}
	*/

	currentFilter = "OFF";

	$('#injected-toggle').text("[Filter by Status: OFF]");
	$('#injected-toggle').css("background-color", "rgb(255, 232, 232)");
}

function inject(){
	if($("#injected-task-filter").length === 0){
		$(".person-filter-button-wrapper").first().append("<span id='injected-task-filter'><a id='injected-toggle' href='javascript:void(0)'>[Toggle Filter]</a></span>");
	}

	$('#injected-toggle').click(function(){
		if(currentFilter === "OFF"){
			hideTasks("TC");
		}else if(currentFilter === "TC"){
			unhideTasks("TC");
			hideTasks("Drafting");
		}else if(currentFilter === "Drafting"){
			unhideTasks("Drafting");
		}
	});
}

function registerButtons(){

	$(".left-pane-my-week").click(function(){
		init();
	});

	$(".prev-week-button").click(function(){
		init();
	});

	$(".next-week-button").click(function(){
		init();
	});

	$(".back-to-this-week").click(function(){
		init();
	});
}


function init(){
	setTimeout(function() {
		inject();
		hideTasks("TC");

		registerButtons();
	}, 3000);
}

init();
