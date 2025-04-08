import mongoose from "mongoose"

export const connectDB = async ()=>{
    try{
        // For local MongoDB connection
        const conn = await mongoose.connect("mongodb://localhost:27017/ipl-auction");
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    }
    catch (error){
        console.log("Error Connection to MongoDB: ",error.message);
        console.log(error)
        process.exit(1); // 1 is failure, 0 status code is sucess
    }
}