const express = require('express')
const mongos = require('mongoose');
const bodyParser = require("body-parser");
const Student = require("./Database/StudentsScheme");
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const app = express();
//Access
var corsOptions = {
    origin: 'http://localhost:3001',
    optionsSuccessStatus: 200 // For legacy browser support
}
app.use(cors(corsOptions));

//static file configurations 
const imagesPath = path.join(__dirname, './uploads/');
app.use(express.static(path.join(__dirname, './uploads/')));

//body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



//connecting to database 
const uri = "mongodb+srv://Sohaila:1234@cluster0.ptr2l.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const port = 3000;

mongos.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }).then((res) => {
    app.listen(port);
}).catch((err) => {
    console.log(`Error connection to  post ${port}`, err);
});





//uploading file configurations 

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "./uploads/");

    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname.toString().trim());
    }
});
const upload = multer({ storage: storage });


///APIs
app.post('/log', upload.single('profileImg'), (req, res) => {
    console.log("posting data  ", req.body);
    console.log("posting file  ", req.file);

    const _std = new Student({
        username: req.body.name,
        age: req.body.age,
        email: req.body.email,
        city: req.body.city,
        profileImg: req.file.filename
    });
    _std.save().then((result) => {
        res.send(result);
    }).catch((err) => {
        console.log(err);
    });
});

app.get('/getUsers', (req, res) => {

    Student.find().then((res1) => { res.send(res1) }).
    catch((err) => {
        console.log(err);
    })
});

app.get('/getUsers/:id', (req, res) => {
    console.log("params.id", req.params.id);
    Student.find({ _id: req.params.id })
        .then((result) => {
            res.send(result);

        }).catch((err) => {
            console.log(err);

        })

});

app.post('/update/:id', upload.single('profileImg'), (req, res) => {
    console.log(req.file);
    Student.updateOne({ _id: req.params.id }, {
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


});

app.delete('/delete/:id', (request, res) => {
    Student.findOne({ _id: request.params.id })
        .then((result) => {
            if (result) {
                console.log("selected object ", result);
                Student.deleteOne({ _id: result._id })
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
});