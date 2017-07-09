import React, { Component } from 'react';
import $ from 'jquery';

class Edit extends Component{
	constructor(props) {
		super(props);
		this.state = {
			taskData: {}
		}
		this.handleNameChange = this.handleNameChange.bind(this);
		this.goHome = this.goHome.bind(this)
	}

	componentDidMount() {
		var taskId = this.props.match.params.taskId
		$.getJSON(`http://localhost:3000/getTask/${taskId}?apiKey=skdjflakhshgshglksgd`, (taskData)=>{
			this.setState({
				taskData: taskData
			});
		});
	}

	handleNameChange(taskName){
		this.setState({
			taskName: taskName
		})
	}

	editTask(){

	}

	goHome(){
		this.props.history.push('/');
	}

	render(){
		return(
			<div onSubmit={this.editTask} className="container text-center">
				<h2>Edit this task</h2>
				<form>
					<div><input type="text" value={this.state.taskData.taskName} onChange={this.handleNameChange} /></div>
					<div><input type="text" value={this.state.taskData.taskDate} /></div>
					<div><input type="text" value={this.state.taskData.taskInfo} /></div>
					<div>
						<button className="btn btn-default">Save</button>
						<button onClick={this.goHome} className="btn btn-default">Home</button>
					</div>
				</form>
			</div>
		)
	}
}

export default Edit;