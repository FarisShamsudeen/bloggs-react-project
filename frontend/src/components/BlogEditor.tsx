import React, { useState } from "react";

interface BlogEditorProps {
  initialTitle?: string;
  initialContent?: string;
  onSubmit: (title: string, content: string) => Promise<void> | void;
  submitLabel?: string;
}

export default function BlogEditor({
  initialTitle = "",
  initialContent = "",
  onSubmit,
  submitLabel = "Publish",
}: BlogEditorProps) {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [errors, setErrors] = useState<{ title?: string; content?: string }>({});
  const [touched, setTouched] = useState(false);
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ✅ Validation Logic
  const validate = () => {
    const newErrors: typeof errors = {};

    if (!title.trim()) newErrors.title = "Title is required.";
    else if (title.trim().length < 3)
      newErrors.title = "Title must be at least 3 characters long.";
    else if (title.trim().length > 100)
      newErrors.title = "Title cannot exceed 100 characters.";

    if (!content.trim()) newErrors.content = "Content is required.";
    else if (content.trim().length < 30)
      newErrors.content = "Content must be at least 30 characters long.";
    else if (content.trim().length > 10000)
      newErrors.content = "Content cannot exceed 10,000 characters.";

    setErrors(newErrors);
    return newErrors;
  };

  const handleSubmit = async () => {
    setTouched(true);
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) return;

    setIsSubmitting(true);

    try {
      await onSubmit(title.trim(), content.trim());
      setTitle("");
      setContent("");
      setTouched(false);
      showToast("success", "🎉 Blog uploaded successfully!");
    } catch (error) {
      console.error(error);
      showToast("error", "❌ Failed to upload the blog. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ✅ Live Validation After Submit
  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (touched) validate();
  };
  const handleContentChange = (val: string) => {
    setContent(val);
    if (touched) validate();
  };

  // ✅ Toast Logic
  const showToast = (type: "success" | "error", message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3000); // hide after 3s
  };

  return (
    <div className="space-y-4 text-white relative">
      {/* ✅ Toast Notification */}
      {toast && (
        <div
          className={`fixed top-6 left-1/2 -translate-x-1/2 px-6 py-3 rounded-xl shadow-lg text-center font-medium z-50 animate-fadeIn ${
            toast.type === "success"
              ? "bg-green-600 text-white"
              : "bg-red-600 text-white"
          }`}
        >
          {toast.message}
        </div>
      )}

      {/* ✅ Title Input */}
      <div>
        <input
          className={`w-full p-3 rounded-lg border bg-purple-950 text-white focus:outline-none focus:ring-2 transition ${
            touched && errors.title
              ? "border-red-600 focus:ring-red-500"
              : "border-blue-600 focus:ring-blue-500"
          }`}
          placeholder="Enter a title..."
          value={title}
          onChange={(e) => handleTitleChange(e.target.value)}
        />
        {touched && errors.title && (
          <p className="text-red-400 text-sm mt-1 animate-fadeIn">{errors.title}</p>
        )}
      </div>

      {/* ✅ Content Textarea */}
      <div>
        <textarea
          className={`w-full h-48 p-3 border rounded-lg bg-purple-950 text-white focus:ring-2 resize-none transition ${
            touched && errors.content
              ? "border-red-600 focus:ring-red-500"
              : "border-blue-600 focus:ring-blue-500"
          }`}
          placeholder="Write your blog content here..."
          value={content}
          onChange={(e) => handleContentChange(e.target.value)}
        />
        {touched && errors.content && (
          <p className="text-red-400 text-sm mt-1 animate-fadeIn">{errors.content}</p>
        )}
      </div>

      {/* ✅ Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={isSubmitting}
        className={`px-6 py-2 rounded-lg font-medium transition-all ${
          isSubmitting
            ? "bg-gray-600 text-gray-300 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
        }`}
      >
        {isSubmitting ? "Publishing..." : submitLabel}
      </button>
    </div>
  );
}

