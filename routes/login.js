const express = require("express");
const { getUniqueId } = require("../utils");
const router = express.Router();

router.post("/", (req, res) => {
  const { body, simpsons } = req;

  // check that username and password match details on system
  if (!body.userName || !body.password) {
    res.send({ status: 0, error: "Wrong credentials" });
  }

  // find user
  const indexOfUser = simpsons.findIndex((user) => {
    return user.userName === body.userName && user.password === body.password;
  });

  // if user & password match, generate a token and send to user
  if (indexOfUser > -1) {
    const currentToken = getUniqueId(64);

    // add token to array
    let userTokens = [];
    userTokens.push(currentToken);

    simpsons[indexOfUser].userTokens = [...userTokens];

    res.send({ status: 1, currentToken });
    return;
  }

  res.send({ status: 0, error: "Wrong credentials" });
});

module.exports = router;
