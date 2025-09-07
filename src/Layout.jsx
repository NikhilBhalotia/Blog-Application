import React from "react";
import { Link } from "react-router-dom";

function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-blue-100">
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <nav className="container flex items-center justify-between px-6 py-4 mx-auto">
          <Link to="/" className="text-2xl font-bold text-blue-600">
            MyBlog
          </Link>
          <ul className="flex space-x-6 font-medium text-gray-700">
            <li>
              <Link to="/" className="transition hover:text-blue-600">
                Home
              </Link>
            </li>
            <li>
              <Link to="/posts" className="transition hover:text-blue-600">
                All Posts
              </Link>
            </li>
            <li>
              <Link to="/login" className="transition hover:text-blue-600">
                Login
              </Link>
            </li>
            <li>
              <Link to="/signup" className="transition hover:text-blue-600">
                Signup
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      {/* Page Content */}
      <main className="container flex-grow px-6 py-10 mx-auto">{children}</main>

      {/* Footer */}
      <footer className="mt-10 bg-white shadow-inner">
        <div className="container flex flex-col items-center justify-between px-6 py-6 mx-auto text-sm text-gray-600 md:flex-row">
          <p>© {new Date().getFullYear()} MyBlog. All Rights Reserved.</p>
          <div className="flex mt-3 space-x-4 md:mt-0">
            <a href="#" className="transition hover:text-blue-600">
              Terms
            </a>
            <a href="#" className="transition hover:text-blue-600">
              Privacy
            </a>
            <a href="#" className="transition hover:text-blue-600">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Layout;
