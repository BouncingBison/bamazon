var mysql = require('mysql');
var beeper = require('beeper');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "spice_rack_test"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected on: " + connection.threadId);
    // using * for beep and _ for pause you can set you own beep melody 
    beeper('*_*');


});


module.exports = connection;