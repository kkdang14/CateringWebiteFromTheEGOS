const express =  require("express");
const cors = require("cors");
const app = express();
const { checkConnection } = require("./utils/db")
const employeeRouter = require("./routes/employee.routes")
const customerRouter = require("./routes/customers.routes")
const authRouter = require("./routes/auth.routes")
const errorMiddleware = require("./middlewares/errorHandle.middleware")
const cookieParser = require('cookie-parser');
require("dotenv").config();

const PORT = process.env.PORT || 3000;

const corsOptions = {
    origin: 'http://localhost:3001', // Frontend origin cụ thể
    credentials: true, // Cho phép cookies hoặc header authorization
};
  
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser()) ;

//routes
app.use('/api/v1/employees', employeeRouter)
app.use('/api/v1/customers', customerRouter)
app.use('/api/v1/auth', authRouter)

app.use(errorMiddleware);


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
