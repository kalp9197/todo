import express from "express"
import { createTodo, getAllTodos } from "../controllers/todo.js"

const router = express.Router()

router.route('/').post(createTodo).get(getAllTodos)

export default router