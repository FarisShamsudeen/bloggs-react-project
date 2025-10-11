import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectMongo } from "./config/mongo";
import "./config/firebaseAdmin"; 

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;


connectMongo(process.env.MONGO_URI || "mongodb://localhost:27017/blogapp")
  .then(() => console.log("MongoDB connected from Server.ts"))
  .catch((err) => {
    console.error("Mongo connection error", err);
    process.exit(1);
  });

import blogsRoute from "./routes/blogs";
app.use("/api/blogs", blogsRoute);

app.listen(PORT, () => console.log(`✅ Server listening on ${PORT}`));

