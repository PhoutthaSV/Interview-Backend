import { SequelizeConnection } from "../sequelizeConnection.js";
import User from "./User.js";
import Permision from "./permision.js";
// <------------------- sequelize configurations ------------------>
const sequelize1 = SequelizeConnection.getInstance();
// <------------------- init models ----------------------->
User.initModel(sequelize1);
Permision.initModel(sequelize1);


// await sequelize1.sync({ alter: true });

// await Permision.create(
//     {
//     perId : 'SuperAdmin',
//     perName : 'Administrator',
//     perStatus :1,
//     },
// )
// <------------------- init associate ----------------------->
User.associateModel();
Permision.associateModel();
export const db = {
    sequelize1,
    User,
    Permision
};
