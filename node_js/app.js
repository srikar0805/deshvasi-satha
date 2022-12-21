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
    mysqlConnection.query("CREATE DATABASE IF NOT EXISTS webproject", function (err, result) {
        if (err) throw err;
        console.log("Database created");
    });
    var sql = "CREATE TABLE IF NOT EXISTS voter (voter_id INT AUTO_INCREMENT PRIMARY KEY, voter_name VARCHAR(255), voter_password VARCHAR(25), voter_id VARCHAR(255) NOT NULL UNIQUE, voter_wardnumber VARCHAR(5), voter_constituency VARCHAR(255), voter_mandal VARCHAR(255), voter_district VARCHAR(255), voter_state VARCHAR(255), voter_phone VARCHAR(10), voter_dob DATE)";
    mysqlConnection.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Voter Table created");
    });
    var sql = "CREATE TABLE IF NOT EXISTS party_worker (pw_id INT AUTO_INCREMENT PRIMARY KEY, pw_name VARCHAR(255), pw_username VARCHAR(255), pw_id VARCHAR(255) NOT NULL UNIQUE, pw_password VARCHAR(25), pw_wardnumber VARCHAR(5), pw_constituency VARCHAR(255), pw_mandal VARCHAR(255), pw_district VARCHAR(255), pw_state VARCHAR(255), pw_phone VARCHAR(10), pw_dob DATE)";
    mysqlConnection.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Party Worker Table created");
    });
    var sql = "CREATE TABLE IF NOT EXISTS party_worker_admin (pw_admin_id INT AUTO_INCREMENT PRIMARY KEY, pw_admin_name VARCHAR(255), pw_admin_username VARCHAR(255), pw_admin_id VARCHAR(255) NOT NULL UNIQUE, pw_admin_password VARCHAR(25), pw_admin_phone VARCHAR(10), pw_admin_dob DATE)";
    mysqlConnection.query(sql, function
        (err, result) {
        if (err) throw err;
        console.log("Party Worker Admin Table created");
    });
    var sql =
      "CREATE TABLE IF NOT EXISTS deleted_voter (voter_id INT AUTO_INCREMENT PRIMARY KEY, voter_name VARCHAR(255), voter_password VARCHAR(25), voter_id VARCHAR(255) NOT NULL UNIQUE, voter_wardnumber VARCHAR(5), voter_constituency VARCHAR(255), voter_mandal VARCHAR(255), voter_district VARCHAR(255), voter_state VARCHAR(255), voter_phone VARCHAR(10), voter_dob DATE)";
    mysqlConnection.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Deleted Voter Table created");
    });
    

})



app.use(express.static(__dirname + '/public'));
app.set("view engine", "ejs");


app.get("/", (req, res) => {
    res.render("home")
})

app.get("/voteradminlogin", (req, res) => {
    res.render("voteradminlogin")
})

app.get("/voterlogin", (req, res) => {
    res.render("voter login")
})

app.get("/partyworkerlogin", (req, res) => {
    res.render("party workers login")
})

app.get("/partyworkeradminlogin", (req, res) => {
    res.render("pwadminlogin")
})



// app.get("/partyworker", (req, res) => {
//     res.render("pwhome")
// })

app.get("/register", (req, res) => {
    res.render("register")
})

app.post("/register", (req, res) => {
    var sql = "INSERT INTO voter (voter_name, voter_password, voter_id, voter_wardnumber, voter_constituency, voter_mandal, voter_district, voter_state, voter_phone, voter_dob) VALUES ('" + req.body.username + "', '" + req.body.password + "', '" + req.body.voter_id + "', '" + req.body.ward + "', '" + req.body.constituency + "', '" + req.body.mandal + "', '" + req.body.dist + "', '" + req.body.state + "', '" + req.body.phone + "', '" + req.body.dob + "')";
    mysqlConnection.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
    });
    res.redirect("/voterlogin");
})

app.post("/voterlogin", (req, res) => {
    var sql = "SELECT * FROM voter WHERE voter_id = '" + req.body.voter_id + "' AND voter_password = '" + req.body.password + "'";
    mysqlConnection.query(sql, function
        (err, result) {
        if (err) throw err;
        if (result.length > 0) {
            res.render("/voterhome", { result: result });
        }
        else {
            res.redirect("/voterlogin");
        }
    });
})

app.post("/partyworkerlogin", (req, res) => {
    var sql = "SELECT * FROM party_worker WHERE pw_username = '" + req.body.username + "' AND pw_password = '" + req.body.password + "'";
    mysqlConnection.query(sql, function
        (err, result) {
        if (err) throw err;
        if (result.length > 0) {
            res.render("/pwhome", { result: result });
        }
        else {
            res.redirect("/partyworkerlogin");
        }
    });
})



// app.get("/voter", (req, res) => {
//     res.render("voterhome")
// })

// app.get("/workeradminhome", (req, res) => {
//     res.render("workeradminhome")
// })

// app.get("/voteradminhome", (req, res) => {
//     res.render("voteradminhome")
// })



app.listen(3000);