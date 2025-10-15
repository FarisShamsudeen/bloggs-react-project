import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useAuth } from "../contexts/AuthContext";
import EditModal from "../components/EditModal";
import DeleteModal from "../components/DeleteModal";
import { useToast } from "../contexts/ToastContext";

export default function BlogPage() {
  const { id } = useParams();
  const [blog, setBlog] = useState<any>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { user, getIdToken } = useAuth();
  const { showToast } = useToast();
  const nav = useNavigate();

  // Load the blog
  useEffect(() => {
    if (!id) return;
    axios
      .get(`/blogs/${id}`)
      .then((res) => setBlog(res.data))
      .catch(() => showToast("error", "⚠️ Failed to load blog post."));
  }, [id]);

  // Handle delete
  const handleDelete = async () => {
    try {
      if (!user) return showToast("error", "Login required");
      const token = await getIdToken();
      await axios.delete(`/blogs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // ✅ Navigate first, then show toast after redirect
      nav("/");
      setTimeout(() => {
        showToast("success", "🗑️ Blog deleted successfully!");
      }, 150);
    } catch (error) {
      showToast("error", "❌ Failed to delete blog.");
    }
  };

  // Handle edit
  const handleEditSubmit = async (title: string, content: string) => {
    try {
      if (!user) return showToast("error", "Login required");
      const token = await getIdToken();
      const res = await axios.put(
        `/blogs/${id}`,
        { title, content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setBlog(res.data);
      setShowEditModal(false);
      showToast("success", "✅ Blog updated successfully!");
    } catch (error) {
      showToast("error", "❌ Failed to update blog.");
    }
  };

  return blog ? (
    <div className="relative max-w-3xl mx-auto bg-indigo-950 text-blue-100 p-6 rounded-2xl border border-blue-200">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{blog.title}</h1>

        {user && user.uid === blog.authorId && (
          <div className="flex gap-2">
            <button
              className="px-4 py-2 bg-yellow-500 text-white rounded-xl cursor-pointer hover:bg-yellow-600 transition"
              onClick={() => setShowEditModal(true)}
            >
              Edit
            </button>
            <button
              className="px-4 py-2 bg-red-600 text-white rounded-xl cursor-pointer hover:bg-red-700 transition"
              onClick={() => setShowDeleteModal(true)}
            >
              Delete
            </button>
          </div>
        )}
      </div>

      <p className="text-sm text-gray-400 mt-1">
        By {blog.authorName} • {new Date(blog.createdAt).toLocaleString()}
      </p>

      <div className="prose mt-6 text-blue-100">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {blog.content}
        </ReactMarkdown>
      </div>

      {showEditModal && (
        <EditModal
          title="Edit Blog Post"
          initialTitle={blog.title}
          initialContent={blog.content}
          onSubmit={handleEditSubmit}
          onClose={() => setShowEditModal(false)}
          submitLabel="Save Changes"
        />
      )}

      {showDeleteModal && (
        <DeleteModal
          title="Confirm Deletion"
          message="Are you sure you want to delete this blog? This action cannot be undone."
          onCancel={() => setShowDeleteModal(false)}
          onConfirm={async () => {
            await handleDelete();
            setShowDeleteModal(false);
          }}
        />
      )}
    </div>
  ) : (
    <div className="text-center text-gray-400 mt-10">Loading...</div>
  );
}

