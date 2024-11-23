import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../operations/authApi';
import { jwtDecode } from 'jwt-decode';

const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { token } = useSelector(state => state.auth);
    const { user } = useSelector(state => state.profile);

    useEffect(() => {
        if (!token) return;

        const decodedToken = jwtDecode(token);
        const expirationTime = decodedToken.exp * 1000;


        if (Date.now() >= expirationTime) {
            dispatch(logout(navigate));
            return;
        }

        const remainingTime = expirationTime - Date.now();
        const timer = setTimeout(() => {
            dispatch(logout(navigate));
        }, remainingTime);

        return () => clearTimeout(timer);
    }, [token, dispatch, navigate]);

    const handleLogout = () => {
        dispatch(logout(navigate));
    };

    return (
        <nav className="bg-gray-800 p-4 py-3">
            <div className="container mx-auto flex justify-between items-center">

                <Link to="/" className="text-white text-lg font-bold">
                    ToDo
                </Link>

                <div className="flex space-x-4">
                    {token ? (
                        <>
                            <span className="text-white mt-1">Hello, {user?.userName || 'User'}</span>
                            <button
                                onClick={handleLogout}
                                className='bg-gray-700 text-white hover:bg-gray-600 font-semibold px-3 py-1 rounded duration-300'>
                            
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"

                            >
                                <button className='bg-gray-700 text-white hover:bg-gray-600 font-semibold px-3 py-1 mt-1 rounded duration-300'>
                                    LOGIN
                                </button>

                            </Link>
                            <Link
                                to="/signup"

                            >
                                <button className='bg-gray-700 text-white hover:bg-gray-600 font-semibold px-3 py-1 mt-1 rounded duration-300'>
                                    SIGNUP
                                </button>

                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
