var mysql = require('mysql');
var inquirer = require('inquirer');
var Table = require('cli-table');
var beeper = require('beeper');




// creating our mySQL connection 
var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'spice_rack_test'
});
// when we are connected the console will beep 2 times
connection.connect(function(err) {
    if (err) throw (err);

    // using * for beep and _ for pause you can set you own beep melody 
    beeper('*_*');

    inventory();
});
// END CONNECTION



var inventory = function() {
    connection.query('SELECT * FROM Products', function(err, res) {
        console.log("\n----------------------------------------------------------------------------------------")
        console.log("\n Welcome to the Spice Rack, below is what we currently have in stock");
        console.log("\n----------------------------------------------------------------------------------------")

        // New Table instance to format returned sql data
        var table = new Table({
            head: ['id', 'spiceName', 'price', 'stock'],
            style: {

                head: ['red'],
                compact: false,
                colAligns: ['center'],
            }
        });

        for (var i = 0; i < res.length; i++) {
            var inventoryArray = [res[i].id, res[i].spiceName, res[i].price, res[i].stock];
            table.push(inventoryArray);
        }
        console.log(table.toString());
        // buyItem();
    });
};

//Prompts the customer on which item to buy
var buyItem = function() {
    inquirer.prompt([{
        name: "Item",
        type: "input",
        message: "Choose the ID of the Item you would like to buy",
        validate: function(value) {
            //validates answer
            if (isNaN(value) === false) {
                return true;
            } else {
                console.log("\nPlease enter only the Item number of the item you'd like to buy\n");
                return false;
            }
        }
    }, { //Prompts the customer for the quantity
        name: "Qty",
        type: "input",
        message: "How many would you like to buy?",
        validate: function(value) {
            //validates answer
            if (isNaN(value) === false) {
                return true;
            } else {
                console.log("\nPlease enter a valid Quantity\n");
                return false;
            }
        }
    }]).then(function(answer) {
        var ItemInt = parseInt(answer.Qty);
        //Queries the database
        connection.query("SELECT * FROM Products WHERE ?", [{ ItemID: answer.Item }], function(err, data) {
            if (err) throw err;
            //Checks if sufficient quantity exists
            if (data[0].StockQuantity < ItemInt) {
                console.log("We're sorry, that Item is currently out of stock\n");
                console.log("Please choose another Product\n");
                start();
            } else {
                //if quantity exists updates database
                var updateQty = data[0].StockQuantity - ItemInt;
                var totalPrice = data[0].Price * ItemInt;
                connection.query('UPDATE products SET StockQuantity = ? WHERE ItemID = ?', [updateQty, answer.Item], function(err, results) {
                    if (err) {
                        throw err;
                    } else {
                        console.log("Purchase successfull!\n");
                        console.log("Your total cost is: $ " + totalPrice);
                        //Asks the buyer if they would like to continue
                        inquirer.prompt({
                            name: "buyMore",
                            type: "confirm",
                            message: "Would you like to buy another Product?",
                        }).then(function(answer) {
                            if (answer.buyMore === true) {
                                start();
                            } else {
                                console.log("Thank your for shopping with Bamazon!");
                                connection.end();
                            }
                        });
                    }
                });
            }
        });
    });
};