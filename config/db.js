import mongoose from "mongoose";

import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {

    try {
        const conn=await mongoose.connect(process.env.MONGO_DB)
        console.log("Database connected successfully");
    }
    catch (error) {
        console.log("Error in DB connection", error);
    }
    
}

export default connectDB;