import { Todo } from "../models/todo.js"
export const createTodo = async(req,res) =>{
    try{
        const {title,description} = req.body
        if (!title || !description){
            return res.status(403).json({msg:"All field are required"})
        }
        const todo = new Todo({title,description})
        todo.save()
        return res.status(201).json({msg:"Todo Created Successfully"})
    }
    catch(err){
        console.error(err)
    }
}

export const getAllTodos = async(req,res) =>{
    try{
        const todos = await Todo.find()
        return res.status(201).json({
            success:true,
            todos
        })
    }
    catch(err){
        console.error(err)
    }
}

export const updateTodo = async(req,res) =>{
    try{
        const todoId = req.params.todoId
        const {title} = req.body
        const todo = await Todo.findByIdAndUpdate(todoId,{title},{new : true})
        await todo.save()

        return res.status(200).json({success:true,msg:"Todo updated",todo})
    }
    catch(err){
        console.error(err)
    }
}

export const deleteTodo = async(req,res) =>{
    try{
        const todoId = req.params.todoId
        await Todo.findByIdAndDelete(todoId)

        return res.status(200).json({msg:"Deleted The todo successfully"})
    }
    catch(err){
        console.error(err)
    }
}