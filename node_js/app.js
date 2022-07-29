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

app.get("/voteradminlogin", (req, res) => {
    res.render("voteradmnilogin")
})

app.get("/voterlogin", (req, res) => {
    res.render("voterlogin")
})

app.get("/partyworkerlogin", (req, res) => {
    res.render("party workerrs login")
})

app.get("/partyworkeradminlogin", (req, res) => {
    res.render("pwadminlogin")
})

app.get("/partyworker", (req, res) => {
    res.render("pwhome")
})

app.get("/register", (req, res) => {
    res.render("register")
})

app.get("/voter", (req, res) => {
    res.render("voterhome")
})

app.get("/workeradminhome", (req, res) => {
    res.render("workeradminhome")
})

app.listen(3000);