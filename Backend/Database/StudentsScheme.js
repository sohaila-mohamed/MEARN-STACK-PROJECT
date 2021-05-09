const mongos = require('mongoose');
mongos.set('useCreateIndex', true);
const StudentScheme = new mongos.Schema({
    username: {
        type: String,
        required: true
    },
    age: { type: Number },
    city: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    profileImg: {
        type: String,
        required: true
    },

});

//convert scheme to class so we can instantiate from it 
const Student = mongos.model("students", StudentScheme);



module.exports = Student;