import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

// Options pour swagger-jsdoc
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API Distributeurs d'eau",
            version: "1.0.0",
            description: "API pour simuler les distributeurs et niveaux d'eau",
        },
        servers: [
            {
                url: `http://${process.env.DB_HOST}:${process.env.PORT}`,
            },
        ],
    },
    apis: ["./src/routes/*.js"]
};



// Générer le swaggerSpec
const swaggerSpec = swaggerJsdoc(options);

// Middleware pour Express
export const setupSwagger = (app) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
