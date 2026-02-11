import {DataTypes,Model} from 'sequelize';
import Permision from './permision.js';
class Users extends Model {
    static initModel(sequelize){
        Users.init({
            suerId:{
                type: DataTypes.STRING(15),
                primaryKey:true,
                allowNull:false
            },
            perId:{
                type: DataTypes.STRING(15),
                allowNull:true,
                
            },
            userPassword:{
                type: DataTypes.STRING(250),
                allowNull:true
            },
            userName:{
                type: DataTypes.STRING(150),
                allowNull:true
            },
            userAdress:{
                type: DataTypes.STRING(250),
                allowNull:true
            },
            userAge:{
                type: DataTypes.INTEGER,
                allowNull:true
            },
            userTel:{
                type: DataTypes.STRING(20),
                allowNull:true
            },
            CredateDateAt:{
                allowNull:true,
                // type: 'TIMESTAMP',
                type: DataTypes.DATE,
            },
            UpdateDateAt:{
                allowNull:true,
                // type: 'TIMESTAMP',
                type: DataTypes.DATE,
            },
            userStatus:{
                type: DataTypes.BOOLEAN,
                allowNull:true
            },
        },{
            sequelize,
            tableName: "tbUsers",
            modelName: "Users",
            // timestamps: true 
        }
        )
    }    
    static associateModel(){
        Users.belongsTo(Permision, {
            foreignKey: "perId",
            foreignKeyConstraint: true,
            as: "permision"
        });
    }
}
export default Users