import express from "express";
import {
    createDistributor,
    getDistributorBuId,
    getDistributors,
    updateWaterLevel
} from "../controllers/distributorController.js";


const router = express.Router();
/**
 * @swagger
 * /api/distributors/add:
 *   post:
 *     summary: Ajouter un nouveau distributeur
 *     tags:
 *       - Distributeurs
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Distributeur A"
 *               waterLevel:
 *                 type: integer
 *                 example: 100
 *               latitude:
 *                 type: number
 *                 example: 14.6928
 *               longitude:
 *                 type: number
 *                 example: -17.4467
 *     responses:
 *       201:
 *         description: Distributeur créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 waterLevel:
 *                   type: integer
 *                 latitude:
 *                   type: number
 *                 longitude:
 *                   type: number
 *       400:
 *         description: Requête invalide
 *       500:
 *         description: Erreur serveur
 */

router.post("/add", createDistributor);             // Ajouter distributeur
/**
 * @swagger
 * /api/distributors/list-distributors:
 *   get:
 *     summary: Récupère la liste de tous les distributeurs
 *     tags:
 *       - Distributeurs
 *     responses:
 *       200:
 *         description: Liste des distributeurs récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: "Distributeur A"
 *                   waterLevel:
 *                     type: integer
 *                     example: 80
 *                   latitude:
 *                     type: number
 *                     example: 14.6928
 *                   longitude:
 *                     type: number
 *                     example: -17.4467
 *       500:
 *         description: Erreur serveur
 */
router.get("/list-distributors", getDistributors);                // Lister distributeurs
/**
 * @swagger
 * /api/distributors/{id}:
 *   get:
 *     summary: Récupère un distributeur par son ID
 *     tags:
 *       - Distributeurs
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: L'ID du distributeur
 *     responses:
 *       200:
 *         description: Distributeur trouvé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 waterLevel:
 *                   type: integer
 *                 latitude:
 *                   type: number
 *                 longitude:
 *                   type: number
 *       404:
 *         description: Distributeur non trouvé
 */
router.get("/:id", getDistributorBuId);
/**
 * @swagger
 * /api/distributors/update-level:
 *   post:
 *     summary: Met à jour le niveau d'eau d'un distributeur
 *     tags:
 *       - Distributeurs
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               distributorId:
 *                 type: integer
 *                 example: 1
 *               waterLevel:
 *                 type: integer
 *                 example: 80
 *               latitude:
 *                 type: number
 *                 example: 14.6928
 *               longitude:
 *                 type: number
 *                 example: -17.4467
 *     responses:
 *       200:
 *         description: Niveau d'eau mis à jour
 */
router.post("/update-level", updateWaterLevel);  // Simulation: mise à jour

export default router;
