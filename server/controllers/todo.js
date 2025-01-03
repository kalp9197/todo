import { Todo } from "../models/todo.js";

export const createTodo = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(400).json({ success: false, msg: "All fields are required" });
    }
    const todo = new Todo({ title, description });
    await todo.save();
    return res.status(201).json({ success: true, msg: "Todo Created Successfully", todo });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, msg: "Internal server error" });
  }
};

export const getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    return res.status(200).json({
      success: true,
      todos,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, msg: "Internal server error" });
  }
};

export const updateTodo = async (req, res) => {
  try {
    const todoId = req.params.todoId;
    const { title, description } = req.body;
    const updatedTodo = await Todo.findByIdAndUpdate(
      todoId,
      { title, description },
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ success: false, msg: "Todo not found" });
    }

    return res.status(200).json({ success: true, msg: "Todo updated", todo: updatedTodo });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, msg: "Internal server error" });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const todoId = req.params.todoId;
    const deletedTodo = await Todo.findByIdAndDelete(todoId);

    if (!deletedTodo) {
      return res.status(404).json({ success: false, msg: "Todo not found" });
    }

    return res.status(200).json({ success: true, msg: "Deleted the todo successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, msg: "Internal server error" });
  }
};