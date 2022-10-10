const Activities = require('../models/Activity')


const getAllActivity = async (req, res)=>{
    try {
        const activities = await Activities.findAll()
        res.status(200).json({
            status : "Success",
            message : "Success",
            data : activities
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status : "Internal server error",
            error
        })
    }
}

const createActivity = async (req, res)=>{
    try {
        const {title, email} = req.body
        if(!title){
            return res.status(400).json({
                status : "Bad Request",
                message : "title cannot be null",
                data : {}
            })
        }
        const data = await Activities.create({
            title,
            email
        })
        res.status(201).json({
            status : "Success",
            message : "Success",
            data
        })
    } catch (error) {
        console.log(error);
        res.status(400).json(error)
    }
}

const getActivityById = async (req, res)=>{
    try {
        const {id} = req.params
        const data = await Activities.findByPk(id)
        if(!data){
            return res.status(404).json({
                status : "Not found",
                message : "Data not found",
                data : {}
            })
        }
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

const updateActivity = async (req, res)=>{
    try {
        const {id} = req.params
        const activity = await Activities.findOne({where:{id:id}})
        if(!activity){
            return res.status(404).json({
                status : "Data not found",
                message : `Cannot find data with id ${id}`,
                data : {}
            })
        }
        const {title} = req.body
        if(!title){
            return res.status(400).json({
                status : "Bad Request", 
                message : "Title cannot be null", 
                data : {}
            })
        }
        const data = await Activities.update({title : title}, {where : {id:id}, returning : true})
        if(data){
            const result = await Activities.findByPk(id)
            res.status(200).json({
                status : "Success",
                message : "Success",
                data : result
            })   
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}

const deleteActivity = async (req, res)=>{
    try {
        const {id} = req.params
        const data = await Activities.findOne({where : {id:id}})
        if(!data){
            return res.status(404).json({
                status : "Not found",
                message : "Data not found",
                data : {}
            })
        }
        await Activities.destroy({
            where : {
                id : id
            }
        })
        res.status(200).json({
            status : "Success",
            message : `Success delete activity with id ${id}`
        })
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}
module.exports = {
    createActivity,
    getAllActivity,
    getActivityById,
    updateActivity,
    deleteActivity
}