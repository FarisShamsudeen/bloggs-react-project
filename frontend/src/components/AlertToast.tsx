// src/components/AlertToast.tsx
import React, { useEffect, useState } from "react";

interface AlertToastProps {
  type: "success" | "error";
  message: string;
  onClose: () => void;
}

export default function AlertToast({ type, message, onClose }: AlertToastProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Animate in
    setVisible(true);

    // Auto-hide after 4s
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(() => onClose(), 300); // allow animation to finish
    }, 4000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed top-5 right-5 px-5 py-3 rounded-xl shadow-lg font-semibold text-white z-50 transition-all duration-300 transform
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5"}
        ${type === "success" ? "bg-green-600" : "bg-red-600"} backdrop-blur-md`}
    >
      {message}
    </div>
  );
}

