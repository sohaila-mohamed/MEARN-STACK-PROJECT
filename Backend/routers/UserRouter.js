const express = require('express');
const Users_Router = express.Router();
const Student = require("../Database/StudentsScheme");
const { Authenticate } = require('../middlewares/Auth');
const { getAllStud, getUserByID, deleteUsrByID } = require('../controlles/UserController');

Users_Router.get('/getUsers', getAllStud);

Users_Router.get('/getUser/:id', Authenticate, getUserByID);

Users_Router.delete('/delete/:id', Authenticate, deleteUsrByID);

module.exports = Users_Router;