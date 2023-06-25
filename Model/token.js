import mongoose from "mongoose";
import { Schema } from "mongoose";

const token = new Schema({
    accessToken: String
});

export default mongoose.model('AwdizToken', token);