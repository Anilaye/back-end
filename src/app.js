import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { httpLogger, logInfo } from "./utils/logger.js";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());  // logs HTTP
app.use(httpLogger);      // Morgan centralisé
app.use(helmet());       // sécurisation des headers

// Rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,                 // 100 requêtes max par IP
});

app.use("/auth", limiter);
app.use("/auth", authRoutes);
app.use("/users", userRoutes);

// Compteur de requêtes
let requestCount = 0;
app.use((req, res, next) => {
  requestCount++;
  next();
});

// Endpoint Health Check
app.get("/health", (req, res) => {
    res.status(200).json({
    status: "ok",
    uptime: process.uptime(), // temps depuis le démarrage
    timestamp: new Date().toISOString(),
  });
});

// Endpoint Metrics
app.get("/metrics", (req, res) => {
  res.status(200).json({
    requests: requestCount,
    memoryUsage: process.memoryUsage(),
    uptime: process.uptime(),
  });
});

app.get("/", (req, res) => res.send("API Anilaye"));

// Exemple d'utilisation des logs custom
logInfo("Serveur initialisé avec succès");

export default app;
