Weather Dashboard Application

Main Features :

    Track weather conditions for multiple cities.
    Visualize a 5-day temperature trend for each city using charts.
    Authenticate users to access the dashboard and manage their tracked cities

The application consists of :

    A frontend built using React and Tailwind CSS.
    A backend powered by Node.js, Express, and MongoDB.
    Integration with OpenWeatherMap API to retrieve real-time weather data and forecasts.

1.User Authentication:

    Register and login users securely using JWT tokens.
    Authenticated users can track, add, and remove cities from their dashboard.

2.Weather Tracking:

    Add new cities and view the current weather.
    For each city, view temperature, weather condition, humidity, wind speed, and sunrise/sunset times.

3.5-Day Temperature Trend:

    Display a chart with a 5-day temperature forecast for each tracked city using Recharts.

4.Error Handling:

    Handle invalid cities and display error messages in the UI.
    Clear error messages after 2-3 seconds.

Tech Stack
Frontend: React, Tailwind CSS, Recharts
Backend: Node.js, Express.js
Database: MongoDB
API: OpenWeatherMap API
Authentication: JWT (JSON Web Tokens)

Installation Guide

1. Clone the repository
   git clone https://github.com/your-repo/weather-app.git
   cd weather-app

2. Install Dependencies
   Backend
   cd server
   npm install
   Frontend
   bash
   cd client
   npm install

3. Set Environment Variables
   Backend (.env)
   Create a .env file in the /server directory and add the following variables:

PORT=3001
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your-jwt-secret
OPENWEATHER_API_KEY=your-openweathermap-api-key

Frontend (.env)
Create a .env file in the /client directory and add:
REACT_APP_BACKEND_URL=http://localhost:3001

4. Run the Application
   Backend
   cd server
   npm run dev
   Frontend
   cd client
   npm start

API Endpoints

User Auth

1.Register User
POST /api/register
2.Login User
POST /api/login

Weather APIS

1. Get Current Weather for City
   GET /api/weather/:cityId

2. POST /API/cities - Add a new city to track

3. GET /API/cities - Retrieve list of tracked cities

4. DELETE /API/cities/:id - Remove a city from tracking
