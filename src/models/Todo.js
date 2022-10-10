const {DataTypes, UUIDV4} = require('sequelize')
const db = require('../config/db')

const Todo = db.define('todos', {
    id : {
        type : DataTypes.UUID,
        defaultValue : UUIDV4,
        allowNull : false,
        primaryKey : true
    },
    title : {
        type : DataTypes.STRING
    },
    activity_group_id : {
        type : DataTypes.UUID
    },
    is_active : {
        type : DataTypes.BOOLEAN
    },
    priority : {
        type : DataTypes.STRING
    },
    deleted_at : {
        type : DataTypes.DATE
    }
}, {
    timestamps : true
})

module.exports = Todo