const express = require('express')
const employees = require('../controllers/employee.controller')

const routerEmployee = express.Router()

routerEmployee.get("/list", employees.getAllEmployees)
routerEmployee.get("/getById/:id_employee", employees.getEmployeeById)   
routerEmployee.post("/add", employees.addEmployee)
routerEmployee.put("/update/:id_employee", employees.updateEmployee)
routerEmployee.delete("/delete/:id_employee", employees.deleteEmployee) 

module.exports = routerEmployee