"use strict";

const express = require("express");
const app = express();

const multer = require("multer");
app.use(multer().none());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const model = require("../models/employee.model");
const dependentModel = require("../models/dependent.model");

function getAll(req, res, next) {
  let employees = model.getAll();
  let dependents = dependentModel.getAll();
  let hourlyEmployees = model.getHourlyEmployeesAllInfo();
  let salariedEmployees = model.getSalariedEmployeesAllInfo();
  let nonPayrollEmployees = model.getNonPayrollEmployees();
  try {
    //res.json(model.getAll());
    res.render("employees/employee",
      {
        employees: employees,
        dependents: dependents,
        hourlyEmployees: hourlyEmployees,
        salariedEmployees: salariedEmployees,
        nonPayrollEmployees: nonPayrollEmployees,
        title: 'Employees'
      });
  } catch (err) {
    console.error("Error while getting users ", err.message);
    next(err);
  }
}

function getOneByEmpSSN(req, res, next) {
  let empSSN = req.params.empSSN;
  try {
    let employee = model.getOneByEmpSSN(empSSN);
    let dependents = dependentModel.getAllByEmpSSN(empSSN);
    let hourlyEmp = model.getHourlyEmpByEmpSSN(empSSN);
    let salariedEmp = model.getSalariedEmpByEmpSSN(empSSN);
    res.render("employees/employeeInfo", {
      employee: employee,
      dependents: dependents,
      hourlyEmp: hourlyEmp,
      salariedEmp: salariedEmp,
      title: 'Employee #' + empSSN
    });
  } catch (err) {
    console.error("Error while getting user ", err.message);
    next(err);
  }
}

function updateEmployeeSite(req, res, next) {
  let empSSN = req.params.empSSN;
  try {
    let employee = model.getOneByEmpSSN(empSSN);
    res.render("employees/updateEmployee", {
      employeeInfo: employee,
      title: 'Update Employee #' + empSSN
    });
  } catch (err) {
    console.error("Error while getting user ", err.message);
    next(err);
  }
}

function updateEmployee(req, res, next) {
  let empSSN = req.body.empSSN;
  let empDOB = req.body.dob;
  let empFirstName = req.body.first_name;
  let empMint = req.body.m_int;
  let empLName = req.body.last_name;
  let empAddress = req.body.address;
  let originalEmpSSN = req.body.originalEmpSSN;

  if (empFirstName && empLName && empDOB && empMint && empAddress && empSSN && originalEmpSSN) {
    let params = [empSSN, empDOB, empFirstName, empMint, empLName, empAddress, originalEmpSSN];
    try {
      model.updateEmployee(params);
      res.redirect(`/employee/employeeInfo/${empSSN}`);
    } catch (err) {
      console.error("Error while updating employee ", err.message);
      next(err);
    }
  } else {
    res.status(400).send('Missing required parameters');
  }
}

function deleteEmployee(req, res, next) {
  let empSSN = req.params.empSSN;
  try {
    model.deleteEmployee(empSSN);
    res.redirect("/employee/all");
  } catch (err) {
    console.error("Error while deleting employee ", err.message);
    next(err);
  }
}

function createNewEmployeeSite(req, res, next) {
  try {
    res.render("employees/createEmployee", { title: 'Create New Employee' });
  } catch (err) {
    console.error("Error while getting site ", err.message);
    next(err);
  }
}

/*
function createNewEmployee(req, res, next) {
  let empSSN = req.body.empSSN;
  let empDOB = req.body.dob || '';
  let empFirstName = req.body.first_name || '';
  let empMint = req.body.m_int || '';
  let empLName = req.body.last_name || '';
  let empAddress = req.body.address || '';

  if (empSSN != null && empSSN != undefined) {
    let params = [empSSN, empDOB, empFirstName, empMint, empLName, empAddress];
    try {
      model.createNewEmployee(params);
      res.redirect("/employee/all");
    } catch (err) {
      console.error("Error while creating employee ", err.message);
      next(err);
    }
  } else {
    res.status(400).send('Missing required parameters');
  }
}
*/

async function createNewEmployee(req, res, next) {
  let empSSN = req.body.empSSN;
  let empDOB = req.body.dob || '';
  let empFirstName = req.body.first_name || '';
  let empMint = req.body.m_int || '';
  let empLName = req.body.last_name || '';
  let empAddress = req.body.address || '';

  if (empSSN != null && empSSN != undefined) {
    try {
      // Check if an employee with the given EmpSSN already exists
      let existingEmployee = await model.getEmployeeBySSN(empSSN);
      if (existingEmployee) {
        res.status(400).send('An employee with this SSN already exists');
        return;
      }

      let params = [empSSN, empDOB, empFirstName, empMint, empLName, empAddress];
      model.createNewEmployee(params);
      res.redirect("/employee/all");
    } catch (err) {
      console.error("Error while creating employee ", err.message);
      next(err);
    }
  } else {
    res.status(400).send('Missing required parameters');
  }
}

function searchEmployeeSite(req, res, next) {
  try {
    res.render("employees/employeeSearch", { title: 'Search Employees' });
  } catch (err) {
    console.error("Error while getting site ", err.message);
    next(err);
  }
}

function searchEmployee(req, res, next) {
  let search = req.body.search || '';
  if (!search.trim()) {
    res.render("employees/employeeSearch", {
      message: 'Search input cannot be empty',
      title: 'Employees'
    });
    return;
  }
  try {
    let employees = model.searchEmployee(['%' + search + '%', '%' + search + '%']);
    res.render("employees/employeeSearch", {
      employees: employees,
      title: 'Employees'
    });
  } catch (err) {
    console.error("Error while searching for employees ", err.message);
    next(err);
  }
}

function getPayEmployeeSite(req, res, next) {
  let empSSN = req.params.empSSN;
  try {
    let hourlyEmp = model.getHourlyEmpByEmpSSN(empSSN);
    let salariedEmp = model.getSalariedEmpByEmpSSN(empSSN);
    res.render("employees/updatePayEmployee",
      {
        hourlyEmp: hourlyEmp,
        salariedEmp: salariedEmp,
        title: 'Update Employee Payroll Info'
      });
  } catch (err) {
    console.error("Error while getting site ", err.message);
    next(err);
  }
}

function updateHourlyEmployee(req, res, next) {
  let empSSN = req.body.empSSN;
  let hourlyRate = req.body.hourlyPay;

  if (empSSN && hourlyRate) {
    let params = [hourlyRate, empSSN];
    try {
      model.updateHourlyEmployee(params);
      res.redirect(`/employee/employeeInfo/${empSSN}`);
    } catch (err) {
      console.error("Error while updating employee ", err.message);
      next(err);
    }
  } else {
    res.status(400).send('Missing required parameters');
  }
}

function updateSalariedEmployee(req, res, next) {
  let empSSN = req.body.empSSN;
  let monthlySalary = req.body.salariedPay;

  if (empSSN && monthlySalary) {
    let params = [monthlySalary, empSSN];
    try {
      model.updateSalariedEmployee(params);
      res.redirect(`/employee/employeeInfo/${empSSN}`);
    } catch (err) {
      console.error("Error while updating employee ", err.message);
      next(err);
    }
  } else {
    res.status(400).send('Missing required parameters');
  }
}

function demoteHourlyEmployee(req, res, next) {
  let empSSN = req.params.empSSN;
  try {
    model.deleteHourlyEmployee(empSSN);
    res.redirect("/employee/all");
  } catch (err) {
    console.error("Error while deleting employee ", err.message);
    next(err);
  }
}

function demoteSalariedEmployee(req, res, next) {
  let empSSN = req.params.empSSN;
  try {
    model.deleteSalariedEmployee(empSSN);
    res.redirect("/employee/all");
  } catch (err) {
    console.error("Error while deleting employee ", err.message);
    next(err);
  }
}

function promoteEmployeeSite(req, res, next) {
  try {
    let nonPayrollEmployees = model.getNonPayrollEmployees();
    res.render("employees/promoteEmployee",
      {
        empSSN: '',
        employees: nonPayrollEmployees,
        title: 'Promote Employee Form'
      });
  } catch (err) {
    console.error("Error while getting site ", err.message);
    next(err);
  }
}

function promoteEmployeeByEmpSSNSite(req, res, next) {
  let empSSN = req.params.empSSN;
  try {
    let nonPayrollEmployees = model.getNonPayrollEmployees();
    res.render("employees/promoteEmployee",
      {
        empSSN: empSSN,
        employees: nonPayrollEmployees,
        title: 'Promote Employee Form'
      });
  } catch (err) {
    console.error("Error while getting site ", err.message);
    next(err);
  }
}

function createHourlyEmployee(req, res, next) {
  let empSSN = req.body.empSSN;
  let hourlyRate = req.body.payrollrate;

  if (empSSN && hourlyRate) {
    let params = [empSSN, hourlyRate];
    try {
      model.createHourlyEmployee(params);
      res.redirect("/employee/all");
    } catch (err) {
      console.error("Error while promoting employee ", err.message);
      next(err);
    }
  } else {
    res.status(400).send('Missing required parameters');
  }
}

function createSalariedEmployee(req, res, next) {
  let empSSN = req.body.empSSN;
  let monthlySalary = req.body.payrollrate;

  if (empSSN && monthlySalary) {
    let params = [empSSN, monthlySalary];
    try {
      model.createSalariedEmployee(params);
      res.redirect("/employee/all");
    } catch (err) {
      console.error("Error while promoting employee ", err.message);
      next(err);
    }
  } else {
    res.status(400).send('Missing required parameters');
  }
}

module.exports = {
  getAll,
  getOneByEmpSSN,
  updateEmployeeSite,
  updateEmployee,
  deleteEmployee,
  createNewEmployeeSite,
  createNewEmployee,
  searchEmployeeSite,
  searchEmployee,
  getPayEmployeeSite,
  updateHourlyEmployee,
  updateSalariedEmployee,
  demoteHourlyEmployee,
  demoteSalariedEmployee,
  promoteEmployeeSite,
  createHourlyEmployee,
  createSalariedEmployee,
  promoteEmployeeByEmpSSNSite,
};
