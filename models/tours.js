import mongoose from "mongoose";

const tourSchema= new mongoose.Schema({
    name: {
        type:String,
        required: [true,"Name required"],
        unique:true
    },
    rating: {
        type:Number,
        default: 4.5
    },
    price: {
        type:Number,
        required: [true,"Price needed"]
    } 
});

let Tour= mongoose.model("Tour",tourSchema);

export default Tour;