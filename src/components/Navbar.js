import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Navbar = () => {
    const location = useLocation();
    const path = location.pathname;
    const { isAuthenticated, logout } = useContext(AuthContext);

    return (
        <nav className="bg-gradient-to-r from-blue-900 via-blue-600 to-blue-300 p-4">
            <div className="container mx-auto flex flex-wrap items-center justify-between">
                <Link 
                    to="/sales" 
                    className={`text-white text-2xl font-bold ${path === '/sales' ? 'text-yellow-300' : ''}`}
                >
                    My Shop
                </Link>
                <div className="flex flex-wrap items-center space-x-4">
                    <Link
                        to="/sales"
                        className={`text-white hover:text-yellow-300 ${path === '/sales' ? 'font-bold' : ''}`}
                    >
                        Sales
                    </Link>
                    <Link
                        to="/sales/new"
                        className={`text-white hover:text-yellow-300 ${path === '/sales/new' ? 'font-bold' : ''}`}
                    >
                        Add Sale
                    </Link>
                    <Link
                        to="/performance"
                        className={`text-white hover:text-yellow-300 ${path === '/performance' ? 'font-bold' : ''}`}
                    >
                        Performance
                    </Link>
                    {isAuthenticated ? (
                        <>
                            <button
                                onClick={logout}
                                className="text-white hover:text-yellow-300 border border-white px-4 py-2 rounded"
                            >
                                Sign Out
                            </button>
                            <Link
                                to="/profile"
                                className="text-white hover:text-yellow-300 border border-white px-4 py-2 rounded"
                            >
                                Profile
                            </Link>
                        </>
                    ) : (
                        <Link
                            to="/login"
                            className="text-white hover:text-yellow-300 border border-white px-4 py-2 rounded"
                        >
                            Sign In
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
