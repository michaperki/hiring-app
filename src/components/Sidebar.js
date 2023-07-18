import React from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ isLoggedIn, onLogout, handleSidebarClose }) => {
  return (
    <div className="bg-gray-900 text-white px-4 py-8 space-y-6">
      {/* Add your sidebar content here */}
      {isLoggedIn ? (
        <>
          <Link to="/dashboard" className="block text-white hover:text-gray-200">
            Dashboard
          </Link>
          <button
            className="bg-transparent hover:bg-white text-white hover:text-gray-900 border border-white hover:border-transparent rounded-md px-4 py-2 transition-colors"
            onClick={onLogout}
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <Link to="/login" className="block text-white hover:text-gray-200">
            Login
          </Link>
          <Link
            to="/signup"
            className="bg-white text-gray-900 px-4 py-2 rounded-md hover:bg-gray-100 transition-colors"
          >
            Sign Up
          </Link>
        </>
      )}

      {/* Button to close the sidebar */}
      <button
        className="block text-white hover:text-gray-200"
        onClick={handleSidebarClose}
      >
        Close Sidebar
      </button>
    </div>
  );
};

export default Sidebar;
