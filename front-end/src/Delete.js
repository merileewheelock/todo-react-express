import React, { Component } from 'react';
import $ from 'jquery';

class Delete extends Component{
	constructor(props) {
		super(props);
		this.confirmDelete = this.confirmDelete.bind(this);
		this.runForCover = this.runForCover.bind(this);
		this.state = {
			taskData: {}
		}
	}

	componentDidMount() {
		var taskId = this.props.match.params.taskId
		$.getJSON(`http://localhost:3000/getTask/${taskId}`, (taskData)=>{
			this.setState({
				taskData: taskData
			});
		});
	}

	confirmDelete(event){
		// console.log("Delete!")
		var taskId = this.props.match.params.taskId
		$.ajax({
            method: "POST",
            url: "http://localhost:3000/deleteTask",
            data: {
                taskId: taskId
            }
        }).done((tasksArray)=>{
        	this.props.history.push('/');
            this.setState({
                tasksList: tasksArray
            })
        })
	}

	runForCover(event){
		// console.log("Don't delete!")
		this.props.history.push('/');
	}

	render(){
		// console.log(this.props.match.params)
		var taskId = this.props.match.params.taskId

		return(
			<div className="container">
				<h2>Are you sure you want to delete {this.state.taskData.taskName}?</h2>
				<div>{this.state.taskData.taskName} - {this.state.taskData.taskDate}</div>
				<button onClick={this.confirmDelete} className="btn btn-danger">Yes!</button>
				<button onClick={this.runForCover} className="btn btn-default">No!</button>
			</div>
		)
	}
}

export default Delete;