import { config } from "dotenv";
import mongoose from "mongoose";
import express from 'express';
import morgan from "morgan";
import tourRouter from "./routes/tourRoutes.js";
const app=express();

config({path:"./config.env"});

mongoose.connect(process.env.DATABASE,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false,
    useUnifiedTopology:true,
}).then(con=>{
    console.log("DB connection success!");
}).catch(err=>console.log(err));


if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(express.json());
app.use("/api/v1/tours",tourRouter);

const port=process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`Server running on port ${port}..`);
})
