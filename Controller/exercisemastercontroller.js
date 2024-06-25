const model = require("../models/exercisemodel")
const encrypt = require("bcrypt")
const jwt=require("jsonwebtoken")

const getexercises= (req, res) => {
        model.find()
        .then((data)=>{
            if(data){
                res.send({
                  isSuccess: true,
                  msg: "Exercise got successfully",
                data});
            }
            else{
                res.send("database is empty")
            }
        })
        .catch((err)=>{
            
            res.send({msg:"error",err})
        })
}

const getcurrentexercises= (req, res) => {
    model
      .find({ isDeleted: false, GymId: req.val.data._id })
      .then((data) => {
        if (data) {
          res.send({
            isSuccess: true,
            msg: "Current Exercises got successfully",
            data,
          });
        } else {
          res.send("database is empty");
        }
      })
      .catch((err) => {
        res.send({ msg: "error", err });
      });
}

const addexercises = (req, res) => {
    let {Exercise,ImpactArea} = req.body
    model.findOne({Exercise})
    .then((data)=>{
        if(data){
            res.send({isSuccess: true, msg: "exercise already exists"})
        }
        else{
            const add = new model({
              GymId: req.val.data._id,
              Exercise,
              ImpactArea,
              isDeleted: false,
            });
        add.save()
        .then((data)=>{
            res.send({ isSuccess: true, msg: "exercise added successfully", data });
        })
        .catch((err)=>{
            res.send({
                msg:"error occured",
                err
            })
        })
        } 
    })
    .catch((err)=>{
        res.send({msg:"error",err})
    })
}

const updateexercise = (req, res) => {
  
        try {
            model.updateOne({_id:req.query.id},req.body)
            .then((data)=>{
                if(data){
                res.send({
                  isSuccess: true,
                  msg: "exercise updated successfully",
                  data,
                });
                }
                else{
                    res.send({
                      isSuccess: true,
                      msg: "data not found",
                    });
                }
            })
            .catch((err)=>{
                res.send({msg:"error",  err})
            })
            
        } catch (error) {
            res.send({msg:"error occured", error})
        }         
};


const deleteexercise= (req,res) => {
    model.deleteOne({_id:req.query.id})
    .then(()=>{
        res.send({ isSuccess: true, msg: "exercise deleted successfully"});
    })
    .catch((err)=>{
        res.send({msg:"error occured",err})
    })
}

const softdeleteexercise=(req,res)=>{
    model.findOne({_id:req.query.id})
    .then((data)=>{
        if(data){
            data.isDeleted=true;
            model.updateOne({_id:req.query.id},data)
            .then(()=>{
                res.send({
                  isSuccess: true,
                  msg: "soft deleted successfully",
                  data,
                });
            })
            .catch((err)=>(
                res.send({msg:"error occured", err})
            ))
        }
        else{
            res.send({ isSuccess: true, msg: "data not found"});
        }
        
    })
    .catch((err)=>{
        res.send({msg:"error occured",err})
    })
}

module.exports={getexercises,addexercises,updateexercise,deleteexercise,softdeleteexercise,getcurrentexercises }