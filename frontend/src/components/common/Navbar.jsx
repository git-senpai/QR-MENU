import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuthStore from "../../store/authStore";
import useCartStore from "../../store/cartStore";
import { FaShoppingCart, FaUser, FaSignOutAlt, FaCog, FaBars, FaTimes } from "react-icons/fa";
import { FiGrid, FiPieChart, FiLogOut, FiList } from "react-icons/fi";
import Logo from './Logo';

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuthStore();
  const { getItemCount } = useCartStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleAdminPanel = () => {
    navigate('/admin/dashboard');
  };

  const handleAdminDashboard = () => {
    navigate('/admin');
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-lg" : "bg-indigo-600"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Logo 
              className="h-10 w-auto" 
              color={isScrolled ? "#4F46E5" : "#FFFFFF"}
            />
            <span
              className={`text-2xl font-bold ${
                isScrolled ? "text-indigo-600" : "text-white"
              }`}
            >
              FoodOrder
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/menu"
              className={`text-sm font-medium transition-colors duration-200 ${
                isScrolled
                  ? isActivePath("/menu")
                    ? "text-indigo-600"
                    : "text-gray-700 hover:text-indigo-600"
                  : "text-white hover:text-indigo-200"
              }`}
            >
              Menu
            </Link>

            {/* Add Create Menu Item button for admin users */}
            {user?.role === "admin" && (
              <Link
                to="/admin/create-item"
                className={`text-sm font-medium px-4 py-2 rounded-full transition-colors duration-200 ${
                  isScrolled
                    ? "bg-indigo-600 text-white hover:bg-indigo-700"
                    : "bg-white text-indigo-600 hover:bg-indigo-50"
                }`}
              >
                Create Menu Item
              </Link>
            )}

            {/* Cart Icon */}
            <Link to="/cart" className="relative group">
              <FaShoppingCart
                className={`h-6 w-6 transition-colors duration-200 ${
                  isScrolled
                    ? "text-gray-700 group-hover:text-indigo-600"
                    : "text-white group-hover:text-indigo-200"
                }`}
              />
              {getItemCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {getItemCount()}
                </span>
              )}
            </Link>

            {/* Auth Buttons */}
            {isAuthenticated ? (
              <div className="relative group">
                <button className="flex items-center space-x-2">
                  <FaUser
                    className={`h-5 w-5 ${
                      isScrolled ? "text-gray-700" : "text-white"
                    }`}
                  />
                  <span
                    className={`text-sm font-medium ${
                      isScrolled ? "text-gray-700" : "text-white"
                    }`}
                  >
                    {user?.name || "Account"}
                  </span>
                </button>

                {/* Dropdown Menu */}
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200">
                  {user?.role === "admin" && (
                    <Link
                      to="/dashboard"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                    >
                      Dashboard
                    </Link>
                  )}
                  {/* <Link
                    to="/admin/menu"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                  >
                    <FiList className="inline-block mr-2" />
                    Menu Management
                  </Link> */}
                  <div className="border-t border-gray-100 my-1"></div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    <FiLogOut className="inline-block mr-2" />
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className={`text-sm font-medium px-4 py-2 rounded-full transition-colors duration-200 ${
                    isScrolled
                      ? "text-gray-700 hover:text-indigo-600"
                      : "text-white hover:text-indigo-200"
                  }`}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-sm font-medium px-6 py-2 rounded-full bg-indigo-600 text-white hover:bg-green-500 transition-colors duration-200"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden"
          >
            {isMobileMenuOpen ? (
              <FaTimes
                className={isScrolled ? "text-gray-700" : "text-white"}
              />
            ) : (
              <FaBars className={isScrolled ? "text-gray-700" : "text-white"} />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 md:hidden bg-white shadow-xl rounded-b-2xl">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/menu"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50"
              >
                Menu
              </Link>

              <Link
                to="/cart"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50"
              >
                Cart ({getItemCount()})
              </Link>

              {isAuthenticated ? (
                <>
                  {user?.role === "admin" && (
                    <Link
                      to={
                        user?.role === "admin"
                          ? "/dashboard"
                          : "/user/dashboard"
                      }
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50"
                    >
                      Dashboard
                    </Link>
                  )}
                  <button
                    onClick={logout}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50"
                  >
                    Register
                  </Link>
                </>
              )}

              {/* Add Create Menu Item button for admin users in mobile menu */}
              {user?.role === "admin" && (
                <Link
                  to="/admin/create-item"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50"
                >
                  Create Menu Item
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
