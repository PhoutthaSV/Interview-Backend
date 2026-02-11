import {DataTypes,Model} from 'sequelize';
import Users from './User.js';
class Permision extends Model {
    static initModel(sequelize){
        Permision.init({
            perId:{
                type: DataTypes.STRING(15),
                primaryKey:true,
                allowNull:false
            },
            perName:{
                type: DataTypes.STRING(250),
                allowNull:true
            },
            perStatus:{
                type: DataTypes.BOOLEAN,
                allowNull:true
            },
        },{
            sequelize,
            tableName: "tbPermision",
            modelName: "Permision",
        }
        )
    }
    static associateModel(){
        Permision.hasMany(Users, {
            foreignKey: "perId",
            foreignKeyConstraint: true,
            as: "permision"
        });
    }
}
export default Permision