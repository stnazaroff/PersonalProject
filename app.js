const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const mysql = require("mysql");
require("dotenv").config();

app.use(express.static(path.join(__dirname, "public")));


const port = process.env.Port || 3000; //setting static port value (3,000)
var router = express.Router();
var cors = require("cors");

const db = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: process.env.DB_PASSWORD,
  database: "profile",
});

  app.get("/users", (req, res) => {
    let sqlquery = "Select * from user";
    db.query(sqlquery, (err, results) => {
      if (err) {
        throw err;
      }
      res.send(results);
    });
  });

  
  //localhost:3000/updateuser/1
  app.put("/updateuser/:ids", (req, res) => {
    let sqlquery = `Update user 
    set user_name = '${req.body.user_name}', first_name = '${req.body.first_name}', last_name = '${req.body.last_name}', address = '${req.body.address}' 
    where id = ${req.params.ids}`;
    db.query(sqlquery, (err) => {
        if (err) {
            throw err;
        }
        res.send("Employee Updated");
        }
    );
  });


//router for obtaining all user information

//localhost:3000/deleteuser/1
//router for deleting user information
app.get("/deleteuser/:ids", (req, res) => {
  let sqlquery = `Delete From user where id = ${req.params.ids}`;
  let query = db.query(sqlquery, (err) => {
    if (err) {
      throw err;
    }
    res.send("Employee Deleted from table");
  });
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});