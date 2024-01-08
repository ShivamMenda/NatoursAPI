const express=require("express");
const {Tour}= require("../models/tours");

exports.checkBody=(req,res,next)=>{
    if(!req.body.name || !req.body.price){
        return res.status(400).json({
            status:"fail",
            message: "Bad request"
        })
    }
    next();
}

exports.getAllTours= async (req,res)=>{
    await Tour.find().then((tours)=>{
        res.status(200).json({
            status:"Success",
            data:{tours},
            
        })
    }).catch((err)=>{
        res.status(404).json({
            status:"Fail",
            error:err.message,
        })
    })
        
};

exports.getTour= async (req,res)=>{
    await Tour.findById(req.params.id).then((doc)=>{
        res.status(200).json({
            status:"Success",
            data: doc
            
        })
    }).catch(err=>{
        res.status(404).json({
            message:"Failure",
            error:err.message,
        })
    })
    
};

exports.createTour= async (req,res)=>{
    let newTour= new Tour({
        name: req.body.name,
        rating: req.body.rating,
        price:req.body.price
    })
    await newTour.save().then((doc)=>{
        res.status(201).json({
            message:"success",
            data:{tour:doc}
        })
    }).catch((err)=>{
        res.status(400).json({
            message:"Failure",
            error:err.message,
        })
    })
        
    
};
exports.updateTour=(req,res)=>{
    res.status(200).json({
        status:"success patch",
        data:{
            tour:"Updated Tour"
        }
    })
}
exports.deleteTour=(req,res)=>{
    res.status(204).json({
        status:"success delete",
        data:null
    })
}