import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const StudentNavbar = () => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [logoutSuccess, setLogoutSuccess] = useState(false); // State to track logout success
  const navigate = useNavigate();

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    console.log('Search Query:', searchQuery);
  };

  // Handle logout logic
  const handleLogout = () => {
    // Clear user session (e.g., remove email or token)
    localStorage.removeItem('userEmail'); // Clear user email from localStorage
    localStorage.removeItem('userToken'); // If any token-based authentication is used

    // Set logout success state
    setLogoutSuccess(true);

    // Redirect to login screen after 2 seconds
    setTimeout(() => {
      setLogoutSuccess(false); // Hide the message after redirecting
      navigate('/');
    }, 2000);
  };

  return (
    <>
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
              </button>
            </div>
            <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
              {/* <div className="text-black font-medium">
                <strong>Labfix</strong>
              </div> */}

              <div className="hidden sm:block sm:ml-6">
                <div className="flex space-x-4">
                  <NavLink
                    exact
                    to="/stud-home"
                    activeClassName="bg-white text-blue-600"
                    className="text-white hover:bg-white hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Home
                  </NavLink>
                  <NavLink
                    to="/register-complaint"
                    activeClassName="bg-white text-blue-600"
                    className="text-white hover:bg-white hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Register Complaint
                  </NavLink>
                  <NavLink
                    to={`/view-status?email=${encodeURIComponent(localStorage.getItem('userEmail'))}`} // Directly retrieve email from local storage
                    activeClassName="bg-white text-blue-600"
                    className="text-white hover:bg-white hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    View Complaint Status
                  </NavLink>
                </div>
              </div>
              {/* <form onSubmit={handleSearchSubmit} className="hidden sm:block sm:ml-6">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="block w-full px-3 py-2 rounded-md border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Search..."
                />
              </form> */}
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <button
                type="button"
                className="bg-[#ffffff] p-1 rounded-full text-blue-900 hover:text-purple-950 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-purple-950"
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
                    <img className="h-8 w-8 rounded-full" src="/images/user.png" alt="User Profile" />
                  </button>
                </div>
                {isProfileMenuOpen && (
                  <div
                    className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu-button"
                  >
                    <NavLink to="/profile" className="block px-4 py-2 text-sm text-gray-700" role="menuitem">
                      Your Profile
                    </NavLink>
                    <button
                      onClick={handleLogout}
                      className="block px-4 py-2 text-sm text-gray-700 w-full text-left"
                      role="menuitem"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

      {/* Logout success message */}
      {logoutSuccess && (
        <div className="fixed bottom-0 right-0 mb-4 mr-4 bg-green-500 text-white p-4 rounded-md shadow-lg">
           logged out!
        </div>
      )}
      </nav>
    </>
  );
};

export default StudentNavbar;
