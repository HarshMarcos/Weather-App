import mongoose from "mongoose";

//City Schema
const citySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    weatherData: {
      temp: Number,
      condition: String,
      icon: String,
      humidity: Number,
      windSpeed: Number,
      sunrise: Number,
      sunset: Number,
    },
  },
  { timestamps: true }
);

const City = mongoose.model("City", citySchema);
// module.exports = City;
export default City;
