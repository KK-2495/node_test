import express from "express";
import { addProduct, getProduct, login, register, removeProduct } from "../Controllers/userController.js";
import { loginAuth, productAuth, registerAuth, removeProductAuth } from "../Middleware/userAuth.js";
import { CronJob } from "cron";
import token from "../Model/token.js";

const router = express.Router();

let job = new CronJob('*/1 */4 * * *', 
async ()=>{
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charLength = characters.length;
    let length = 100;
    let accessToken = "";

    for(let i=0;i<length;i++){
        accessToken += characters.charAt(Math.floor(Math.random()* charLength));
    }

    const response = await token.findOne({}).exec();
    if(response){
        response.accessToken = accessToken;
        await response.save();
        console.log("Updated.");
    }

    const newToken = new token({
        accessToken : accessToken
    });
    await newToken.save();
    console.log("Created");
});

job.start();


router.post('/register', registerAuth, register);
router.post('/login', loginAuth, login);
router.post('/add-product', productAuth, addProduct);
router.get('/get-product', getProduct);
router.post('/remove-product', removeProductAuth, removeProduct);


export default router;