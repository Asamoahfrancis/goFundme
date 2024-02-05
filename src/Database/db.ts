import mongoose from "mongoose";
import "dotenv/config";

export const dbConnection = () => {
  try {
    mongoose.connection.on("connected", () => console.log("connected"));
    mongoose.connection.on("open", () => console.log("open"));
    const dbURI = process.env.MONGODB_URI as string;
    if (dbURI !== undefined) {
      mongoose.connect(dbURI);
    }
  } catch (error: any) {
    console.log(error.message);
  }
};

export const closeDb = async () => {
  await mongoose.connection.close();
  console.log("MongoDB connection closed");
};
