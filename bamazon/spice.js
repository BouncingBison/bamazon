var inquirer = require('inquirer');
var connection = require('./config/connection.js');
var spice_choice;
var spice_name;
var spice_price;
var dollar_amt;
var stock_remaining;

purchase();


function purchase() {
    var query = "SELECT id, spiceName, price FROM products;";
    connection.query(query, function(err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].id + " | " + res[i].spiceName + " | " + res[i].price);
        }
        spiceSearch();
    });
}




function spiceSearch() {
    inquirer
        .prompt({
            name: "id",
            type: "input",
            message: "pick id of product you want to buy"
        })
        .then(function(answer) {
            var query = "SELECT id, spiceName, price, stock FROM products WHERE ?";
            connection.query(query, { id: answer.id }, function(err, res) {
                for (var i = 0; i < res.length; i++) {
                    console.log(res[i].id + " " + res[i].spiceName + " $" + res[i].price);
                    console.log(res[i].stock + " left in stock");
                    var remove_from_stock = res[i].stock;
                    spice_price = res[i].price;
                    spice_name = res[i].spiceName;
                    // console.log("product_price: " + product_price);
                }
                var spiceAnswer = answer;
                spice_choice = answer;
                checkInventory(remove_from_stock);
            });
        });

}

function checkInventory(remove_from_stock) {
    inquirer
        .prompt({
            name: "howmany",
            type: "input",
            message: "How many would you like to buy"
        })
        .then(function(answer) {
            var buy_quant = answer.howmany;
            dollar_amt = buy_quant;
            console.log("buy_howmany: ", buy_quant);
            console.log("remove_from_stock: ", remove_from_stock);
            console.log("product_choice: " + spice_choice.id);
            console.log("You will be purchasing: " + buy_quant + " " + spice_name + " for $" + spice_price + " each.");
            var stock_left = remove_from_stock - buy_quant;
            console.log("stock_left: " + stock_left);
            stock_remaining = stock_left;
            if (stock_left < 0) {
                console.log("Insufficient quantity!")
                connection.end();
            } else {
                checkOut();
            }


        });
}




function checkOut() {
    console.log("Checking Out");
    console.log("product_choice: " + spice_choice.id);
    console.log("product_price: " + spice_price);
    var total_cost = dollar_amt * spice_price;
    console.log("You're total price is $" + total_cost);
    var query = "UPDATE products SET stock_quantity = " + stock_remaining + " WHERE id = " + spice_choice.id + ";";
    connection.query(query, function(err, res) {});
    shopSomeMore();
}



function shopSomeMore() {
    inquirer
        .prompt({
            name: "shopMore",
            type: "input",
            message: "would you like to shop some more? y/n"
        })
        .then(function(answer) {

            var shoppingSpree = answer.shopMore;
            if (shoppingSpree === "y") {

                purchase();

            } else {
                console.log("goodbye");
            }


        });

}

// function deleteInventory {

//     console.log("updating data in database");





// }terrm;