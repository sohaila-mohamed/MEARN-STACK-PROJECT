const express = require('express');
const API_Router = express.Router();
const Users_Router = require('./UserRouter');
const Login_Router = require('./LoginRouter');
const { Student, validate } = require("../Database/StudentsScheme");

console.log(Users_Router);
API_Router.use('/', (req, res, next) => {
    req.DB_Scheme = {
        Student: Student,
        validate: validate
    };
    next()
});

API_Router.use('/user', Users_Router);

API_Router.use('/login', Login_Router);

module.exports = API_Router;