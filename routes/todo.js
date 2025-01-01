import express from "express"
import { createTodo, deleteTodo, getAllTodos, updateTodo } from "../controllers/todo.js"

const router = express.Router()

router.route('/').post(createTodo).get(getAllTodos)
router.route('/:todoId').put(updateTodo).delete(deleteTodo)
export default router