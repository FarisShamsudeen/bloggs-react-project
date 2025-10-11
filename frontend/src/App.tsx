import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import BlogList from "./pages/BlogList";
import BlogPage from "./pages/BlogPage";
import MyBlogs from "./pages/MyBlogs";
import { useAuth } from "./contexts/AuthContext";
import ConfirmModal from "./components/ConfirmModal";

const App: React.FC = () => {
  const { user, logout } = useAuth();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  return (
    <div className="min-h-screen bg-indigo-950">
      <nav className="p-4 bg-indigo-950 text-white shadow-lg flex justify-between items-center">
        <div>
          <Link to="/" className="hover:text-blue-300 font-bold text-lg">
            Home
          </Link>
        </div>

        <div className="flex items-center space-x-5">
          {user && <Link to="/my" className='hover:text-yellow-200'>My Blogs</Link>}
          {user ? (
            <div className="flex items-center gap-x-5">
              <button
                onClick={() => setShowLogoutModal(true)}
                className="text-sm underline hover:text-blue-300 transition cursor-pointer"
              >
                Logout
              </button>
              {user.photoURL && (
                <img
                  src={user.photoURL}
                  alt="avatar"
                  className="w-8 h-8 rounded-full border border-blue-400"
                />
              )}
            </div>
          ) : (
            <Link to="/login"><p className='cursor-pointer' >Login</p></Link>
          )}
        </div>
      </nav>

      <main className="p-6">
        <Routes>
          <Route path="/" element={<BlogList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/blogs/:id" element={<BlogPage />} />
          <Route path="/my" element={<MyBlogs />} />
        </Routes>
      </main>

      {showLogoutModal && (
        <ConfirmModal
          title="Confirm Logout"
          message="Are you sure you want to log out of your account?"
          confirmLabel="Logout"
          cancelLabel="Cancel"
          onConfirm={async () => {
            await logout();
            setShowLogoutModal(false);
          }}
          onCancel={() => setShowLogoutModal(false)}
        />
      )}
    </div>
  );
};

export default App;

