import mongoose from "mongoose";

export const connectMongo = async (uri: string) => {
  await mongoose.connect(uri);
  console.log("MongoDB connected");
};

