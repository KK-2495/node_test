import express from "express";
import morgan from "morgan";
import router from "./Route/routes.js";
import mongoose from "mongoose";
import dotenv from 'dotenv';

const app = express();
dotenv.config();

app.use(morgan('dev'));
app.use(express.json());
app.use('/api/v1', router)


app.get("/node-test", (req,res) => {
    return res.send("node test ");
})



mongoose.connect('mongodb+srv://Krish24:Krish%402495@cluster0.s8xz5ha.mongodb.net/Node_Test?retryWrites=true&w=majority')
.then(()=>console.log('DB-Connected'))
.catch((err)=>console.log(err));

app.listen(8000);