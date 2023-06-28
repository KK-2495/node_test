import express from "express";
import morgan from "morgan";
import router from "./Route/routes.js";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import path from "path";



const app = express();
dotenv.config();

app.use(express.static('public'));
app.use(express.urlencoded({ extended:true }));

const __dirname = path.resolve();

app.use(morgan('dev'));
app.use(express.json());
app.use('/api/v1', router)


app.get("/register", (req,res) => {
    return res.sendFile(__dirname +  '/public/html/register.html');
})

app.get("/urlencoded", (req, res) => {
    res.send(
        `<form method='post' action='/login'>
            <input name="email" placeholder="text" />
            <input name="password"  placeholder="password"/>
            <input type='submit' value="LOgin"/>
        </form>`
    )
})

app.post('/login', (req, res) => {
    console.log(req.body.email)
    console.log(req.body.password)
    // db store 
    res.send(`Your email ${req.body.email} and passsword is ${req.body.password}`)
})

mongoose.connect('mongodb+srv://Krish24:Krish%402495@cluster0.s8xz5ha.mongodb.net/Node_Test?retryWrites=true&w=majority')
.then(()=>console.log('DB-Connected'))
.catch((err)=>console.log(err));

app.listen(8000);