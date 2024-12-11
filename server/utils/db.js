const mysql = require("mysql2/promise");

const mySqlPool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: '',
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