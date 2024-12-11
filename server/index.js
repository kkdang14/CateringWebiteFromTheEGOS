const express =  require("express");
const cors = require("cors");
const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

//routes


app.listen(PORT, () => {
    console.log(`Server Node.js API running on port ${PORT}`);
});
