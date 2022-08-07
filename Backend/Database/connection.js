const mongoose = require('mongoose')


//Database connection
const connectDB = async ()=>{
    const url = 'mongodb+srv://ihilldew:123asura123@interview2.ccvr5iy.mongodb.net/VehicleDB?retryWrites=true&w=majority'
    try{
        const con = await mongoose.connect(url,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        })
        console.log(`Connection successfull: ${con.connection.host}`)
    }
    catch(err){
        console.log('Connection error!')
        process.exit(1)
    }
}

module.exports = connectDB