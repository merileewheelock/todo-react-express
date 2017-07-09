// 3rd party modules
import React, { Component } from 'react';
import './App.css';
import $ from 'jquery';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// Custom modules
import Home from './Home';
import Delete from './Delete';
import Read from './Read';
import Edit from './Edit';

class ToDo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tasksList: []
		}
        // Make sure addStudent uses the correct "this"
        // this.addTask = this.addTask.bind(this);
	}

	render() {

        return(
            <Router>
                <div className="to-do-app">
                    <Route exact={true} path="/" component={Home} />
                    {/* exact ensures that the home page only renders at /, and anything after / will not go home */}
                    <Route exact path="/task/delete/:taskId" component={Delete} />
                    <Route exact path="/task/read/:taskId" component={Read} />
                    <Route exact path="/task/edit/:taskId" component={Edit} />
                </div>
            </Router>
        )
	}
}

export default ToDo;
