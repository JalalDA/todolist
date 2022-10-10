const {Sequelize} = require('sequelize')
const dotenv = require('dotenv')
dotenv.config()


const db = new Sequelize(
    process.env.DB_NAME, //change with your database name 
    process.env.DB_OWNUSERNAME, //change with your database username 
    process.env.DB_PASS, //change with your database user password 
    {
    host : process.env.DB_HOST, //change with your own host
    dialect : 'mysql' //select the database type
})


module.exports = db