import express from "express";
import { addProduct, getProduct, login, register, removeProduct } from "../Controllers/userController.js";
import { loginAuth, productAuth, registerAuth, removeProductAuth } from "../Middleware/userAuth.js";

const router = express.Router();


router.post('/register', registerAuth, register);
router.post('/login', loginAuth, login);
router.post('/add-product', productAuth, addProduct);
router.get('/get-product', getProduct);
router.post('/remove-product', removeProductAuth, removeProduct);


export default router;