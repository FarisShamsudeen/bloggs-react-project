import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import BlogEditor from "../components/BlogEditor";
import axios from "../api/axios";
import { useToast } from "../contexts/ToastContext";

export default function CreateBlog() {
  const { user, getIdToken } = useAuth();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleCreate = async (title: string, content: string) => {
    if (!user) {
      showToast("error", "⚠️ You must be logged in to create a blog!");
      return;
    }

    try {
      const token = await getIdToken();
      await axios.post(
        "/blogs",
        { title, content },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      navigate("/"); // redirect first

      // then show toast after short delay so it's visible on Home
      setTimeout(() => {
        showToast("success", "🎉 Blog created successfully!");
      }, 200);
    } catch (err) {
      console.error("Error creating blog:", err);
      showToast("error", "❌ Something went wrong while creating your blog.");
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center text-white">
        Create a New Blog
      </h1>
      <div className="bg-indigo-950 p-6 rounded-2xl shadow-2xl border border-blue-500">
        <BlogEditor onSubmit={handleCreate} submitLabel="Publish" />
      </div>
    </div>
  );
}

