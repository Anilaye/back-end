// models/Distributor.js
import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.js";

class Distributor extends Model {}

Distributor.init(
    {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        name: { type: DataTypes.STRING, allowNull: false },
        location: { type: DataTypes.STRING },
        status: { type: DataTypes.STRING, defaultValue: "ACTIVE" },
        waterLevel: { type: DataTypes.INTEGER, defaultValue: 100 }, // niveau d’eau (%)
        latitude: { type: DataTypes.FLOAT, allowNull: true },       // position GPS
        longitude: { type: DataTypes.FLOAT, allowNull: true },
    },
    { sequelize, modelName: "Distributor", tableName: "distributors", timestamps: false }
);

export default Distributor;
