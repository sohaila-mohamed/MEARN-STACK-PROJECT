const express = require('express');
const Login_Router = express.Router();
const multer = require('multer');
const { Authenticate } = require('../middlewares/Auth');
const { UpdateUserData, LoginUser } = require('../controlles/LoginController');
const { AsyncMiddleware } = require('../middlewares/async');
const { upload } = require('../middlewares/upload');
//uploading file configurations 



///APIs


Login_Router.post('/log', AsyncMiddleware(LoginUser));

Login_Router.put('/update/:id', Authenticate, upload.single('profileImg'), AsyncMiddleware(UpdateUserData));

module.exports = Login_Router;