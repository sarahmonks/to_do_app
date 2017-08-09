/**********************************************************
* Author: Sarah Monks
* Assignment: WE4.0 Mobile Web Applications, Digital Skills Academy
* Student ID: D15126869
* Date : 2016/06/26
* Ref: http://stackoverflow.com/questions/16228508/how-to-register-two-modules-to-ng-app
* Ref: http://stackoverflow.com/questions/17925355/how-can-i-use-the-index-inside-a-ng-repeat-to-enable-a-class-and-show-a-div
* Ref: passing variables between controllers. use a factory. http://stackoverflow.com/questions/12008908/angularjs-how-can-i-pass-variables-between-controllers
* Ref: todo list example using a checkbox: http://www.w3schools.com/angular/tryit.asp?filename=try_ng_todo_app
* Ref: http://stackoverflow.com/questions/25025102/angular-difference-between-pristine-dirty-and-touched-untouched
* Ref: setPristine() and setUntouched() https://docs.angularjs.org/api/ng/type/form.FormController
***********************************************************/

//create a module using the Angular objects module() method
//inject two dependencies to our module. ngRoute for routing to different "pages" 
//and ngTouch for detecting swiping on touch devices
var todoApp = angular.module("todoModule", ['ngRoute', 'ngTouch']);

//configure our routes
todoApp.config(function($routeProvider) {
	$routeProvider
		.when('/', {
			//route for the home page
			templateUrl : 'views/home.html',
			controller : 'homeController'
		})
		.when('/todo', {
			//route for the to do list page
			templateUrl : 'views/todo.html',
			controller : 'todoController'
		})
		.when('/history', {
			//route for history page for logging the user's activity with the app. e.g adding tasks, deleting tasks. etc
			templateUrl : 'views/history.html',
			controller : 'historyController'
		});
});

//create a factory so that we can pass these variables between different controllers. see ref above.
todoApp.factory('todoListFactory', function() {
  	//private variables
  	var _activityList = [];
	var _tasks =[];
	
  	//return public API so that we can access it in all controllers
  	return {
    		activityList: _activityList, tasks: _tasks
 	};
});

//create the mainController which will be associated with the body of the index file as we will use this controller throughout all
//"pages" for the header menu items and side panel menu.
todoApp.controller("mainController", function($scope){

	//the boolean variable "panelIsOpen" will initially be set to false as the side panel with initially be closed on page load
	var panelIsOpen = false;

	//create an array of objects storing information on our menu items for the header of all "pages"
	//store the relevant icons and hrefs for each menu item 
	var menuItems = [{'name':'Home', 'href': '#/', 'font_awesome_icon' : 'fa-home'}, 
			{'name': 'To Do List', 'href': '#todo', 'font_awesome_icon' : 'fa-pencil'},
			{'name': 'Activity Log', 'href': '#history', 'font_awesome_icon' : 'fa-history'}];


	//add the menuItems array to scope
	$scope.menuItems = menuItems;
	//add the panelIsOpen boolean variable to scope
	$scope.panelIsOpen = panelIsOpen;

	$scope.toggleSidePanel = function(){
		//this function checks if the boolean variable "panelIsOpen" is currently true or false.
		//if it is false when the user presses the toggle button it means the panel is currently closed so therefore 
		//we should open it now. and then set panelIsOpen to true. 
		//in our html we use the ng-class directive to add the swipe_left class when panelIsOpen is true.

		if($scope.panelIsOpen == false){
			$scope.panelIsOpen = true;
		}else if($scope.panelIsOpen == true){
			$scope.panelIsOpen = false;
		}
	}
	$scope.selectMenuItem = function($index){
		//this function is called whenever a menu item is clicked. It takes in the index of the current list item
		//in our html we use the ng-class directive to add the "current" class to a list item whenever the condition $index == selectedItem is true.
		//the "current" class adds some css styling to the selected item to show the user which menu item is currently selected.
		$scope.selectedItem = $index; 
	}
});


//create the homeController for the home.html view
todoApp.controller("homeController", function($scope){
	$scope.pageHeading = "Home"; //this will be inserted to a h2 tag
	$scope.introParagraph = "Welcome to the to do app. The easy way to keep track of your daily/weekly tasks!"
});

//create the historyController for the history.html view which displays the activity log of the user's interaction with the app
todoApp.controller("historyController", function($scope, todoListFactory){
	//this function takes in our factory as a parameter so that we can use the arrays we created there.
	$scope.pageHeading = "Activity Log";

	//add the activityList variable from the "todoListFactory" to scope
	$scope.activityList = todoListFactory.activityList;

	if($scope.activityList.length == 0){
		//if the activityList array is empty then create a message for the user to indicate this.
		$scope.introParagraph = "You have no history of events in your activity log!"
	}else{
		$scope.introParagraph = "Here is a list of actions you have carried out on the app!"

	}
});

//create and register our todo controller with our todoApp module
//this controller will be used for our todo.html view
todoApp.controller("todoController", function($scope, todoListFactory){
	$scope.pageHeading = "To Do"; //this will displayed a the top of the page in a h2 tag.
	$scope.introParagraph = "Create your to do list here!";


	//give the radio button for a task's "due day" a default value of today
	$scope.newTask = {
     		"day" : "Today"
    	};

	//add the variables from the "todoListFactory" to the scope
	$scope.tasks = todoListFactory.tasks;
	$scope.activityList = todoListFactory.activityList;
	
	$scope.checkIfTasksExist = function(){	
		//this function checks to see if there are any tasks in our to do list (tasks array)
		//we use this function in our todo.html view along with the ng-show directive to make sure that the 
		//tasks_list_wrapper area is only shown if there are currently any items in the todo list
		if ($scope.tasks.length == 0){
  			return false;
		}else{
  			return true;
		}
	}

		
	$scope.completeTask = function($index, $taskIsCompleted){
		//this function is called when the checkbox within each to do list item is clicked on or off.
		//we pass in the currentTask.done boolean variable and check if it is currently true or false.
		//if it is true that means the user has decided to complete the task.
		//if it is false then we readd the task to the todo list.
		//we then add these actions to our activity list to be displayed on the history "page"

		$task = $scope.tasks[$index];
		$taskName = $task.name;

		if($taskIsCompleted){	
			//call the addActivity function to insert this action to the activityList array.
			//if $taskIsCompleted is true then we pass in the word "completed" to the addActivity function (defined in js-functions)
			//to show that the user has completed the task.
			addActivity($scope.activityList, 'completed', $taskName);
		}else{
			//if $taskIsCompleted is false then we pass in the word "readded" to the addActivity function. 
			addActivity($scope.activityList,'readded', $taskName);
		}
	}

	$scope.addTask = function(){
		//this function gets the user input from the todo form and pushes it onto the tasks array. 
		//it also resets the form values so the user can add another task more conveniently.
		$taskName = $scope.newTask.name;
		$taskDay = $scope.newTask.day;
		$scope.tasks.push({
			name: $taskName,
			done: false,
			day: $taskDay
		});

		//reset our form variables
		$scope.newTask = {
			"name" : "",
     			"day" : "Today" //give the radio buttons a default of today
    		};
		//set the form to its untouched state.
		$scope.todo_form.$setPristine();
		$scope.todo_form.$setUntouched();
		
		//call the addActivity function in order to insert this event (of adding a task) to the activityList array 
		//to be displayed on the history "page"
		addActivity($scope.activityList,'added', $taskName);
	}
	

	$scope.deleteTask = function($index){
		//this function takes in the index of the list item that the user has chosen to delete.
		//we then delete this object from the tasks array and also add this deletion "activity" to our activity log for our history "page".
		$task = $scope.tasks[$index];
		$taskName = $task.name;
		$scope.tasks.splice($index, 1);
		addActivity($scope.activityList, 'deleted', $taskName);
	}

});
