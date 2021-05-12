const express = require('express');
const multer = require('multer');
const Register_Router = express.Router();
const { AddNewUser } = require('../controlles/RegisterController');
const { AsyncMiddleware } = require('../middlewares/async');
//uploading file configurations 



///APIs
Register_Router.post('/', AsyncMiddleware(AddNewUser));

module.exports = Register_Router;