const db = require("../utils/db")
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const crypto = require('crypto')

//GET ALL EMPLOYEES API
const getAllEmployees = asyncHandler(async (req,res) => {
    try {
        const data = await db.mySqlPool.query('SELECT * FROM employee')
        if (!data) {
            return res.status(404).json({ message: `Error! ${error}` });
        }
        res.status(200).json({ data })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: `Error! ${error}` });
    }
})

//GET EMPLOYEE BY ID API

const getEmployeeById = asyncHandler(async (req, res) => {
    try {
        const employeeID = req.params.EmployeeID
        if (!employeeID) {
            res.status(404).json({ message: "This employee ID is not exist"})
        }
    const data = await db.mySqlPool.query(`SELECT * FROM employee  WHERE EmployeeID=?`, [employeeID])
        if (!data) {
            res.status(404).json({message: "Employee with this id not exist in db"})
        } else {
            res.status(200).json(data)
        }
    } catch (error) {   
        res.status(500).json({ message: "Error in get employee by id API", error})
    }
})

// ADD EMPLOYEE API
const addEmployee = asyncHandler(async (req, res) => {
    try {
        const { name, username, password, phone, email, address, note, admin, photo } = req.body;

        if (!name || !username || !email) {
            return res.status(400).json({ message: "name, username, and email are required" });
        }

        // Check for existing user
        const checkSql = 'SELECT * FROM employee WHERE Username = ? OR Email = ?';
        const [existingUsers] = await db.mySqlPool.query(checkSql, [username, email]);

        if (existingUsers.length > 0) {
            const conflictField = existingUsers.some(user => user.Username === username)
                ? 'Username'
                : 'Email';
            return res.status(400).json({ message: `${conflictField} already exists` });
        }

        // Generate random password if not provided
        const generatedPassword = password || crypto.randomBytes(4).toString('hex'); // Generates an 8-character hex password

        const hashPassword = await bcrypt.hash(generatedPassword, 10);

        // Insert new employee
        const sql = `INSERT INTO employee (Name, Username, Password, Phone, Email, Address, Note, Admin, Photo) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const data = await db.mySqlPool.query(sql, [name, username, hashPassword, phone, email, address, note, admin, photo]);

        res.status(200).json({ 
            message: "Employee added successfully", 
            data, 
            generatedPassword: password ? undefined : generatedPassword
        });
    } catch (error) {
        res.status(500).json({ message: "Error in register API", error });
        console.log(error);
    }
});


const updateEmployee = asyncHandler(async (req, res) => {
    try {
        const employeeID = req.params.EmployeeID;
        if (!employeeID) {
            res.status(404).json({ message: "This employee ID is not exist"})
        }
        const {name, username, password, phone, email, address, note, admin, photo} = req.body
        const sql = `UPDATE employee SET Name = ?, Username = ?, Password = ?, Phone = ?, Email = ?, Address = ?, Note = ?, Admin = ?, Photo = ? WHERE EmployeeID = ?`
        const data = await db.mySqlPool.query(sql, [name, username, password, phone, email, address, note, admin, photo, employeeID])
        res.status(200).json({message: "Success", data})
    } catch (error) {
        res.status(500).json({message: "Error in update employee API", error})
    }
})

const deleteEmployee = asyncHandler(async (req, res) => { 
    try {
        const employeeID = req.params.EmployeeID;
        if (!employeeID) {
            res.status(404).json({ message: "This employee ID is not exist"})
        }
        const data = await db.mySqlPool.query(`DELETE FROM employee WHERE EmployeeID=?`, [employeeID])
        res.status(200).json({message: "Success", data})
    } catch (error) {
        res.status(500).json({message: "Error in delete employee API", error})
    }
})

module.exports = {
    getAllEmployees,
    getEmployeeById,
    addEmployee,
    updateEmployee,
    deleteEmployee
}