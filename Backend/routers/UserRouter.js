const express = require('express');
const Users_Router = express.Router();
const Student = require("../Database/StudentsScheme");
const { Authenticate } = require('../middlewares/Auth');
const { getAllStud, getUserByID, deleteUsrByID } = require('../controlles/UserController');
const { AsyncMiddleware } = require('../middlewares/async');

Users_Router.get('/getUsers', AsyncMiddleware(getAllStud));

Users_Router.get('/getUser/:id', Authenticate, AsyncMiddleware(getUserByID));

Users_Router.delete('/delete/:id', Authenticate, AsyncMiddleware(deleteUsrByID));

module.exports = Users_Router;