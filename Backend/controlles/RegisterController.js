const bcrypt = require('bcrypt');
const _ = require('lodash');

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
        profileImg: "Avatar",
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

module.exports = {
    AddNewUser
}