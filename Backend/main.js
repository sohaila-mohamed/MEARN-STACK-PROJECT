const config = require('config');
const express = require('express');
const bodyParser = require("body-parser");
const cors = require('cors');
const path = require('path');
const app = express();
const API_Router = require('./routers/ApiRouter');
const DB = require('./Database/DBConnection');

//Server Configurations 

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}






//DB Connection 
db = new DB(config);
db.connect().then(() => { if (db.connected) return }).then(() => {
    app.listen(config.get("server.port"), () => {
        console.log(`Server is up on port ${config.get("server.port")} `)
    })
}).catch((err) => {
    console.log("error connection to DB Server", err);
    next(err);
});


//middleware
app.use(cors(corsOptions));
//body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//static files
app.use(express.static(path.join(__dirname, './uploads/')));
//routers 
app.use('/api', API_Router);

//error handling
app.use((error, req, res, next) => {
    console.log("error middleware", error);
    res.send("Error  Happened");
});