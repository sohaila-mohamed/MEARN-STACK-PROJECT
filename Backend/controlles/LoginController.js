const bcrypt = require('bcrypt');
const Joi = require('joi');
const _ = require('lodash');
const { LoginValidation } = require('../Database/StudentsScheme');

async function AddNewUser(req, res, next) {

    //validate request body
    const { error } = req.DB_Scheme.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //check if already registered 
    let user = await req.DB_Scheme.Student.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User Already registered');

    //create new user 
    const _std = new req.DB_Scheme.Student({
        username: req.body.username,
        age: req.body.age,
        email: req.body.email,
        city: req.body.city,
        profileImg: req.file.filename,
        password: req.body.password
    });
    //encrypting user password 
    const salt = await bcrypt.genSalt(10);
    _std.password = await bcrypt.hash(_std.password, salt);

    //save mapping returned object to the client  
    _std.save().then((result) => {
        res.send(_.pick(result, ['_id', 'username', 'email', 'age', 'city', 'profileImg']));
    }).catch((err) => {
        next(err);
        for (e in err.errors) { console.log(err.errors[e].message) }
    });
}

function UpdateUserData(req, res) {
    console.log("body", req.body);
    req.DB_Scheme.Student.updateOne({ _id: req.params.id }, {
            $set: {
                username: req.body.username,
                city: req.body.city,
                age: req.body.age,
                email: req.body.email,
                profileImg: req.file.filename,
                password: req.body.password
            }
        })
        .then((res1) => {
            console.log(res1);
            res.send(res1);
        })
        .catch((err1) => {
            console.log(err1);
        })


}

async function LoginUser(req, res, next) {
    //validate request body
    const { error } = LoginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    //check if already registered 
    let user = await req.DB_Scheme.Student.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Invalid email or password');
    //check if password validation
    const validatePassword = await bcrypt.compare(req.body.password, user.password);
    if (!validatePassword) return res.status(400).send('Invalid email or password');
    //generate token
    const token = user.GenerateAuthenticationToken();
    //set response header with the generated token and send the response body mapped
    res.header('x-login-auth-token', token).send(_.pick(user, ['_id', 'username', 'email', 'age', 'city', 'profileImg']));

}



module.exports = {
    AddNewUser,
    UpdateUserData,
    LoginUser
}