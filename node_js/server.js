const { response } = require('express');
const mysql = require("mysql2");
const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');
const { render } = require('express/lib/response');
const { nextTick } = require('process');
var app = express();
app.use(bodyParser.json());

var mysqlConnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "webproject",
    multipleStatements: true
});

mysqlConnection.connect((err) => {
    if (!err) {
        console.log("Connected");
    } else {
        console.log("Connection Failed");
    }
})

app.use(express.static(__dirname + '/public'));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("home")
})



app.listen(3000);