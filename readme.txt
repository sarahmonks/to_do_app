/**********************************************************
* Author: Sarah Monks
* Assignment: WE4.0 Mobile Web Applications, Digital Skills Academy
* Student ID: 
* Date : 2016/06/26
***********************************************************/
This is the Turquoise version of this app.

There are three different views/"pages" in this project.

home: landing page
todo: displays a form for the user to enter tasks for their todo list. This view also displays the to do list as it is being generated.
history: This view displays an "activity log" of the users actions within the app. similar to facebooks activity log which shows you what actions you have carried out to date.

About the to do view:
user can enter the name of their task.
if there is no input in this field an error will display red text.
if the input is valid in this field then a green tick will appear underneath the field.
The user can choose a due day for the task from two radio buttons. (Today or Tomorrow).
Note: the Add task button is disabled if the input is invalid. 

Once a to do list is generated, items can be marked as completed by pressing the checkbox and deleted by pressing the X symbol.


About the history/activity log:
When a task is added to the to do list the action stored in the activity log/history page will be:
"you have added a task called: taskname".

when the checkbox for a task is clicked, the action stored in the activity log will be "you have completed a task called: taskname".

If the user presses the same checkbox a second time, the action stored in the activity log will be  "you have readded a task called: taskname"


side panel creation
in order to make the side panel on the app we have a div called container_wrapper which we will put most of the page contents in.
We also have a div for our panel outside this container. a lower z-index is applied to the panel so that it sits underneath the container
we add vertical scrolling to the containter_wrapper and the panel_area using css for it to work.
the panel_area is positioned 20% from the left of the screen and when the panel button is clicked we use css transitions to move the container_wrapper
to the left by 80% to reveal the panel.


 

