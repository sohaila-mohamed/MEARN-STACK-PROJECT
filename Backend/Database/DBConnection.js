const mongos = require('mongoose');
class DB {

    constructor() {
        let _uri = "mongodb+srv://Sohaila:1234@cluster0.ptr2l.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
        // this.setName = function(name) { _name = name; }
        this.getUri = function() { return _uri; }
        this.connected = false;
        this.connect = async function() {
            await mongos.connect(this.getUri(), { useNewUrlParser: true, useUnifiedTopology: true }).then((res) => {
                console.log(`in DB obj `, res);
                this.connected = res.connections[0].readyState === 1;
                return;
            }).catch((err) => {
                console.log(`Error connection to  database `, err);
            });

        }
    }



}

module.exports = DB;