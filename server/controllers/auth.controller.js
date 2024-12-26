const db = require('../utils/db');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
require("dotenv").config();

//REGISTER API

const customerRegister = asyncHandler(async (req, res) => {
    try {
        const {name, username, password, phone, email, address, note, photo } = req.body

        if (!name || !username || !password || !email) {
            return res.status(400).json({ message: "name, username, password, and email are required" });
        }
        
        const checkSql = 'SELECT * FROM customer WHERE Username = ? OR Email = ?';
        const [existingUsers] = await db.mySqlPool.query(checkSql, [username, email]);


        if (existingUsers.length > 0) {
            const conflictField = existingUsers.some(user => user.Username === username)
                ? 'Username'
                : 'Email';
            return res.status(404).json({ message: `${conflictField} already exists` });
        }

        if (typeof password !== 'string' || password.trim() === '') {
            return res.status(400).json({ message: "Password must be a non-empty string" });
        }
        const hashPassword = await bcrypt.hash(password, 10);

        const sql = `INSERT INTO customer (Name, Username, Password, Phone, Email, Address, Note, Photo) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
        const data = await db.mySqlPool.query(sql, [name, username, hashPassword, phone, email, address, note, photo])
        res.status(200).json({message: "Success", data})
    } catch (error) {
        res.status(500).json({message: "Error in register API", error})
        console.log(error)
    }
})

//LOGIN API

const userLogin = asyncHandler(async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if username and password are provided
        if (!username || !password) {
            return res.status(400).json({ message: "Username and password are required" });
        }

        // Helper function to find user in a specific table
        const findUser = async (table) => {
            const query = `SELECT * FROM ${table} WHERE Username = ?`;
            const [result] = await db.mySqlPool.query(query, [username]);
            return result.length > 0 ? result[0] : null;
        };

        // Attempt to find user in customer table
        let user = await findUser('customer');
        let userType = 'customer';

        // If not found, try employee table
        if (!user) {
            user = await findUser('employee');
            userType = 'employee';
        }

        // If still not found, return error
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Compare the password
        const isMatch = await bcrypt.compare(password, user.Password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid password" });
        }

        // Create JWT token
        const payload = {
            id: user.CustomerID || user.EmployeeID, // Use the correct ID field
            username: user.Username,
            isAdmin: user.Admin,
            userType,
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '168h' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Adjust for production
            sameSite: 'strict', // CSRF protection
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.status(200).json({
            message: `${userType} login successful`,
            token: `${token}`,
            payload,
        });

    } catch (error) {
        res.status(500).json({ message: "Error in login API", error });
        console.log(error);
    }
});


const userLogout = asyncHandler(async (req, res) => {
    const token = req.cookies.token; // Get token from cookie

    if (!token) {
        return res.status(401).json({ message: 'No token found, unable to log out' });
    }

    // Verify and decode the token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid\ or expired token' });
        }

        const username = decoded.username;
        const userId = decoded.id;
        const isAdmin = decoded.Admin;

        // Clear the JWT cookie
        res.clearCookie('token', { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

        // Respond with a message indicating the user who logged out
        res.status(200).json({
            message: `User ${username} (ID: ${userId}) logged out successfully`,
        });
    });
});


// const adminLogin = asyncHandler(async (req, res) => {
//     try {
//         const { username, password } = req.body;

//         // Check if username and password are provided
//         if (!username || !password) {
//             return res.status(400).json({ message: "Username and password are required" });
//         }

//         // Query to check if the user exists
//         const checkSql = 'SELECT * FROM employee WHERE Username = ?';
//         const [user] = await db.mySqlPool.query(checkSql, [username]);

//         if (user.length === 0) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         // Compare the password
//         const isMatch = await bcrypt.compare(password, user[0].Password);
//         if (!isMatch) {
//             return res.status(401).json({ message: "Invalid password" });
//         }

//         // Create JWT token
//         const payload = {
//             id: user[0].EmployeeID,
//             username: user[0].Username,
//             isAdmin: user[0].Admin
//         };

//         const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '168h' });

//         res.cookie('token', token, {
//             httpOnly: true,   
//             secure: process.env.NODE_ENV === 'production', 
//             sameSite: 'strict', // CSRF protection
//             maxAge: 7 * 24 * 60 * 60 * 1000, 
//         });

//         // Send response with the token
//         res.status(200).json({
//             message: "Login successful",
//             token:  `${token}`,
//             payload,
//         });
//     } catch (error) {
//         res.status(500).json({ message: "Error in login API", error });
//         console.log(error);
//     }
// });

// const adminLogout = asyncHandler(async (req, res) => {
//     const token = req.cookies.token; // Get token from cookie

//     if (!token) {
//         return res.status(401).json({ message: 'No token found, unable to log out' });
//     }

//     // Verify and decode the token
//     jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//         if (err) {
//             return res.status(403).json({ message: 'Invalid or expired token' });
//         }

//         const username = decoded.username;
//         const employeeId = decoded.id;
//         const isAdmin = decoded.isAdmin;


//         // Clear the JWT cookie
//         res.clearCookie('token', { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

//         // Respond with a message indicating the user who logged out
//         res.status(200).json({
//             message: `User ${username} (ID: ${employeeId}) logged out successfully`,
//         });
//     });
// })



module.exports = {
    customerRegister,
    userLogin,
    userLogout,
    // adminLogin,
    // adminLogout,
}
