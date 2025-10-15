import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { loginWithGoogle } = useAuth();
  const nav = useNavigate();

  const handleLogin = async () => {
    try {
      await loginWithGoogle();
      nav("/");
    } catch (err: any) {
      alert("Login failed: " + err.message);
    }
  };

  return (
    <div className="flex justify-center bg-indigo-950">
      <div className="bg-indigo-950 text-white p-8 rounded shadow-2xl text-center space-y-6">
        <h1 className="text-5xl font-semibold">Welcome to Bloggs</h1>
        <p className="text-gray-500">Sign in to continue</p>
        <button
          onClick={handleLogin}
          className="flex items-center justify-center w-full gap-3 px-4 py-2 border border-gray-300 rounded hover:bg-indigo-900 transition"
        >
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google"
            className="w-5 h-5"
          />
          <span>Continue with Google</span>
        </button>
      </div>
    </div>
  );
}

