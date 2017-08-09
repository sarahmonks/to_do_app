/**********************************************************
* Author: Sarah Monks
* Assignment: WE4.0 Mobile Web Applications, Digital Skills Academy
* Student ID: D15126869
* Date : 2016/06/26
***********************************************************/

function addActivity(activityArray, actionType, taskName){
	//this function is used to add an activity to our activity list to display on the "history" or "activity log" page.
	//we take in the array, 
	//the actionType we take in as a parameter will be either 'added', 'completed' or 'deleted'

	//get the current time of our new activity so that we can display it in the acivity log.
	var currentdate = new Date();
	var hours = currentdate.getHours();
	var minutes = currentdate.getMinutes();
	var seconds = currentdate.getSeconds();
	
	if(hours < 10){
		hours = "0" + hours;
	}
	if(minutes < 10){
		minutes = "0" + minutes;
	}
	if(seconds < 10){
		seconds = "0" + seconds;
	}
	//we add a new activity object onto the activity array 
	//we use the unshift javascript function in order to do this so that 
	//the most recent activity is at the top of the list.
	activityArray.unshift({
		'actionType' : actionType,
		'taskName' : taskName,
		'time' : {'hours': hours,
		'minutes' : minutes,
		'seconds' :seconds}
	});	
}