const db = require('../utils/db');
const asyncHandler = require('express-async-handler');

//GET ALL CUSTOMER API

const getALLCustomers = asyncHandler(async (req, res) => {
    try {
        const data = await db.mySqlPool.query('SELECT * FROM customer');
        if (!data) {
            res.status(404).json({message: "No record in DB"})
        }
        res.status(200).json({message: "OK", data})
    } catch (error) {
        res.status(500).json({message: "Error in get all customer API", error})
    }
})

const getCustomerById = asyncHandler(async (req, res) => { 
    try {
        const customerID = req.params.CustomerID;
        if (!customerID) {
            res.status(404).json({ message: "This customer ID is not exist"})
        }
        const data = await db.mySqlPool.query(`SELECT * FROM customer WHERE CustomerID=?`, [customerID])
        if (!data) {
            res.status(404).json({message: "Customer with this id not exist in db"})
        } else {
            res.status(200).json(data)
        }
    } catch (error) {   
        res.status(500).json({ message: "Error in get customer by id API", error})
    }
})

const upadteCustomer = asyncHandler(async (req, res) => {
    try {
        const customerID = req.params.CustomerID;
        if (!customerID) {
            res.status(404).json({ message: "This customer ID is not exist"})
        }
        const {name, username, password, phone, email, address, note, photo} = req.body
        const sql = `UPDATE customer SET Name = ?, Username = ?, Password = ?, Phone = ?, Email = ?, Address = ?, Note = ?, Photo = ? WHERE CustomerID = ?`
        const data = await db.mySqlPool.query(sql, [name, username, password, phone, email, address, note, photo, customerID])
        res.status(200).json({message: "Success", data})
    } catch (error) {
        res.status(500).json({message: "Error in update customer API", error})
    }
})

const deleteCustomer = asyncHandler(async (req, res) => {
    try {
        const customerID = req.params.CustomerID;
        if (!customerID) {
            res.status(404).json({ message: "This customer ID is not exist"})
        }
        const data = await db.mySqlPool.query(`DELETE FROM customer WHERE CustomerID=?`, [customerID])
        res.status(200).json({message: "Success", data})
    } catch (error) {
        res.status(500).json({message: "Error in delete customer API", error})
    }
})

const deleteAll = asyncHandler(async (req, res) => {
    try {
        const data = await db.mySqlPool.query('DELETE FROM customer')
        res.status(200).json({message: "Success", data})
    } catch (error) {
        res.status(500).json({message: "Error in delete all customer API", error})
    }
})

module.exports = {
    getALLCustomers,
    getCustomerById,
    upadteCustomer,
    deleteCustomer,
    deleteAll
}