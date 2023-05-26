const express = require('express'); //use express (built in module)
const mysql = require('mysql');     //use mysql (built in module)
const dotenv = require('dotenv');   //use dotenv (built in module)
const app = express();              //creates new express application
const path = require("path");       //use path (built in module)
const publicdirectory = path.join(__dirname, './public'); //specifiy the static assets that will be used

dotenv.config({path: './.env'});    //dotenv is used to hide sensitive information such as passwords and usernames

app.use(express.static(publicdirectory)); //use the static assets specified above
//configure the Express.js server to receive the form values as JSON
app.use(express.urlencoded({extended: 'false'}))
app.use(express.json())



// const fs = require("fs");
// var cookieParser = require('cookie-parser');
// var router = express.Router();
// var cors = require("cors");
// app.use(cookieParser());

const port = process.env.Port || 3000; //setting static port value (3,000)

const db = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: process.env.DB_PASSWORD,
  database: "profile",
});




app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});