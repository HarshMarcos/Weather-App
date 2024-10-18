import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";
import weatherRoutes from "./routes/routes.js";

//env configuration
dotenv.config();

//main app
const app = express();
//CORS config
app.use(cors());
app.use(express.json());

//Check db connected or not
connectDB();

//Main Route
app.use("/api", weatherRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
