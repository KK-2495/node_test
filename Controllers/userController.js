import Users from "../Model/user.js";
import AwdizToken from "../Model/token.js";
import encrypt from "encryptjs";
import { CronJob } from "cron";
import Products from "../Model/product.js";

export const register = async (req,res) =>{
    try {
        const{name, email, password, role,  pin, number} = req.body;
        
        const response = await Users.find({email}).exec();
        if(response.length) return res.send("User is already registered");
        const secretKey = "test";
        const encryptPass = encrypt.encrypt(password,secretKey,256);
        const encryptPin = encrypt.encrypt(pin,secretKey,256);
        const user = new Users({
            name,
            email,
            password:encryptPass,
            role,
            pin:encryptPin,
            number
        });
        await user.save();
        return res.send("Registration Succesfull");
    } catch (error) {
        return res.send(error);
    }
}

// export const tokenGenerate = async (req,res) =>{
//     const job = new CronJob('* * * * *',
//     (await AwdizToken.find({}).exec()),()=>new AwdizToken({
//              accessToken: "aa2244"
//         }),
//     // const newToken = new AwdizToken({
//     //     accessToken
//     // });
//     job.start()
// );
// }


// export const tokenGenerate = async (req,res) =>{
//     const job = new CronJob('* * * * *',
//     (await AwdizToken.find({}).exec()),
//     () => const newToken = new AwdizToken({
//         accessToken
//     });
//     job.start()
// );
// }


export const login = async (req,res) =>{
    try {
        const{email, password} = req.body;
        const response = await Users.find({email}).exec();

        if(!response.length) return res.send("Please Register to Login");

        const secretKey = "test";
        const userPass = response[0].password;
        const decryptPass = encrypt.decrypt(userPass,secretKey,256);
        if(decryptPass == password) return res.send("Login Success");

    } catch (error) {
        return res.send(error);
    }
}

export const addProduct = async (req,res) =>{
    try {
        const {name, category, color, price} = req.body;

        const response = await Products.find({}).exec();

        const product = new Products({
            name,
            category,
            color,
            price
        });
        await product.save();
        return res.send("products added succesfully");
        
    } catch (error) {
        return res.send(error);
    }
}

export const getProduct = async (req,res) =>{
    try {
        const {email} =req.body;
        const response = await Users.find({email}).exec();
        const products = await Products.find({}).exec();
        const role = response[0].role;
        if(role == "seller" || role == "buyer"){
            return res.send(products);
        }else{
            return res.send("You cannot get Products");
        }

        } catch (error) {
        return res.send(error);
    }
}


export const removeProduct = async (req,res) =>{
    try {
        const {email,id} = req.body;
        const user = await Users.find({email}).exec();
        if(user.length) {
            await Products.findByIdAndDelete({_id: id}).exec();
            return res.send("removed successfully");
        }else{
            return res.send("user not found");
        }
    } catch (error) {
        return res.send(error);
    }
}