import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

interface LoginModalProps {
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose }) => {
  const { loginWithGoogle } = useAuth();
  const nav = useNavigate();
  const [loading, setLoading] = useState(false); // 🌀 loading state
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    if (loading) return; // block double clicks
    setLoading(true);
    setError(null);

    try {
      await loginWithGoogle();
      setLoading(false);
      onClose();
      nav("/");
    } catch (err: any) {
      console.error("Login error:", err);
      setLoading(false);
      setError("Login failed. Please try again.");
    }
  };

  // ✅ Only close when *not* loading
  const handleBackdropClick = () => {
    if (!loading) onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
      onClick={handleBackdropClick}
    >
      <div
        className="bg-indigo-950 text-white p-8 rounded-2xl shadow-2xl text-center space-y-6 w-[90%] max-w-md border border-blue-400"
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className="text-3xl font-semibold">Welcome to Bloggs</h1>
        <p className="text-gray-400">Sign in to continue</p>

        {/* Google Login Button */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className={`flex items-center justify-center w-full gap-3 px-4 py-2 border border-gray-300 rounded transition-all ${
            loading
              ? "bg-indigo-900 cursor-not-allowed opacity-75"
              : "hover:bg-indigo-900 cursor-pointer"
          }`}
        >
          {loading ? (
            <>
              {/* Spinner Animation */}
              <span className="inline-block w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></span>
              <span>Signing in...</span>
            </>
          ) : (
            <>
              <img
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                alt="Google"
                className="w-5 h-5"
              />
              <span>Continue with Google</span>
            </>
          )}
        </button>

        {/* Error Message */}
        {error && <p className="text-red-400 text-sm">{error}</p>}

        {/* Cancel Button */}
        <button
          onClick={onClose}
          disabled={loading}
          className="text-sm text-gray-400 hover:text-gray-200 mt-2 underline disabled:opacity-50"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default LoginModal;

