const express = require('express');
const authController = require('../controllers/auth.controller');
const authenticate = require('../middlewares/authenticate.middleware')
const verifyAdmin = require('../middlewares/verifyAdmin.middleware')

const authRouter = express.Router();

authRouter.post("/register", authController.customerRegister);
authRouter.post("/login", authController.userLogin);
authRouter.post("/logout", authController.userLogout);
// authRouter.post("/adminLogin", authController.adminLogin);
// authRouter.post("/adminLogout", authController.adminLogout);
authRouter.get("/check-login", authenticate.checkingLogin, (req, res) => {
    res.status(200).json({
        message: "User is access",
        user: req.user,
    });
});
authRouter.get("/verify-admin", verifyAdmin, (req, res) => {
    res.status(200).json({
        message: "Admin is access",
        user: req.user,
    });
});

module.exports = authRouter;