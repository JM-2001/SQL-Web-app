"use strict";
const express = require("express");
const router = express.Router();

const employeeController = require("../controllers/employee.controller");

router.get("/all", employeeController.getAll);
router.get("/employeeInfo/:empSSN", employeeController.getOneByEmpSSN);
router.get("/delete/:empSSN", employeeController.deleteEmployee);
router.get("/update/:empSSN", employeeController.updateEmployeeSite);
router.post("/updating", employeeController.updateEmployee);
router.get("/new", employeeController.createNewEmployeeSite);
router.post("/new-employee", employeeController.createNewEmployee);
router.get("/search", employeeController.searchEmployeeSite);
router.post("/searching", employeeController.searchEmployee);


/*
router.get('/register', function (req, res) {
    res.render("user/register", { title: "Register" })
    //res.render("user/register", { title: "Register", message: req.flash('error')[0] })
});
*/
//router.get("/:email", usersController.getOneByEmail);
//router.post("/new", usersController.createNewUser);

/*
router.post("/new", menucontroller.createNew);
router.get("/search", menucontroller.searchByName);
router.delete("/delete/:id", menucontroller.deleteById);
router.put("/update/:id", menucontroller.update)
*/

module.exports = router;
