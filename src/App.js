import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SalesPage from './components/SalesPage';
import AddSalePage from './pages/AddSalePage';
import PerformancePage from './components/Performance';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Navbar from './components/Navbar';

function App() {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/sales" element={<SalesPage />} />
                <Route path="/sales/new" element={<AddSalePage />} />
                <Route path="/performance" element={<PerformancePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                {/* Add more routes as needed */}
            </Routes>
        </>
    );
}

export default App;
