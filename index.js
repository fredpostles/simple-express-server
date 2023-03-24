require("dotenv").config();
const asyncMySQL = require("./mysql/connection");
const checkDBStatus = require("./tests/sql");
const express = require("express"); // the import
const app = express(); // create an instance
const { checkToken } = require("./middleware/auth");
const { addToLog } = require("./middleware/logging");

// check the db status
checkDBStatus(asyncMySQL);

// (global) middleware
app.use(express.static("public")); // handle static files; e.g images - so you don't have to write a route for every single file
app.use(express.json());

// utility middleware, attaching SQL connection to req
app.use((req, res, next) => {
  req.asyncMySQL = asyncMySQL;
  next();
});

// logging middleware
app.use(addToLog);

//route middleware
// no auth necessary
app.use("/create", require("./routes/create"));
app.use("/login", require("./routes/login"));

// auth necessary
app.use("/read", checkToken, require("./routes/read"));
app.use("/update", checkToken, require("./routes/update"));
app.use("/logoff", checkToken, require("./routes/logoff"));
app.use("/delete", checkToken, require("./routes/delete"));

// if no port in env, use 6001
const port = process.env.PORT || 6001;

// start the server
app.listen(port, () => {
  // takes the port and a callback
  console.log(`The server is running on port ${port}.`);
});
