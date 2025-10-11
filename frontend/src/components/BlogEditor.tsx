import React, { useState, useEffect } from "react";

export default function BlogEditor({
  initialTitle = "",
  initialContent = "",
  onSubmit,
  submitLabel = "Publish",
}: {
  initialTitle?: string;
  initialContent?: string;
  onSubmit: (title: string, content: string) => Promise<void> | void; // support async
  submitLabel?: string;
}) {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [errors, setErrors] = useState<{ title?: string; content?: string }>({});
  const [isValid, setIsValid] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  // ✅ Validation Logic
  const validate = () => {
    const newErrors: typeof errors = {};

    // Title validation
    if (!title.trim()) newErrors.title = "Title is required.";
    else if (title.trim().length < 3)
      newErrors.title = "Title must be at least 3 characters long.";
    else if (title.trim().length > 100)
      newErrors.title = "Title cannot exceed 100 characters.";

    // Content validation
    if (!content.trim()) newErrors.content = "Content is required.";
    else if (content.trim().length < 30)
      newErrors.content = "Content must be at least 30 characters long.";
    else if (content.trim().length > 10000)
      newErrors.content = "Content cannot exceed 10,000 characters.";

    setErrors(newErrors);
    setIsValid(Object.keys(newErrors).length === 0);
  };

  useEffect(() => {
    validate();
  }, [title, content]);

  const handleSubmit = async () => {
    validate();
    if (!isValid) return; // stop submission if invalid

    try {
      await onSubmit(title.trim(), content.trim()); // support async handlers
      setTitle("");
      setContent("");
      setStatus("success");
      setMessage("Blog uploaded successfully!");
    } catch (error) {
      console.error(error);
      setStatus("error");
      setMessage("Failed to upload the blog. Please try again.");
    }

    // Hide message automatically after a few seconds
    setTimeout(() => {
      setStatus("idle");
      setMessage("");
    }, 4000);
  };

  return (
    <div className="space-y-4">
      {status !== "idle" && (
        <div
          className={`p-3 rounded-md text-center font-medium transition-all ${
            status === "success"
              ? "bg-green-600 text-white"
              : "bg-red-600 text-white"
          }`}
        >
          {message}
        </div>
      )}

      {/* Title Input */}
      <div>
        <input
          className={`w-full p-3 rounded-lg border ${
            errors.title ? "border-red-600" : "border-blue-600"
          } bg-purple-950 text-white focus:outline-none focus:ring-2 ${
            errors.title ? "focus:ring-red-500" : "focus:ring-blue-500"
          }`}
          placeholder="Enter a title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {errors.title && (
          <p className="text-red-400 text-sm mt-1">{errors.title}</p>
        )}
      </div>

      {/* Content Textarea */}
      <div>
        <textarea
          className={`w-full h-48 p-3 border rounded-lg ${
            errors.content ? "border-red-600" : "border-blue-600"
          } bg-purple-950 text-white focus:ring-2 ${
            errors.content ? "focus:ring-red-500" : "focus:ring-blue-500"
          } focus:outline-none resize-none`}
          placeholder="Write your blog content here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        {errors.content && (
          <p className="text-red-400 text-sm mt-1">{errors.content}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={!isValid}
        className={`px-6 py-2 rounded-lg font-medium transition-all ${
          isValid
            ? "bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
            : "bg-gray-600 text-gray-300 cursor-not-allowed"
        }`}
      >
        {submitLabel}
      </button>
    </div>
  );
}

