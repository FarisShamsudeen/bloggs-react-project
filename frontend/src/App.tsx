import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import BlogList from "./pages/BlogList";
import BlogPage from "./pages/BlogPage";
import MyBlogs from "./pages/MyBlogs";
import CreateBlog from "./pages/CreateBlog";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-indigo-950">
      <Navbar />
      <main className="p-6">
        <Routes>
          <Route path="/" element={<BlogList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/blogs/:id" element={<BlogPage />} />

          <Route
            path="/my"
            element={
              <ProtectedRoute>
                <MyBlogs />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create"
            element={
              <ProtectedRoute>
                <CreateBlog />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </div>
  );
};

export default App;

