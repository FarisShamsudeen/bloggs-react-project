import React, { useState } from "react";
import { Link } from "react-router-dom";
import ConfirmModal from "./ConfirmModal";
import LoginModal from "./LoginModal";
import { useAuth } from "../contexts/AuthContext";

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginLocked, setLoginLocked] = useState(false); // 👈 new state

  return (
    <>
      <nav className="p-4 bg-indigo-950 text-white shadow-lg flex justify-between items-center">
        <div>
          <Link to="/" className="hover:text-blue-300 font-bold text-lg">
            Home
          </Link>
        </div>

        <div className="flex items-center space-x-5">
          {user && (
            <Link to="/my" className="hover:text-yellow-200">
              My Blogs
            </Link>
          )}

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
            <button
              onClick={() => !loginLocked && setShowLoginModal(true)}
              disabled={loginLocked}
              className={`cursor-pointer transition ${
                loginLocked
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:text-blue-300"
              }`}
            >
              Login
            </button>
          )}
        </div>
      </nav>

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

      {showLoginModal && (
        <LoginModal
          onClose={() => {
            setShowLoginModal(false);
            setLoginLocked(false);
          }}
        />
      )}
    </>
  );
};

export default Navbar;

