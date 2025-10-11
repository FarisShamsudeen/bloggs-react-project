import { Router } from "express";
import * as ctrl from "../controllers/blogController";
import { firebaseAuth } from "../middleware/auth";

const router = Router();

router.get("/", ctrl.getAll);
router.get("/user/me", firebaseAuth, ctrl.getMyBlogs); 
router.get("/:id", ctrl.getById);
router.post("/", firebaseAuth, ctrl.createBlog);
router.put("/:id", firebaseAuth, ctrl.updateBlog);
router.delete("/:id", firebaseAuth, ctrl.deleteBlog);

export default router;

