"use strict";
const express = require("express");
const app = express();
const path = require("path");
const multer = require("multer");

const flash = require("connect-flash");

app.use(multer().none());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.use(flash());

const employeeRouter = require("./routes/employee.router");
const dependentRouter = require("./routes/dependent.route");
//const usersRouter = require("./routes/users.route");

app.use("/employee", employeeRouter);
app.use("/employee/dependents", dependentRouter);
//app.use("/user", usersRouter);

app.get("/", (req, res) => {
    res.render("index", { title: "Home" });
});


/*
app.get("/", (req, res) => {
  res.json({ message: "You are at the home page!" });
});
*/

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log("App listening at http://localhost:" + PORT);
});
