import express from "express";
import authenticateToken from "../middleware/authMiddleware.js";

const router = express.Router();
import {
  addCity,
  getTrackedCities,
  removeCity,
  getWeatherForaCity,
} from "../controllers/weatherController.js";
import { login, register } from "../controllers/authController.js";

// router.get("/weather/:city", getWeatherForCity);
router.get("/weather/:cityId", authenticateToken, getWeatherForaCity);
router.post("/cities", authenticateToken, addCity);
router.get("/cities", authenticateToken, getTrackedCities);
router.delete("/cities/:id", authenticateToken, removeCity);

//auth routes
router.post("/register", register);
router.post("/login", login);

export default router;
