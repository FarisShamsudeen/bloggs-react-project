import React from "react";
import BlogEditor from "./BlogEditor";

interface EditModalProps {
  title?: string;
  initialTitle: string;
  initialContent: string;
  onSubmit: (title: string, content: string) => void;
  onClose: () => void;
  submitLabel?: string;
}

const EditModal: React.FC<EditModalProps> = ({
  title = "Edit Blog Post",
  initialTitle,
  initialContent,
  onSubmit,
  onClose,
  submitLabel = "Save Changes",
}) => {
  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-indigo-950 border border-blue-400 rounded-2xl p-6 w-full max-w-2xl text-blue-100 shadow-xl animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-white">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-200 text-xl font-bold"
          >
            ✕
          </button>
        </div>

        {/* BlogEditor */}
        <BlogEditor
          initialTitle={initialTitle}
          initialContent={initialContent}
          onSubmit={onSubmit}
          submitLabel={submitLabel}
        />
      </div>
    </div>
  );
};

export default EditModal;

