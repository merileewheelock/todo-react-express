import React, { Component } from 'react';
import $ from 'jquery';
import { Link } from 'react-router-dom';

class Home extends Component{
	constructor(props) {
		super(props);
		this.state = {
			tasksList: []
		}
		this.addNewTask = this.addNewTask.bind(this);
        this.checkCompleted = this.checkCompleted.bind(this);
	}

	// componentDidMount runs after the first render
	componentDidMount() {
        // getJSON request to localhost:3000, that's where express is listening
        $.getJSON('http://localhost:3000/getTasks?apiKey=skdjflakhshgshglksgd', (tasksFromApi)=>{
            // log the JSON response from express
            console.log(tasksFromApi);
            this.setState({
                tasksList: tasksFromApi
            })
        });
        // Update the state... this will cause a re-render
        // this.setState({
        //     theClass: [1,2,3,4]
        // })
    }

    addNewTask(event){
    	event.preventDefault();
    	console.log("User submitted form")
    	 // var studentToAdd = event.target.parentNode.childNodes[0].value;
        var newTask = document.getElementById('new-task').value;
        var newTaskDate = document.getElementById('new-task-date').value;
        var newTaskInfo = document.getElementById('new-task-info').value;
        // console.log(studentToAdd);
        // This is a POST request, so we can't use $.getJSON (only does get)
        // $.ajax expects an object that tells it what to send (data), where to send it (url),
        // and how tot send it (method)
        // $.ajax is a promose which has a "done" method that will run when ajax is back
        // It gets a param of whatever SON was returned by the API request
        // In side that function, we update React state (theClass), which causes a rerender,
        // which updates the list because we're mapping through state
        $.ajax({
            method: "POST",
            url: "http://localhost:3000/addTask?apiKey=skdjflakhshgshglksgd",
            data: {
                taskName: newTask,
                taskDate: newTaskDate,
                taskInfo: newTaskInfo
            }
        }).done((tasksArray)=>{
            this.setState({
                tasksList: tasksArray
            });
        });
    }

    checkCompleted(targetId){
        console.log(targetId)
        $.ajax({
            method: "POST",
            url: "http://localhost:3000/completeTask?apiKey=skdjflakhshgshglksgd",
            data: {
                targetId: targetId
            }
        }).done((tasksArray)=>{
            console.log(tasksArray)
            this.setState({
                taskList: tasksArray
            })
        })          
    }

	render(){
		// Create an array to dump into our return. It will contain components or HTML tags
        var theTasksArray = [];
        // Loop through out state var.The first time through, it will be empty.

        this.state.tasksList.map((task, index)=>{
            // Push an li tag onto our array for each element in the state variable
            var inlineStyle = {}
            var finished = 0;
            if (task.finished == 1){
                inlineStyle = {
                    "textDecoration": "line-through",
                    "color": "black"
                }
                finished = true;
            }
            theTasksArray.push(
                <tr key={index}>
                    <td><input checked={finished} className="circle-check" onChange={()=>{this.checkCompleted(task.id)}} type="checkbox" /><label htmlFor="circle-check" /></td>
                	<td><Link style={inlineStyle} to={`/task/read/${task.id}`}>{task.taskName}</Link></td>
                    <td>{task.taskDate}</td>
                    <td><Link to={`/task/delete/${task.id}`}>Delete</Link></td>
                   	<td><Link to={`/task/edit/${task.id}`}>Edit</Link></td>
                </tr> 
            )
        });

		return(
			<div className="container text-center">
				<div className="header">
					<h1>todos</h1>
				</div>

                <form onSubmit={this.addNewTask} className="add-box">
                    <div><input type="text" id="new-task" placeholder="Add task" /></div>
                    <div><input type="date" id="new-task-date" placeholder="Add date" /></div>
                    <div><input type="text" id="new-task-info" placeholder="Enter task info" /></div>
                    <button type="submit" className="btn btn-default">Add</button>
                </form> 

                <div>
                    <table className="table table-bordered">
                        <thead>
                            <th className="text-center">Task</th>
                            <th className="text-center">Date</th>
                            <th className="text-center">Delete</th>
                            <th className="text-center">Edit</th>
                        </thead>
                        <tbody>
                            {theTasksArray}
                        </tbody>
                    </table>
                </div>
			</div>
		)
	}
}

export default Home;