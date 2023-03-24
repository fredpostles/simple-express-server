require("dotenv").config();
const asyncMySQL = require("./mysql/connection");
const checkDBStatus = require("./tests/sql");
const express = require("express"); // the import
const app = express(); // create an instance
const { simpsons } = require("./data/simpsons");
const { checkToken } = require("./middleware/auth");
const { getUniqueId } = require("./utils");
const { addToLog } = require("./middleware/logging");

// check the db status
checkDBStatus(asyncMySQL);

simpsons.forEach((element) => {
  element.id = getUniqueId(16);
  element.characterDirection = element.characterDirection.toLowerCase();
});

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

// custom middleware
app.use((req, res, next) => {
  req.simpsons = simpsons;
  next();
});

//route middleware
app.use("/read", checkToken, require("./routes/read"));
app.use("/delete", checkToken, require("./routes/delete"));
app.use("/create", require("./routes/create"));
app.use("/update", checkToken, require("./routes/update"));
app.use("/login", require("./routes/login"));
app.use("/logoff", require("./routes/logoff"));

const port = process.env.PORT || 6001;
app.listen(port, () => {
  // takes the port and a callback
  console.log(`The server is running on port ${port}.`);
});
