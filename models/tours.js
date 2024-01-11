import mongoose from "mongoose";

const tourSchema= mongoose.Schema({
    name: {
        type: String,
        required: [true,"Name required"],
        unique:true,
        trim:true,
    },
    duration: {
        type: Number,
        required: [true,"Duration required"],
    },
    maxGroupSize: {
        type: Number,
        required: [true,"Group size required"],
    },
    difficulty: {
        type: String,
        required: [true,"Difficulty required"],
    },
    ratingsAverage: {
        type: Number,
        default: 4.5
    },
    ratingsQuantity:{
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        required: [true,"Price needed"],
    },
    priceDiscount:{
        type:Number,
    }, 
    summary:{
        type:String,
        trim: true,
        required:[true,"summ req"],
    },
    description:{
        type:String,
        trim:true,
    },
    imageCover:{
        type: String,
        required:[true,"Cover required"],
    },
    images: [String],
    createdAt: {
        type:Date,
        default: Date.now(),
    },
    startDates: [Date],
});

let Tour= mongoose.model("Tour",tourSchema);

export default Tour;