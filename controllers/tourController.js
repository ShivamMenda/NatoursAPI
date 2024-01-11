import { query } from "express";
import Tour from "../models/tours.js";


export async function getAllTours(req,res){
    try {
        //GET query
        const queryObj= {...req.query}

        // Build Query
        let queryStr=JSON.stringify(queryObj);
        queryStr= queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match)=> `$${match}`);
        console.log(JSON.parse(queryStr));
        let query=  Tour.find(JSON.parse(queryStr));
        // Field limiting
        if (req.query.fields) {
            const fields = req.query.fields.split(',').join(' ');
            query = query.select(fields);
        } else {
            query = query.select('-__v');
        }

        // Sorting
        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ');
            query = query.sort(sortBy);
        } else {
            query = query.sort('-createdAt');
        }

        let tours= await query;
        // EXECUTE QUERY
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
        
}

export async function getTour(req,res){
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
}

export async function createTour(req,res){
    try {
        let newTour= await Tour.create(req.body);
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
}
export async function updateTour(req,res){
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
export async function deleteTour(req,res){
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

export async function getTourStats(req,res){
    try {
        let stats= await Tour.aggregate([
            {
                $match: {ratingsAverage:{$gte: 4.5}} //BASE CONDITION
            },
            {
                $group:{ // GROUP BY
                    _id: {$toUpper: "$difficulty"},
                    numTours: {$sum :1},
                    numRatings : {$sum:'$ratingsQuantity'},
                    avgRating: {$avg: '$ratingsAverage'},
                    avgPrice: {$avg: '$price'},
                    minPrice: {$min :'$price'},
                    maxPrice: {$max :'$price'},
                }
            },
            {
                $sort: {avgPrice: 1}
            }
        ]);
        res.status(200).json({
            status:"success",
            data:{
                stats
            }
        });
    } catch (err) {
        res.status(400).json({
            message:"Failure",
            error:err.message,
        });
    }
}