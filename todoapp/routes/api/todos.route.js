var express = require('express');
var router = express.Router();

// getting the todo controller that we just created
var ToDoController = require('../../controllers/todos.controller');

// map each API to the controller functions
router.get('/', ToDoController.getTodos)
router.post('/', ToDoController.createTodo)
router.put('/', ToDoController.updateTodo)
router.delete('/', ToDoController.removeTodo)

// export the router
module.exports = router;
