"use strict";
const db = require("./db-conns");

function getAll() {
  let sql = "SELECT * FROM Employee;";
  const data = db.all(sql);
  return data;
};

function getOneByEmpSSN(empSSN) {
  let sql = "SELECT * FROM Employee WHERE empSSN =?;";
  const data = db.get(sql, empSSN);
  return data;
}

function updateEmployee(params) {
  let sql = "UPDATE Employee SET EmpSSN =?, DOB =?, FName =?, Mint =?, LName =?, Address =? WHERE EmpSSN =?;";
  const data = db.run(sql, params);
  return data;
}

function deleteEmployee(empSSN) {
  let sql = "DELETE FROM Employee WHERE empSSN =?;";
  const data = db.run(sql, empSSN);
  return data;
}

function createNewEmployee(params) {
  let sql = "INSERT INTO Employee (EmpSSN, DOB, FName, Mint, LName, Address) VALUES (?, ?, ?, ?, ?, ?);";
  const data = db.run(sql, params);
  return data;
}

function getEmployeeBySSN(empSSN) {
  let sql = "SELECT EmpSSN FROM Employee WHERE EmpSSN =?;";
  const data = db.get(sql, empSSN);
  return data;
}

function getHourlyEmployeesBasicInfo() {
  let sql = "SELECT * FROM hourlyEmp;"
  const data = db.all(sql);
  return data;
}

function getHourlyEmployeesAllInfo() {
  let sql = "SELECT * FROM hourlyEmp NATURAL JOIN Employee;"
  const data = db.all(sql);
  return data;
}

function searchEmployee(params) {
  let sql = "SELECT * FROM Employee WHERE FName LIKE ? OR LName LIKE ?;";
  const data = db.all(sql, params);
  return data;
}

module.exports = {
  getAll,
  getOneByEmpSSN,
  updateEmployee,
  deleteEmployee,
  createNewEmployee,
  getEmployeeBySSN,
  getHourlyEmployeesBasicInfo,
  getHourlyEmployeesAllInfo,
  searchEmployee,
};
