const express = require('express');
const Login_Router = express.Router();
const Student = require("../Database/StudentsScheme");
const multer = require('multer');


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
Login_Router.post('/log', upload.single('profileImg'), (req, res) => {
    console.log("posting data  ", req.body);
    console.log("posting file  ", req.file);

    const _std = new Student({
        username: req.body.name,
        age: req.body.age,
        email: req.body.email,
        city: req.body.city,
        profileImg: req.file.filename
    });
    _std.save().then((result) => {
        res.send(result);
    }).catch((err) => {
        console.log(err);
    });
});


Login_Router.post('/update/:id', upload.single('profileImg'), (req, res) => {
    console.log(req.file);
    Student.updateOne({ _id: req.params.id }, {
            $set: {
                username: req.body.name,
                city: req.body.city,
                age: req.body.age,
                email: req.body.email,
                profileImg: req.file.filename
            }
        })
        .then((res1) => {
            console.log(res1);
            res.send(res1)
        })
        .catch((err1) => {
            console.log(err1);
        })


});
module.exports = Login_Router;