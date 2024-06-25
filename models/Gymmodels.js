const mon = require("mongoose")
const gymuser = mon.Schema({
    GymName:{
        type:String,
        required:true,
        unique:true
    },
    Password:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true,
        unique:true
    },
    PhoneNo:{
        type:Number,
        required:true
    },
    Address:{
        type:String,
        required:true
    },City:{
        type:String,
        required:true
    },
    OwnerName:{
        type:String,
        required:true
    },
    GSTNo:{
        type:String,
        required:true
    }

})

module.exports=mon.model("gymlogin",gymuser)