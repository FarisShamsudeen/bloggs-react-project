import { Request, Response } from "express";
import Blog from "../models/Blog";
import { AuthRequest } from "../middleware/auth";

export const getAll = async (req: Request, res: Response) => {
  const blogs = await Blog.find().sort({ createdAt: -1 });
  res.json(blogs);
};

export const getById = async (req: Request, res: Response) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) return res.status(404).json({ message: "Not found" });
  res.json(blog);
};

export const createBlog = async (req: AuthRequest, res: Response) => {
  const { title, content } = req.body;
  if (!req.uid) return res.status(401).json({message: "Unauthorized"});
  const blog = new Blog({
    title,
    content,
    authorId: req.uid,
    authorName: req.userName || "Unknown"
  });
  await blog.save();
  res.status(201).json(blog);
};

export const updateBlog = async (req: AuthRequest, res: Response) => {
  const { title, content } = req.body;
  const blog = await Blog.findById(req.params.id);
  if (!blog) return res.status(404).json({ message: "Not found" });
  if (blog.authorId !== req.uid) return res.status(403).json({ message: "Forbidden" });
  blog.title = title;
  blog.content = content;
  await blog.save();
  res.json(blog);
};

export const deleteBlog = async (req: Request, res: Response) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    if (blog.authorId !== req.uid)
      return res.status(403).json({ message: "Not authorized" });

    await Blog.findByIdAndDelete(req.params.id); // ✅ Fixed
    res.json({ message: "Blog deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


export const getMyBlogs = async (req: AuthRequest, res: Response) => {
  if (!req.uid) return res.status(401).json({message: "Unauthorized"});
  const blogs = await Blog.find({ authorId: req.uid }).sort({ createdAt: -1 });
  res.json(blogs);
};

