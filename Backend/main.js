const config = require('config');
const express = require('express');
const bodyParser = require("body-parser");
const cors = require('cors');
const path = require('path');
const app = express();
const API_Router = require('./routers/ApiRouter');
const DB = require('./Database/DBConnection');
const load = require('lodash');
const { ErrorHandler } = require('./middlewares/Error');

//checking for environment variables 
if (!config.get('Students.dbConfig.DBConnectionString')) {
    console.log("Fatal Error, Server Can't Start");
    process.exit(1);
}
if (!config.get('Students.Login.JWTPrivateKey')) {
    console.log("Fatal Error, Server Can't Start");
    process.exit(1);
}

//Server Configurations 
var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}



//DB Connection 
try {
    db = new DB(config);
    db.connect().then(() => { if (db.connected) return }).then(() => {
        app.listen(config.get("server.port"), () => {
            console.log(`Server is up on port ${config.get("server.port")} `)
        })
    }).catch((err) => {
        console.log("error connection to DB Server", err);
        next(err);
    });
} catch (err) {
    console.log("Error in db connection: ", err)
}




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
app.use(ErrorHandler);

//uncaught exceptions 
process.on('uncaughtException', (ex) => {
    next({ status: 505, message: "internal server error", err: ex });
    process.exit(1);
});
//unhandled rejections
process.on('unhandledRejection', (ex) => {
    next({ status: 505, message: "internal server error", err: ex });
    process.exit(1);
});