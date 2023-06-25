import Users from "../Model/user.js";
import encrypt from "encryptjs";


export const registerAuth = (req,res,next) =>{
    try {
        const{name, email, password, role,  pin, number} = req.body;
        if(!name) return res.send("Name is required.");
        if(!email) return res.send("Email is required.");
        if(!password) return res.send("Password is required.");
        if(!role) return res.send("Role is required.");
        if(!pin) return res.send("PIN is required.");
        if(!number) return res.send("Number is required.");
    
        next();    
    } catch (error) {
        return res.send(error);
    }
}

export const loginAuth = async (req,res,next) =>{
    try {
        const {email, password} = req.body;
        if(!email) return res.send("Email is required.");
        if(!password) return res.send("Password is required.");

        const response = await Users.find({email}).exec();
        console.log(response);
        const secretKey = "test";
        const userPass = response[0].password;
        const decryptPass = encrypt.decrypt(userPass,secretKey,256);
        if(decryptPass == password) {
            next();
        }else{
        return res.send("passwords does not match");
        }
    } catch (error) {
        return res.send(error);
    }
}

export const productAuth = async (req,res,next) =>{
    try {
        const {email, name, category, color, price} = req.body;
        if(!name) return res.send("product Name is required");
        if(!category) return res.send("product Category is required");
        if(!color) return res.send("product Color is required");
        if(!price) return res.send("product Price is required");
        
        const response = await Users.find({email}).exec();
        
        const role = response[0].role;

        if(role == "seller" || role == "admin"){
            next();
        }else{
            return res.send("you are not allowed to add products");
        }
        
    } catch (error) {
        return res.send(error);
    }
}

export const removeProductAuth = async (req,res) =>{
    try {
        const{email} = req.body;
        if(!email) return res.send("email is required");
        
        const response = await Users.find({email}).exec();

        const role = response[0].role;

        if(role == "admin"){
            next();
        }else{
            return res.send("you are not allowed to Remove products");
        }        

    } catch (error) {
        return res.send(error);
    }
}