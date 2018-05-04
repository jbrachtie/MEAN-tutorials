// getting the newly created mongoose model we just created
var ToDo = require('../models/todo.model');

// saving the context of this module inside the _this variable
_this = this;

// async function to get the to-do list
exports.getTodos = async function(query, page, limit) {
	// options setup for the mongoose paginate
	var options = {
		page,
		limit
	}

	// try catch the awaited promise to handle the error
	try {
		var todos = await ToDo.paginate(query, options);

		// return the todo list that was returned by the mongoose promise
		return todos;
	} catch(e) {
		// return an error message describing the reason
		throw Error('Error while paginating Todos');
	}
}

exports.createTodo = async function(todo) {
	// creating a new mongoose object by using the 'new' keyword
	var newTodo = new ToDo({
		title: todo.title,
		description: todo.description,
		date: new Date(),
		status: todo.status
	});

	try {
		// saving the todo
		var savedTodo = await newTodo.save();

		return savedTodo;
	} catch(e) {
		throw Error('Error while creating todo');
	}
}

exports.updateTodo = async function(todo) {
	var id = todo.id;

	try {
		// find the old todo object by the id

		var oldTodo = await ToDo.findById(id);
	} catch(e) {
		throw Error('Error occured while finding the todo');
	}

	// if no old todo object exists, return false
	if(!oldTodo) {
		return false;
	}

	console.log(oldTodo);

	// edit the todo object
	oldTodo.title = todo.title;
	oldTodo.description = todo.description;
	oldTodo.status = todo.status;

	console.log(oldTodo);

	try {
		var savedTodo = await oldTodo.save();
		return savedTodo;
	} catch(e) {
		throw Error('An error occured while trying to update the todo');
	}
}

exports.deleteTodo = async function(id) {
	// delete the todo
	try {
		var deleted = await ToDo.remove({
			_id: id
		});
		console.log("deleted service: " + deleted.result);
		if(deleted.result.n === 0) {
			throw Error('todo could not be deleted');
		}
		return deleted;
	} catch(e) {
		throw Error('Error occured while deleting the todo');
	}
}
