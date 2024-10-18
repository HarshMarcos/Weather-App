import React from 'react';
import Home from './components/Home';
import DetailedWeather from './components/DetailedWeather';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import AuthProvider from './context/AuthContext';


function App() {

  return (
    <AuthProvider>
      <Router>
        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path="/details/:cityId" element={<DetailedWeather />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
