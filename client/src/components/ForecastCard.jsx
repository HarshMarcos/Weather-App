import React from 'react';

const ForecastCard = ({ day }) => {
    const formatDate = (unixTime) => {
        const date = new Date(unixTime * 1000);
        return date.toLocaleDateString(); // Adjust date format as needed
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-4 m-2 text-center">
            <h4 className="font-bold">{formatDate(day.date)}</h4>
            <img
                src={`http://openweathermap.org/img/wn/${day.icon}.png`}
                alt="weather-icon"
                className="w-12 h-12 mx-auto"
            />
            <p>Temp: {day.temp}°C</p>
            <p>Condition: {day.condition}</p>
        </div>
    );
};

export default ForecastCard;
