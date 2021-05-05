const express = require('express');
const API_Router = express.Router();
const Users_Router = require('./UserRouter');
const Login_Router = require('./LoginRouter');
console.log(Users_Router);

API_Router.use('/user', Users_Router);

API_Router.use('/login', Login_Router);

module.exports = API_Router;