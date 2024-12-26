const express = require('express');
const customers = require('../controllers/customer.controller')

const customerRouter = express.Router()

customerRouter.get("/getall", customers.getALLCustomers)
customerRouter.get("/get/:CustomerID", customers.getCustomerById)
customerRouter.put("/update/:CustomerID", customers.upadteCustomer)
customerRouter.delete("/delete/:CustomerID", customers.deleteCustomer)
customerRouter.delete("/deleteall", customers.deleteAll)

module.exports = customerRouter
