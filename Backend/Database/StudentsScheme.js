const mongos = require('mongoose');
const Joi = require('joi');
mongos.set('useCreateIndex', true);
const StudentScheme = new mongos.Schema({
    username: {
        type: String,
        required: true,
        minlength: 5,
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

function validateUser(user) {
    const schema = Joi.object({
        username: Joi.string().min(5).max(50).required(),
        age: Joi.number().min(10).max(100),
        email: Joi.string().min(5).max(255).required().email(),
        profileImg: Joi.string(),
        city: Joi.string().min(2).max(50),
        password: Joi.string().min(5).max(255).required()
    });

    return schema.validate(user);
}
//convert scheme to class so we can instantiate from it 
const Student = mongos.model("students", StudentScheme);



module.exports.Student = Student;

module.exports.validate = validateUser;