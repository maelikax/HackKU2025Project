import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './Login.css'
import Dashboard from './Dashboard'
import Login from './Login'

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </Router>
    );
};

export default App;