import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import ForecastCard from './ForecastCard';

const DetailedWeather = () => {
    const { cityId } = useParams();
    const [cityData, setCityData] = useState(null)
    const [loading, setLoading] = useState(true);

    const backendURL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const fetchCityWeather = async () => {
            try {
                const response = await axios.get(`${backendURL}/api/weather/${cityId}`);
                setCityData(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching detailed weather data:', error);
                setLoading(false);
            }
        };

        fetchCityWeather();
    }, [cityId]);

    const formatTime = (time) => {
        const date = new Date(time * 1000);
        return date.toLocaleDateString([], { hour: '2-digit', minute: '2-digit' });
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
            </div>
        )
    }

    return (
        <div className="container mx-auto p-8">
            <div className="bg-white shadow-lg rounded-lg p-8 mx-auto w-full md:w-1/2 transition-transform transform hover:scale-105 hover:shadow-2xl">
                <h2 className="text-3xl font-bold text-center mb-4">{cityData.name}</h2>
                <div className="flex justify-center">
                    <img
                        src={`http://openweathermap.org/img/wn/${cityData.weatherData.icon}@2x.png`}
                        alt="weather-icon"
                        className="w-24 h-24"
                    />
                </div>
                <p className="text-xl text-gray-600 text-center mt-4">Temperature: {cityData.weatherData.temp}°C</p>
                <p className="text-xl text-gray-600 text-center mt-4">Condition: {cityData.weatherData.condition}</p>

                <div className="mt-6">
                    <p className="text-lg text-gray-600">Humidity: {cityData.weatherData.humidity}%</p>
                    <p className="text-lg text-gray-600">Wind Speed: {cityData.weatherData.windSpeed} kph</p>
                    <p className="text-lg text-gray-600">Sunrise: {formatTime(cityData.weatherData.sunrise)}</p>
                    <p className="text-lg text-gray-600">Sunset: {formatTime(cityData.weatherData.sunset)}</p>
                </div>

                <h3 className="text-2xl font-bold text-center mt-8">5-Day Forecast</h3>
                <div className="flex flex-wrap justify-center">
                    {Array.isArray(cityData.weatherData.forecast) && cityData.weatherData.forecast.length > 0 ? (
                        cityData.weatherData.forecast.map((day, index) => (
                            <ForecastCard key={index} day={day} />
                        ))
                    ) : (
                        <p className="text-center text-gray-500">No forecast data available.</p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default DetailedWeather