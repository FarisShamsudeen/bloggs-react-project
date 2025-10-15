import React, { useState } from "react";
import { Link } from "react-router-dom";
import ConfirmModal from "./ConfirmModal";
import { useAuth } from "../contexts/AuthContext";

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  return (
    <>
      <nav className="p-4 bg-indigo-950 text-white shadow-lg flex justify-between items-center">
        {/* Left: Logo / Home Link */}
        <div>
          <Link to="/" className="hover:text-blue-300 font-bold text-lg">
            Home
          </Link>
        </div>

        {/* Right: Navigation Links */}
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
            <Link to="/login">
              <p className="cursor-pointer hover:text-blue-300">Login</p>
            </Link>
          )}
        </div>
      </nav>

      {/* Logout Confirmation Modal */}
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
    </>
  );
};

export default Navbar;

