import express from "express";
import { createDistributor, getDistributors, updateWaterLevel } from "../controllers/distributorController.js";

const router = express.Router();

router.post("/", createDistributor);             // Ajouter distributeur
router.get("/", getDistributors);                // Lister distributeurs
router.post("/update-level", updateWaterLevel);  // Simulation: mise à jour

export default router;
