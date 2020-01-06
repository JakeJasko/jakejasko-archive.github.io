// Initialize some variables
const myWeekPage = "my_week";

const initButtons = [
	".left-pane-my-week",
	".surface-my-week",
	".prev-week-button",
	".next-week-button",
	".back-to-this-week"
	];
		
const sectionNames = [
	"Previous weeks",
	"Earlier this week",
	"Today",
	"Upcoming",
	"Without a date",
	"Done"
	];
	
let currentFilter = "OFF";

function activeBoard(){
	// location.href
	// example: "https://coastalcomm.monday.com/boards/273661411/"
	// regex: (?<=boards\/)(.*?)(?=\/)
	// location.href.match('(?<=boards\/)(.*?)(?=\/)')[0];
	
	const regex = '(?<=boards\/)(.*?)(?=\/)';
	let boardID = 0;
	try{
		boardID = location.href.match(regex)[0];
	}catch(error){
		console.log("Error: No active board. Error: " + error);
	}
	
	return boardID;
}

function folderPath(){
	const regex = '((\\\\CCIDC1\\)|(N:\\))(.*)(?=\d)';
	const path = $(".description-line>.text-content").text();
	
	if(path.indexOf(regex)){
		return path;
	}else{
		return "No Valid Path";
	}
}

function hideTasks(filterType){
	if(filterType === "OFF"){ return; }
	console.log("Hiding: " + filterType);
	
	// Hide section headers with no Tasks
	
	
	// Hide individual task elements
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
	console.log("Showing all tasks.")
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
	console.log("Registering buttons...");
	
	// jQuery multiple select -> button1, button2, etc..
	$(initButtons.join(',')).click(function(){
			setTimeout(init,50);
		});
	
	// Register collapse button to refresh filter instead of re-initializing
	$(".section-type-container").click(function(){
		console.log("re-hide after collapse...");
		setTimeout(function(){
				hideTasks(currentFilter);
		}, 50);
	});
}

function init(){
	console.log("Checking for page load...");
	if($(".person-filter-button-wrapper").length === 0){
		// console.log("No person filter, re-initializing.");
		setTimeout(init,50);
		return;
	}
	
	console.log("Page loaded, initializing...");
	if(location.href.includes(myWeekPage)){
		inject();
		hideTasks("TC");
	}

	registerButtons();
	
	/* // Dumb assume loaded after 3 seconds
	setTimeout(function() {
		if(location.href.includes(myWeekPage)){
			inject();
			hideTasks("TC");
		}

		registerButtons();
	}, 2000); // 3000
	*/
}

init();
