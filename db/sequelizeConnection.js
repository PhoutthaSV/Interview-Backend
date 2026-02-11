import { Sequelize } from "sequelize";
import configFile from "../config/config.js";
export class SequelizeConnection {
    static instance;
    static getInstance() {
        if (!SequelizeConnection.instance) {
        SequelizeConnection.instance = new Sequelize(
            configFile.database,
            configFile.username,
            configFile.password,
            configFile
        );
        }
        return SequelizeConnection.instance;
    }
    static async connect() {
        const sequelize = SequelizeConnection.getInstance();
        try {
            await sequelize.authenticate();
            console.log("Database connection successfully!");
            return sequelize;
        }
        catch (err) {
            console.log(`Error while creating connectiono`);
            console.log(`Detail ${err}`)
            return sequelize;
        }
    }
}
