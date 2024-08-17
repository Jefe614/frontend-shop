import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div className="bg-gray-100 min-h-screen overflow-x-hidden">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 py-20 text-center text-white shadow-lg relative">
                <div className="absolute inset-0 bg-opacity-50 bg-black z-0"></div>
                <h1 className="text-5xl font-bold mb-6 relative z-10 transform scale-100 hover:scale-105 hover:text-yellow-300 transition-all duration-500">
                    Welcome to the Sales Management System
                </h1>
                <p className="text-lg mb-8 relative z-10 transform scale-100 hover:scale-105 transition-all duration-500">
                    Efficiently manage and track sales for all your shops in one place.
                </p>
                <Link 
                    to="/sales" 
                    className="bg-white text-blue-500 py-3 px-6 rounded-lg shadow-lg hover:bg-gray-100 hover:shadow-2xl transform hover:scale-105 transition-all duration-500 relative z-10"
                >
                    View Sales
                </Link>
            </div>

            {/* Shop Overview Section */}
            <div className="py-16">
                <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Shop Overview</h2>
                <div className="flex justify-center space-x-8">
                    <div className="bg-white p-6 rounded-lg shadow-lg transform transition-transform duration-500 hover:scale-105 hover:shadow-2xl hover:bg-gray-50">
                        <h3 className="text-2xl font-bold mb-4 text-blue-600">Cyber Shop</h3>
                        <p className="text-lg mb-2">Total Sales: <span className="font-bold text-green-500">KSH 50,000</span></p>
                        <p className="text-green-500 mt-2">⬆ Sales Increasing</p>
                        <Link 
                            to="/performance" 
                            className="text-blue-500 underline mt-4 block hover:text-blue-700 transition-colors duration-300"
                        >
                            View Performance
                        </Link>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-lg transform transition-transform duration-500 hover:scale-105 hover:shadow-2xl hover:bg-gray-50">
                        <h3 className="text-2xl font-bold mb-4 text-yellow-600">Milk Shop</h3>
                        <p className="text-lg mb-2">Total Sales: <span className="font-bold text-red-500">KSH 30,000</span></p>
                        <p className="text-red-500 mt-2">⬇ Sales Decreasing</p>
                        <Link 
                            to="/performance" 
                            className="text-blue-500 underline mt-4 block hover:text-blue-700 transition-colors duration-300"
                        >
                            View Performance
                        </Link>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-lg transform transition-transform duration-500 hover:scale-105 hover:shadow-2xl hover:bg-gray-50">
                        <h3 className="text-2xl font-bold mb-4 text-green-600">Retail Shop</h3>
                        <p className="text-lg mb-2">Total Sales: <span className="font-bold text-green-500">KSH 40,000</span></p>
                        <p className="text-green-500 mt-2">⬆ Sales Increasing</p>
                        <Link 
                            to="/performance" 
                            className="text-blue-500 underline mt-4 block hover:text-blue-700 transition-colors duration-300"
                        >
                            View Performance
                        </Link>
                    </div>
                </div>
            </div>

            {/* Call-to-Action Section */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-16 text-center relative">
                <h2 className="text-4xl font-bold mb-4">Get Started with Your Sales Management</h2>
                <p className="mb-8 text-lg">Create a new sale or view detailed performance reports.</p>
                <div className="relative z-10">
                    <Link 
                        to="/sales/new" 
                        className="bg-white text-blue-600 py-3 px-6 rounded-lg mx-2 hover:bg-gray-100 transform hover:scale-105 transition-transform duration-500 shadow-lg hover:shadow-2xl"
                    >
                        Add New Sale
                    </Link>
                    <Link 
                        to="/performance" 
                        className="bg-white text-blue-600 py-3 px-6 rounded-lg mx-2 hover:bg-gray-100 transform hover:scale-105 transition-transform duration-500 shadow-lg hover:shadow-2xl"
                    >
                        View Performance
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
