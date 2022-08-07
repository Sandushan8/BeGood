const router = require('express').Router()
const vehicle = require('../Models/vehiclereg')

const namepattern = /^[a-zA-z\s]+$/
const emailpattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/
const contactpattern = /^[0-9]{10}$/
const vintagevehicle = /^[0-9]{2}[\s-]+ශ්‍රී[\s-]+[0-9]{4}$/ 
const oldvehicle = /^[0-9]{2,3}[\s-]+[0-9]{4}$/
const modernvehicle1 = /^[A-Z]{2}[\s-]+[A-Z]{2}[\s-]+[0-9]{4}$/
const modernvehicle2 = /^[A-Z]{3}[\s-]+[0-9]{4}$/

//Task 1
function getType(pnumber){
    if(oldvehicle.test(pnumber)){
        return 'Old'
    }
    if(vintagevehicle.test(pnumber)){
        return 'Vintage'
    }
    if(modernvehicle1.test(pnumber) || modernvehicle2.test(pnumber)){
        return 'Modern'
    }
}

//Task 2
function validateLicense(pnumber){
    if(!modernvehicle1.test(pnumber) && !modernvehicle2.test(pnumber) && !vintagevehicle.test(pnumber) && !oldvehicle.test(pnumber)){
        return false
    }else{
        return true
    }
}

//Task 3
router.get('/vehicle',async (req,res) =>{
    await vehicle.find().then(data=>{
        res.send(data)
    })
})

router.post('/vehicle', async (req,res)=>{
    let name = req.body.name;
    let email = req.body.email;
    let contact = req.body.contact;
    let licensep = req.body.licensep;
    
    if(name.length<3){
        return res.send({message:'Name is too short'}).status(400)
    }
    if(!namepattern.test(name)){
        return res.send({message:'Name can only contain letters'}).status(400)
    }
    if(!emailpattern.test(email)){
        return res.send({message:'Email is invalid'})
    }
    if(!contactpattern.test(contact)){
        return res.send({message:'Contact must be 10 digits(only numbers)'}).status(400)
    }
    if(!validateLicense(licensep)){
        return res.send({message:'License Plate number is invalid'}).status(400)
    }
    //check vehicle registration
    let registered = await vehicle.findOne({licensep:req.body.licensep})
    if(registered){
        return res.send({message:'Vehicle already registered'}).status(400)
    }
    let vtype = getType(licensep)

    const newvehicle = new vehicle({
    name:req.body.name,
    email:req.body.email,
    contact:req.body.contact,
    licensep:req.body.licensep,
    type:vtype
    }) 

    await newvehicle
    .save(newvehicle)
    .then(res.send({message:'Success'}))
    .catch(err=>{res.send(err)})
})

router.put('/vehicle/:id',async (req,res) =>{
    let id = req.params.id
    let name = req.body.name;
    let contact = req.body.contact
    let email = req.body.email;
    let licensep = req.body.licensep;
    
    if(name.length<3){
        return res.send({message:'Name is too short'}).status(400)
    }
    if(!namepattern.test(name)){
        return res.send({message:'Name can only contain letters'}).status(400)
    }
    if(!emailpattern.test(email)){
        return res.send({message:'Email is invalid'})
    }
    if(!contactpattern.test(contact)){
        return res.send({message:'Contact must be 10 digits(only numbers)'}).status(400)
    }

    if(!validateLicense(licensep)){
        return res.send({message:'License Plate number is invalid'}).status(400)
    }
    //check vehicle registration
    let registered = await vehicle.findOne({licensep:req.body.licensep})
    if(registered){
        return res.send({message:'Vehicle already registered'}).status(400)
    }
    let type = getType(licensep)

    await vehicle.findByIdAndUpdate(id,{name,email,contact,licensep,type})
    .then(res.send({message:'Success'}))
})

router.delete('/vehicle/:id',async (req,res) =>{
    let id = req.params.id
    await vehicle.findByIdAndDelete(id)
    .then(res.send({message:'Success'}))
})


module.exports = router