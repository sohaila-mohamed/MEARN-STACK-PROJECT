function AddNewUser(req, res, next) {
    console.log("posting data  ", req.body);
    console.log("posting file  ", req.file);

    const _std = new req.DB_Scheme({
        username: req.body.name,
        age: req.body.age,
        email: req.body.email,
        city: req.body.city,
        profileImg: req.file.filename
    });
    _std.save().then((result) => {
        res.send(result);
    }).catch((err) => {
        next(err);
        for (e in err.errors) { console.log(err.errors[e].message) }
    });
}

function UpdateUserData(req, res) {
    console.log(req.file);
    req.DB_Scheme.updateOne({ _id: req.params.id }, {
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


}

module.exports = {
    AddNewUser,
    UpdateUserData
}