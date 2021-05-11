const bcrypt = require('bcrypt');
const Joi = require('joi');
const _ = require('lodash');
const { LoginValidation } = require('../Database/StudentsScheme');


async function UpdateUserData(req, res) {
    console.log("body", req.body);
    if (req.user._id !== req.params.id) return res.status(401).send("Un-Authorized request");
    let result = await req.DB_Scheme.Student.updateOne({ _id: req.params.id }, {
        $set: {
            username: req.body.username,
            city: req.body.city,
            age: req.body.age,
            email: req.body.email,
            profileImg: req.file.filename ? req.file.filename : "Avatar.jpg",
            password: req.body.password
        }
    })
    if (!result) return res.status(400).send("Bad Request");
    return res.send(result);



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

    UpdateUserData,
    LoginUser
}