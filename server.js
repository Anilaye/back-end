import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./src/routes/authRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import distributorRoutes from "./src/routes/distributorRoutes.js";
import sequelize from "./src/config/db.js";
import {setupSwagger} from "./src/config/swagger.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/api/distributors", distributorRoutes);
// Swagger
setupSwagger(app);

app.get("/", (req, res) => res.send("API Anilaye"));

const PORT = process.env.PORT || 3001;
(async () => {
    try {
        await sequelize.authenticate();
        console.log("✅ Database connected");

        await sequelize.sync({ alter: true });
        console.log("✅ Tables synchronized");

        // Démarrage du serveur après la synchronisation
        app.listen(PORT, () => {
            console.log(`🚀 Backend démarré sur http://localhost:${PORT}`);
        });

    } catch (err) {
        console.error("❌ DB error:", err);
    }
})();

