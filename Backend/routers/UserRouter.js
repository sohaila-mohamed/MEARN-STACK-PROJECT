const express = require('express');
const Users_Router = express.Router();
const Student = require("../Database/StudentsScheme");
const { getAllStud, getUserByID, deleteUsrByID } = require('../controlles/UserController');

Users_Router.get('/getUsers', getAllStud);

Users_Router.get('/getUser/:id', getUserByID);

Users_Router.delete('/delete/:id', deleteUsrByID);

module.exports = Users_Router;