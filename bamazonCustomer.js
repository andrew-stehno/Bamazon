const mysql = require("mysql");
const inquirer = require("inquirer");

let chosenItem;
let itemQuantity;
let inStock;

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Password1234",
    database: "bamazon_db"
});

connection.connect(function (err) {
    console.log("Connected as id: " + connection.threadId);
    if (err) throw err;
    userPrompt();
});

// display all items available for bid
// first-ask for the ID of the product they would like to buy
function userPrompt() {
    connection.query("SELECT * FROM products", function (err, res) {
        console.log("\n Items available for purchase:" + "\n")
        console.log(res);
        console.log("\n");

        inquirer.prompt({
            name: "choice",
            type: "list",
            message: "Which product would you like to buy?  Please select an item_id.",
            choices: function (value) {
                let choiceArray = [];
                for (let i = 0; i < res.length; i++) {
                    choiceArray.push(res[i].item_id)
                }
                return choiceArray;
            }
        }).then(function (answer) {
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
        validate: function (value) {
            var valid = !isNaN(parseFloat(value));
            return valid || 'Please enter a number';
        },
    }).then(function (answer) {
        itemQuantity = answer.quantity;
        console.log("\n Requested quantity: " + itemQuantity + "\n");
        verifyQuantity();
    })
};

// after order has been placed, check qty to meet customers request
function verifyQuantity() {
    inStock = chosenItem.stock_quantity;
    if (inStock - itemQuantity < 0) {
        console.log("Insufficient quantity!");
        placeAnotherOrder();
    } else {
        fullfillOrder();
    }
};

// otherwise fullfill order:
// update db to reflect remaining qty
// once update goes through, show customer the total cost of their purchase
function fullfillOrder() {
    newStockQty = inStock - itemQuantity;
    connection.query(
        "UPDATE products SET ? WHERE ?",
        [
            {
                stock_quantity: newStockQty
            },
            {
                item_id: chosenItem.item_id
            }
        ],
        function (err) {
            if (err) throw err;
            let orderTotal = itemQuantity * chosenItem.price;
            console.log("\n Your order has successfully been placed!");
            console.log("Your order total is $ " + orderTotal + "\n");
            placeAnotherOrder();
        }
    )
};

function placeAnotherOrder() {
    inquirer.prompt({
        type: "confirm",
        name: "yesOrNo",
        message: "Would you like to place another order?",
        default: true
    })
        .then(function (answer) {
            let myAnswer = answer.yesOrNo;
            if (!myAnswer) {
                connection.end();
                console.log("\n The store connection has been terminated!");
            } else {
                userPrompt();
            }
        })
};