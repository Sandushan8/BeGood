const express = require('express')
const bodyparser = require('body-parser')
const connection = require('./Database/connection')
const Router = require('./Routes/Router')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))
connection()


app.use('/',Router)

app.listen(3000, ()=>{
    console.log(`Server running in http://localhost:3000`)
})