const dotenv = require('dotenv')
dotenv.config({path : "env.default"})
const express = require('express')
const app = express()
const db = require('./src/config/db')
const router = require('./src/routes/index')

const port = process.env.PORT || 3300

const startDb = async ()=>{
    try {
        await db.authenticate()
        console.log(`DB Connected`);
    } catch (error) {
        console.log(error);
    }
}

startDb()
// db.authenticate()
//  .then(()=>{
//     console.log(`DB Connected`);
// })
//     .catch(err=>console.log(err))
app.use(express.json())
app.use(express.urlencoded({extended : false}))
app.use(router)

app.listen(port, ()=>{
    console.log(`App listen on port ${port}`);
})