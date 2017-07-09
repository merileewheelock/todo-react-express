import React, { Component } from 'react';
import $ from 'jquery';

class Read extends Component{
	constructor(props) {
		super(props);
		this.state = {
			taskData: {}
		}
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

	goHome(){
		this.props.history.push('/');
	}

	render(){
		return(
			<div className="container text-center">
				<h2>Read info for {this.state.taskData.taskName}</h2>
				<p>This event is on {this.state.taskData.taskDate}</p>
				<p>About: {this.state.taskData.taskInfo}</p>
				<button onClick={this.goHome} className="btn btn-default">Home</button>
			</div>
		)
	}
}

export default Read;