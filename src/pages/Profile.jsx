// src/pages/Profile.jsx
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import authService from "../appwrite/auth";
import { login, logout } from "../store/authSlice";

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [message, setMessage] = useState({ text: "", type: "" }); // ✅ message system

  // Load initial user details
  useEffect(() => {
    if (userData) {
      setName(userData.name || "");
      setEmail(userData.email || "");
    }
  }, [userData]);

  // ✅ Update name
  const handleNameUpdate = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = await authService.account.updateName(name);
      dispatch(login(updatedUser));
      setMessage({ text: "Name updated successfully!", type: "success" });
    } catch (error) {
      console.error("Name update failed:", error);
      setMessage({ text: "Failed to update name.", type: "error" });
    }
  };

  // ✅ Update email
  const handleEmailUpdate = async (e) => {
    e.preventDefault();
    try {
      const password = prompt("Enter your password to confirm:");
      const updatedUser = await authService.account.updateEmail(
        email,
        password
      );
      dispatch(login(updatedUser));
      setMessage({ text: "Email updated successfully!", type: "success" });
    } catch (error) {
      console.error("Email update failed:", error);
      setMessage({ text: "Failed to update email.", type: "error" });
    }
  };

  // ✅ Update password (logs user out)
  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    if (!oldPassword || !newPassword) {
      setMessage({ text: "Please enter old and new password.", type: "error" });
      return;
    }
    try {
      await authService.account.updatePassword(newPassword, oldPassword);
      await authService.account.deleteSessions(); // kill all sessions
      dispatch(logout());
      navigate("/login");
      setMessage({
        text: "Password updated successfully! Please log in again.",
        type: "success",
      });
    } catch (error) {
      console.error("Password update failed:", error);
      setMessage({
        text: "Failed to update password. Please check your old password.",
        type: "error",
      });
    }
  };

  // ✅ Logout
  const handleLogout = async () => {
    try {
      await authService.account.deleteSession("current");
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      setMessage({ text: "Logout failed. Try again.", type: "error" });
    }
  };

  if (!userData) {
    return (
      <div className="p-6">
        <h2 className="text-xl font-semibold">
          Please log in to view profile.
        </h2>
      </div>
    );
  }

  return (
    <div className="max-w-xl p-6 mx-auto mt-10 bg-white rounded-lg shadow-md">
      <h1 className="mb-6 text-2xl font-bold">Profile</h1>

      {/* ✅ Show message */}
      {message.text && (
        <div
          className={`mb-4 p-3 rounded ${
            message.type === "success"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Name */}
      <form onSubmit={handleNameUpdate} className="mb-4">
        <label className="block mb-1 font-medium">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 mb-2 border rounded"
        />
        <button
          type="submit"
          className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Update Name
        </button>
      </form>

      {/* Email */}
      <form onSubmit={handleEmailUpdate} className="mb-4">
        <label className="block mb-1 font-medium">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-2 border rounded"
        />
        <button
          type="submit"
          className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
        >
          Update Email
        </button>
      </form>

      {/* Password */}
      <form onSubmit={handlePasswordUpdate} className="mb-4">
        <label className="block mb-1 font-medium">Old Password</label>
        <input
          type="password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          className="w-full p-2 mb-2 border rounded"
        />

        <label className="block mb-1 font-medium">New Password</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full p-2 mb-2 border rounded"
        />

        <button
          type="submit"
          className="px-4 py-2 text-white bg-purple-500 rounded hover:bg-purple-600"
        >
          Update Password
        </button>
      </form>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
}

export default Profile;
