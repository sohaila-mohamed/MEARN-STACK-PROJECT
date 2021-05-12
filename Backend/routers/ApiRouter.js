const express = require('express');
const API_Router = express.Router();
const Users_Router = require('./UserRouter');
const Login_Router = require('./LoginRouter');
const Register_Router = require('./registerRouter');
const { Student, validate } = require("../Database/StudentsScheme");
const { Authenticate } = require('../middlewares/Auth');


API_Router.use('/', (req, res, next) => {
    req.DB_Scheme = {
        Student: Student,
        validate: validate
    };
    next();
});

API_Router.use('/register', Register_Router);

API_Router.use('/login', Login_Router);

API_Router.use('/user', Users_Router);

module.exports = API_Router;