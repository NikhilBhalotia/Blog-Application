import React from "react";
import { Container, Logo, LogoutBtn } from "../index";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const userData = useSelector((state) => state.auth.userData);
  const navigate = useNavigate();

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  return (
    <header className="py-3 bg-gray-500 shadow">
      <Container>
        <nav className="flex items-center">
          {/* Logo */}
          <div className="mr-4">
            <Link to="/">
              <Logo width="50px" />
            </Link>
          </div>

          {/* Navigation Links */}
          <ul className="flex items-center gap-2 ml-auto">
            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.name}>
                    <button
                      onClick={() => navigate(item.slug)}
                      className="inline-block px-4 py-2 duration-200 rounded-full hover:bg-blue-100"
                    >
                      {item.name}
                    </button>
                  </li>
                )
            )}

            {/* Profile + Logout (only if logged in) */}
            {authStatus && (
              <li className="relative group">
                {/* Profile Icon */}
                <button
                  onClick={() => navigate("/profile")}
                  className="flex items-center justify-center w-10 h-10 font-semibold text-white bg-blue-600 rounded-full hover:bg-blue-700"
                >
                  {userData?.name ? userData.name.charAt(0).toUpperCase() : "U"}
                </button>

                {/* Dropdown */}
                <div className="absolute right-0 hidden w-40 py-2 mt-2 bg-white rounded-lg shadow-lg group-hover:block">
                  <button
                    onClick={() => navigate("/profile")}
                    className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                  >
                    Profile
                  </button>
                  <div className="my-1 border-t border-gray-200"></div>
                  <div className="px-4 py-2">
                    <LogoutBtn />
                  </div>
                </div>
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
