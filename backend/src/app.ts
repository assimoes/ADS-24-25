import express from "express";
import cors from 'cors'
import "./data-source";
import adRoutes from "./routes/adRoutes";
import dataSource from './data-source';

const app = express();
const PORT = 8080;

dataSource.initialize()
  .then(() => {
    console.log("Database connected");
    app.use(cors({
      origin: "http://localhost:3000",
    }))
    app.use(express.json());
    app.use("/api/ads", adRoutes);

    app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
  })
  .catch((error) => console.error("Database connection error:", error));
