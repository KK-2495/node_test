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


app.get("/ping", (req,res) => {
    return res.send("Pong");
})



mongoose.connect(process.env.MONGODB_URL)
.then(()=>console.log('DB-Connected'))
.catch((err)=>console.log(err));

app.listen(process.env.PORT);