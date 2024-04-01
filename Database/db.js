import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const dbConnection = process.env.MONGODB_CONNECTION_STRING;
const connectDB = async () => {
  try {
    console.log("connection string", dbConnection);
    const connection = await mongoose.connect(dbConnection);
    console.log("Connected to the MongoDb DataBase");
    return connection;
  } catch (error) {
    console.log("Error", error);
  }
};

export default connectDB;
