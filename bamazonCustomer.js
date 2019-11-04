const mysql = require("mysql");
const inquirer = require("inquirer");

let chosenItem;
let itemQuantity;

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Password1234",
    database: "bamazon_db"
});

connection.connect(function(err) {
    console.log("Connected as id: " + connection.threadId);
    if (err) throw err;
    userPrompt();
});

// display all items available for bid
// first-ask for the ID of the product they would like to buy
function userPrompt(){
    connection.query("SELECT * FROM products", function(err, res){
        console.log("\n Items available for purchase:" + "\n")
        console.log(res);
        console.log("\n");

        inquirer.prompt({
            name: "choice",
            type: "list",
            message: "Which product would you like to buy?  Please select an item_id.",
            choices: function(value) {
                let choiceArray = [];
                for(let i = 0; i < res.length; i++){
                    choiceArray.push(res[i].item_id)
                }
                return choiceArray;
            }
        }).then(function(answer) {
            for (let i = 0; i < res.length; i++) {
                if (res[i].item_id === answer.choice) {
                    chosenItem = res[i];
                }
            }
            console.log("\n");
            console.log(chosenItem);
            console.log("\n");
            requestQty();
        })
    })
};

// second-ask how many units they would like to buy
function requestQty() {
    inquirer.prompt({
        type: "input",
        name: "quantity",
        message: "What quantity would you like to order?",
        validate: function(value) {
            if (isNaN(value) === false) {
                return true;
            }
            return false;
        },
    }).then(function(answer) {
        itemQuantity = answer.quantity;
        console.log("\n Requested quantity: " + itemQuantity + "\n");
    })
};

// after order has been placed, check qty to meet customers request
function verifyQuantity(){

};

// if not, log phrase like "Insufficient quantity", then prevent order from going through
function insufficientQty(){

};

// otherwise fullfill order:
// update db to reflect remaining qty
// once update goes through, show customer the total cost of their purchase
function fullfillOrder(){

};