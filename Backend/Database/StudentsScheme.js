const mongos = require('mongoose');
mongos.set('useCreateIndex', true);
const StudentScheme = new mongos.Schema({
    username: {
        type: String,
        require: true
    },
    age: { type: Number },
    city: {
        type: String,
    },
    email: {
        type: String,
        unique: true
    },
    profileImg: {
        type: String,
        require: true
    },

});
const Student = mongos.model("students", StudentScheme);



module.exports = Student;