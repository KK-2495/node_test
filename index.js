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
        `<!DOCTYPE html>
        <html>
        <head>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>
        body {font-family: Arial, Helvetica, sans-serif;}
        * {box-sizing: border-box;}
        
        .form-inline {  
          display: flex;
          flex-flow: row wrap;
          align-items: center;
        }
        
        .form-inline label {
          margin: 5px 10px 5px 0;
        }
        
        .form-inline input {
          vertical-align: middle;
          margin: 5px 10px 5px 0;
          padding: 10px;
          background-color: #fff;
          border: 1px solid #ddd;
        }
        
        .form-inline button {
          padding: 10px 20px;
          background-color: dodgerblue;
          border: 1px solid #ddd;
          color: white;
          cursor: pointer;
        }
        
        .form-inline button:hover {
          background-color: royalblue;
        }
        
        @media (max-width: 800px) {
          .form-inline input {
            margin: 10px 0;
          }
          
          .form-inline {
            flex-direction: column;
            align-items: stretch;
          }
        }
        </style>
        </head>
        <body>
        
        <form class="form-inline" action='/login' method='post' >
          <label for="email">Email:</label> 
          <input type="email" id="email" placeholder="Enter email" name="email"> <br>
          <label for="pwd">Password:</label> 
          <input name="password"  placeholder="password"/> <br>
          <button type="submit">Submit</button>
        </form>
        
        </body>
        </html>
        `
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