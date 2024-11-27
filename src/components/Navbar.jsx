import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useCurrentUser from '../context/UserContext';
import { toast } from 'react-toastify';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, setCurrentUser } = useCurrentUser();
  const [navbar, setNavbar] = useState(false);

  const handleLogOut = () => {
    setCurrentUser(null);
    navigate('/login');
    toast.success("Logged out successfully", {
      position: "top-center",
      autoClose: 1200,
      theme: "dark",
      hideProgressBar: true
    });
  };

  const toggleNavbar = ()=>{
    setNavbar(!navbar);
  }

  useEffect(() => {
    setNavbar(false);
  }, [location.pathname]);

  return (
    <nav className="bg-green-700 text-white shadow-lg ">
      <div className="container flex items-center justify-between p-2 relative ">
        
        <div className="flex items-center gap-2">
          <img
            className="h-12 w-12 rounded-full"
            src="/images/logo.png"
            alt="logo"
          />
          <span className="text-2xl font-bold hidden md:inline">VRV Security</span>
        </div>

        
        <div className="hidden lg:flex gap-8 items-center">
          <Link
            to="/"
            className="hover:text-green-300 transition-transform duration-300 hover:scale-105"
          >
            Home
          </Link>

          {currentUser &&
          (currentUser.role === 'admin' ||
            currentUser.permissions.includes('Manage')) ? (
            <Link
              to="admin-dashboard"
              className="hover:text-green-300 transition-transform duration-300 hover:scale-105"
            >
              Admin Dashboard
            </Link>
          ) : null}

          <Link
            to="profile"
            className="hover:text-green-300 transition-transform duration-300 hover:scale-105"
          >
            Profile
          </Link>

          <button
            onClick={handleLogOut}
            className="hover:text-green-300 transition-transform duration-300 hover:scale-105"
          >
            Logout
          </button>
        </div>

        {/* Mobile Menu */}
        <div className="lg:hidden">
          <button
            className="text-2xl focus:outline-none"
            onClick={toggleNavbar}
          >
            ☰
          </button>
        </div>
      </div>

      {/* Dropdown Menu for Mobile */}
      <div className={`lg:hidden bg-green-800 p-4 overflow-hidden transition-all duration-300 ease-in-out absolute right-0 z-10 ${
          navbar ? 'max-h-screen' : 'max-h-0 opacity-0 '
        }`}>
        <Link
          to="/"
          className="block mb-2 hover:text-green-300 transition-transform duration-300"
        >
          Home
        </Link>

        {currentUser &&
        (currentUser.role === 'admin' ||
          currentUser.permissions.includes('Manage')) ? (
          <Link
            to="admin-dashboard"
            className="block mb-2 hover:text-green-300 transition-transform duration-300"
          >
            Admin Dashboard
          </Link>
        ) : null}

        <Link
          to="profile"
          className="block mb-2 hover:text-green-300 transition-transform duration-300"
        >
          Profile
        </Link>

        <button
          onClick={handleLogOut}
          className="block hover:text-green-300 transition-transform duration-300"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
