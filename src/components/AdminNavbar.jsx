import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../styles/index.css"; // or './App.css'

const AdminNavbar = () => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [logoutSuccess, setLogoutSuccess] = useState(false);
  const navigate = useNavigate(); 

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

const handleLogout = () => {
  // Set logout success state
  setLogoutSuccess(true);

  // Redirect to login screen after 2 seconds
  setTimeout(() => {
    setLogoutSuccess(false); // Hide the message after redirecting
    navigate('/admin-login');
  }, 1000);
};

  return (
    <nav className="bg-[#eefab8] fixed top-0 left-0 w-full bg-blue-900 shadow-md z-50">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
              <svg
                className="hidden h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="hidden sm:block sm:ml-6 justify-between">
              <div className="flex space-x-4 ">
                <Link to="/admin-home" className="text-white hover:bg-white hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                  Home
                </Link>
                <Link to="/add-users" className="text-white hover:bg-white hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                  Add Users
                </Link>
                <Link to="/assign-faculties" className="text-white hover:bg-white hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                 Assign Complaints
                </Link>
                <Link to="/analytics" className="text-white hover:bg-white hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                  Analytics
                </Link>
                <Link to="/add-faculty" className="text-white hover:bg-white hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                  Add Faculty
                </Link>
                <Link to="/view-users" className="text-white hover:bg-white hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                  View Users
                </Link>
                {/* <Link to="/update-complaintstatus" className="text-white hover:bg-white hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                  Complaint Status
                </Link> */}
                <Link to="/history" className="text-white hover:bg-white hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                  History of Complaints
                </Link>
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button
              type="button"
              className="bg-[#ffffff] p-1 rounded-full text-red-600 hover:text-purple-950 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-purple-950"
            >
              <span className="sr-only">View notifications</span>
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a7.002 7.002 0 00-4-6.326V4a2 2 0 10-4 0v.674A7.002 7.002 0 006 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0a3.5 3.5 0 11-7 0h7z" />
              </svg>
            </button>
            <div className="ml-3 relative">
              <div>
                <button
                  type="button"
                  className="bg-[#ffffff] flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#eefab8] focus:ring-purple-950"
                  id="user-menu-button"
                  aria-expanded="false"
                  aria-haspopup="true"
                  onClick={toggleProfileMenu}
                >
                  <span className="sr-only">Open user menu</span>
                  <img className="h-8 w-8 rounded-full" src="/images/user.png" alt="" />
                </button>
              </div>
              {isProfileMenuOpen && (
                <div
                  className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu-button"
                >
                  {/* <Link
                    to="#"
                    onClick={handleLogout}
                    className="block px-4 py-2 text-sm text-gray-700"
                    role="menuitem"
                  >
                    Logout
                  </Link> */}
                  <Link
                    onClick={handleLogout}
                    className="block px-4 py-2 text-sm text-gray-700"
                    role="menuitem"
                  >
                    Logout
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
