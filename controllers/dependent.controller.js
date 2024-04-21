"use strict";

const express = require("express");
const app = express();

const multer = require("multer");
app.use(multer().none());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const model = require("../models/dependent.model");
const employeeModel = require("../models/employee.model");

function getAll(req, res, next) {
    let employees = model.getAll();
    try {
        //res.json(model.getAll());
        res.render("employees/employee", { employees: employees, title: 'Employees' });
    } catch (err) {
        console.error("Error while getting users ", err.message);
        next(err);
    }
}

function getAllByEmpSSN(req, res, next) {
    let empSSN = req.params.empSSN;
    try {
        //res.json(model.getAllByEmpSSN(empSSN));
        res.render("employees/employeeInfo", { dependents: model.getOneByEmpSSN(empSSN) });

    } catch (err) {
        console.error("Error while getting user ", err.message);
        next(err);
    }
}

function getOneDependent(req, res, next) {
    let empSSN = req.params.empSSN;
    let dependentName = req.params.dependentName;
    try {
        //res.json(model.getOneDependent(empSSN, dependentName));
        res.render("dependents/dependentInfo", { dependent: model.getOneDependent(empSSN, dependentName), title: 'Dependent: ' + dependentName });
    } catch (err) {
        console.error("Error while getting user ", err.message);
        next(err);
    }
}

function getUpdateDependent(req, res, next) {
    let empSSN = req.params.empSSN;
    let dependentName = req.params.dependentName;
    const employees = employeeModel.getAll();
    try {
        res.render("dependents/updateDependent",
            {
                empSSN: empSSN, // Add this line
                dependent: model.getOneDependent(empSSN, dependentName),
                employees: employees,
                title: 'Dependent: ' + dependentName
            });
    } catch (err) {
        console.error("Error while getting user ", err.message);
        next(err);
    }
}

function updateDependent(req, res, next) {
    let empSSN = req.body.empSSN;
    let dependentName = req.body.dependentName;
    let dependentRelationship = req.body.dependentRelationship;
    let originalEmpSSN = req.body.originalEmpSSN;
    let originalName = req.body.originalName;

    if (dependentName && dependentRelationship && empSSN && originalEmpSSN && originalName) {
        let params = [dependentName, dependentRelationship, empSSN, originalEmpSSN, originalName];
        try {
            model.updateDependent(params);
            res.redirect(`/employee/employeeInfo/${empSSN}`);
        } catch (err) {
            console.error("Error while updating dependent ", err.message);
            next(err);
        }
    } else {
        res.status(400).send('Missing required parameters');
    }
}

function deleteDependent(req, res, next) {
    let empSSN = req.params.empSSN;
    let dependentName = req.params.dependentName;
    try {
        model.deleteDependent(empSSN, dependentName);
        res.redirect(`/employee/employeeInfo/${empSSN}`);
    } catch (err) {
        console.error("Error while deleting employee ", err.message);
        next(err);
    }
}
// 
function getNewDependent(req, res, next) {
    const employees = employeeModel.getAll();
    try {
        res.render("dependents/createDependent",
            {
                empSSN: '',
                employees: employees,
                title: 'Add New Dependent'
            });
    } catch (err) {
        console.error("Error while getting user ", err.message);
        next(err);
    }
}

function getNewDependentByEmpSSN(req, res, next) {
    const employees = employeeModel.getAll();
    let empSSN = req.params.empSSN;
    try {
        res.render("dependents/createDependent",
            {
                empSSN: empSSN,
                employees: employees,
                title: 'Add New Dependent'
            });
    } catch (err) {
        console.error("Error while getting user ", err.message);
        next(err);
    }
}

function createNewDependent(req, res, next) {
    let empSSN = req.body.empSSN;
    let dependentName = req.body.dependentName;
    let dependentRelationship = req.body.dependentRelationship;
    if (empSSN && dependentName && dependentRelationship) {
        let params = [dependentName, dependentRelationship, empSSN];
        try {
            model.createNewDependent(params);
            res.redirect(`/employee/employeeInfo/${empSSN}`);
        } catch (err) {
            console.error("Error while creating dependent ", err.message);
            next(err);
        }
    } else {
        res.status(400).send('Missing required parameters');
    }
}

module.exports = {
    getAll,
    getAllByEmpSSN,
    getOneDependent,
    getUpdateDependent,
    updateDependent,
    deleteDependent,
    getNewDependent,
    getNewDependentByEmpSSN,
    createNewDependent,
};
