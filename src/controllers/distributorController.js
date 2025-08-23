import Distributor from "../models/Distributor.js";

// Créer un distributeur
export const createDistributor = async (req, res) => {
    try {
        const distributor = await Distributor.create(req.body);
        res.status(201).json(distributor);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// Mettre à jour niveau d’eau + position (ou créer si non existant)
export const updateWaterLevel = async (req, res) => {
    try {
        const { distributorId, waterLevel, latitude, longitude, name, location } = req.body;

        let distributor = await Distributor.findByPk(distributorId);

        if (!distributor) {
            // Création automatique si le distributeur n’existe pas
            distributor = await Distributor.create({
                id: distributorId,
                name: name || `Distributor ${distributorId}`,
                location: location || "Unknown",
                waterLevel,
                latitude,
                longitude,
            });

            return res.status(201).json({ message: "✅ Distributor created", distributor });
        }

        distributor.waterLevel = waterLevel;
        if (latitude) distributor.latitude = latitude;
        if (longitude) distributor.longitude = longitude;

        await distributor.save();

        console.log(`✅ Distributor updated `)
        res.json({ message: "✅ Distributor updated", distributor });
    } catch (err) {
        console.error("❌ Server error:", err);
        res.status(500).json({ error: err.message });
    }
};


// Récupérer tous les distributeurs
export const getDistributors = async (req, res) => {
    try {
        const distributors = await Distributor.findAll();
        res.json(distributors);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};



