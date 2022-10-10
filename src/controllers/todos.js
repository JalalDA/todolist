const Todo = require('../models/Todo')
const Activities = require('../models/Activity')

const createTodo = async (req, res)=>{
    try {
        const {title, activity_group_id, priority="very-high", is_active=true} = req.body
        if(!title){
            return res.status(400).json({
                status : "Bad Request",
                message : "title cannot be null",
                data : {}
            })
        }
        if(!activity_group_id){
            return res.status(400).json({
                status : "Bad Request",
                message : "activity_group_id cannot be null",
                data : {}
            })
        }
        const activities = await Activities.findOne({where : {id : activity_group_id}})
        if(!activities){
            return res.status(404).json({
                status : "Not found",
                message : `Cannot find activity group id ${activity_group_id}`,
                data : {}
            })
        }
        const data = await Todo.create({
            title,
            activity_group_id,
            is_active,
            priority

        })
        res.status(201).json({
            status : "Success",
            message : "Success",
            data
        })
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}

const getAllTodo = async (req, res)=>{
    try {
        const {activity_group_id} = req.query
        const activity = await Activities.findOne({where : {id:activity_group_id}})
        if(!activity){
            return res.status(404).json({
                status : "Not found",
                message : `Cannot find activity with id ${activity_group_id}`,
                data : {}
            })
        }
        const data = await Todo.findAll({where : {activity_group_id}})
        res.status(200).json({
            status : "Success",
            message : "Success",
            data
        })
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}

const getTodoById = async (req, res)=>{
    try {
        const {id} = req.params
        const todo = await Todo.findOne({where:{id:id}})
        if(!todo){
            return res.status(404).json({
                status : "Not found",
                message : `Todo with id ${id} not found`,
                data : {}
            })
        }
        const data = await Todo.findByPk(id)
        res.status(200).json({
            status : "Success",
            message : "Success",
            data
        })
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}

const updateTodo = async (req, res)=>{
    try {
        const {id} = req.params
        const { title, is_active, priority} = req.body
        const todo = await Todo.findOne({where:{id:id}})
        if(!todo){
            return res.status(404).json({
                status : "Not found",
                message : `Todo with id ${id} not found`,
                data : {}
            })
        }
        const update = await Todo.update({
            title,
            is_active,
            priority
        }, {where : {id : id}})
        if(update){
            const data = await Todo.findByPk(id)
            res.status(200).json({
                status : "Success",
                message : "Success",
                data
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}

const deleteTodo = async (req, res)=>{
    try {
        const {id} = req.params
        const todo = await Todo.findByPk(id)
        if(!todo){
            return res.status(404).json({
                status : "Not found",
                message : `Todo with id ${id} not found`,
                data : {}
            })
        }
        await Todo.destroy({where : {id:id}})
        res.status(200).json({
            status : "Success",
            message : `Success delete todo with id ${id}`
        })
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}

module.exports = {
    createTodo,
    getAllTodo,
    getTodoById,
    updateTodo,
    deleteTodo
}