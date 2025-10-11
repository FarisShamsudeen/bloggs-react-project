import admin from "firebase-admin";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

const keyPath = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

if (!keyPath) {
  throw new Error("❌ Missing FIREBASE_SERVICE_ACCOUNT_KEY in .env file");
}

// Read and parse the service account key
const serviceAccount = JSON.parse(fs.readFileSync(keyPath, "utf8"));

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
  console.log("✅ Firebase Admin initialized securely");
}

export default admin;

