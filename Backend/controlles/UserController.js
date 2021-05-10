function getAllStud(req, res) {
    console.log('req', req);
    req.DB_Scheme.Student.find().then((res1) => { res.send(res1) }).
    catch((err) => {
        console.log(err);
    })
}

function getUserByID(req, res) {
    console.log("params.id", req.params.id);
    req.DB_Scheme.Student.find({ _id: req.params.id })
        .then((result) => {
            res.send(result);

        }).catch((err) => {
            console.log(err);

        })

}

function deleteUsrByID(request, res) {
    req.DB_Scheme.Student.findOne({ _id: request.params.id })
        .then((result) => {
            if (result) {
                console.log("selected object ", result);
                req.DB_Scheme.Student.deleteOne({ _id: result._id })
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
}
module.exports = {
    getAllStud,
    getUserByID,
    deleteUsrByID
}