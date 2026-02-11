import dotenv from 'dotenv'
dotenv.config()
import sql from 'mssql'
export default {
    username: String(process.env.DB_USER),
    password: String(process.env.DB_PWD),
    database: String(process.env.DB_NAME),
    host: String(process.env.DB_SERVER),
    dialect: 'mssql',
    // port: '1433',
    define: {
      // underscored: true,
      freezeTableName: true, 
      timestamps: false,  
    },
  dialectOptions: { 
    // Additional options for the SQL Server dialect
    options: {
      encrypt: false, // Use this option if you're on Windows Azure
      trustServerCertificate: true,
      cryptoCredentialsDetails: {
          minVersion: 'TLSv1'
      }
    },
    // useUTC: false 
  },
  timezone: '+07:00',

}