import axios from "axios";
import Distributor from "../models/Distributor.js";

// Nombre de distributeurs à créer si table vide
const NUM_DISTRIBUTORS = 10;

// Coordonnées de base pour Dakar (exemple)
const BASE_LAT = 14.6928;
const BASE_LON = -17.4467;

// Générer un niveau d’eau aléatoire
function getRandomWaterLevel() {
    return Math.floor(Math.random() * 100); // 0 à 100%
}

// Générer latitude et longitude aléatoire autour d’un point de base
function getRandomPosition(latBase, lonBase) {
    const lat = latBase + (Math.random() - 0.5) / 100;
    const lon = lonBase + (Math.random() - 0.5) / 100;
    return { lat, lon };
}

// Vérifie les distributeurs existants et initialise si nécessaire
async function initDistributors() {
    try {
        let distributors = await Distributor.findAll();

        if (distributors.length === 0) {
            console.log("⚡ Aucun distributeur trouvé. Création de 10 distributeurs...");
            distributors = [];

            for (let i = 1; i <= NUM_DISTRIBUTORS; i++) {
                const pos = getRandomPosition(BASE_LAT, BASE_LON);
                const payload = {
                    distributorId: i,
                    name: `Distributor ${i}`,
                    location: `Location ${i}`,
                    waterLevel: getRandomWaterLevel(),
                    latitude: pos.lat,
                    longitude: pos.lon,
                };

                const createRes = await axios.post(
                    "http://localhost:3000/api/distributors/update-level",
                    payload
                );
                distributors.push(createRes.data.distributor);
            }

            console.log("✅ Distributeurs initialisés:", distributors.map(d => d.id));
        } else {
            console.log("✅ Distributeurs existants:", distributors.map(d => d.id));
        }

        return distributors;
    } catch (err) {
        console.error("❌ Erreur init distributeurs:", err.message);
        return [];
    }
}

// Envoie les données périodiquement
async function sendData(distributors) {
    for (const d of distributors) {
        try {
            const pos = getRandomPosition(d.latitude, d.longitude);
            const payload = {
                distributorId: d.id,
                waterLevel: getRandomWaterLevel(),
                latitude: pos.lat,
                longitude: pos.lon,
            };

            const res = await axios.post(
                "http://localhost:3000/api/distributors/update-level",
                payload
            );

            console.log("✅ Données envoyées:", res.data.distributor);
        } catch (err) {
            if (err.response) {
                console.error("❌ Server responded with:", err.response.status, err.response.data);
            } else if (err.request) {
                console.error("❌ No response received:", err.request);
            } else {
                console.error("❌ Error:", err.message);
            }
        }
    }
}

// Fonction principale
(async () => {
    const distributors = await initDistributors();

    // Envoi toutes les minutes
    setInterval(() => sendData(distributors), 60 + 10000);

    // Première exécution immédiate
    sendData(distributors);
})();
