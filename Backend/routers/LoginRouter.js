const express = require('express');
const Login_Router = express.Router();
const Student = require("../Database/StudentsScheme");
const multer = require('multer');
const { AddNewUser, UpdateUserData } = require('../controlles/LoginController');


//uploading file configurations 

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "./uploads");

    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname.toString().trim());
    }
});
const upload = multer({ storage: storage });


///APIs
Login_Router.post('/log', upload.single('profileImg'), AddNewUser);


Login_Router.post('/update/:id', upload.single('profileImg'), UpdateUserData);

module.exports = Login_Router;