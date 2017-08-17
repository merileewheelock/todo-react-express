// EXPRESS SERVER

var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var connection = mysql.createConnection({
	host: '127.0.0.1',
	user: 'x',
	password: 'x',
	database: 'todo'
})

connection.connect();

function validateKey(key){
	console.log(key)
	return new Promise((resolve, reject)=>{
		connection.query('SELECT * FROM api_keys WHERE api_key="'+key+'"', (error, results)=>{
			console.log(results)
			if (error) throw error;
			if (results.length == 0){
				resolve(false);
			}else{
				resolve(true);
			}
		});
	})
}

// Set up a route to handle react's first request
router.get('/getTasks', function(req, res, next) {
	var isKeyValid = validateKey(req.query.apiKey) // this is a promise
	isKeyValid.then((bool)=>{
		if (bool == true){
			connection.query('SELECT * FROM tasks', (error, results)=>{
				if (error) throw error;
				res.json(results);
			})
		}else{
			res.json({ msg: "badKey" })
		}
	});
});

router.get('/getTask/:id', (req, res)=>{
	connection.query(`SELECT * FROM tasks WHERE id=${req.params.id}`, (error, results)=>{
		if (results.length == 0){
			res.json({msg: "noResult"})
		}else{
			res.json(results[0])
		}
	});
});

router.post('/completeTask',(req, res)=>{
	var targetId = req.body.targetId;
	connection.query('UPDATE tasks SET finished = NOT finished WHERE id=?',[targetId],(error, results, fields)=>{
		if(error) throw error;
		connection.query('SELECT * FROM tasks',(error2, results2, fields2)=>{
			res.json(results2)
		});		
	})
});

router.post('/deleteTask', (req, res)=>{
	connection.query('DELETE FROM tasks WHERE id = '+req.body.taskId, (error, results)=>{
		if (error) throw error;
		res.json({
			msg: "success"
		});
	});
});

router.post('/readTask', (req, res)=>{
	connection.query(`SELECT * FROM tasks WHERE id=${req.params.id}`, (error, results)=>{
		if (error) throw error;
	})
})

router.post('/editTask', (req, res)=>{
	connection.query(`SELECT * FROM tasks WHERE id=${req.params.id}`, (error, results)=>{
		if (error) throw error;
	})
})

// addStudent route. Expects a name in the body, will add that name to the students table,
// then respond with all students in that table
router.post('/addTask', (req, res)=>{
	var newTask = req.body.taskName;
	var newTaskDate = req.body.taskDate;
	var newTaskInfo = req.body.taskInfo;
	connection.query('INSERT INTO tasks (taskName, taskDate, taskInfo) VALUES (?, ?, ?)', [newTask, newTaskDate, newTaskInfo], (error, results)=>{
		if (error) throw error;
		connection.query('SELECT * FROM tasks', (error2, results2)=>{
			if (error2) throw error2;
			res.json(results2);
		});
	})
	// res.json({msg: "test"})
});

module.exports = router;
