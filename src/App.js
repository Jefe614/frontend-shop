import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SalesPage from './components/SalesPage';
import AddSalePage from './pages/AddSalePage';
import PerformancePage from './components/Performance';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';  // Import the HomePage component


function App() {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/sales" element={<SalesPage />} />
                <Route path="/sales/new" element={<AddSalePage />} />
                <Route path="/performance" element={<PerformancePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
            </Routes>
        </>
    );
}

export default App;
