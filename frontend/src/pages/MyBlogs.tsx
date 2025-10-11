import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import { useAuth } from "../contexts/AuthContext";
import { useSearchParams, useNavigate } from "react-router-dom";
import EditModal from "../components/EditModal";
import DeleteModal from "../components/DeleteModal";
import AlertToast from "../components/AlertToast";

export default function MyBlogs() {
  const { getIdToken, loading } = useAuth();
  const [blogs, setBlogs] = useState<any[]>([]);
  const [editing, setEditing] = useState<any | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [alert, setAlert] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [searchParams] = useSearchParams();
  const nav = useNavigate();

  useEffect(() => {
    if (loading) return;
    const load = async () => {
      try {
        const token = await getIdToken();
        if (!token) return;
        const res = await axios.get("/blogs/user/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBlogs(res.data);
      } catch (err) {
        console.error(err);
        setAlert({ type: "error", message: "Failed to fetch blogs." });
      }
    };
    load();
  }, [loading]);

  useEffect(() => {
    const editId = searchParams.get("edit");
    if (editId) {
      const b = blogs.find((x) => x._id === editId);
      if (b) setEditing(b);
    }
  }, [searchParams, blogs]);

  const handleEditSubmit = async (title: string, content: string) => {
    if (!editing) return;
    try {
      const token = await getIdToken();
      const res = await axios.put(
        `/blogs/${editing._id}`,
        { title, content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setBlogs((prev) =>
        prev.map((b) => (b._id === res.data._id ? res.data : b))
      );
      setEditing(null);
      setAlert({ type: "success", message: "✅ Blog updated successfully!" });
    } catch (err) {
      console.error(err);
      setAlert({ type: "error", message: "❌ Failed to update blog." });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const token = await getIdToken();
      await axios.delete(`/blogs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBlogs((prev) => prev.filter((b) => b._id !== id));
      setDeleteTarget(null);
      setAlert({ type: "success", message: "🗑️ Blog deleted successfully!" });
    } catch (err) {
      console.error(err);
      setAlert({ type: "error", message: "❌ Failed to delete blog." });
    }
  };

  return (
    <div className="space-y-4 relative">
      {alert && (
        <AlertToast
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}

      <div className="grid gap-4">
        {blogs.length === 0 ? (
          <div className="col-span-full text-center py-10 text-gray-400">
            <p className="text-2xl">You haven’t written any blogs yet.</p>
            <p className="text-sm mt-2 text-gray-500">
              Go to the{" "}
              <span
                onClick={() => nav("/")}
                className="cursor-pointer hover:text-blue-200 text-blue-400 font-medium"
              >
                Home
              </span>{" "}
              page and share your first post!
            </p>
          </div>
        ) : (
          blogs.map((b) => (
            <div
              key={b._id}
              className="flex justify-between items-center p-4 bg-indigo-900 text-blue-100 rounded-2xl shadow hover:shadow-lg transition-all"
            >
              <div className="flex flex-col space-y-2">
                <h3 className="text-xl font-semibold">{b.title}</h3>
                <p className="text-sm text-blue-400">
                  Created {new Date(b.createdAt).toLocaleString()}
                </p>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={() => setEditing(b)}
                  className="px-4 py-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded-xl text-lg transition-all"
                >
                  Edit
                </button>
                <button
                  onClick={() => setDeleteTarget(b._id)}
                  className="px-4 py-1 bg-red-600 hover:bg-red-700 text-white rounded-xl text-lg transition-all"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {editing && (
        <EditModal
          title="Edit Blog"
          initialTitle={editing.title}
          initialContent={editing.content}
          onSubmit={handleEditSubmit}
          onClose={() => setEditing(null)}
          submitLabel="Save Changes"
        />
      )}

      {deleteTarget && (
        <DeleteModal
          title="Confirm Deletion"
          message="Are you sure you want to delete this blog? This action cannot be undone."
          onCancel={() => setDeleteTarget(null)}
          onConfirm={() => handleDelete(deleteTarget)}
        />
      )}
    </div>
  );
}

