const express = require('express');
const multer = require('multer');
const Register_Router = express.Router();
const { AddNewUser } = require('../controlles/RegisterController');

//uploading file configurations 



///APIs
Register_Router.post('/', AddNewUser);

module.exports = Register_Router;