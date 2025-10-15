import { useEffect, useState } from "react";
import axios from "../api/axios";
import BlogCard from "../components/BlogCard";
import BlogEditor from "../components/BlogEditor";
import { useAuth } from "../contexts/AuthContext";

export default function BlogList() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, getIdToken } = useAuth();

  const fetchBlogs = async () => {
    try {
      const res = await axios.get("/blogs");
      setBlogs(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleCreate = async (title: string, content: string) => {
    if (!user) return alert("Login to create blog");
    const token = await getIdToken();
    const res = await axios.post(
      "/blogs",
      { title, content },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setBlogs((prev) => [res.data, ...prev]);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 space-y-10">
      <div className="text-center space-y-3">
        <h1 className="text-4xl font-bold text-gray-800 text-white">
          Discover & Share Thoughts
        </h1>
        <p className="text-gray-500 text-gray-400">
          Write, learn, and grow together ✍️
        </p>
      </div>

      {loading ? (
        <div className="text-center py-10 text-gray-500 animate-pulse">
          Loading blogs...
        </div>
      ) : blogs.length === 0 ? (
        <div className="text-center py-10 text-gray-500 ">
          No blogs yet. Be the first to post!
        </div>
      ) : (
        <div className="grid gap-6">
          {blogs.map((b) => (
            <BlogCard key={b._id} blog={b} />
          ))}
        </div>
      )}
    </div>
  );
}

