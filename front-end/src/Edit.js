import React, { Component } from 'react';
import $ from 'jquery';

class Edit extends Component{
	constructor(props) {
		super(props);
		this.state = {
			taskData: {}
		}
		this.handleNameChange = this.handleNameChange.bind(this);
	}

	componentDidMount() {
		var taskId = this.props.match.params.taskId
		$.getJSON(`http://localhost:3000/getTask/${taskId}`, (taskData)=>{
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

	render(){
		return(
			<div onSubmit={this.editTask} className="container">
				<h1>Edit this task</h1>
				<form>
					<input type="text" value={this.state.taskData.taskName} onChange={this.handleNameChange} />
					<input type="text" value={this.state.taskData.taskDate} />
					<input type="text" value={this.state.taskData.taskInfo} />
					<button onClick={this.goHome} className="btn btn-success">Home</button>
				</form>
			</div>
		)
	}
}

export default Edit;