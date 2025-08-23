import Distributor from "../models/Distributor.js";

export const createDistributor = async (req, res) => {
    try {
        const { name,location, waterLevel, latitude, longitude, status } = req.body;

        if (!name) {
            return res.status(400).json({ error: "Le champ 'name' est requis" });
        }

        const distributor = await Distributor.create({
            name,
            location,
            waterLevel: waterLevel ?? 100,
            latitude,
            longitude,
            status
        });

        res.status(201).json(distributor);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};



// Mettre à jour niveau d’eau + position (ou créer si non existant)
export const updateWaterLevel = async (req, res) => {
    try {
        const { distributorId, waterLevel, latitude, longitude, location } = req.body;

        let distributor = await Distributor.findByPk(distributorId);

        if (!distributor) {
            // Création automatique si le distributeur n’existe pas
            distributor = await Distributor.create({
                id: distributorId,
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
        const distributors = await Distributor.findAll({
            order: [['id', 'DESC']]  // ASC = croissant, DESC = décroissant
        });
        res.json(distributors);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
// Récupérer tous les distributeurs
export const getDistributorBuId = async (req, res) => {
    try {
        const distributor = await Distributor.findByPk(req.params.id);
        res.json(distributor);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};



