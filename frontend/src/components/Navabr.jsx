import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../operations/authApi';
import {jwtDecode} from 'jwt-decode';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { token } = useSelector(state => state.auth); // Get token from Redux state
  const { user } = useSelector(state => state.profile);

  useEffect(() => {
    if (!token) return;

    const decodedToken = jwtDecode(token); // Decode JWT to get expiration
    const expirationTime = decodedToken.exp * 1000; // Convert exp to milliseconds

    // Check if token has expired
    if (Date.now() >= expirationTime) {
      dispatch(logout(navigate)); // Log out the user if token has expired
      return;
    }

    // Set up a timer to log out the user when the token expires
    const remainingTime = expirationTime - Date.now();
    const timer = setTimeout(() => {
      dispatch(logout(navigate)); // Log out the user when the token expires
    }, remainingTime);

    // Clean up the timer when component unmounts
    return () => clearTimeout(timer);
  }, [token, dispatch, navigate]);

  const handleLogout = () => {
    dispatch(logout(navigate)); // Dispatch logout action
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-white text-lg font-bold">
          Task Manager
        </Link>

        {/* Navigation Links */}
        <div className="flex space-x-4">
          {token ? (
            // If token exists, show Logout button
            <>
              <span className="text-white">Hello, {user?.userName || 'User'}</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-700"
              >
                Logout
              </button>
            </>
          ) : (
            // If token doesn't exist, show Login and Signup buttons
            <>
              <Link
                to="/login"
                className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-700"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-green-500 text-white px-3 py-2 rounded hover:bg-green-700"
              >
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
