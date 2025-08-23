import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./src/routes/authRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/users", userRoutes);

app.get("/", (req, res) => res.send("API Anilaye"));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Backend démarré sur http://localhost:${PORT}`));