const mysql = require("mysql2/promise");
const dotenv = require('dotenv');

dotenv.config();

const mySqlPool = mysql.createPool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
})

const checkConnection = async () => {
    try {
        await mySqlPool.query("SELECT 1");
        console.log("MySQL DB connection verified");
    } catch (error) {
        console.error("MySQL DB connection failed:", error);
        throw error;
    }
};

module.exports = { mySqlPool, checkConnection };