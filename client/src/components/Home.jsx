import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CityCard from './CityCard'
import { useNavigate } from 'react-router-dom';


const Home = () => {
    const [cities, setCities] = useState([]);
    const [newCity, setNewCity] = useState('');
    const [loading, setLoading] = useState(false);
    // const [isDarkMode, setIsDarkMode] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();

    const backendURL = import.meta.env.VITE_API_URL; 
    useEffect(() => {
        fetchCities();
    }, []);

    const handleLogout = () => {
        navigate('/login');
    }

    const fetchCities = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${backendURL}/api/cities`);
            setCities(response.data);
        } catch (error) {
            console.error('Error fetching cities:', error);
            setErrorMessage('Failed to load cities. Please try again later.');
        }
        setLoading(false);
    };

    const addCity = async () => {
        if (newCity.trim() === '') {
            setErrorMessage('City name cannot be empty. Please enter a city name.');
            setTimeout(() => setErrorMessage(null), 2000);
            return;
        }
        try {
            await axios.post(`${backendURL}/api/cities`, { name: newCity });
            fetchCities();
            setNewCity('');
            setErrorMessage(null);
        } catch (error) {
            if (error.response && error.response.status === 404) {
                setErrorMessage('City not found. Please check the name...');
            } else {
                setErrorMessage('City not found. Please check the name...');
            }
            setTimeout(() => setErrorMessage(null), 2000);
            setNewCity('');
        }
    };

    const removeCity = async (id) => {
        try {
            await axios.delete(`${backendURL}/api/cities/${id}`);
            fetchCities();
        } catch (error) {
            console.error('Error removing city:', error);
        }
    };
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-4xl font-bold text-center">Weather Dashboard</h1>
            <button
                onClick={handleLogout}
                className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded hover:bg-red-700"
            >
                Logout
            </button>
            <div className="my-4">
                <input
                    type="text"
                    value={newCity}
                    onChange={(e) => setNewCity(e.target.value)}
                    className="border rounded p-2"
                    placeholder="Enter city name"
                />
                <button onClick={addCity} className="bg-blue-500 text-white p-2 rounded ml-2 hover:bg-sky-700">
                    Add City
                </button>
            </div>

            {errorMessage && (
                <div className="text-red-500 text-center mb-4">
                    {errorMessage}
                </div>
            )}

            {
                loading ? (
                    <div className="flex justify-center items-center">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
                    </div>

                ) : (
                    <div className="flex flex-wrap">
                        {cities.map((city) => (
                            <CityCard key={city._id} city={city} removeCity={removeCity} />
                        ))}
                    </div>
                )
            }
        </div>
    );
}

export default Home