const bcrypt = require('bcrypt');
const Joi = require('joi');
const _ = require('lodash');
const { LoginValidation } = require('../Database/StudentsScheme');


async function UpdateUserData(req, res, next) {
    console.log("body", req.body);
    if (req.user._id !== req.params.id) return next({ message: "Un-Authorized request", status: 401 });
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
    if (!result) return next({ status: 400, message: "Bad Request" });
    return res.send(result);



}

async function LoginUser(req, res, next) {
    //validate request body
    const { error } = LoginValidation(req.body);
    if (error) return next({ status: 400, message: error.details[0].message, err: error });
    //check if already registered 
    let user = await req.DB_Scheme.Student.findOne({ email: req.body.email });
    if (!user) return next({ status: 400, message: 'Invalid email or password' })
        //check if password validation
    const validatePassword = await bcrypt.compare(req.body.password, user.password);
    if (!validatePassword) return next({ status: 400, message: 'Invalid email or password' });
    //generate token
    const token = user.GenerateAuthenticationToken();
    //set response header with the generated token and send the response body mapped
    res.header('x-login-auth-token', token).send(_.pick(user, ['_id', 'username', 'email', 'age', 'city', 'profileImg']));

}



module.exports = {

    UpdateUserData,
    LoginUser
}