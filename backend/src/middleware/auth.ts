import { Request, Response, NextFunction } from "express";
import admin from "firebase-admin";

export interface AuthRequest extends Request {
  uid?: string;
  userName?: string;
}

export const firebaseAuth = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const idToken = authHeader.split("Bearer ")[1]?.trim();

    if (!idToken) {
      return res.status(401).json({ message: "Missing ID token" });
    }

    const decoded = await admin.auth().verifyIdToken(idToken);

    req.uid = decoded.uid;
    req.userName = decoded.name || decoded.email || "Unknown";

    next();
  } catch (err: any) {
    if (err?.code === "auth/argument-error") {
      // don't log noisy token errors from early frontend requests
      return res.status(401).json({ message: "Invalid or missing token" });
    }

    console.error("auth error:", err);

    return res.status(401).json({ message: "Unauthorized" });
  }
};

