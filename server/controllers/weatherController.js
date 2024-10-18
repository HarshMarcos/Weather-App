import axios from "axios";
import City from "../models/citySchema.js";

// Fetching Weather Data of a City
const fetchWeatherData = async (cityName) => {
  try {
    const apiKey = process.env.WEATHER_API_KEY;
    const url = `${process.env.WEATHER_API_URL}?q=${cityName}&units=metric&appid=${apiKey}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching weather data");
  }
};

const fetchForecastData = async (cityName) => {
  const apiKey = process.env.WEATHER_API_KEY; // Your API key
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric`
  );
  return response.data;
};

// export const getWeatherForCity = async (req, res) => {
//   const cityName = req.params.city;
//   try {
//     const weatherData = await fetchWeatherData(cityName);
//     const city = await City.findOneAndUpdate(
//       { name: cityName },
//       {
//         name: cityName,
//         weatherData: {
//           temp: weatherData.main.temp,
//           condition: weatherData.weather[0].main,
//           icon: weatherData.weather[0].icon,
//           humidity: weatherData.main.humidity,
//           windSpeed: weatherData.wind.speed,
//           sunrise: weatherData.sys.sunrise,
//           sunset: weatherData.sys.sunset,
//         },
//       },
//       { upsert: true, new: true }
//     );
//     res.json(city);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to fetch weather data" });
//   }
// };

export const getWeatherForaCity = async (req, res) => {
  const cityId = req.params.cityId;

  try {
    // Find the city by its ID in the database
    const city = await City.findById(cityId);

    if (!city) {
      return res.status(404).json({ error: "City not found" });
    }

    const cityName = city.name;

    // Fetch updated weather data for the city from the external API
    const weatherData = await fetchWeatherData(cityName);
    const forecastData = await fetchForecastData(cityName);

    // console.log("Forecast Data:", forecastData);

    // Update the city's weather data in the database
    city.weatherData = {
      temp: weatherData.main.temp,
      condition: weatherData.weather[0].main,
      icon: weatherData.weather[0].icon,
      humidity: weatherData.main.humidity,
      windSpeed: weatherData.wind.speed,
      sunrise: weatherData.sys.sunrise,
      sunset: weatherData.sys.sunset,
      forecast: forecastData.list.slice(0, 5).map((item) => ({
        date: item.dt,
        temp: item.main.temp,
        condition: item.weather[0].main,
        icon: item.weather[0].icon,
      })),
    };

    // Save the updated city document
    const updatedCity = await city.save();
    console.log("City Data:", updatedCity);
    // Return the updated city data
    res.json(updatedCity);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
};

export const addCity = async (req, res) => {
  const cityName = req.body.name;
  try {
    const weatherData = await fetchWeatherData(cityName);

    if (!weatherData || weatherData.cod !== 200) {
      return res.status(404).json({ error: "City not found" });
    }

    const city = new City({
      name: cityName,
      weatherData: {
        temp: weatherData.main.temp,
        condition: weatherData.weather[0].main,
        icon: weatherData.weather[0].icon,
        humidity: weatherData.main.humidity,
        windSpeed: weatherData.wind.speed,
        sunrise: weatherData.sys.sunrise,
        sunset: weatherData.sys.sunset,
      },
    });
    await city.save();
    res.status(201).json(city);
  } catch (error) {
    res.status(400).json({ error: "Error adding city" });
  }
};

export const getTrackedCities = async (req, res) => {
  try {
    const cities = await City.find();
    res.json(cities);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tracked cities" });
  }
};

export const removeCity = async (req, res) => {
  try {
    await City.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Error deleting city" });
  }
};

export default {
  addCity,
  getTrackedCities,
  removeCity,
  getWeatherForaCity,
};
