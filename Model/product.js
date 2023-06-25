import mongoose from "mongoose";
import { Schema } from "mongoose";

const product = new Schema({
    name: String,
    category: String,
    color: String,
    price: Number
});

export default mongoose.model('Products', product);