const mongoose = require('mongoose')

//vehicle schema
const vehicle = new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    contact:{
        type:String
    },
    licensep:{
        type:String
    },
    type:{
        type:String
    }
})


const vehicleDB = mongoose.model('VehicleReg',vehicle)

module.exports = vehicleDB