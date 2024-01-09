const express=require("express");
const {Tour}= require("../models/tours");


exports.getAllTours= async (req,res)=>{
    try {
        let tours= await Tour.find();
        res.status(200).json({
            status:"Success",
            length: tours.length,
            data:{tours}
        })
    } catch (err) {
     res.status(404).json({
            status:"Fail",
            error:err.message,
        })   
    }
        
};

exports.getTour= async (req,res)=>{
    let {id}= req.params;
    try {
        let tour= await Tour.findById(id);
        res.status(200).json({
            status:"Success",
            data: tour
        });
    } catch (err) {
        res.status(404).json({
            message:"Failure",
            error:err.message,
        })
    };
};

exports.createTour= async (req,res)=>{
    let {name,rating,price} = req.body;
    try {
        let newTour= await Tour.create({
        name: name,
        rating: rating,
        price:price
    });
    res.status(201).json({
            message:"success",
            data:{tour:newTour}
        });
    } catch (err) {
        res.status(400).json({
            message:"Failure",
            error:err.message,
        })
    }   
};
exports.updateTour=async (req,res)=>{
    try {
        const {id}=req.params
        let updatedTour= await Tour.findByIdAndUpdate(id,req.body,{
            new:true,
            runValidators:true,
        })
        res.status(200).json({
        status:"success",
        data:{
            updatedTour
        }
    })
    } catch (err) {
       res.status(400).json({
            message:"Failure",
            error:err.message,
        })  
    }
}
exports.deleteTour= async (req,res)=>{
    try {
        let {id} = req.params
        await Tour.findByIdAndDelete(id);
        res.status(204).json({
        status:"success delete",
        data:null
    })
    } catch (err) {
        res.status(400).json({
            message:"Failure",
            error:err.message,
        })  
    }
}