const express = require("express"); //use express (built in module)
const mysql = require("mysql2/promise"); //use mysql (built in module)
const dotenv = require("dotenv"); //use dotenv (built in module)
const app = express(); //creates new express application
const path = require("path"); //use path (built in module)
const publicdirectory = path.join(__dirname, "./public"); //specifiy the static assets that will be used
const cors = require("cors"); //use cors (built in module)
const yahooFinance = require("yahoo-finance");

dotenv.config({ path: "./.env" }); //dotenv is used to hide sensitive information such as passwords and usernames

app.use(express.static(publicdirectory)); //use the static assets specified above
//configure the Express.js server to receive the form values as JSON
app.use(express.urlencoded({ extended: "false" }));
app.use(express.json()); //allow us to access req.body -> data coming from the client side
app.use(cors()); //use cors (built in module)

const port = process.env.Port || 3000; //setting static port value (3,000)

const db = mysql.createPool({
  host: "localhost",
  port: 3306,
  user: "root",
  password: process.env.DB_PASSWORD,
  database: "profile",
});

db.getConnection((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected to MySQL");
  }
});

//ROUTES

app.get("/stockinfo/:symbol", async (req, res) => {
  try {
    const { symbol } = req.params;
    yahooFinance.quote(
      {
        symbol: symbol,
        modules: ["price", "summaryDetail", "defaultKeyStatistics"],
      },
      function (err, quotes) {
        if (err) {
          console.error(err);
          return;
        }

        const stockInfo = {
          longName: quotes.price.longName,
          price: quotes.price.regularMarketPrice,
          high: quotes.summaryDetail.fiftyTwoWeekHigh,
          low: quotes.summaryDetail.fiftyTwoWeekLow,
          marketCap: quotes.summaryDetail.marketCap,
          peRatio: quotes.summaryDetail.trailingPE,
          eps: quotes.defaultKeyStatistics.forwardEps,
          pegRatio: quotes.defaultKeyStatistics.pegRatio,
          dividendYield: quotes.summaryDetail.dividendYield,
          pricetoBook: quotes.defaultKeyStatistics.priceToBook,
          
        };

        res.json(stockInfo);
      }
    );
  } catch (err) {
    console.error(err.message);
  }
});

//create a new user

app.post("/createuser", async (req, res) => {
  try {
    const { user_name, pass, first_name, last_name, address } = req.body; //data we are getting from the client side
    const check_username =
      "SELECT Count(*) as num FROM user WHERE user_name = ?";
    const check = await db.query(check_username, [user_name]);
    const count = check[0][0].num;
    if (count > 0) {
      res.json("Username already exists");
    } else {
      const sqlquery = await db.query(
        "Insert into user (user_name, pass, first_name, last_name, address) values (?, ?, ?, ?, ?)",
        [user_name, pass, first_name, last_name, address] //data we are sending to the database
      );
      res.json("User was added successfully");
    }
  } catch (err) {
    console.error(err.mesage);
  }
});

//get all users

app.get("/allusers", async (req, res) => {
  try {
    const sqlquery = await db.query("Select * from user");
    // res.json(sqlquery);
    console.log("successfull get all users route");
    res.json(sqlquery[0]); //send the data to the client side
  } catch (err) {
    console.error(err.message);
  }
});

//login
app.get("/login/:user_name/:pass", async (req, res) => {
  try {
    const { user_name, pass } = req.params;
    const sqlquery = await db.query(
      "Select * from user where user_name = ? and pass = ?",
      [user_name, pass]
    );
    if (sqlquery[0].length === 0) {
      res.json("Invalid username or password");
    } else {
      res.json("Valid username and password");
    }
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/specificuser/:user_name", async (req, res) => {
  try {
    const { user_name } = req.params;
    const check_username =
      "SELECT Count(*) as num FROM user WHERE user_name = ?";
    const check = await db.query(check_username, [user_name]);
    const count = check[0][0].num;
    if (count === 1) {
      res.json("Username already exists. Please pick another username");
    } else {
      res.json("Username is available");
    }
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/getuser/:user_name", async (req, res) => {
  try {
    const { user_name } = req.params;
    const check_username =
      "SELECT Count(*) as num FROM user WHERE user_name = ?";
    const check = await db.query(check_username, [user_name]);
    const count = check[0][0].num;
    if (count === 1) {
      const query = "SELECT * FROM user WHERE user_name = ?";
      const checker = await db.query(query, [user_name]);
      res.json(checker[0]);
    } else {
      res.json("Username does not exist");
    }
  } catch (err) {
    console.error(err.message);
  }
});

//get a user
//localhost:3000/user/1

app.get("/user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const sqlquery = await db.query("Select * from user where id = ?", [id]);
    res.json(sqlquery[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//update a user

app.put("/updateuser/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { user_name, pass, first_name, last_name, address } = req.body;
    const check_username =
      "SELECT Count(*) as num FROM user WHERE user_name = ?";
    const check = await db.query(check_username, [user_name]);
    const count = check[0][0].num;
    if (count === 1) {
      res.json("Username already exists. Please pick another username");
    } else {
      const sqlquery = await db.query(
        "Update user set user_name = ?, pass = ?, first_name = ?, last_name = ?, address = ? where id = ?",
        [user_name, pass, first_name, last_name, address, id]
      );
      res.json("User was updated");
    }
  } catch (err) {
    console.error(err.message);
  }
});

//delete a user

app.delete("/deleteuser/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const sqlquery = await db.query("Delete from user where id = ?", [id]);
    res.json("User was deleted");
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
