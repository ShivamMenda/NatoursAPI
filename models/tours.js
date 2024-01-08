const mongoose=require("mongoose");

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

exports.Tour=mongoose.model('Tour',tourSchema);