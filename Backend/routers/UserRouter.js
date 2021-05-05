const express = require('express');
const Users_Router = express.Router();
const Student = require("../Database/StudentsScheme");

Users_Router.get('/getUsers', (req, res) => {

    Student.find().then((res1) => { res.send(res1) }).
    catch((err) => {
        console.log(err);
    })
});

Users_Router.get('/getUser/:id', (req, res) => {
    console.log("params.id", req.params.id);
    Student.find({ _id: req.params.id })
        .then((result) => {
            res.send(result);

        }).catch((err) => {
            console.log(err);

        })

});

Users_Router.delete('/delete/:id', (request, res) => {
    Student.findOne({ _id: request.params.id })
        .then((result) => {
            if (result) {
                console.log("selected object ", result);
                Student.deleteOne({ _id: result._id })
                    .then((res1) => {
                        console.log(res1);
                        res.send("deleted");
                    })
                    .catch((err1) => {
                        console.log(err1);
                    })

            } else res.send("Id Not Found");
        })
        .catch((err) => {
            console.log(err);
        });
});
module.exports = Users_Router;