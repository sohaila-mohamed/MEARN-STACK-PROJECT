const mongos = require('mongoose');
const Joi = require('joi');
const config = require('config');
const jwt = require('jsonwebtoken');
mongos.set('useCreateIndex', true);
const StudentScheme = new mongos.Schema({
    username: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
    },
    age: { type: Number, min: 10, max: 100 },
    city: {
        type: String,
        minlength: 2,
        maxlength: 50
    },
    email: {
        type: String,
        unique: true,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    profileImg: {
        type: String
    },
    password: {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        maxlength: 1024
    }

});

//for consistent authentication token generation
StudentScheme.methods.GenerateAuthenticationToken = function() {
    return jwt.sign({ _id: this._id }, config.get('Students.Login.JWTPrivateKey'));
}


function validateUser(user) {
    console.log("user", user)
    const schema = Joi.object({
        username: Joi.string().min(2).max(50).required(),
        age: Joi.number().min(10).max(100),
        email: Joi.string().min(5).max(255).required().email(),
        profileImg: Joi.string(),
        city: Joi.string().min(2).max(50),
        password: Joi.string().min(5).max(255).required()
    });

    return schema.validate(user);
}

LoginValidation = function(data) {
        const schema = Joi.object({
            email: Joi.string().min(5).max(255).required().email(),
            password: Joi.string().min(5).max(255).required()
        });

        return schema.validate(data);
    }
    //convert scheme to class so we can instantiate from it 
const Student = mongos.model("students", StudentScheme);



module.exports.Student = Student;

module.exports.validate = validateUser;

module.exports.LoginValidation = LoginValidation;