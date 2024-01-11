import mongoose from "mongoose";
import { config } from "dotenv";
import fs from "fs";
import Tour from "../../models/tours.js";

config({path:"../../config.env"});

mongoose.connect(process.env.DATABASE,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false,
    useUnifiedTopology:true,
}).then(con=>{
    console.log("DB connection success!");
}).catch(err=>console.log(err));

const tours= JSON.parse(fs.readFileSync(`./tours-simple.json`,'utf-8'));

async function importData() {
        try {
            await Tour.create(tours);
            console.log("Imported data!");
            process.exit();
        } catch (error) {
            console.log(error);
            
        }
}

async function delData(){
    try {
        await Tour.deleteMany();
        console.log("Deleted data!");
        process.exit();
    } catch (error) {
        console.log(error);
        
    }
}

console.log(process.argv);

if (process.argv[2]==="--import") {
    importData();
}
else if(process.argv[2]==="--delete"){
    delData();
}