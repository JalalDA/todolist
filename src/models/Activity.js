const {DataTypes, UUIDV4} = require('sequelize')
const db = require('../config/db')

const Activities = db.define('activities', {
    id : {
        type : DataTypes.UUID,
        defaultValue : UUIDV4,
        allowNull : false,
        primaryKey : true
    },
    email : {
        type : DataTypes.STRING
    },
    title : {
        type : DataTypes.STRING
    },
    deleted_at : {
        type : DataTypes.DATE
    }
}, {
    timestamps : true
})

module.exports = Activities