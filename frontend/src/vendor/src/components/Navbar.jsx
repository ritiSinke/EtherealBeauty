import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  // Toggle dropdown visibility
  const handleToggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleLogout = () => {
    // Implement logout logic here, such as clearing user session/cookies
    console.log("Logging out...");
  };

  return (
    <header className="fixed-nav-bar w-nav">
      <nav className="max-w-screen-2xl mx-auto px-4 flex justify-between items-center">
        <ul className="nav__links">
          <li className="link">
            <Link to="/">Home</Link>
          </li>
         
          <li className="link">
            <Link to="/contact">Contact</Link>
          </li>
        </ul>

        {/* Website name */}
        <div className="nav__logo">
          <Link to="/">Ethereal Beauty</Link>
        </div>

        <div className="nav__icons relative">
          <span>
            <Link to="/search">
              <i className="ri-notification-line"></i>
            </Link>
          </span>

          {/* User Icon with Dropdown */}
          <span>
            <Link to="#" onClick={handleToggleDropdown}>
              <i className="ri-user-line"></i>
            </Link>

            {isDropdownVisible && (
              <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md w-48">
                <ul>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </span>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
