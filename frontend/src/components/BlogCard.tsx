import React from "react";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function BlogCard({ blog }: { blog: any }) {
  return (
    <Link
      to={`/blogs/${blog._id}`}
      className="block bg-indigo-950 border border-gray-100 hover:shadow-lg shadow-indigo-500/50 hover:-translate-y-1 transition-all rounded-2xl p-5"
    >
      <h3 className="text-2xl font-semibold text-gray-100 mb-2">
        {blog.title}
      </h3>
      <p className="text-sm text-gray-400 mb-3">
        {blog.authorName} •{" "}
        {new Date(blog.createdAt).toLocaleDateString("en-IN", {
          month: "short",
          day: "numeric",
        })}
      </p>

      <div className="text-gray-300 text-sm line-clamp-4 leading-relaxed">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {blog.content.slice(0, 400) + (blog.content.length > 400 ? "..." : "")}
        </ReactMarkdown>
      </div>
    </Link>
  );
}

