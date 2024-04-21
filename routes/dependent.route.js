"use strict";
const express = require("express");
const router = express.Router();

const dependentController = require("../controllers/dependent.controller");


router.get("/all/:empSSN", dependentController.getAllByEmpSSN);

router.get('/new-dependent', dependentController.getNewDependent);
router.get('/new-dependent/:empSSN', dependentController.getNewDependentByEmpSSN);
router.post('/new', dependentController.createNewDependent);

router.get('/delete/:empSSN/:dependentName', dependentController.deleteDependent);
router.get('/update/:empSSN/:dependentName', dependentController.getUpdateDependent);
router.post('/update/:dependentEmpSSN/:dependentName', dependentController.updateDependent);

router.get("/:empSSN/:dependentName", dependentController.getOneDependent);


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
