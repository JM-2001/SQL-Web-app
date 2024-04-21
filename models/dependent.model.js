"use strict";
const db = require("./db-conns");

function getAll() {
    let sql = "SELECT * FROM Dependent;";
    const data = db.all(sql);
    return data;
};

function getAllByEmpSSN(empSSN) {
    let sql = "SELECT * FROM Dependent WHERE EmpSSN =?;";
    const data = db.all(sql, empSSN);
    return data;
}

function getOneDependent(empSSN, dependentName) {
    let sql = "SELECT * FROM Dependent WHERE EmpSSN =? AND Name =?;";
    const data = db.get(sql, empSSN, dependentName);
    return data;
}

function updateDependent(params) {
    let sql = "UPDATE Dependent SET Name =?, Relationship =?, EmpSSN =? WHERE EmpSSN =? AND Name =?";
    return new Promise((resolve, reject) => {
        db.run(sql, params, function (err) {
            if (err) {
                reject(err);
            } else {
                resolve(this.changes);
            }
        });
    });
}

function deleteDependent(empSSN, dependentName) {
    let sql = "DELETE FROM Dependent WHERE EmpSSN =? AND Name =?;";
    const data = db.run(sql, [empSSN, dependentName]);
    return data;
}

function createNewDependent(params) {
    let sql = "INSERT INTO Dependent (Name, Relationship, EmpSSN) VALUES (?, ?, ?);";
    return new Promise((resolve, reject) => {
        db.run(sql, params, function (err) {
            if (err) {
                reject(err);
            } else {
                resolve(this.lastID);
            }
        });
    });
}

module.exports = {
    getAll,
    getAllByEmpSSN,
    getOneDependent,
    updateDependent,
    deleteDependent,
    createNewDependent,
};
