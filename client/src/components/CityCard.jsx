import React from 'react'
import { Link } from 'react-router-dom'

const CityCard = ({ city, removeCity }) => {
    return (
        <div className="bg-white shadow-md rounded-lg p-4 m-4 w-70 transition-transform transform hover:scale-105 hover:shadow-2xl">
            <h2 className="text-xl font-bold">{city.name}</h2>
            <p className="text-lg">{city.weatherData.temp}°C</p>
            <p>{city.weatherData.condition}</p>
            <img
                src={`http://openweathermap.org/img/wn/${city.weatherData.icon}@2x.png`}
                alt="Weather icon"
            />
            <div className="flex justify-between mt-4">
                <button
                    className="bg-red-500 text-white p-2 rounded transition-transform transform hover:scale-105 hover:bg-red-600"
                    onClick={() => removeCity(city._id)}
                >
                    Remove City
                </button>
                <Link to={`/details/${city._id}`}>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded transition-transform transform hover:scale-105 hover:bg-sky-700 ml-2">
                        Detailed View
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default CityCard