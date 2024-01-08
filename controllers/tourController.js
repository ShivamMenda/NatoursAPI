const express=require("express");

exports.checkId=(req,res,next,val)=>{
    if (req.params.id * 1 > 1) {
        return res.status(404).json({
            status:"fail",
            message:"Invalid ID"
        })
    }
    next();
}

exports.checkBody=(req,res,next)=>{
    if(!req.body.name || !req.body.price){
        return res.status(400).json({
            status:"fail",
            message: "Bad request"
        })
    }
    next();
}

exports.getAllTours=(req,res)=>{
    res.status(200).json({
        status:"Success",
        data:"Data"
        
    })
};

exports.getTour= (req,res)=>{
    res.status(200).json({
        status:"Success",
        data: "tours"
        
    })
};

exports.createTour=(req,res)=>{
        res.status(201).json({
            message:"success",
            data:{tour:newTour}
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