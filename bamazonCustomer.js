const mysql = require("mysql");
const inquirer = require("inquirer");

// display all items available for bid

// prompt user with two messages:
// first-ask for the ID of the product they would like to buy
// second-ask how many units they would like to buy

// after order has been placed, check qty to meet customers request

// if not, log phrase like "Insufficient quantity", then prevent order from going through

// otherwise fullfill order:
// update db to reflect remaining qty
// once update goes through, show customer the total cost of their purchase
