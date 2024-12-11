const express =  require("express");
const cors = require("cors");
const app = express();
const {checkConnection} = require("./utils/db")

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

(async () => {
    try {
        await checkConnection();
        console.log("Database is ready");

        app.listen(PORT, () => {
            console.log(`Server Node.js API running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Failed to start server due to database error");
    }
})();
