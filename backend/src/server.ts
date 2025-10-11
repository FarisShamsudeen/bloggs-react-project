import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import admin from "firebase-admin";
import blogsRoute from "./routes/blogs";
import { connectMongo } from "./config/mongo";
import fs from "fs";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;

const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_JSON_PATH || "./serviceAccountKey.json";
const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf8"));
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

connectMongo(process.env.MONGO_URI || "mongodb://localhost:27017/blogapp").catch(err => {
  console.error("Mongo connection error", err);
  process.exit(1);
});

app.use("/api/blogs", blogsRoute);

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));

